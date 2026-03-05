import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignUpStep1Form, type Step1Data } from "@/components/auth/SignUpStep1Form";
import { DNAHelix } from "@/components/home/DNAHelix";

export function Hero() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const referralCode = searchParams.get('ref') || '';
  const profileReturnTo = `${window.location.origin}/profile`;

  const handleFormSubmit = (data: Step1Data) => {
    console.log('Form submitted with data:', data);
    const params = new URLSearchParams();
    params.set('step', '2');
    if (data.firstName) params.set('firstName', data.firstName);
    if (data.lastName) params.set('lastName', data.lastName);
    if (data.email) params.set('email', data.email);
    if (data.phoneLocal) params.set('phone', data.phoneLocal);
    if (data.referralCode) params.set('ref', data.referralCode);
    
    console.log('URL params:', params.toString());
    navigate(`/signup?${params.toString()}`);
  };

  const viewSampleReport = () => {
    navigate('/sample-report');
  };

  return (
    <section className="relative w-full pt-16 md:pt-16 lg:pt-24 xl:pt-36 pb-6 sm:pb-8 md:pb-12 lg:pb-16 overflow-hidden">
      {/* Background DNA Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DNAHelix />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          
            {/* Left Column: Text Content */}
            <div className="z-10 flex w-full flex-col items-start justify-center space-y-5 text-left">
            {/* Badge + headline use full width so "Understand your body" stays one line */}
            <div className="flex flex-col items-start w-full">
              {/* Hero Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 mb-2 rounded-full bg-primary-600/10 text-primary-600 text-[10px] sm:text-xs font-bold tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                </span>
                <span>Now Recruiting Phase 1</span>
              </div>

              <h1 className="mb-2 text-2xl font-medium tracking-tight text-neutral-200 sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                <span className="sm:whitespace-nowrap">Understand your body</span>
                <br />
                at the <span className="bg-gradient-to-br from-secondary-500 via-accent-500 to-primary-500 bg-clip-text text-transparent">deepest level.</span>
              </h1>
            </div>

            <div className="flex flex-col items-start w-full max-w-2xl">
              <p className="text-sm text-foreground sm:text-base md:text-lg">
                Discover what your genes say about your fitness, sleep, energy, immunity, and longevity — with India's most
                advanced DNA analysis.
              </p>

              <p className="mt-2 text-sm text-foreground sm:text-base md:text-lg">
                Join the Chiranjiv Genome Initiative. We are waiving the{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="inline font-semibold text-blue-600 hover:text-blue-700 underline decoration-dotted underline-offset-2 transition-colors cursor-pointer"
                    >
                      ₹1.5 Lakh cost
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[max(280px,calc(100vw-1rem))] max-w-2xl sm:w-full sm:max-w-xl md:max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto max-h-[85vh] sm:max-h-[90vh] border border-neutral-1100">
                    <DialogClose asChild>
                      <button className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 text-neutral-600 hover:text-neutral-200 p-1" type="button" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </DialogClose>

                    <div className="mb-6 md:mb-8 pr-8 sm:pr-10">
                      <DialogHeader className="space-y-0">
                        <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-200 leading-tight mb-1 sm:mb-2">
                          The Science of 50x Depth Sequencing
                        </DialogTitle>
                        <DialogDescription className="text-neutral-600 font-semibold uppercase tracking-wide text-xs sm:text-sm">
                          Why this costs so much?
                        </DialogDescription>
                      </DialogHeader>
                    </div>

                    <div className="space-y-5 sm:space-y-6 md:space-y-8">
                      <p className="text-neutral-500 leading-relaxed text-xs sm:text-sm">
                        Most consumer tests in India use &quot;Exome Sequencing&quot; which only reads 2% of your DNA, or
                        low-depth WGS. We perform{" "}
                        <span className="font-semibold text-neutral-200">50x Deep Whole Genome Sequencing</span> — the
                        clinical gold standard. This reads every letter of your DNA 50 times over to ensure near-perfect
                        accuracy for medical predictions.
                      </p>

                      {/* Mobile: stacked comparison cards (iPhone SE and small screens) */}
                      <div className="sm:hidden space-y-2">
                        <div className="rounded-xl border border-neutral-1100 p-3 space-y-1">
                          <p className="font-semibold text-neutral-200 text-sm">Type</p>
                          <p className="text-xs text-neutral-500">Standard: Exome / Low-pass WGS</p>
                          <p className="text-xs font-semibold text-neutral-200">Chiranjiv: Clinical WGS</p>
                        </div>
                        <div className="rounded-xl border border-neutral-1100 p-3 space-y-1">
                          <p className="font-semibold text-neutral-200 text-sm">Depth</p>
                          <p className="text-xs text-neutral-500">Standard: 30x or lower</p>
                          <p className="text-xs font-semibold text-neutral-200">Chiranjiv: 50x Deep Coverage</p>
                        </div>
                        <div className="rounded-xl border border-neutral-1100 p-3 space-y-1">
                          <p className="font-semibold text-neutral-200 text-sm">Data</p>
                          <p className="text-xs text-neutral-500">Standard: ~2% of Genome</p>
                          <p className="text-xs font-semibold text-neutral-200">Chiranjiv: 100% of Genome</p>
                        </div>
                        <div className="rounded-xl border border-neutral-1100 bg-neutral-1200/50 p-3 space-y-1">
                          <p className="font-semibold text-neutral-200 text-sm">Market Price</p>
                          <p className="text-xs text-neutral-500">Standard: ₹25,000 – ₹90,000</p>
                          <p className="text-xs font-semibold text-primary-500">Chiranjiv: ₹1,50,000+</p>
                        </div>
                      </div>

                      {/* Desktop: table (sm and up) */}
                      <div className="hidden sm:block overflow-x-auto rounded-xl sm:rounded-2xl border border-neutral-1100">
                        <table className="w-full min-w-[280px] text-left text-xs sm:text-sm">
                          <thead className="bg-neutral-1200 text-neutral-600 font-bold uppercase">
                            <tr>
                              <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 whitespace-nowrap">Feature</th>
                              <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 whitespace-nowrap">Standard Market Tests</th>
                              <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 text-primary-500 whitespace-nowrap">Chiranjiv WGS</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-1100">
                            <tr className="bg-white">
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 font-semibold text-neutral-200">Type</td>
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 text-neutral-500">Exome / Low-pass WGS</td>
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 font-semibold text-neutral-200">Clinical WGS</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 font-semibold text-neutral-200">Depth</td>
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 text-neutral-500">30x or lower</td>
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 font-semibold text-neutral-200">50x Deep Coverage</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 font-semibold text-neutral-200">Data</td>
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 text-neutral-500">~2% of Genome</td>
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 font-semibold text-neutral-200">100% of Genome</td>
                            </tr>
                            <tr className="bg-neutral-1200/50">
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 font-semibold text-neutral-200">Market Price</td>
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 text-neutral-500">₹25,000 – ₹90,000</td>
                              <td className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 font-semibold text-primary-500">₹1,50,000+</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-primary-500/10 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-primary-500/20">
                        <h4 className="font-bold text-neutral-200 text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500 flex-shrink-0 sm:w-5 sm:h-5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          </svg>
                          <span>Why is this free for you?</span>
                        </h4>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-neutral-500">
                          <li className="flex gap-2 sm:gap-3">
                            <span className="font-bold text-neutral-200 flex-shrink-0 min-w-[18px] sm:min-w-[20px]">1.</span>
                            <span className="min-w-0">
                              <span className="font-semibold text-neutral-200">Bridging the Gap:</span> Indian genomic data is
                              missing from global research. Your anonymized data helps build the first{" "}
                              <span className="font-semibold text-neutral-200">Indian Longevity Model</span> to solve
                              population-specific risks like Diabetes and Cardiac issues.
                            </span>
                          </li>
                          <li className="flex gap-2 sm:gap-3">
                            <span className="font-bold text-neutral-200 flex-shrink-0 min-w-[18px] sm:min-w-[20px]">2.</span>
                            <span className="min-w-0">
                              <span className="font-semibold text-neutral-200">Limited Access:</span> This waiver is available
                              only to the first 20,000 founding members.
                            </span>
                          </li>
                          <li className="flex gap-2 sm:gap-3">
                            <span className="font-bold text-neutral-200 flex-shrink-0 min-w-[18px] sm:min-w-[20px]">3.</span>
                            <span className="min-w-0">
                              <span className="font-semibold text-neutral-200">Advanced Features:</span> Your foundational report
                              is free forever. To access advanced AI-driven features in the future, Chiranjiv may introduce a
                              subscription model (LifeOS™), but your core data remains yours at no cost.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                {" "}
                for the first{" "}
                <span className="font-medium text-primary-600 dark:text-primary-400">20,000</span> members who join our
                foundational research database.
              </p>

              {/* Trust Indicators */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-8 sm:gap-y-4 text-xs sm:text-sm text-foreground">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                  </span>
                  <span>Ethical & Transparent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                  </span>
                  <span>Highly Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                  </span>
                  <span>Data Stored in India</span>
                </div>
              </div>

              <div className="mt-4 flex w-full sm:w-auto">
                <Button
                  onClick={viewSampleReport}
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  View Sample Report
                </Button>
              </div>
            </div>

            </div>

            {/* Right Column: Sign Up Form */}
            <div id="waitlist" className="flex w-full items-center justify-center lg:justify-end">
              <Card className="w-full max-w-md rounded-2xl border border-white/60 bg-white/50 shadow-2xl backdrop-blur-xl sm:rounded-3xl">
              <CardHeader className="space-y-1 p-4 pb-2 sm:p-6 sm:pb-4 text-center items-center">
                <CardTitle className="text-xl sm:text-2xl font-bold">Join Early Access</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Secure your spot in the waitlist and unlock your genetic blueprint
                </p>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6 sm:pt-0">
                <SignUpStep1Form 
                  key={referralCode}
                  defaultValues={{ referralCode }}
                  onSubmit={handleFormSubmit} 
                  submitLabel="Request Access"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-center gap-1 p-4 pt-0 sm:p-6 sm:pt-0 text-xs sm:text-sm text-foreground">
                <div>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="ml-1 font-medium text-primary-600 hover:text-primary-500 hover:underline"
                    onClick={() => void login(profileReturnTo)}
                  >
                    Sign in
                  </button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Your data is encrypted and never shared.{" "}
                  <Link
                    to="/privacy-policy"
                    className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </CardFooter>
              </Card>
            </div>

          </div>
      </div>
    </section>
  );
}
