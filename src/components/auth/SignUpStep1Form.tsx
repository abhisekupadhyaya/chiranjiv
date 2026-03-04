import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step1Data {
  firstName: string;
  lastName: string;
  email: string;
  phoneLocal: string;
  countryCode: string;
  referralCode: string;
}

interface SignUpStep1FormProps {
  defaultValues?: Partial<Step1Data>;
  onSubmit: (data: Step1Data) => void;
  className?: string;
  submitLabel?: string;
}

export function SignUpStep1Form({ 
  defaultValues, 
  onSubmit, 
  className,
  submitLabel = "Next Step"
}: SignUpStep1FormProps) {
  const [formData, setFormData] = useState<Step1Data>({
    firstName: defaultValues?.firstName || '',
    lastName: defaultValues?.lastName || '',
    email: defaultValues?.email || '',
    phoneLocal: defaultValues?.phoneLocal || '',
    countryCode: defaultValues?.countryCode || '+91',
    referralCode: defaultValues?.referralCode || '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email address';
    
    if (!formData.phoneLocal.trim()) errors.phoneLocal = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneLocal.replace(/\D/g, ''))) errors.phoneLocal = 'Phone must be 10 digits';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1 text-left">
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleInputChange}
              className={cn("pl-9", fieldErrors.firstName && "border-red-500 focus-visible:ring-red-500")}
            />
          </div>
          {fieldErrors.firstName && <p className="text-xs text-red-500">{fieldErrors.firstName}</p>}
        </div>

        <div className="space-y-1 text-left">
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={handleInputChange}
              className={cn("pl-9", fieldErrors.lastName && "border-red-500 focus-visible:ring-red-500")}
            />
          </div>
          {fieldErrors.lastName && <p className="text-xs text-red-500">{fieldErrors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-1 text-left">
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Email *" 
            value={formData.email} 
            onChange={handleInputChange} 
            className={cn("pl-9", fieldErrors.email && "border-red-500 focus-visible:ring-red-500")}
          />
        </div>
        {fieldErrors.email && <p className="text-xs text-red-500">{fieldErrors.email}</p>}
      </div>

      <div className="space-y-1 text-left">
        <div className="flex gap-2">
           <div className="flex items-center justify-center w-[70px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
             {formData.countryCode}
           </div>
           <div className="relative flex-1">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="phoneLocal" 
                name="phoneLocal" 
                type="tel" 
                placeholder="Phone Number *" 
                value={formData.phoneLocal} 
                onChange={handleInputChange} 
                className={cn("pl-9", fieldErrors.phoneLocal && "border-red-500 focus-visible:ring-red-500")}
              />
           </div>
        </div>
        {fieldErrors.phoneLocal && <p className="text-xs text-red-500">{fieldErrors.phoneLocal}</p>}
      </div>

      <div className="space-y-1 text-left">
        <Input
          id="referralCode" 
          name="referralCode" 
          placeholder="Referral Code (optional)" 
          value={formData.referralCode} 
          onChange={handleInputChange} 
        />
      </div>

      <Button type="submit" className="w-full group">
        {submitLabel}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
}
