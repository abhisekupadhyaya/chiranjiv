import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Eye, EyeOff, MapPin, Calendar, Lock, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SignUpStep1Form, type Step1Data } from '@/components/auth/SignUpStep1Form';
import { postWaitlistSignup, type WaitlistSignupRequest } from '@/services/api';

const toE164 = (countryCode: string, localNumber: string): string => {
  const digitsOnly = localNumber.replace(/\D/g, '')
  return countryCode + digitsOnly
}

const INDIAN_STATES_AND_UT: string[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]

const SignUp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, error, setError, resendVerificationCode } = useAuth();
  
  // Read URL params once at component initialization
  const initialStep = parseInt(searchParams.get('step') || '1');
  const initialRef = searchParams.get('ref') || '';
  const initialEmail = searchParams.get('email') || '';
  const initialName = searchParams.get('name') || '';
  const initialPhone = searchParams.get('phone') || '';
  
  // Steps: 1 = Basic Info, 2 = Details & Password, 3 = Success
  const [step, setStep] = useState<number>(
    !isNaN(initialStep) && initialStep >= 1 && initialStep <= 3 ? initialStep : 1
  );
  const [loading, setLoading] = useState(false);
  
  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form State - initialize directly from URL params
  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
    phoneLocal: initialPhone,
    countryCode: '+91',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
    age: '',
    password: '',
    confirmPassword: '',
    privacyPolicy: false,
    termsOfService: false,
    referralCode: initialRef,
    dataUsagePolicy: false,
    researchConsent: false,
    marketingConsent: false,
  });

  // Validation State
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Resend verification (step 3)
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<'success' | 'error' | null>(null);

  // Sync key state to URL so it persists on refresh
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('step', step.toString());
    
    if (formData.referralCode) params.set('ref', formData.referralCode);
    if (formData.name) params.set('name', formData.name);
    if (formData.email) params.set('email', formData.email);
    if (formData.phoneLocal) params.set('phone', formData.phoneLocal);
    
    setSearchParams(params, { replace: true });
  }, [step, formData.name, formData.email, formData.phoneLocal, formData.referralCode]);


  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.addressLine1.trim()) errors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.zip.trim()) errors.zip = 'ZIP code is required';
    
    if (!formData.age.trim()) errors.age = 'Age is required';
    else {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 18) errors.age = 'You must be at least 18 years old';
    }

    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (!formData.privacyPolicy) errors.privacyPolicy = 'You must accept the Privacy Policy';
    if (!formData.termsOfService) errors.termsOfService = 'You must accept the Terms of Service';
    if (!formData.dataUsagePolicy) errors.dataUsagePolicy = 'You must accept the Data Usage Policy';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep1Submit = (data: Step1Data) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
    setStep(2);
    setFieldErrors({});
  };

  const executeWaitlistSignup = async (cognitoUserId: string) => {
    const fullPhone = toE164(formData.countryCode, formData.phoneLocal);
    const fullAddress = [
      formData.addressLine1,
      formData.addressLine2,
      formData.city,
      formData.state,
      formData.zip,
      formData.country
    ].filter(Boolean).join(', ');

    const waitlistRequest: WaitlistSignupRequest = {
      id: cognitoUserId,
      name: formData.name,
      email: formData.email,
      phone: fullPhone,
      address: fullAddress,
      age: parseInt(formData.age),
      consentPrivacyPolicy: formData.privacyPolicy ? 'v0.1' : null,
      consentTermsOfService: formData.termsOfService ? 'v0.1' : null,
      consentDataUsagePolicy: formData.dataUsagePolicy ? 'v0.1' : null,
      consentResearchContact: formData.researchConsent ? 'v0.1' : null,
      consentMarketing: formData.marketingConsent ? 'v0.1' : null,
      referralCode: formData.referralCode || undefined,
    };

    const { ok, data } = await postWaitlistSignup(waitlistRequest);
    
    if (!ok) {
      // We log the error but still proceed to step 3 as the account is created
      console.error('Waitlist API error:', data);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    setError(null);

    try {
      const fullPhone = `${formData.countryCode}${formData.phoneLocal.replace(/\D/g, '')}`;
      const fullAddress = [
        formData.addressLine1,
        formData.addressLine2,
        formData.city,
        formData.state,
        formData.zip,
        formData.country
      ].filter(Boolean).join(', ');

      const userAttributes: any = {
        email: formData.email,
        name: formData.name,
        phone_number: fullPhone,
        address: fullAddress,
        'custom:age': formData.age,
        'custom:referral_code': formData.referralCode || '',
        'custom:consent_data': formData.dataUsagePolicy ? 'true' : 'false',
        'custom:consent_research': formData.researchConsent ? 'true' : 'false',
        'custom:consent_marketing': formData.marketingConsent ? 'true' : 'false',
      };

      let result;
      try {
        result = await register({ 
          username: formData.email, 
          password: formData.password, 
          options: {
            userAttributes
          }
        });
      } catch (err: any) {
        // Retry logic for custom attributes
        if (err.message?.includes('custom:')) {
           result = await register({ 
              username: formData.email, 
              password: formData.password, 
              options: {
                userAttributes: {
                  email: formData.email,
                  name: formData.name,
                  phone_number: fullPhone,
                  address: fullAddress,
                }
              }
            });
        } else {
          throw err;
        }
      }

      // If we got here, registration was successful
      if (result && result.userId) {
         await executeWaitlistSignup(result.userId);
      }
      
      setStep(3);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleResendVerification = async () => {
    setResendMessage(null);
    setResending(true);
    try {
      await resendVerificationCode(formData.email);
      setResendMessage('success');
    } catch (err: any) {
      setResendMessage('error');
      console.error('Failed to resend verification email:', err);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {step === 1 && "Create your account"}
            {step === 2 && "Complete your profile"}
            {step === 3 && "Welcome to Chiranjiv!"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1 && "Get started with your basic information"}
            {step === 2 && "We need a few more details to set you up"}
            {step === 3 && `Your account has been created successfully`}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 1 && (
            <SignUpStep1Form 
              defaultValues={{
                name: formData.name,
                email: formData.email,
                phoneLocal: formData.phoneLocal,
                countryCode: formData.countryCode,
                referralCode: formData.referralCode
              }}
              onSubmit={handleStep1Submit}
            />
          )}

          {step === 2 && (
            <form onSubmit={handleSignUp} className="space-y-4">
               <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="addressLine1" className="text-sm font-medium leading-none">Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="addressLine1" 
                        name="addressLine1" 
                        placeholder="Street Address" 
                        value={formData.addressLine1} 
                        onChange={handleInputChange} 
                        className={cn("pl-9", fieldErrors.addressLine1 && "border-red-500")}
                      />
                    </div>
                    {fieldErrors.addressLine1 && <p className="text-xs text-red-500">{fieldErrors.addressLine1}</p>}
                    <Input 
                      name="addressLine2" 
                      placeholder="Apt, Suite, etc. (Optional)" 
                      value={formData.addressLine2} 
                      onChange={handleInputChange} 
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                       <label htmlFor="city" className="text-sm font-medium leading-none">City <span className="text-red-500">*</span></label>
                       <Input 
                        name="city" 
                        placeholder="City" 
                        value={formData.city} 
                        onChange={handleInputChange}
                        className={fieldErrors.city ? "border-red-500" : ""}
                       />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="state" className="text-sm font-medium leading-none">State <span className="text-red-500">*</span></label>
                       <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={cn(
                          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                          fieldErrors.state && "border-red-500"
                        )}
                       >
                         <option value="">Select state</option>
                         {INDIAN_STATES_AND_UT.map((s) => (
                           <option key={s} value={s}>{s}</option>
                         ))}
                       </select>
                       {fieldErrors.state && <p className="text-xs text-red-500">{fieldErrors.state}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                       <label htmlFor="zip" className="text-sm font-medium leading-none">ZIP Code <span className="text-red-500">*</span></label>
                       <Input 
                        name="zip" 
                        placeholder="ZIP / Pincode" 
                        value={formData.zip} 
                        onChange={handleInputChange}
                        className={fieldErrors.zip ? "border-red-500" : ""}
                       />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="country" className="text-sm font-medium leading-none">Country</label>
                       <div className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm items-center text-muted-foreground">
                         {formData.country}
                       </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="age" className="text-sm font-medium leading-none">Age <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="age" 
                        name="age" 
                        type="number" 
                        placeholder="Age" 
                        value={formData.age} 
                        onChange={handleInputChange} 
                        className={cn("pl-9", fieldErrors.age && "border-red-500")}
                      />
                    </div>
                    {fieldErrors.age && <p className="text-xs text-red-500">{fieldErrors.age}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium leading-none">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Min 8 chars" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        className={cn("pl-9 pr-10", fieldErrors.password && "border-red-500")}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {fieldErrors.password && <p className="text-xs text-red-500">{fieldErrors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">Confirm Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirm Password" 
                        value={formData.confirmPassword} 
                        onChange={handleInputChange} 
                        className={cn("pl-9 pr-10", fieldErrors.confirmPassword && "border-red-500")}
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && <p className="text-xs text-red-500">{fieldErrors.confirmPassword}</p>}
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="privacyPolicy" 
                        name="privacyPolicy"
                        checked={formData.privacyPolicy}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="privacyPolicy" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I accept the <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {fieldErrors.privacyPolicy && <p className="text-xs text-red-500 ml-6">{fieldErrors.privacyPolicy}</p>}

                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="termsOfService" 
                        name="termsOfService"
                        checked={formData.termsOfService}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="termsOfService" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I accept the <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link> <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {fieldErrors.termsOfService && <p className="text-xs text-red-500 ml-6">{fieldErrors.termsOfService}</p>}

                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="dataUsagePolicy" 
                        name="dataUsagePolicy"
                        checked={formData.dataUsagePolicy}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="dataUsagePolicy" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I accept the <Link to="/data-usage-policy" className="text-primary hover:underline">Data Usage Policy</Link> <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {fieldErrors.dataUsagePolicy && <p className="text-xs text-red-500 ml-6">{fieldErrors.dataUsagePolicy}</p>}

                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="marketingConsent" 
                        name="marketingConsent"
                        checked={formData.marketingConsent}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="marketingConsent" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I agree to receive marketing communications and product updates <span className="text-muted-foreground font-normal">(Optional)</span>
                      </label>
                    </div>
                  </div>
               </div>

               {error && (
                 <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded border border-red-100">
                   {error}
                 </div>
               )}

               <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
               </div>
            </form>
          )}

          {step === 3 && (
             <div className="flex flex-col items-center justify-center py-6 text-center space-y-6">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Verification Link Sent</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    Please check your email at <strong>{formData.email}</strong> and click the verification link to activate your account.
                  </p>
                </div>

                {resendMessage === 'success' && (
                  <p className="text-sm text-green-600">Verification email sent! Please check your inbox and spam folder.</p>
                )}
                {resendMessage === 'error' && (
                  <p className="text-sm text-red-500">Failed to resend. Please try again later.</p>
                )}

                <Button
                  variant="ghost"
                  onClick={handleResendVerification}
                  disabled={resending}
                  className="w-full text-sm"
                >
                  {resending ? 'Sending...' : 'Resend verification email'}
                </Button>
             </div>
          )}
        </CardContent>
        
        {step !== 3 && (
          <CardFooter className="flex flex-col gap-2">
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default SignUp;
