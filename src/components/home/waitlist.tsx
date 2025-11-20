import { useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Trophy, Users, TrendingUp, Share2, Copy, MessageCircle, Mail, Facebook, Linkedin } from 'lucide-react'
import { postWaitlistSignup, getWaitlistRank, getWaitlistStats, type WaitlistSignupRequest, type WaitlistRankResponse } from '@/services/api'
import { signUpWithCognito, toFriendlyCognitoError, resendConfirmationCode } from '@/auth/cognito'
import { getRuntimeAuthConfig } from '@/auth/config'
import { useAuth } from '@/auth'
import { cn } from '@/lib/utils'

const toE164 = (countryCode: string, localNumber: string): string => {
  const digitsOnly = localNumber.replace(/\D/g, '')
  return countryCode + digitsOnly
}

// Removed unused ADDRESS_COUNTRIES constant

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
]

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia'
]

const CANADIAN_PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
  'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
  'Quebec', 'Saskatchewan', 'Yukon'
]

const AUSTRALIAN_STATES = [
  'New South Wales', 'Victoria', 'Queensland', 'Western Australia',
  'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'
]

const STATES_BY_COUNTRY: Record<string, string[]> = {
  'IN': INDIAN_STATES,
  'US': US_STATES,
  'CA': CANADIAN_PROVINCES,
  'AU': AUSTRALIAN_STATES,
}

// Gamification utility functions
type Tier = 'gold' | 'silver' | 'bronze' | 'default'

interface GamificationMetrics {
  tier: Tier
  tierName: string
  percentile: number
  estimatedJump: number
  nextMilestone: { name: string; required: number; current: number } | null
  tierColors: { from: string; via: string; to: string; glow: string }
}

const ACHIEVEMENTS = [
  { id: 'early-bird', name: 'Early Bird', icon: '🐦', requirement: { type: 'rank', value: 1000 }, description: 'Top 1000 signups' },
  { id: 'influencer', name: 'Influencer', icon: '⭐', requirement: { type: 'referrals', value: 5 }, description: '5+ referrals' },
  { id: 'ambassador', name: 'Ambassador', icon: '🏆', requirement: { type: 'referrals', value: 10 }, description: '10+ referrals' },
  { id: 'champion', name: 'Champion', icon: '👑', requirement: { type: 'referrals', value: 25 }, description: '25+ referrals' },
]

const getTierInfo = (percentile: number): { tier: Tier; name: string; colors: { from: string; via: string; to: string; glow: string } } => {
  if (percentile <= 1) {
    return {
      tier: 'gold',
      name: 'Gold Tier',
      colors: { from: 'from-yellow-400', via: 'via-amber-500', to: 'to-orange-600', glow: 'shadow-yellow-500/50' }
    }
  } else if (percentile <= 5) {
    return {
      tier: 'silver',
      name: 'Silver Tier',
      colors: { from: 'from-gray-300', via: 'via-slate-400', to: 'to-gray-500', glow: 'shadow-gray-400/50' }
    }
  } else if (percentile <= 20) {
    return {
      tier: 'bronze',
      name: 'Bronze Tier',
      colors: { from: 'from-orange-400', via: 'via-amber-600', to: 'to-yellow-700', glow: 'shadow-orange-500/50' }
    }
  }
  return {
    tier: 'default',
    name: 'Rising Star',
    colors: { from: 'from-primary', via: 'via-primary', to: 'to-primary', glow: 'shadow-primary/50' }
  }
}

const calculateGamificationMetrics = (rank: number, totalUsers: number, referralsCount: number): GamificationMetrics => {
  const percentile = ((totalUsers - rank) / totalUsers) * 100
  const tierInfo = getTierInfo(percentile)
  
  // Estimate jump: assume each referral moves you up by ~sqrt(totalUsers/100) positions
  const estimatedJump = Math.max(5, Math.floor(Math.sqrt(totalUsers / 100)))
  
  // Find next milestone
  let nextMilestone = null
  for (const achievement of ACHIEVEMENTS) {
    if (achievement.requirement.type === 'referrals' && referralsCount < achievement.requirement.value) {
      nextMilestone = {
        name: achievement.name,
        required: achievement.requirement.value,
        current: referralsCount
      }
      break
    }
  }
  
  return {
    tier: tierInfo.tier,
    tierName: tierInfo.name,
    percentile,
    estimatedJump,
    nextMilestone,
    tierColors: tierInfo.colors
  }
}

// Achievements feature currently unused - commented out to avoid build errors
// Uncomment when achievements display is implemented
/*
const getUnlockedAchievements = (rank: number, referralsCount: number) => {
  return ACHIEVEMENTS.map(achievement => {
    const isUnlocked = achievement.requirement.type === 'rank' 
      ? rank <= achievement.requirement.value 
      : referralsCount >= achievement.requirement.value
    return { ...achievement, unlocked: isUnlocked }
  })
}
*/

// Sub-components for the gamified dashboard

interface CircularRankProgressProps {
  rank: number
  totalUsers: number
  tierColors: { from: string; via: string; to: string; glow: string }
  percentile: number
}

const CircularRankProgress = ({ rank, totalUsers, tierColors, percentile }: CircularRankProgressProps) => {
  const [mounted, setMounted] = useState(false)
  const progress = percentile
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = mounted ? circumference - (progress / 100) * circumference : circumference

  useEffect(() => {
    setTimeout(() => setMounted(true), 100)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-64 h-64">
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-gray-300 dark:text-gray-700"
          />
          {/* Progress circle with improved shadow */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1500 ease-out"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={tierColors.from} stopOpacity="1" />
              <stop offset="50%" className={tierColors.via} stopOpacity="1" />
              <stop offset="100%" className={tierColors.to} stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-sm text-muted-foreground font-light tracking-tight mb-1">Your Rank</div>
          <div className={`text-5xl font-extralight bg-gradient-to-r ${tierColors.from} ${tierColors.via} ${tierColors.to} bg-clip-text text-transparent`}>
            #{rank.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground font-light mt-1">of {totalUsers.toLocaleString()}</div>
          <div className={`text-xs font-medium mt-2 px-3 py-1 rounded-full bg-gradient-to-r ${tierColors.from} ${tierColors.via} ${tierColors.to} text-white shadow-sm`}>
            Top {percentile.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  )
}

// AchievementBadge component removed - currently unused in UI
// Uncomment and restore if achievements display is needed in the future
/*
interface AchievementBadgeProps {
  achievement: { id: string; name: string; icon: string; description: string; unlocked: boolean }
}

const AchievementBadge = ({ achievement }: AchievementBadgeProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border transition-all duration-300 min-w-[100px] sm:min-w-[120px] flex-shrink-0',
        achievement.unlocked
          ? 'bg-gradient-to-br from-primary/20 to-secondary/10 border-primary/30 shadow-lg shadow-primary/20 hover:scale-105'
          : 'bg-muted/10 border-border/20 grayscale opacity-50'
      )}
      title={achievement.description}
    >
      <div className={cn('text-3xl sm:text-4xl', achievement.unlocked && 'animate-bounce-subtle')}>
        {achievement.icon}
      </div>
      <div className="text-[10px] sm:text-xs font-medium text-center tracking-tight whitespace-nowrap">{achievement.name}</div>
      {achievement.unlocked && (
        <div className="text-[9px] sm:text-[10px] text-primary font-medium">Unlocked!</div>
      )}
    </div>
  )
}
*/

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  trend?: 'up' | 'down'
  highlight?: boolean
}

const StatCard = ({ icon, label, value, trend, highlight }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const numericValue = typeof value === 'number' ? value : parseInt(String(value).replace(/,/g, '')) || 0

  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1500
      const steps = 60
      const increment = numericValue / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setDisplayValue(numericValue)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [numericValue, value])

  return (
    <div
      className={cn(
        'group p-5 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg',
        highlight
          ? 'bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 border-primary/30 shadow-md'
          : 'bg-muted/20 border-border/30'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn('text-2xl', highlight && 'text-primary')}>{icon}</div>
        {trend && (
          <TrendingUp
            className={cn(
              'w-4 h-4 transition-transform group-hover:scale-125',
              trend === 'up' ? 'text-green-500 rotate-0' : 'text-red-500 rotate-180'
            )}
          />
        )}
      </div>
      <div className="space-y-1">
        <div className={cn('text-3xl font-light tracking-tight', highlight && 'text-primary')}>
          {typeof value === 'number' ? displayValue.toLocaleString() : value}
        </div>
        <div className="text-xs text-muted-foreground font-light tracking-tight">{label}</div>
      </div>
    </div>
  )
}

interface ShareButtonGridProps {
  referralUrl: string
  showReferralLink?: boolean
}

const ShareButtonGrid = ({ referralUrl, showReferralLink = true }: ShareButtonGridProps) => {
  const [copied, setCopied] = useState(false)
  
  // Build message parts
  const messageParts = [
    'Claim your FREE Genome Test and unlock actionable insights for your fitness, lifestyle, and long-term health (worth ₹1.5L in value).',
    'Participate with family and create your genetic map that empowers future generations to take charge of their health and wellness.',
    "Here's how you can lead the movement:",
    '1 Register for yourself, your family, and friends.',
    '2 Share your unique referral link in your groups.',
    '3 Invite more → Jump the queue faster for free testing and priority reports!',
    referralUrl
  ]
  
  // Create formatted message with proper line breaks for each platform
  const formattedMessage = messageParts.map(part => encodeURIComponent(part)).join('%0A%0A')

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareButtons = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4" />,
      color: 'from-green-500 to-green-600',
      action: () => window.open(`https://wa.me/?text=${formattedMessage}`, '_blank')
    },
    {
      name: 'X',
      icon: <Share2 className="w-4 h-4" />,
      color: 'from-gray-900 to-black',
      action: () => window.open(`https://twitter.com/intent/tweet?text=${formattedMessage}`, '_blank')
    },
    {
      name: 'Email',
      icon: <Mail className="w-4 h-4" />,
      color: 'from-gray-600 to-gray-700',
      action: () => window.open(`mailto:?subject=Join%20Chiranjiv&body=${formattedMessage}`, '_blank')
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      color: 'from-blue-600 to-blue-700',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`, '_blank')
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      color: 'from-blue-700 to-blue-800',
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`, '_blank')
    }
  ]

  return (
    <div className="space-y-4">
      {/* Referral Link */}
      {showReferralLink && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground tracking-tight">Your Referral Link:</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="flex-1 glass-input px-4 py-2.5 text-sm font-mono text-foreground rounded-lg border border-border/30"
              onClick={(e) => e.currentTarget.select()}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleCopy(referralUrl)}
              className={cn(
                'hover:scale-105 transition-all duration-200 h-10 w-10',
                copied && 'bg-green-500 text-white border-green-500 hover:bg-green-600'
              )}
              title={copied ? 'Copied!' : 'Copy link'}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Share Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {shareButtons.map((button) => (
          <Button
            key={button.name}
            onClick={button.action}
            className={cn(
              'flex items-center justify-center gap-2 bg-gradient-to-r text-white border-0 hover:scale-105 transition-all duration-200 shadow-lg h-10',
              button.color
            )}
          >
            {button.icon}
            <span className="text-xs font-medium hidden sm:inline">{button.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

// SigninForm Component with local state
interface SigninFormProps {
  auth: ReturnType<typeof useAuth>
  onSwitchToSignup: () => void
  onShowForgotPassword: () => void
  onShowUnverifiedEmail: (email: string) => void
}

const SigninForm = ({ auth, onSwitchToSignup, onShowForgotPassword, onShowUnverifiedEmail }: SigninFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setErrors({ email: 'Please enter email and password to sign in' })
      return
    }
    try {
      await auth.signIn(email.trim(), password)
    } catch (err: any) {
      // Handle unverified account specifically
      if (err?.name === 'UserNotConfirmedException') {
        onShowUnverifiedEmail(email.trim())
        return
      }
      setErrors({ email: toFriendlyCognitoError(err) })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label htmlFor="signinEmail" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Email</label>
        <Input 
          id="signinEmail" 
          name="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="your.email@example.com" 
          className="w-full glass-input" 
        />
      </div>
      <div>
        <label htmlFor="signinPassword" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Password</label>
        <Input 
          id="signinPassword" 
          name="password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Your password" 
          className="w-full glass-input" 
        />
      </div>
      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      <Button type="submit" className="w-full btn-glow hover:scale-[1.02] transition-all">
        Sign in
      </Button>
      {auth.user && <p className="text-xs text-green-600">Signed in</p>}
      <div className="text-center">
        <Button type="button" variant="outline" onClick={onShowForgotPassword} className="bg-transparent hover:scale-105 transition-transform">
          Forgot password?
        </Button>
      </div>
      <div className="text-center">
        <Button type="button" variant="outline" onClick={onSwitchToSignup} className="bg-transparent hover:scale-105 transition-transform">
          New here? Sign up
        </Button>
      </div>
    </form>
  )
}

// PasswordResetRequestForm Component with local state
interface PasswordResetRequestFormProps {
  initialEmail?: string
  onBack: () => void
  onCodeSent: (email: string) => void
  auth: ReturnType<typeof useAuth>
}

const PasswordResetRequestForm = ({ initialEmail = '', onBack, onCodeSent, auth }: PasswordResetRequestFormProps) => {
  const [email, setEmail] = useState(initialEmail)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [requesting, setRequesting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }
    setRequesting(true)
    try {
      await auth.startPasswordReset(email.trim())
      setSuccess('Reset code sent! Please check your email.')
      onCodeSent(email.trim())
    } catch (err: any) {
      setError(toFriendlyCognitoError(err))
    } finally {
      setRequesting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-foreground tracking-tight">Reset Password</h3>
        <p className="text-sm text-muted-foreground font-light">Enter your email to receive a password reset code.</p>
      </div>
      <div>
        <label htmlFor="forgotEmail" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Email Address</label>
        <Input 
          id="forgotEmail" 
          name="forgotEmail" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="your.email@example.com" 
          className={`w-full glass-input ${error ? 'border-red-500' : ''}`}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {success && <p className="text-xs text-green-600">{success}</p>}
      <Button type="submit" className="w-full btn-glow hover:scale-[1.02] transition-all" disabled={requesting}>
        {requesting ? 'Sending...' : 'Send Reset Code'}
      </Button>
      <div className="text-center">
        <Button type="button" variant="ghost" onClick={onBack} className="text-sm hover:scale-105 transition-transform">
          Back to sign in
        </Button>
      </div>
    </form>
  )
}

// PasswordResetConfirmForm Component with local state
interface PasswordResetConfirmFormProps {
  email: string
  onBack: () => void
  onResetSuccess: () => void
  auth: ReturnType<typeof useAuth>
}

const PasswordResetConfirmForm = ({ email, onBack, onResetSuccess, auth }: PasswordResetConfirmFormProps) => {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!code.trim()) {
      setError('Please enter the verification code')
      return
    }
    
    const pw = password
    const strongPw =
      pw.length >= 8 &&
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /[0-9]/.test(pw) &&
      /[^A-Za-z0-9]/.test(pw)
    if (!strongPw) {
      setError('Use 8+ chars with upper, lower, number, and symbol')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setSubmitting(true)
    try {
      await auth.completePasswordReset(email.trim(), code.trim(), password)
      setSuccess('Password reset successful! You can now sign in.')
      setTimeout(() => {
        onResetSuccess()
      }, 2000)
    } catch (err: any) {
      setError(toFriendlyCognitoError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-foreground tracking-tight">Enter New Password</h3>
        <p className="text-sm text-muted-foreground font-light">Enter the code from your email and your new password.</p>
      </div>
      <div>
        <label htmlFor="resetCode" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Verification Code</label>
        <Input 
          id="resetCode" 
          name="resetCode" 
          type="text" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          placeholder="Enter the 6-digit code" 
          className={`w-full glass-input ${error ? 'border-red-500' : ''}`}
        />
      </div>
      <div>
        <label htmlFor="resetPassword" className="block text-sm font-medium text-foreground mb-2 tracking-tight">New Password</label>
        <div className="relative">
          <Input 
            id="resetPassword" 
            name="resetPassword" 
            type={showPassword ? 'text' : 'password'} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Minimum 8 characters" 
            className={`w-full glass-input pr-10 ${error ? 'border-red-500' : ''}`}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="resetConfirmPassword" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Confirm New Password</label>
        <div className="relative">
          <Input 
            id="resetConfirmPassword" 
            name="resetConfirmPassword" 
            type={showConfirmPassword ? 'text' : 'password'} 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Re-enter your password" 
            className={`w-full glass-input pr-10 ${error ? 'border-red-500' : ''}`}
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {success && <p className="text-xs text-green-600">{success}</p>}
      <Button type="submit" className="w-full btn-glow hover:scale-[1.02] transition-all" disabled={submitting}>
        {submitting ? 'Resetting...' : 'Reset Password'}
      </Button>
      <div className="text-center">
        <Button type="button" variant="ghost" onClick={onBack} className="text-sm hover:scale-105 transition-transform">
          Back to sign in
        </Button>
      </div>
    </form>
  )
}

// UnverifiedEmailScreen Component with local state
interface UnverifiedEmailScreenProps {
  email: string
  onBack: () => void
}

const UnverifiedEmailScreen = ({ email, onBack }: UnverifiedEmailScreenProps) => {
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)
  const [error, setError] = useState('')

  const handleResend = async () => {
    if (!email) return
    setResending(true)
    setResent(false)
    setError('')
    try {
      await resendConfirmationCode(email)
      setResent(true)
    } catch (err: any) {
      console.error('Failed to resend verification email:', err)
      setError(toFriendlyCognitoError(err))
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-500/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-yellow-400/30 shadow-lg shadow-yellow-400/10">
          <Mail className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h3 className="text-lg font-medium text-foreground tracking-tight text-center">Account Not Verified</h3>
        <p className="text-sm text-muted-foreground font-light text-center">
          Your account is not verified. Please check your email at <span className="font-medium text-foreground">{email}</span> for the verification link.
        </p>
      </div>
      {resent && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
          <p className="text-sm text-green-600 dark:text-green-400 text-center">
            Verification email sent! Please check your inbox and spam folder.
          </p>
        </div>
      )}
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}
      <Button 
        type="button" 
        onClick={handleResend}
        className="w-full btn-glow hover:scale-[1.02] transition-all" 
        disabled={resending}
      >
        {resending ? 'Sending...' : 'Resend Verification Email'}
      </Button>
      <div className="text-center">
        <Button type="button" variant="ghost" onClick={onBack} className="text-sm hover:scale-105 transition-transform">
          Back to sign in
        </Button>
      </div>
    </div>
  )
}

export function Waitlist() {
  const auth = useAuth()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phoneLocal: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    addressCountry: 'IN',
    state: '',
    pincode: '',
    age: '',
    password: '',
    confirmPassword: '',
    privacyPolicy: false,
    termsOfService: false,
    dataUsagePolicy: false,
    researchConsent: false,
    marketingConsent: false,
  })
  const [submitted] = useState(false)
  const [referralCode, setReferralCode] = useState('')
  const [enteredReferralCode, setEnteredReferralCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)
  const [showSignin, setShowSignin] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [unverifiedEmail, setUnverifiedEmail] = useState('')
  const [rankData, setRankData] = useState<WaitlistRankResponse | null>(null)
  const [rankLoading, setRankLoading] = useState(false)
  const [rankError, setRankError] = useState('')
  const [waitlistStats, setWaitlistStats] = useState({ totalUsers: 0, totalReferrals: 0 })
  const [statsLoading, setStatsLoading] = useState(true)
  const [referralLinkCopied, setReferralLinkCopied] = useState(false)

  // Auto-fill referral code from URL query parameter
  useEffect(() => {
    const refParam = searchParams.get('ref')
    if (refParam && refParam.trim()) {
      setEnteredReferralCode(refParam.trim())
    }
  }, [searchParams])

  // Fetch waitlist stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true)
      try {
        const result = await getWaitlistStats()
        if (result.ok && 'totalUsers' in result.data) {
          setWaitlistStats(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch waitlist stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }
    fetchStats()
  }, [])

  // Fetch rank data when user is logged in
  useEffect(() => {
    const userSub = auth.user?.sub
    if (userSub) {
      const fetchRank = async () => {
        setRankLoading(true)
        setRankError('')
        try {
          const { ok, data } = await getWaitlistRank(userSub)
          if (ok && 'rank' in data) {
            setRankData(data)
          } else {
            setRankError((data as any).error || 'Failed to load rank')
          }
        } catch (error) {
          setRankError('Failed to load rank information')
        } finally {
          setRankLoading(false)
        }
      }
      fetchRank()
    }
  }, [auth.user])

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phoneLocal.trim()) {
      newErrors.phone = 'Phone number is required'
    } else {
      const digitsOnly = formData.phoneLocal.replace(/\D/g, '')
      if (digitsOnly.length !== 10) {
        newErrors.phone = 'Phone number must be exactly 10 digits'
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setStep(2)
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.addressCountry) newErrors.addressCountry = 'Country is required'
    if (!formData.state.trim()) newErrors.state = 'State/Province is required'
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode/ZIP code is required'
    const age = parseInt(formData.age)
    if (!formData.age.trim() || isNaN(age) || age < 18 || age > 120) {
      newErrors.age = 'You must be at least 18 years old to register'
    }
    const pw = formData.password
    const strongPw =
      pw.length >= 8 &&
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /[0-9]/.test(pw) &&
      /[^A-Za-z0-9]/.test(pw)
    if (!strongPw) {
      newErrors.password = 'Use 8+ chars with upper, lower, number, and symbol'
    }
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.privacyPolicy) newErrors.privacyPolicy = 'You must accept the Privacy Policy'
    if (!formData.termsOfService) newErrors.termsOfService = 'You must accept the Terms of Service'
    if (!formData.dataUsagePolicy) newErrors.dataUsagePolicy = 'You must accept the Data Usage Policy'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setLoading(true)
    setErrors({})
    
    try {
      // Create Cognito user
      let cognitoUserId: string
      try {
        const cfg = getRuntimeAuthConfig()
        const addressParts = [
          formData.addressLine1.trim(),
          formData.addressLine2.trim(),
          formData.city.trim(),
          formData.state.trim(),
          formData.pincode.trim(),
        ].filter(Boolean)
        const fullAddress = addressParts.join(', ')
        const userAttributes: Record<string, string> = {}
        if (cfg.addressAttrName) {
          userAttributes[cfg.addressAttrName] = fullAddress
        }

        const combinedPhone = toE164(formData.countryCode, formData.phoneLocal)
        const doSignup = async (attrs: Record<string, string>) =>
          await signUpWithCognito({
            email: formData.email.trim(),
            password: formData.password,
            name: formData.name.trim(),
            phone: combinedPhone,
            userAttributes: attrs,
          })

        let signupResult
        try {
          signupResult = await doSignup(userAttributes)
        } catch (err: any) {
          const msg = String(err?.message || '')
          const code = err?.name
          // If pool does not have the standard "address" attribute enabled, retry without it
          if (code === 'InvalidParameterException' && /address/i.test(msg) && /not defined/i.test(msg)) {
            signupResult = await doSignup({})
          } else {
            throw err
          }
        }
        
        // Get the Cognito user sub ID
        if (!signupResult.UserSub) {
          throw new Error('Failed to get user ID from Cognito')
        }
        cognitoUserId = signupResult.UserSub
      } catch (err: any) {
        // Log error for diagnostics
        console.error('Cognito SignUp error:', err)
        const message = toFriendlyCognitoError(err)
        setErrors({ email: message })
        
        // If user already exists, suggest signing in
        if (err?.name === 'UsernameExistsException') {
          setShowSignin(true)
          setStep(1)
        }
        setLoading(false)
        return
      }

      // Call waitlist signup API with Cognito user ID
      const combinedPhone = toE164(formData.countryCode, formData.phoneLocal)
      const addressParts = [
        formData.addressLine1.trim(),
        formData.addressLine2.trim(),
        formData.city.trim(),
        formData.state.trim(),
        formData.pincode.trim(),
      ].filter(Boolean)
      const fullAddress = addressParts.join(', ')

      const waitlistRequest: WaitlistSignupRequest = {
        id: cognitoUserId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: combinedPhone,
        address: fullAddress,
        age: parseInt(formData.age),
        consentPrivacyPolicy: formData.privacyPolicy ? 'v0.1' : null,
        consentTermsOfService: formData.termsOfService ? 'v0.1' : null,
        consentDataUsagePolicy: formData.dataUsagePolicy ? 'v0.1' : null,
        consentResearchContact: formData.researchConsent ? 'v0.1' : null,
        consentMarketing: formData.marketingConsent ? 'v0.1' : null,
        referralCode: enteredReferralCode || undefined,
      }

      const { ok, data } = await postWaitlistSignup(waitlistRequest)
      if (!ok) {
        setErrors({ email: (data as any).error || 'Failed to complete waitlist signup' })
        setLoading(false)
        return
      }

      // Move to confirmation step
      setStep(3)
      resetFormData()
      const signupResponse = data as any
      setReferralCode(signupResponse.referralCode)
      try {
        window.localStorage.setItem('cjv_referral_code', signupResponse.referralCode || '')
      } catch {
        // ignore storage failures
      }
    } catch (error) {
      setErrors({ email: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }
  
  const handlePhoneLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phoneLocal: e.target.value })
    if (errors.phone) setErrors({ ...errors, phone: '' })
  }
  
  // Removed unused handleCountryCodeChange function

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const copyReferralMessage = () => {
    const message = `Join me on Project Chiranjiv - India's first free full-genome sequencing platform! Use my referral code ${referralCode} to skip the queue. https://chiranjiv.com`
    navigator.clipboard.writeText(message)
  }

  const handleResendCode = async () => {
    try {
      await resendConfirmationCode(formData.email.trim())
    } catch (err: any) {
      // Silent failure - user can try again
      console.error('Failed to resend verification email:', err)
    }
  }

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      countryCode: '+91',
      phoneLocal: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      addressCountry: 'IN',
      state: '',
      pincode: '',
      age: '',
      password: '',
      confirmPassword: '',
      privacyPolicy: false,
      termsOfService: false,
      dataUsagePolicy: false,
      researchConsent: false,
      marketingConsent: false,
    })
    setEnteredReferralCode('')
    setErrors({})
  }

  const handleSignOut = async () => {
    // Clear user-related state
    setRankData(null)
    setRankError('')
    setReferralLinkCopied(false)
    setShowSignin(false)
    resetFormData()
    // Sign out from auth
    await auth.signOut()
  }

  return (
    <section id="waitlist" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      {/* Floating animated orbs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-2/3 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '4s' }}
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {!submitted && !statsLoading && waitlistStats.totalUsers > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto">
              <div className="text-center p-5 sm:p-6 rounded-xl bg-muted/20 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="text-3xl sm:text-4xl font-light text-primary mb-2 tracking-tight">
                  {waitlistStats.totalUsers.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-light tracking-tight">On Waitlist</div>
              </div>
              <div className="text-center p-5 sm:p-6 rounded-xl bg-muted/20 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="text-3xl sm:text-4xl font-light text-secondary mb-2 tracking-tight">
                  {waitlistStats.totalReferrals.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-light tracking-tight">Total Referrals</div>
              </div>
            </div>
          )}
          <Card className="p-6 sm:p-8 md:p-10 glass-backdrop glass-border-refractive rounded-3xl shadow-2xl border-border/50 backdrop-blur-sm transition-all duration-300">
            {auth.user ? (
              <>
                {/* Compact Sign-in Badge */}
                <div className="flex items-center justify-between mb-6 p-4 rounded-xl border border-border/20 bg-muted/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center border border-primary/30">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{auth.user?.name || 'User'}</div>
                      <div className="text-xs text-muted-foreground">{auth.user?.email}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="hover:scale-105 transition-transform text-xs">
                    Sign out
                  </Button>
                </div>

                {rankLoading ? (
                  <div className="py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary mb-4"></div>
                    <div className="text-sm text-muted-foreground font-light">Loading your dashboard...</div>
                  </div>
                ) : rankError ? (
                  <div className="py-8 px-6 rounded-2xl border border-red-500/30 bg-red-500/10">
                    <div className="text-sm text-red-500 font-light text-center">{rankError}</div>
                  </div>
                ) : rankData ? (
                  <>
                    {(() => {
                      const metrics = calculateGamificationMetrics(rankData.rank, rankData.totalUsers, rankData.referralsCount)
                      // const achievements = getUnlockedAchievements(rankData.rank, rankData.referralsCount) // Unused for now
                      const referralUrl = `https://chiranjiv.com/?ref=${rankData.referralCode}`
                      
                      return (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                          {/* Announcement Banner */}
                          <div className="relative">
                            <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                              Share your personal link with friends, family, or your fitness groups. The more people you invite, the faster you move up! Jump the queue for free kits and priority reports by spreading the word.
                            </p>
                          </div>

                          {/* Referral Link Input */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground tracking-tight">Your Referral Link:</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                readOnly
                                value={referralUrl}
                                className="flex-1 glass-input px-4 py-2.5 text-sm font-mono text-foreground rounded-lg border border-border/30"
                                onClick={(e) => e.currentTarget.select()}
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={async () => {
                                  await navigator.clipboard.writeText(referralUrl)
                                  setReferralLinkCopied(true)
                                  setTimeout(() => setReferralLinkCopied(false), 2000)
                                }}
                                className={cn(
                                  'hover:scale-105 transition-all duration-200 h-10 w-10',
                                  referralLinkCopied && 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                                )}
                                title={referralLinkCopied ? 'Copied!' : 'Copy link'}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Top Section: Ring + Stats Side by Side */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                            {/* Hero Circular Rank Display */}
                            <div className="relative">
                              <CircularRankProgress
                                rank={rankData.rank}
                                totalUsers={rankData.totalUsers}
                                tierColors={metrics.tierColors}
                                percentile={metrics.percentile}
                              />
                            </div>

                            {/* Metrics Grid - Vertically Stacked */}
                            <div className="flex flex-col gap-3">
                              <StatCard
                                icon={<Trophy className="w-5 h-5" />}
                                label="Current Rank"
                                value={rankData.rank}
                                highlight
                              />
                              <StatCard
                                icon={<Users className="w-5 h-5" />}
                                label="Referrals"
                                value={rankData.referralsCount}
                                trend="up"
                              />
                            </div>
                          </div>

                          {/* Share Section */}
                          <div className="space-y-4">
                            <ShareButtonGrid referralUrl={referralUrl} showReferralLink={false} />
                          </div>

                          {/* Q1 Timeline Banner */}
                          <div className="relative">
                            <p className="text-sm sm:text-base font-medium text-foreground text-center">
                              Testing kits to be sent out in Q1 to early registrants/Top referrers
                            </p>
                          </div>
                        </div>
                      )
                    })()}
                  </>
                ) : null}
              </>
            ) : !submitted ? (
              <>
                {step === 1 && (
                  !showSignin ? (
                    <form onSubmit={handleStep1Submit} className="space-y-4 sm:space-y-6">
                      <div className="mb-8 sm:mb-10">
                        <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed text-center">
                          Register now. Participate with family and create your genetic map that empowers future generations to take charge of their health and wellness.
                        </p>
                        <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed text-center mt-2">
                          Don't just join—lead the movement!
                        </p>
                      </div>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Full Name *</label>
                        <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className={`w-full glass-input ${errors.name ? 'border-red-500' : ''}`} />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Email Address *</label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" className={`w-full glass-input ${errors.email ? 'border-red-500' : ''}`} />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phoneLocal" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Phone Number *</label>
                        <div className="flex gap-2">
                          <div className="flex items-center px-3 h-9 rounded-md border border-border/30 bg-muted/20 text-sm text-muted-foreground whitespace-nowrap">
                            🇮🇳 +91
                          </div>
                          <Input
                            id="phoneLocal"
                            name="phoneLocal"
                            type="tel"
                            value={formData.phoneLocal}
                            onChange={handlePhoneLocalChange}
                            placeholder="98765 43210"
                            className={`flex-1 glass-input ${errors.phone ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label htmlFor="enteredReferralCode" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Referral Code (Optional)</label>
                        <Input 
                          id="enteredReferralCode" 
                          name="enteredReferralCode" 
                          type="text" 
                          value={enteredReferralCode} 
                          onChange={(e) => setEnteredReferralCode(e.target.value.trim())} 
                          placeholder="Enter referral code if you have one" 
                          className={`w-full glass-input ${enteredReferralCode ? 'border-primary/50' : ''}`}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {enteredReferralCode 
                            ? `Using referral code: ${enteredReferralCode}` 
                            : "Have a friend's code? Enter it to help them move up the queue!"}
                        </p>
                      </div>
                      <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 btn-glow hover:scale-[1.02] transition-all" disabled={loading}>
                        {loading ? 'Saving...' : 'Continue'}
                      </Button>
                      <div className="text-center">
                        <Button type="button" variant="outline" onClick={() => setShowSignin(true)} className="bg-transparent hover:scale-105 transition-transform">
                          Already have an account? Sign in
                        </Button>
                      </div>
                    </form>
                  ) : showForgotPassword && showResetConfirm ? (
                    <PasswordResetConfirmForm
                      email={forgotPasswordEmail}
                      onBack={() => {
                        setShowResetConfirm(false)
                        setShowForgotPassword(false)
                      }}
                      onResetSuccess={() => {
                        setShowResetConfirm(false)
                        setShowForgotPassword(false)
                      }}
                      auth={auth}
                    />
                  ) : showForgotPassword ? (
                    <PasswordResetRequestForm
                      onBack={() => setShowForgotPassword(false)}
                      onCodeSent={(email) => {
                        setForgotPasswordEmail(email)
                        setShowResetConfirm(true)
                      }}
                      auth={auth}
                    />
                  ) : unverifiedEmail ? (
                    <UnverifiedEmailScreen
                      email={unverifiedEmail}
                      onBack={() => setUnverifiedEmail('')}
                    />
                  ) : (
                    <SigninForm
                      auth={auth}
                      onSwitchToSignup={() => setShowSignin(false)}
                      onShowForgotPassword={() => setShowForgotPassword(true)}
                      onShowUnverifiedEmail={(email) => setUnverifiedEmail(email)}
                    />
                  )
                )}
                {step === 2 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-foreground tracking-tight">Shipping Address</h3>
                      <div>
                        <label htmlFor="addressLine1" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Address Line 1 *</label>
                        <Input id="addressLine1" name="addressLine1" type="text" value={formData.addressLine1} onChange={handleChange} placeholder="House No., Building Name" className={`w-full glass-input ${errors.addressLine1 ? 'border-red-500' : ''}`} />
                        {errors.addressLine1 && <p className="text-xs text-red-500 mt-1">{errors.addressLine1}</p>}
                      </div>
                      <div>
                        <label htmlFor="addressLine2" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Address Line 2</label>
                        <Input id="addressLine2" name="addressLine2" type="text" value={formData.addressLine2} onChange={handleChange} placeholder="Road, Area, Colony" className="w-full glass-input" />
                      </div>
                      <div>
                        <label htmlFor="addressCountry" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Country *</label>
                        <div className="flex items-center px-3 h-9 rounded-md border border-border/30 bg-muted/20 text-sm text-foreground">
                          🇮🇳 India
                        </div>
                        {errors.addressCountry && <p className="text-xs text-red-500 mt-1">{errors.addressCountry}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2 tracking-tight">City *</label>
                          <Input id="city" name="city" type="text" value={formData.city} onChange={handleChange} placeholder="Mumbai" className={`w-full glass-input ${errors.city ? 'border-red-500' : ''}`} />
                          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2 tracking-tight">State/Province *</label>
                          {STATES_BY_COUNTRY[formData.addressCountry] ? (
                            <select
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={(e) => {
                                setFormData({ ...formData, state: e.target.value })
                                if (errors.state) setErrors({ ...errors, state: '' })
                              }}
                              className={cn(
                                "file:text-foreground selection:bg-primary selection:text-primary-foreground glass-input h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                errors.state ? 'border-red-500' : ''
                              )}
                              aria-label="State/Province"
                            >
                              <option value="">Select state/province</option>
                              {STATES_BY_COUNTRY[formData.addressCountry].map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <Input id="state" name="state" type="text" value={formData.state} onChange={handleChange} placeholder="State/Province" className={`w-full glass-input ${errors.state ? 'border-red-500' : ''}`} />
                          )}
                          {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Pincode/ZIP Code *</label>
                        <Input id="pincode" name="pincode" type="text" value={formData.pincode} onChange={handleChange} placeholder="400001" className={`w-full glass-input ${errors.pincode ? 'border-red-500' : ''}`} />
                        {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                      </div>
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Age *</label>
                        <Input id="age" name="age" type="number" min="18" max="120" value={formData.age} onChange={handleChange} placeholder="Enter your age (18+)" className={`w-full glass-input ${errors.age ? 'border-red-500' : ''}`} />
                        {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-border/50">
                      <h3 className="text-lg font-medium text-foreground tracking-tight">Create Account Password</h3>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Password *</label>
                        <div className="relative">
                          <Input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Minimum 8 characters" className={`w-full glass-input pr-10 ${errors.password ? 'border-red-500' : ''}`} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2 tracking-tight">Confirm Password *</label>
                        <div className="relative">
                          <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" className={`w-full glass-input pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`} />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-border/50">
                      <h3 className="text-lg font-medium text-foreground tracking-tight">Required Consents</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Checkbox id="privacyPolicy" checked={formData.privacyPolicy} onCheckedChange={(checked) => handleCheckboxChange('privacyPolicy', checked as boolean)} className={errors.privacyPolicy ? 'border-red-500' : ''} />
                          <Label htmlFor="privacyPolicy" className="text-sm leading-relaxed cursor-pointer font-light hover:text-foreground transition-colors">
                            I have read and accept the{' '}
                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Privacy Policy</a>{' '}
                            *
                          </Label>
                        </div>
                        {errors.privacyPolicy && <p className="text-xs text-red-500">{errors.privacyPolicy}</p>}
                        <div className="flex items-start gap-3">
                          <Checkbox id="termsOfService" checked={formData.termsOfService} onCheckedChange={(checked) => handleCheckboxChange('termsOfService', checked as boolean)} className={errors.termsOfService ? 'border-red-500' : ''} />
                          <Label htmlFor="termsOfService" className="text-sm leading-relaxed cursor-pointer font-light hover:text-foreground transition-colors">
                            I have read and agree to the{' '}
                            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Terms of Service</a>{' '}
                            *
                          </Label>
                        </div>
                        {errors.termsOfService && <p className="text-xs text-red-500">{errors.termsOfService}</p>}
                        <div className="flex items-start gap-3">
                          <Checkbox id="dataUsagePolicy" checked={formData.dataUsagePolicy} onCheckedChange={(checked) => handleCheckboxChange('dataUsagePolicy', checked as boolean)} className={errors.dataUsagePolicy ? 'border-red-500' : ''} />
                          <Label htmlFor="dataUsagePolicy" className="text-sm leading-relaxed cursor-pointer font-light hover:text-foreground transition-colors">
                            I have read and accept the{' '}
                            <a href="/data-usage-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Data Usage Policy</a>{' '}
                            *
                          </Label>
                        </div>
                        {errors.dataUsagePolicy && <p className="text-xs text-red-500">{errors.dataUsagePolicy}</p>}
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-border/50">
                      <h3 className="text-lg font-medium text-foreground tracking-tight">Optional Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Checkbox id="researchConsent" checked={formData.researchConsent} onCheckedChange={(checked) => handleCheckboxChange('researchConsent', checked as boolean)} />
                          <Label htmlFor="researchConsent" className="text-sm leading-relaxed cursor-pointer font-light hover:text-foreground transition-colors">I agree to be contacted about participating in medical research studies</Label>
                        </div>
                        <div className="flex items-start gap-3">
                          <Checkbox id="marketingConsent" checked={formData.marketingConsent} onCheckedChange={(checked) => handleCheckboxChange('marketingConsent', checked as boolean)} />
                          <Label htmlFor="marketingConsent" className="text-sm leading-relaxed cursor-pointer font-light hover:text-foreground transition-colors">I agree to receive marketing communications and product updates</Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 hover:scale-105 transition-transform" disabled={loading}>Back</Button>
                      <Button type="submit" size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 btn-glow hover:scale-[1.02] transition-all" disabled={loading}>
                        {loading ? 'Saving...' : 'Join Waitlist'}
                      </Button>
                    </div>
                  </form>
                )}
                {step === 3 && (
                  <div className="space-y-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
                      <Mail className="w-10 h-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-medium text-foreground tracking-tight">Check Your Email</h3>
                      <p className="text-sm text-muted-foreground font-light max-w-md mx-auto">
                        We've sent a verification code to <span className="font-medium text-foreground">{formData.email}</span>. 
                        Please check your email and verify your account to complete registration.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleResendCode}
                        className="flex-1 hover:scale-105 transition-transform"
                      >
                        Resend Code
                      </Button>
                      <Button 
                        type="button"
                        onClick={() => {
                          setStep(1)
                          setShowSignin(true)
                        }}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 btn-glow hover:scale-[1.02] transition-all"
                      >
                        Go to Sign In
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground font-light max-w-md mx-auto">
                      Didn't receive the email? Check your spam folder or request a new code above.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div ref={successRef} className="text-center py-8 sm:py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
                  <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extralight text-foreground mb-3 tracking-tight">Welcome to Chiranjiv!</h3>
                <p className="text-sm sm:text-base text-muted-foreground font-light mb-8 max-w-md mx-auto">You're on the waitlist. We'll notify you when your kit is ready to ship.</p>
                <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-primary/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                  <p className="text-xs sm:text-sm text-muted-foreground font-light mb-3 tracking-tight">Your Referral Code</p>
                  <p className="text-3xl sm:text-4xl font-light text-primary font-mono tracking-tight mb-3">{referralCode}</p>
                  <p className="text-xs text-muted-foreground font-light">Share this code with friends to move up the waitlist</p>
                </div>
                <Button variant="outline" onClick={copyReferralMessage} className="w-full bg-transparent hover:scale-[1.02] transition-transform">Copy Referral Message</Button>
                <p className="text-xs text-muted-foreground font-light mt-6 max-w-md mx-auto leading-relaxed">
                  Message: "Join me on Project Chiranjiv - India&apos;s first free full-genome sequencing platform! Use my referral code {referralCode} to skip the queue."
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}


