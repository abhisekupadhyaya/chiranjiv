import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { postWaitlistStep1, postWaitlistStep2 } from '@/services/api'
import { signUpWithCognito, toFriendlyCognitoError, confirmSignUp, resendConfirmationCode } from '@/auth/cognito'
import { getRuntimeAuthConfig } from '@/auth/config'
import { useAuth } from '@/auth'

export function Waitlist() {
  const auth = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    privacyPolicy: false,
    termsOfService: false,
    dataUsagePolicy: false,
    researchConsent: false,
    marketingConsent: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [referralCode, setReferralCode] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)
  const [showSignin, setShowSignin] = useState(false)
  const [signinData, setSigninData] = useState({ email: '', password: '' })
  const [confirmCode, setConfirmCode] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [confirmError, setConfirmError] = useState('')

  useEffect(() => {
    if (auth.user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || (auth.user?.name as string) || '',
        email: prev.email || (auth.user?.email as string) || '',
        phone: prev.phone || (auth.user?.phone_number as string) || '',
      }))
    }
  }, [auth.user])

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setLoading(true)
    setErrors({})
    try {
      const { ok, status, data } = await postWaitlistStep1({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      })
      if (!ok) {
        if (status === 409 && (data as any).canContinue && (data as any).userId) {
          setUserId((data as any).userId)
          setStep(2)
        } else {
          setErrors({ email: (data as any).error || 'Failed to save information' })
        }
        setLoading(false)
        return
      }
      setUserId((data as any).userId)
      setStep(2)
    } catch (error) {
      setErrors({ email: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'
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
    if (!userId) {
      setErrors({ email: 'Please complete step 1 first' })
      return
    }
    setLoading(true)
    setErrors({})
    try {
      const { ok, data } = await postWaitlistStep2({
        userId,
        password: formData.password,
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2.trim() || null,
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        privacyPolicy: formData.privacyPolicy,
        termsOfService: formData.termsOfService,
        dataUsagePolicy: formData.dataUsagePolicy,
        researchConsent: formData.researchConsent,
        marketingConsent: formData.marketingConsent,
      } as any)
      if (!ok) {
        setErrors({ email: (data as any).error || 'Failed to save information' })
        setLoading(false)
        return
      }
      // Create Cognito user without Hosted UI
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

        const doSignup = async (attrs: Record<string, string>) =>
        await signUpWithCognito({
          email: formData.email.trim(),
          password: formData.password,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
            userAttributes: attrs,
        })

        try {
          await doSignup(userAttributes)
        } catch (err: any) {
          const msg = String(err?.message || '')
          const code = err?.name
          // If pool does not have the standard "address" attribute enabled, retry without it
          if (code === 'InvalidParameterException' && /address/i.test(msg) && /not defined/i.test(msg)) {
            await doSignup({})
          } else {
            throw err
          }
        }
      } catch (err: any) {
        // Log full error for diagnostics
        // eslint-disable-next-line no-console
        console.error('Cognito SignUp error:', err)
        if (err?.name === 'UsernameExistsException') {
          setStep(3)
          setErrors({
            email:
              'An account with this email already exists. If unverified, enter the code below. Otherwise, try signing in.',
          })
          setLoading(false)
          return
        } else {
        const message = toFriendlyCognitoError(err)
        setErrors({ email: message })
        setLoading(false)
        return
        }
      }
      // Move to confirmation step
      setStep(3)
      setReferralCode(data.referralCode)
      try {
        window.localStorage.setItem('cjv_referral_code', data.referralCode || '')
      } catch {
        // ignore storage failures
      }
      return
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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value })
  }

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signinData.email || !signinData.password) {
      setErrors({ email: 'Please enter email and password to sign in' })
      return
    }
    try {
      await auth.signIn(signinData.email.trim(), signinData.password)
    } catch (err: any) {
      setErrors({ email: toFriendlyCognitoError(err) })
    }
  }

  const copyReferralMessage = () => {
    const message = `Join me on Project Chiranjiv - India's first free full-genome sequencing platform! Use my referral code ${referralCode} to skip the queue. https://chiranjiv.com`
    navigator.clipboard.writeText(message)
  }

  const handleConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmError('')
    if (!confirmCode.trim()) {
      setConfirmError('Enter the verification code sent to your email')
      return
    }
    setConfirming(true)
    try {
      await confirmSignUp(formData.email.trim(), confirmCode.trim())
      // Auto sign-in after confirmation
      await auth.signIn(formData.email.trim(), formData.password)
      setSubmitted(true)
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    } catch (err: any) {
      setConfirmError(toFriendlyCognitoError(err))
    } finally {
      setConfirming(false)
    }
  }

  const handleResendCode = async () => {
    setConfirmError('')
    try {
      await resendConfirmationCode(formData.email.trim())
      setConfirmError('Verification code resent. Please check your email.')
    } catch (err: any) {
      setConfirmError(toFriendlyCognitoError(err))
    }
  }

  return (
    <section id="waitlist" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Earn Early Access</h2>
            <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed">
              Join the waitlist. Share your unique referral code to skip the queue. The more friends who sign up, the
              faster you move up.
            </p>
          </div>
          <Card className="p-6 sm:p-8 bg-card border-border shadow-xl">
            {auth.user ? (
              <div className="mb-6 rounded-md border border-border p-4 bg-muted/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 text-sm">
                    <div className="font-medium text-foreground">Signed in</div>
                    <div className="text-muted-foreground">Name: {auth.user?.name || '—'}</div>
                    <div className="text-muted-foreground">Email: {auth.user?.email || '—'}</div>
                    <div className="text-muted-foreground">Phone: {auth.user?.phone_number || '—'}</div>
                  </div>
                  <Button variant="outline" onClick={auth.signOut}>Sign out</Button>
                </div>
              </div>
            ) : !submitted ? (
              <>
                {step === 1 && (
                  !showSignin ? (
                    <form onSubmit={handleStep1Submit} className="space-y-4 sm:space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                        <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className={`w-full ${errors.name ? 'border-red-500' : ''}`} />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" className={`w-full ${errors.email ? 'border-red-500' : ''}`} />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block textsm font-medium text-foreground mb-2">Phone Number *</label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={`w-full ${errors.phone ? 'border-red-500' : ''}`} />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                      <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
                        {loading ? 'Saving...' : 'Continue'}
                      </Button>
                      <div className="text-center">
                        <Button type="button" variant="outline" onClick={() => setShowSignin(true)} className="bg-transparent">
                          Already have an account? Sign in
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleSigninSubmit} className="space-y-4 sm:space-y-6">
                      <div>
                        <label htmlFor="signinEmail" className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <Input id="signinEmail" name="email" type="email" value={signinData.email} onChange={handleSigninChange} placeholder="your.email@example.com" className="w-full" />
                      </div>
                      <div>
                        <label htmlFor="signinPassword" className="block text-sm font-medium text-foreground mb-2">Password</label>
                        <Input id="signinPassword" name="password" type="password" value={signinData.password} onChange={handleSigninChange} placeholder="Your password" className="w-full" />
                      </div>
                      <Button type="submit" className="w-full">
                        Sign in
                      </Button>
                      {auth.user && <p className="text-xs text-green-600">Signed in</p>}
                      <div className="text-center">
                        <Button type="button" variant="outline" onClick={() => setShowSignin(false)} className="bg-transparent">
                          New here? Sign up
                        </Button>
                      </div>
                    </form>
                  )
                )}
                {step === 2 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Shipping Address</h3>
                      <div>
                        <label htmlFor="addressLine1" className="block text-sm font-medium text-foreground mb-2">Address Line 1 *</label>
                        <Input id="addressLine1" name="addressLine1" type="text" value={formData.addressLine1} onChange={handleChange} placeholder="House No., Building Name" className={`w-full ${errors.addressLine1 ? 'border-red-500' : ''}`} />
                        {errors.addressLine1 && <p className="text-xs text-red-500 mt-1">{errors.addressLine1}</p>}
                      </div>
                      <div>
                        <label htmlFor="addressLine2" className="block text-sm font-medium text-foreground mb-2">Address Line 2</label>
                        <Input id="addressLine2" name="addressLine2" type="text" value={formData.addressLine2} onChange={handleChange} placeholder="Road, Area, Colony" className="w-full" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">City *</label>
                          <Input id="city" name="city" type="text" value={formData.city} onChange={handleChange} placeholder="Mumbai" className={`w-full ${errors.city ? 'border-red-500' : ''}`} />
                          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">State *</label>
                          <Input id="state" name="state" type="text" value={formData.state} onChange={handleChange} placeholder="Maharashtra" className={`w-full ${errors.state ? 'border-red-500' : ''}`} />
                          {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-foreground mb-2">Pincode *</label>
                        <Input id="pincode" name="pincode" type="text" value={formData.pincode} onChange={handleChange} placeholder="400001" className={`w-full ${errors.pincode ? 'border-red-500' : ''}`} />
                        {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground">Create Account Password</h3>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">Password *</label>
                        <div className="relative">
                          <Input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Minimum 8 characters" className={`w-full pr-10 ${errors.password ? 'border-red-500' : ''}`} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">Confirm Password *</label>
                        <div className="relative">
                          <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" className={`w-full pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`} />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground">Required Consents</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Checkbox id="privacyPolicy" checked={formData.privacyPolicy} onCheckedChange={(checked) => handleCheckboxChange('privacyPolicy', checked as boolean)} className={errors.privacyPolicy ? 'border-red-500' : ''} />
                          <Label htmlFor="privacyPolicy" className="text-sm leading-relaxed cursor-pointer">
                            I have read and accept the{' '}
                            <a href="/privacy/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>{' '}
                            *
                          </Label>
                        </div>
                        {errors.privacyPolicy && <p className="text-xs text-red-500">{errors.privacyPolicy}</p>}
                        <div className="flex items-start gap-3">
                          <Checkbox id="termsOfService" checked={formData.termsOfService} onCheckedChange={(checked) => handleCheckboxChange('termsOfService', checked as boolean)} className={errors.termsOfService ? 'border-red-500' : ''} />
                          <Label htmlFor="termsOfService" className="text-sm leading-relaxed cursor-pointer">
                            I have read and agree to the{' '}
                            <a href="/privacy/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Terms of Service</a>{' '}
                            *
                          </Label>
                        </div>
                        {errors.termsOfService && <p className="text-xs text-red-500">{errors.termsOfService}</p>}
                        <div className="flex items-start gap-3">
                          <Checkbox id="dataUsagePolicy" checked={formData.dataUsagePolicy} onCheckedChange={(checked) => handleCheckboxChange('dataUsagePolicy', checked as boolean)} className={errors.dataUsagePolicy ? 'border-red-500' : ''} />
                          <Label htmlFor="dataUsagePolicy" className="text-sm leading-relaxed cursor-pointer">
                            I have read and accept the{' '}
                            <a href="/privacy/data-usage-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Data Usage Policy</a>{' '}
                            *
                          </Label>
                        </div>
                        {errors.dataUsagePolicy && <p className="text-xs text-red-500">{errors.dataUsagePolicy}</p>}
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground">Optional Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Checkbox id="researchConsent" checked={formData.researchConsent} onCheckedChange={(checked) => handleCheckboxChange('researchConsent', checked as boolean)} />
                          <Label htmlFor="researchConsent" className="text-sm leading-relaxed cursor-pointer">I agree to be contacted about participating in medical research studies</Label>
                        </div>
                        <div className="flex items-start gap-3">
                          <Checkbox id="marketingConsent" checked={formData.marketingConsent} onCheckedChange={(checked) => handleCheckboxChange('marketingConsent', checked as boolean)} />
                          <Label htmlFor="marketingConsent" className="text-sm leading-relaxed cursor-pointer">I agree to receive marketing communications and product updates</Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1" disabled={loading}>Back</Button>
                      <Button type="submit" size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
                        {loading ? 'Saving...' : 'Join Waitlist'}
                      </Button>
                    </div>
                  </form>
                )}
                {step === 3 && (
                  <form onSubmit={handleConfirmSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">Verify your email</h3>
                      <p className="text-sm text-muted-foreground">We sent a 6-digit code to {formData.email}. Enter it below to confirm your account.</p>
                    </div>
                    <div>
                      <label htmlFor="verificationCode" className="block text-sm font-medium text-foreground mb-2">Verification Code</label>
                      <Input id="verificationCode" name="verificationCode" type="text" value={confirmCode} onChange={(e) => setConfirmCode(e.target.value)} placeholder="Enter the 6-digit code" className={`w-full ${confirmError ? 'border-red-500' : ''}`} />
                      {confirmError && <p className="text-xs text-red-500 mt-1">{confirmError}</p>}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button type="button" variant="outline" onClick={handleResendCode} disabled={confirming}>Resend Code</Button>
                      <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={confirming}>
                        {confirming ? 'Confirming...' : 'Confirm Account'}
                      </Button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <div ref={successRef} className="text-center py-6 sm:py-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Welcome to Chiranjiv!</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">You're on the waitlist. We'll notify you when your kit is ready to ship.</p>
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">Your Referral Code</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary font-mono">{referralCode}</p>
                  <p className="text-xs text-muted-foreground mt-2">Share this code with friends to move up the waitlist</p>
                </div>
                <Button variant="outline" onClick={copyReferralMessage} className="w-full bg-transparent">Copy Referral Message</Button>
                <p className="text-xs text-muted-foreground mt-6">
                  Message: "Join me on Project Chiranjiv - India&apos;s first free full-genome sequencing platform! Use my referral code {referralCode} to skip the queue."
                </p>
              </div>
            )}
          </Card>
          {!submitted && (
            <div className="grid grid-cols-3 gap-4 mt-8 sm:mt-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">10K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">On Waitlist</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1">2.5K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Kits Shipped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">98%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


