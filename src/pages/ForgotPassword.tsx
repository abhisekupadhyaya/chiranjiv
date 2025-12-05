import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail, KeyRound, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [step, setStep] = useState<'request' | 'confirm'>('request');
  const { forgotPassword, confirmNewPassword, error } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const validatePassword = () => {
    if (newPassword.length < 8) {
      setLocalError('Password must be at least 8 characters');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setLocalError('Email is required');
      return;
    }
    setLocalError('');
    setLoading(true);
    try {
      await forgotPassword({ username: email });
      setStep('confirm');
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    if (!code) {
      setLocalError('Verification code is required');
      return;
    }
    
    if (!validatePassword()) return;

    setLoading(true);
    try {
      await confirmNewPassword({ username: email, confirmationCode: code, newPassword });
      navigate('/signin');
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            {step === 'request' 
              ? 'Enter your email address and we will send you a verification code.' 
              : 'Check your email for the code and enter your new password below.'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 'request' ? (
            <form onSubmit={handleRequest} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              
              {(error || localError) && (
                <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded border border-red-100">
                  {localError || error}
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending Code...' : 'Send Reset Code'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium leading-none">
                  Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium leading-none">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 chars"
                    value={newPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                    className="pl-9 pr-10"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    className="pl-9 pr-10"
                    required
                  />
                   <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {(error || localError) && (
                <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded border border-red-100">
                  {localError || error}
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </Button>
              
               <Button type="button" variant="ghost" className="w-full" onClick={() => setStep('request')}>
                Back to verify email
              </Button>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Link to="/signin" className="flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
