import { useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { postWaitlistSignup, getWaitlistRank, type WaitlistSignupRequest, type WaitlistRankResponse } from '@/services/api'
import { signUpWithCognito, toFriendlyCognitoError, confirmSignUp, resendConfirmationCode } from '@/auth/cognito'
import { getRuntimeAuthConfig } from '@/auth/config'
import { useAuth } from '@/auth'
import { cn } from '@/lib/utils'

const COUNTRY_CODES = [
  { label: '🇮🇳 +91', value: '+91' },
  { label: '🇺🇸 +1', value: '+1' },
  { label: '🇬🇧 +44', value: '+44' },
  { label: '🇨🇦 +1', value: '+1' },
  { label: '🇦🇺 +61', value: '+61' },
  { label: '🇩🇪 +49', value: '+49' },
  { label: '🇫🇷 +33', value: '+33' },
  { label: '🇮🇹 +39', value: '+39' },
  { label: '🇪🇸 +34', value: '+34' },
  { label: '🇳🇱 +31', value: '+31' },
  { label: '🇧🇪 +32', value: '+32' },
  { label: '🇨🇭 +41', value: '+41' },
  { label: '🇦🇹 +43', value: '+43' },
  { label: '🇸🇪 +46', value: '+46' },
  { label: '🇳🇴 +47', value: '+47' },
  { label: '🇩🇰 +45', value: '+45' },
  { label: '🇫🇮 +358', value: '+358' },
  { label: '🇵🇱 +48', value: '+48' },
  { label: '🇬🇷 +30', value: '+30' },
  { label: '🇵🇹 +351', value: '+351' },
  { label: '🇮🇪 +353', value: '+353' },
  { label: '🇷🇺 +7', value: '+7' },
  { label: '🇹🇷 +90', value: '+90' },
  { label: '🇸🇦 +966', value: '+966' },
  { label: '🇦🇪 +971', value: '+971' },
  { label: '🇮🇱 +972', value: '+972' },
  { label: '🇰🇼 +965', value: '+965' },
  { label: '🇶🇦 +974', value: '+974' },
  { label: '🇧🇭 +973', value: '+973' },
  { label: '🇴🇲 +968', value: '+968' },
  { label: '🇯🇴 +962', value: '+962' },
  { label: '🇱🇧 +961', value: '+961' },
  { label: '🇪🇬 +20', value: '+20' },
  { label: '🇿🇦 +27', value: '+27' },
  { label: '🇳🇬 +234', value: '+234' },
  { label: '🇰🇪 +254', value: '+254' },
  { label: '🇨🇳 +86', value: '+86' },
  { label: '🇯🇵 +81', value: '+81' },
  { label: '🇰🇷 +82', value: '+82' },
  { label: '🇸🇬 +65', value: '+65' },
  { label: '🇲🇾 +60', value: '+60' },
  { label: '🇹🇭 +66', value: '+66' },
  { label: '🇵🇭 +63', value: '+63' },
  { label: '🇻🇳 +84', value: '+84' },
  { label: '🇮🇩 +62', value: '+62' },
  { label: '🇭🇰 +852', value: '+852' },
  { label: '🇹🇼 +886', value: '+886' },
  { label: '🇲🇴 +853', value: '+853' },
  { label: '🇧🇩 +880', value: '+880' },
  { label: '🇵🇰 +92', value: '+92' },
  { label: '🇱🇰 +94', value: '+94' },
  { label: '🇳🇵 +977', value: '+977' },
  { label: '🇧🇹 +975', value: '+975' },
  { label: '🇦🇫 +93', value: '+93' },
  { label: '🇲🇲 +95', value: '+95' },
  { label: '🇳🇿 +64', value: '+64' },
  { label: '🇫🇯 +679', value: '+679' },
  { label: '🇵🇬 +675', value: '+675' },
  { label: '🇧🇷 +55', value: '+55' },
  { label: '🇲🇽 +52', value: '+52' },
  { label: '🇦🇷 +54', value: '+54' },
  { label: '🇨🇱 +56', value: '+56' },
  { label: '🇨🇴 +57', value: '+57' },
  { label: '🇵🇪 +51', value: '+51' },
  { label: '🇻🇪 +58', value: '+58' },
  { label: '🇪🇨 +593', value: '+593' },
  { label: '🇧🇴 +591', value: '+591' },
  { label: '🇵🇾 +595', value: '+595' },
  { label: '🇺🇾 +598', value: '+598' },
  { label: '🇵🇦 +507', value: '+507' },
  { label: '🇨🇷 +506', value: '+506' },
  { label: '🇬🇹 +502', value: '+502' },
  { label: '🇭🇳 +504', value: '+504' },
  { label: '🇳🇮 +505', value: '+505' },
  { label: '🇸🇻 +503', value: '+503' },
  { label: '🇩🇴 +1', value: '+1' },
  { label: '🇨🇺 +53', value: '+53' },
  { label: '🇯🇲 +1', value: '+1' },
  { label: '🇹🇹 +1', value: '+1' },
  { label: '🇧🇧 +1', value: '+1' },
]

const toE164 = (countryCode: string, localNumber: string): string => {
  const digitsOnly = localNumber.replace(/\D/g, '')
  return countryCode + digitsOnly
}

const parseE164 = (phone: string): { countryCode: string; localNumber: string } | null => {
  if (!phone || !phone.startsWith('+')) return null
  for (const country of COUNTRY_CODES) {
    if (phone.startsWith(country.value)) {
      return {
        countryCode: country.value,
        localNumber: phone.slice(country.value.length).trim(),
      }
    }
  }
  return { countryCode: '+91', localNumber: phone.slice(1).trim() }
}

const ADDRESS_COUNTRIES = [
  { label: 'India', value: 'IN' },
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Canada', value: 'CA' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Italy', value: 'IT' },
  { label: 'Spain', value: 'ES' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'Belgium', value: 'BE' },
  { label: 'Switzerland', value: 'CH' },
  { label: 'Austria', value: 'AT' },
  { label: 'Sweden', value: 'SE' },
  { label: 'Norway', value: 'NO' },
  { label: 'Denmark', value: 'DK' },
  { label: 'Finland', value: 'FI' },
  { label: 'Poland', value: 'PL' },
  { label: 'Greece', value: 'GR' },
  { label: 'Portugal', value: 'PT' },
  { label: 'Ireland', value: 'IE' },
  { label: 'Russia', value: 'RU' },
  { label: 'Turkey', value: 'TR' },
  { label: 'Saudi Arabia', value: 'SA' },
  { label: 'United Arab Emirates', value: 'AE' },
  { label: 'Israel', value: 'IL' },
  { label: 'China', value: 'CN' },
  { label: 'Japan', value: 'JP' },
  { label: 'South Korea', value: 'KR' },
  { label: 'Singapore', value: 'SG' },
  { label: 'Malaysia', value: 'MY' },
  { label: 'Thailand', value: 'TH' },
  { label: 'Philippines', value: 'PH' },
  { label: 'Vietnam', value: 'VN' },
  { label: 'Indonesia', value: 'ID' },
  { label: 'Bangladesh', value: 'BD' },
  { label: 'Pakistan', value: 'PK' },
  { label: 'Sri Lanka', value: 'LK' },
  { label: 'Nepal', value: 'NP' },
  { label: 'Brazil', value: 'BR' },
  { label: 'Mexico', value: 'MX' },
  { label: 'Argentina', value: 'AR' },
  { label: 'Chile', value: 'CL' },
  { label: 'Colombia', value: 'CO' },
  { label: 'Peru', value: 'PE' },
  { label: 'South Africa', value: 'ZA' },
  { label: 'New Zealand', value: 'NZ' },
  { label: 'Other', value: 'OTHER' },
]

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
  const [submitted, setSubmitted] = useState(false)
  const [referralCode, setReferralCode] = useState('')
  const [enteredReferralCode, setEnteredReferralCode] = useState('')
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
  const [rankData, setRankData] = useState<WaitlistRankResponse | null>(null)
  const [rankLoading, setRankLoading] = useState(false)
  const [rankError, setRankError] = useState('')

  useEffect(() => {
    if (auth.user) {
      const userPhone = auth.user?.phone_number as string
      const parsed = userPhone ? parseE164(userPhone) : null
      setFormData((prev) => ({
        ...prev,
        name: prev.name || (auth.user?.name as string) || '',
        email: prev.email || (auth.user?.email as string) || '',
        countryCode: parsed?.countryCode || prev.countryCode || '+91',
        phoneLocal: parsed?.localNumber || prev.phoneLocal || '',
      }))
    }
  }, [auth.user])

  // Auto-fill referral code from URL query parameter
  useEffect(() => {
    const refParam = searchParams.get('ref')
    if (refParam && refParam.trim()) {
      setEnteredReferralCode(refParam.trim())
    }
  }, [searchParams])

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
    if (!formData.phoneLocal.trim()) newErrors.phone = 'Phone number is required'
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
    if (!formData.age.trim() || isNaN(age) || age < 1 || age > 120) {
      newErrors.age = 'Please enter a valid age (1-120)'
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
      // Create Cognito user without Hosted UI
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
      const signupResponse = data as any
      setReferralCode(signupResponse.referralCode)
      try {
        window.localStorage.setItem('cjv_referral_code', signupResponse.referralCode || '')
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
  
  const handlePhoneLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phoneLocal: e.target.value })
    if (errors.phone) setErrors({ ...errors, phone: '' })
  }
  
  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, countryCode: e.target.value })
    if (errors.phone) setErrors({ ...errors, phone: '' })
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
              <>
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
                {rankLoading ? (
                  <div className="mb-6 rounded-md border border-border p-4 bg-muted/30">
                    <div className="text-sm text-muted-foreground">Loading waitlist information...</div>
                  </div>
                ) : rankError ? (
                  <div className="mb-6 rounded-md border border-border p-4 bg-muted/30">
                    <div className="text-sm text-red-500">{rankError}</div>
                  </div>
                ) : rankData ? (
                  <div className="mb-6 rounded-md border border-border p-4 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="space-y-2">
                      <div className="font-semibold text-foreground text-base">Waitlist Status</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Your Rank</div>
                          <div className="text-2xl font-bold text-primary">#{rankData.rank}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Total Users</div>
                          <div className="text-2xl font-bold text-secondary">{rankData.totalUsers}</div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-border/50">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Successful Referrals:</span>
                          <span className="font-semibold text-foreground">{rankData.referralsCount}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mt-1">
                          <span className="text-muted-foreground">Your Referral Code:</span>
                          <span className="font-mono font-semibold text-primary">{rankData.referralCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
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
                        <label htmlFor="phoneLocal" className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                        <div className="flex gap-2">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleCountryCodeChange}
                            className={cn(
                              "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-28 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                              errors.phone ? 'border-red-500' : ''
                            )}
                            aria-label="Country code"
                          >
                            {COUNTRY_CODES.map((country, idx) => (
                              <option key={`${country.value}-${idx}`} value={country.value}>
                                {country.label}
                              </option>
                            ))}
                          </select>
                          <Input
                            id="phoneLocal"
                            name="phoneLocal"
                            type="tel"
                            value={formData.phoneLocal}
                            onChange={handlePhoneLocalChange}
                            placeholder="98765 43210"
                            className={`flex-1 ${errors.phone ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label htmlFor="enteredReferralCode" className="block text-sm font-medium text-foreground mb-2">Referral Code (Optional)</label>
                        <Input 
                          id="enteredReferralCode" 
                          name="enteredReferralCode" 
                          type="text" 
                          value={enteredReferralCode} 
                          onChange={(e) => setEnteredReferralCode(e.target.value.trim())} 
                          placeholder="Enter referral code if you have one" 
                          className={`w-full ${enteredReferralCode ? 'border-primary/50' : ''}`}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {enteredReferralCode 
                            ? `Using referral code: ${enteredReferralCode}` 
                            : "Have a friend's code? Enter it to help them move up the queue!"}
                        </p>
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
                      <div>
                        <label htmlFor="addressCountry" className="block text-sm font-medium text-foreground mb-2">Country *</label>
                        <select
                          id="addressCountry"
                          name="addressCountry"
                          value={formData.addressCountry}
                          onChange={(e) => {
                            setFormData({ ...formData, addressCountry: e.target.value, state: '' })
                            if (errors.addressCountry) setErrors({ ...errors, addressCountry: '' })
                            if (errors.state) setErrors({ ...errors, state: '' })
                          }}
                          className={cn(
                            "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                            errors.addressCountry ? 'border-red-500' : ''
                          )}
                          aria-label="Country"
                        >
                          {ADDRESS_COUNTRIES.map((country) => (
                            <option key={country.value} value={country.value}>
                              {country.label}
                            </option>
                          ))}
                        </select>
                        {errors.addressCountry && <p className="text-xs text-red-500 mt-1">{errors.addressCountry}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">City *</label>
                          <Input id="city" name="city" type="text" value={formData.city} onChange={handleChange} placeholder="Mumbai" className={`w-full ${errors.city ? 'border-red-500' : ''}`} />
                          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">State/Province *</label>
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
                                "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
                            <Input id="state" name="state" type="text" value={formData.state} onChange={handleChange} placeholder="State/Province" className={`w-full ${errors.state ? 'border-red-500' : ''}`} />
                          )}
                          {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-foreground mb-2">Pincode/ZIP Code *</label>
                        <Input id="pincode" name="pincode" type="text" value={formData.pincode} onChange={handleChange} placeholder="400001" className={`w-full ${errors.pincode ? 'border-red-500' : ''}`} />
                        {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                      </div>
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-foreground mb-2">Age *</label>
                        <Input id="age" name="age" type="number" min="1" max="120" value={formData.age} onChange={handleChange} placeholder="Enter your age" className={`w-full ${errors.age ? 'border-red-500' : ''}`} />
                        {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
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


