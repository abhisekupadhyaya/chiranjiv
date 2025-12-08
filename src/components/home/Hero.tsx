import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { SignUpStep1Form, type Step1Data } from "@/components/auth/SignUpStep1Form";
import { DNAHelix } from "@/components/home/DNAHelix";

export function Hero() {
  const navigate = useNavigate();

  const handleFormSubmit = (data: Step1Data) => {
    const params = new URLSearchParams();
    params.set('step', '2');
    if (data.name) params.set('name', data.name);
    if (data.email) params.set('email', data.email);
    if (data.phoneLocal) params.set('phone', data.phoneLocal);
    if (data.referralCode) params.set('ref', data.referralCode);
    
    navigate(`/signup?${params.toString()}`);
  };

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      {/* Background DNA Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DNAHelix />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_28rem] lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-center justify-center space-y-10 text-center z-10">
            <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
              <h1 className="mb-8 text-4xl font-medium tracking-tight text-neutral-200 sm:text-5xl lg:text-7xl">
                Your DNA Unlocks <br />
                <span className="bg-gradient-to-br from-secondary-500 via-accent-500 to-primary-500 bg-clip-text text-transparent">
                  Your Best Body.
                </span>{" "}
                For Free.
              </h1>
              
              <p className="max-w-2xl text-base text-neutral-600 sm:text-lg mx-auto">
                Discover what your genes say about your fitness, sleep, energy, immunity, and longevity — with India's most advanced DNA analysis.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span>Ethical & Transparent</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span>Highly Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span>Data Stored in India</span>
              </div>
            </div>

            {/* Price/Offer Tag */}
            <div className="flex justify-center w-full">
              <div className="inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white/50 p-1 pl-4 pr-2 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/60">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="line-through decoration-neutral-400/50 dark:decoration-neutral-600">Worth ₹1,50,000</span>
                  <span className="mx-2"></span>
                  <span className="font-medium text-primary-600 dark:text-neutral-200">FREE for early users</span>
                  <span className="mx-2 opacity-30">|</span>
                </span>
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                   Only a few spots left
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Sign Up Form */}
          <div className="flex items-center justify-center lg:justify-end w-full">
            <Card className="w-full max-w-md shadow-2xl border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md">
              <CardHeader className="space-y-1 pb-4 text-center items-center">
                <CardTitle className="text-2xl font-bold">Join Early Access</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Secure your spot in the waitlist and unlock your genetic blueprint
                </p>
              </CardHeader>
              <CardContent>
                <SignUpStep1Form 
                  onSubmit={handleFormSubmit} 
                  submitLabel="Get Started Free"
                />
              </CardContent>
              <CardFooter className="justify-center text-sm text-neutral-600 dark:text-neutral-400">
                Already have an account?{" "}
                <Link to="/signin" className="ml-1 font-medium text-primary-600 hover:text-primary-500 hover:underline">
                  Sign in
                </Link>
              </CardFooter>
            </Card>
          </div>
          
        </div>
      </div>
    </section>
  );
}
