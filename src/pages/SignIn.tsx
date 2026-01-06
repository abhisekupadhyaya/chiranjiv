import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Mail } from 'lucide-react';

const UnverifiedEmailScreen = ({ email, onBack }: { email: string, onBack: () => void }) => {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [localError, setLocalError] = useState('');
  // @ts-ignore
  const { resendVerificationCode } = useAuth();

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setResent(false);
    setLocalError('');
    try {
      await resendVerificationCode(email);
      setResent(true);
    } catch (err: any) {
      console.error('Failed to resend verification email:', err);
      setLocalError(err.message || 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

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
      {localError && <p className="text-xs text-red-500 text-center">{localError}</p>}
      <Button 
        type="button" 
        onClick={handleResend}
        className="w-full" 
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
  );
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login({ username: email, password });
      
      if (result.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        setUnverifiedEmail(email);
        return;
      }
      
      navigate('/profile');
    } catch (err: any) {
      console.error(err);
      
      // Check for UserNotConfirmedException by name, code, or message content as fallback
      if (
        err.name === 'UserNotConfirmedException' || 
        err.code === 'UserNotConfirmedException' ||
        err.message?.toLowerCase().includes('confirm') ||
        err.message?.toLowerCase().includes('verify') ||
        err.name === 'UserUnAuthenticatedException' ||
        err.message?.includes('User needs to be authenticated')
      ) {
        setUnverifiedEmail(email);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  if (unverifiedEmail) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <UnverifiedEmailScreen 
              email={unverifiedEmail} 
              onBack={() => setUnverifiedEmail('')} 
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
