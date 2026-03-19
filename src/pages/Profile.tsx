import { useState, useEffect } from 'react';
import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Trophy, Share2, TrendingUp, Copy, MessageCircle, Mail, Facebook, Linkedin } from 'lucide-react';
import { getWaitlistRank, getWaitlistStats, type WaitlistRankResponse } from '@/services/api';
import { cn } from '@/lib/utils';

// Types
type Tier = 'gold' | 'silver' | 'bronze' | 'default';

interface GamificationMetrics {
  tier: Tier;
  tierName: string;
  percentile: number;
  estimatedJump: number;
  nextMilestone: { name: string; required: number; current: number } | null;
  tierColors: { from: string; via: string; to: string; glow: string };
}

// Constants
const ACHIEVEMENTS = [
  { id: 'early-bird', name: 'Early Bird', icon: '🐦', requirement: { type: 'rank', value: 1000 }, description: 'Top 1000 signups' },
  { id: 'influencer', name: 'Influencer', icon: '⭐', requirement: { type: 'referrals', value: 5 }, description: '5+ referrals' },
  { id: 'ambassador', name: 'Ambassador', icon: '🏆', requirement: { type: 'referrals', value: 10 }, description: '10+ referrals' },
  { id: 'champion', name: 'Champion', icon: '👑', requirement: { type: 'referrals', value: 25 }, description: '25+ referrals' },
];

// Helper Functions
const getTierInfo = (percentile: number): { tier: Tier; name: string; colors: { from: string; via: string; to: string; glow: string } } => {
  if (percentile >= 99) {
    return {
      tier: 'gold',
      name: 'Gold Tier',
      colors: { from: 'from-yellow-400', via: 'via-amber-500', to: 'to-orange-600', glow: 'shadow-yellow-500/50' }
    };
  } else if (percentile >= 95) {
    return {
      tier: 'silver',
      name: 'Silver Tier',
      colors: { from: 'from-gray-300', via: 'via-slate-400', to: 'to-gray-500', glow: 'shadow-gray-400/50' }
    };
  } else if (percentile >= 80) {
    return {
      tier: 'bronze',
      name: 'Bronze Tier',
      colors: { from: 'from-orange-400', via: 'via-amber-600', to: 'to-yellow-700', glow: 'shadow-orange-500/50' }
    };
  }
  return {
    tier: 'default',
    name: 'Rising Star',
    colors: { from: 'from-primary', via: 'via-primary', to: 'to-primary', glow: 'shadow-primary/50' }
  };
};

const calculateGamificationMetrics = (rank: number, totalUsers: number, referralsCount: number): GamificationMetrics => {
  const percentile = ((rank) / totalUsers) * 100;
  const tierInfo = getTierInfo(percentile);
  
  // Estimate jump: assume each referral moves you up by ~sqrt(totalUsers/100) positions
  const estimatedJump = Math.max(5, Math.floor(Math.sqrt(totalUsers / 100)));
  
  // Find next milestone
  let nextMilestone = null;
  for (const achievement of ACHIEVEMENTS) {
    if (achievement.requirement.type === 'referrals' && referralsCount < achievement.requirement.value) {
      nextMilestone = {
        name: achievement.name,
        required: achievement.requirement.value,
        current: referralsCount
      };
      break;
    }
  }
  
  return {
    tier: tierInfo.tier,
    tierName: tierInfo.name,
    percentile,
    estimatedJump,
    nextMilestone,
    tierColors: tierInfo.colors
  };
};

// Sub-components
interface CircularRankProgressProps {
  rank: number;
  totalUsers: number;
  tierColors: { from: string; via: string; to: string; glow: string };
  percentile: number;
}

const CircularRankProgress = ({ rank, totalUsers, tierColors, percentile }: CircularRankProgressProps) => {
  const [mounted, setMounted] = useState(false);
  const progress = 100 - percentile;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = mounted ? circumference - (progress / 100) * circumference : circumference;

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

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
          {/* Progress circle */}
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
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: 'up' | 'down';
  highlight?: boolean;
}

const StatCard = ({ icon, label, value, trend, highlight }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'number' ? value : parseInt(String(value).replace(/,/g, '')) || 0;

  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1500;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(numericValue);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [numericValue, value]);

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
  );
};

interface ShareButtonGridProps {
  referralUrl: string;
  showReferralLink?: boolean;
}

const ShareButtonGrid = ({ referralUrl, showReferralLink = true }: ShareButtonGridProps) => {
  const [copied, setCopied] = useState(false);
  
  // Build message parts
  const messageParts = [
    'Claim your FREE Genome Test and unlock actionable insights for your fitness, lifestyle, and long-term health (worth ₹1.5L in value).',
    'Participate with family and create your genetic map that empowers future generations to take charge of their health and wellness.',
    "Here's how you can lead the movement:",
    '1 Register for yourself, your family, and friends.',
    '2 Share your unique referral link in your groups.',
    '3 Invite more → Jump the queue faster for free testing and priority reports!',
    referralUrl
  ];
  
  // Create formatted message with proper line breaks for each platform
  const formattedMessage = messageParts.map(part => encodeURIComponent(part)).join('%0A%0A');

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
  ];

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
  );
};

const Profile = () => {
  const { user, userAttributes, logout } = useAuth();
  const [rankData, setRankData] = useState<WaitlistRankResponse | null>(null);
  const [waitlistStats, setWaitlistStats] = useState({ totalUsers: 0, totalReferrals: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [referralLinkCopied, setReferralLinkCopied] = useState(false);

  useEffect(() => {
    // Fetch waitlist stats on mount
    const fetchStats = async () => {
      try {
        const result = await getWaitlistStats();
        if (result.ok && 'totalUsers' in result.data) {
          setWaitlistStats(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch waitlist stats:', error);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    // Fetch rank data when user is logged in
    const userSub = user?.userId; // Using userId as it maps to cognito sub typically
    if (userSub) {
      const fetchRank = async () => {
        setLoading(true);
        setError('');
        try {
          const { ok, data } = await getWaitlistRank(userSub);
          if (ok && 'rank' in data) {
            setRankData(data);
          } else {
            setError((data as any).error || 'Failed to load rank');
          }
        } catch (error) {
          setError('Failed to load rank information');
        } finally {
          setLoading(false);
        }
      };
      fetchRank();
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Fixed Full-Screen Background Overlay - Very Subtle Tint */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary/2 via-secondary/2 to-accent/2 pointer-events-none" />
      
      {/* Floating Blobs - Vibrant and Distinct (Consistent with Home.tsx) */}
      <div className="fixed top-1/4 left-[60%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0" />
      <div 
        className="fixed bottom-1/4 right-0 w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0"
        style={{ animationDelay: '2s' }} 
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-light tracking-tight text-foreground">My Profile</h1>
            <Button variant="outline" onClick={logout} className="hover:scale-105 transition-transform">
              Sign Out
            </Button>
          </div>
          <p className="text-muted-foreground">Manage your account and track your waitlist status</p>
        </div>

        {/* User Details Card */}
        <Card className="mb-8 backdrop-blur-sm bg-white/50 dark:bg-black/20 border-white/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Full Name</p>
                <p className="text-base font-medium">{userAttributes?.name || 'User'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Email Address</p>
                <div className="flex items-center gap-2">
                  <p className="text-base font-mono">{userAttributes?.email || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Waitlist Dashboard */}
        <Card className="p-6 sm:p-8 md:p-10 glass-backdrop glass-border-refractive rounded-3xl shadow-2xl border-border/50 backdrop-blur-sm transition-all duration-300 min-h-[400px]">
          
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-light text-foreground mb-2">
              Share your referral link with friends, family, or fitness groups
            </h2>
          </div>

          {/* Always visible announcement text */}
          <div className="relative text-left mb-8">
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
              The more people you invite, the faster you move up! Jump the queue for priority testing and report by spreading the word.
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center animate-in fade-in duration-500">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary mb-4"></div>
              <div className="text-sm text-muted-foreground font-light">Loading your dashboard...</div>
            </div>
          ) : error ? (
            <div className="py-8 px-6 rounded-2xl border border-red-500/30 bg-red-500/10 animate-in fade-in duration-500 text-center">
              <div className="text-sm text-red-500 font-light">{error}</div>
            </div>
          ) : rankData ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Referral Link Input (above ring) */}
              <div className="w-full space-y-2">
                <label className="text-sm font-medium text-foreground tracking-tight">Your Referral Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://health.chiranjiv.com/?ref=${rankData.referralCode}`}
                    className="flex-1 glass-input px-4 py-2.5 text-sm font-mono text-foreground rounded-lg border border-border/30 bg-background/50"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={async () => {
                      await navigator.clipboard.writeText(`https://health.chiranjiv.com/?ref=${rankData.referralCode}`);
                      setReferralLinkCopied(true);
                      setTimeout(() => setReferralLinkCopied(false), 2000);
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

              {/* Ring + Stats Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Hero Circular Rank Display */}
                <div className="relative">
                  <CircularRankProgress
                    rank={rankData.rank}
                    totalUsers={rankData.totalUsers}
                    tierColors={calculateGamificationMetrics(rankData.rank, rankData.totalUsers, rankData.referralsCount).tierColors}
                    percentile={calculateGamificationMetrics(rankData.rank, rankData.totalUsers, rankData.referralsCount).percentile}
                  />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
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
                  <StatCard
                    icon={<Users className="w-5 h-5" />}
                    label="On Waitlist"
                    value={rankData.totalUsers}
                  />
                  <StatCard
                    icon={<Share2 className="w-5 h-5" />}
                    label="Total Referrals"
                    value={waitlistStats.totalReferrals}
                  />
                </div>
              </div>

              {/* Social Share Buttons (below ring) */}
              <div className="max-w-2xl mx-auto w-full">
                <ShareButtonGrid referralUrl={`https://chiranjiv.com/?ref=${rankData.referralCode}`} showReferralLink={false} />
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No waitlist data available.
            </div>
          )}

          {/* Always visible timeline banner */}
          <div className="text-center pt-8 mt-8 border-t border-border/20">
            <p className="text-sm font-medium text-muted-foreground/80">
              Testing to start in Q1 for early registrants and top referrers
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
