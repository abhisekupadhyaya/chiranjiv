import { PolicyLayout } from '@/components/PolicyLayout'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PrivacyPolicy() {
  return (
    <PolicyLayout 
      title="Privacy Policy" 
      lastUpdated="November 1, 2025"
    >
      <section id="introduction" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-0">Introduction and Scope</h2>
        
        <p className="mb-4 leading-relaxed">
          This Privacy Policy ("Privacy Policy") governs the collection, use, processing, storage, and disclosure of personal data by Chiranjeev India Private Limited ("we", "us", or "our"), a company incorporated under the laws of India through our website https://chiranjiv.com/ ("Website") and related genomic testing services ("Services").
        </p>
        
        <p className="mb-4 leading-relaxed">
          This Privacy Policy applies to all users ("you" or "your") of our Website and Services, and describes how we handle your personal data, including sensitive genetic information, in compliance with the Digital Personal Data Protection Act, 2023 ("DPDPA 2023") and other applicable Indian laws.
        </p>
        
        <p className="mb-4 leading-relaxed">
          By accessing our Website or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with this Privacy Policy, please do not use our Website or Services.
        </p>
      </section>

      <section id="information-collected" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Information We Collect</h2>
        
        <p className="mb-4 leading-relaxed">
          Through our website and through information we may directly provide to you outside of the website (for example, through packages we mail to you), we collect and process the following categories of personal data:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-3 mb-6">
          <li>
            <strong>Account Information</strong>
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>Name, email address, phone number, date of birth</li>
              <li>Username and password</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed by third-party payment processors)</li>
            </ul>
          </li>
          <li>
            <strong>Genetic Samples and Biological Data</strong>
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>Physical biological samples (saliva, blood, or other specimens)</li>
              <li>Raw genetic data extracted from your samples</li>
              <li>Processed genetic information and genomic sequences</li>
              <li>Genetic variants and mutations identified through testing</li>
            </ul>
          </li>
          <li>
            <strong>Health and Medical Information</strong>
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>Health questionnaires and medical history</li>
              <li>Family medical history</li>
              <li>Lifestyle and wellness information</li>
              <li>Test results and genetic reports</li>
            </ul>
          </li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          Additionally, we may collect the following information through the website:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-3 mb-4">
          <li>
            <strong>Technical and Usage Information</strong>
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>IP addresses, browser type, device information</li>
              <li>Website navigation patterns and interaction data</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Log files and analytics data</li>
            </ul>
          </li>
          <li>
            <strong>Communication Data</strong>
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>Customer service interactions</li>
              <li>Survey responses and feedback</li>
              <li>Marketing communication preferences</li>
            </ul>
          </li>
        </ul>
      </section>

      <section id="how-we-use" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">How We Use Your Information</h2>
        
        <p className="mb-4 leading-relaxed">
          We use your personal data for the following primary purposes with your explicit consent:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Processing genetic samples and conducting genomic analyses</li>
          <li>Generating personalized genetic reports and health insights</li>
          <li>Providing customer support and account management</li>
          <li>Processing payments and managing subscriptions</li>
          <li>Communicating test results and updates</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          We may use your genetic data for research purposes only with your separate, explicit opt-in consent:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Contributing to genetic research studies and scientific publications</li>
          <li>Developing new genetic tests and improving existing methodologies</li>
          <li>Population genetics research and medical discoveries</li>
          <li>Pharmacogenomics and precision medicine research</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          You have complete control over research participation and may opt-in or opt-out at any time through your account settings. Research participation is entirely voluntary and separate from our primary testing services.
        </p>
      </section>

      <section id="research-use" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Research Use and Data Sharing</h2>
        
        <p className="mb-4 leading-relaxed">
          Before any research use or third-party sharing, genetic data undergoes rigorous anonymization:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Removal of all direct identifiers (name, contact information, account details)</li>
          <li>Assignment of random research identifiers</li>
          <li>Aggregation with other anonymized datasets</li>
          <li>Implementation of technical and procedural safeguards to prevent re-identification</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          With your explicit opt-in consent, we may share anonymized genetic data with:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Academic research institutions and universities</li>
          <li>Pharmaceutical companies conducting legitimate research</li>
          <li>Government health agencies and regulatory bodies</li>
          <li>International research consortiums and collaboratives</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          We agree to use the following guidelines with regard to any use of data for research:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>All research partnerships are governed by strict data sharing agreements</li>
          <li>Third parties must demonstrate legitimate research purposes</li>
          <li>Recipients are contractually prohibited from attempting re-identification</li>
          <li>Regular audits ensure compliance with data sharing terms</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          Data may also be shared as required by law.
        </p>
      </section>

      <section id="legal-basis" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Legal Basis For Processing</h2>
        
        <p className="mb-4 leading-relaxed">
          Under DPDPA 2023 Section 6, we process your personal data based on the following legal grounds:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-3 mb-4">
          <li>
            <strong>Consent</strong>
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>Explicit consent for genetic testing services</li>
              <li>Separate opt-in consent for research participation</li>
              <li>Consent for marketing communications</li>
            </ul>
          </li>
          <li>
            <strong>Legitimate Interests</strong>
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>Website functionality and security</li>
              <li>Fraud prevention and detection</li>
              <li>Business analytics and improvement</li>
            </ul>
          </li>
          <li>
            <strong>Legal Obligations</strong>
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>Compliance with regulatory requirements</li>
              <li>Tax and accounting obligations</li>
              <li>Law enforcement requests where legally mandated</li>
            </ul>
          </li>
        </ul>
      </section>

      <section id="data-retention" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Data Retention</h2>
        
        <p className="mb-4 leading-relaxed">
          Core genetic data that has been anonymized and included in research datasets is retained indefinitely for the following reasons:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Long-term longitudinal research studies require extended data retention</li>
          <li>Scientific reproducibility and validation of research findings</li>
          <li>Contribution to ongoing medical and genetic research advancement</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          We will review our retention of genetic data periodically to assure that we are not maintaining any genetic data for which there is no longer a legitimate purpose.
        </p>
        
        <p className="mb-4 leading-relaxed">
          Outside of core genetic data, will will retain Identifiable Personal Data for the following terms:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Account information: Retained while your account remains active</li>
          <li>Personal identifiers linked to genetic data: Retained for 10 years after account closure</li>
          <li>Payment and transaction data: Retained for 10 years for accounting purposes</li>
          <li>Communication records: Retained for 10 years</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          Upon account deletion, we will remove your identifiable personal information and account data. However, anonymized genetic data that has been incorporated into research databases cannot be retrieved or deleted, as it has been irreversibly anonymized and may be part of ongoing or completed research studies.
        </p>
      </section>

      <section id="international-transfers" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">International Data Transfers</h2>
        
        <p className="mb-4 leading-relaxed">
          We may transfer your personal data outside India to:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Cloud storage providers and data centers</li>
          <li>Research collaborators and institutions</li>
          <li>Service providers and technology partners</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          All international transfers are protected by the following, as applicable:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Standard contractual clauses approved under DPDPA 2023</li>
          <li>Adequacy decisions where applicable</li>
          <li>Binding corporate rules and certification programs</li>
          <li>Additional technical and organizational measures</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          We will inform you of specific international transfers through this Privacy Policy or direct communication where required by law.
        </p>
      </section>

      <section id="your-rights" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Your Rights Under DPDPA 2023, Section 11</h2>
        
        <p className="mb-4 leading-relaxed">
          You have the following rights regarding your personal data:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-3 mb-4">
          <li>
            <strong>Right of Access</strong>, which includes the right to
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>Request information about personal data we hold about you</li>
              <li>Obtain copies of your genetic reports and test results</li>
              <li>Understand how your data is being processed</li>
            </ul>
          </li>
          <li>
            <strong>Right to Correction</strong>, which includes the right to
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>Request correction of inaccurate personal information</li>
              <li>Update your account and contact details</li>
              <li>Modify health questionnaire responses</li>
            </ul>
          </li>
          <li>
            <strong>Right to Erasure</strong>, which includes the right to request deletion of your account and associated personal data (with the exception of anonymized genetic data in research databases cannot be retrieved or deleted, and certain data that may be retained for legal or regulatory requirements).
          </li>
          <li>
            <strong>Right to Data Portability</strong>, which includes the right to request your personal data in a structured, commonly used format.
          </li>
          <li>
            <strong>Right to Withdraw Consent</strong>, which includes the right to
            <ul className="list-[circle] list-outside ml-6 space-y-1 mt-2">
              <li>Withdraw consent for research participation at any time</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            <p className="mt-2 ml-6 text-sm">(with the understanding that withdrawal does not affect previously conducted research using anonymized data)</p>
          </li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          To exercise your rights, contact us at support@chiranjiv.com, or through your account settings.
        </p>
      </section>

      <section id="age-restriction" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Age Restriction and Verification</h2>
        
        <p className="mb-4 leading-relaxed">
          Our Services are available only to individuals who are 18 years of age or older. We do not knowingly collect genetic samples or personal data from individuals under 18 years of age, and any samples or data found to have been collected by anyone under the age of 18 will be deleted.
        </p>
      </section>

      <section id="data-security" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Data Security</h2>
        
        <p className="mb-4 leading-relaxed">
          We agree to provide the following technical safeguards:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>End-to-end encryption for data transmission and storage</li>
          <li>Multi-factor authentication for account access</li>
          <li>Regular security assessments and penetration testing</li>
          <li>Secure data centers with physical access controls</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          Additionally, we agree to implement the following organizational measures:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Employee training on data protection and genetic data sensitivity</li>
          <li>Role-based access controls and need-to-know principles</li>
          <li>Regular security audits and compliance reviews</li>
          <li>Incident response and breach notification procedures</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          Given the sensitive nature of genetic information, we will provide the following special protections for all genetic information:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
          <li>Additional encryption layers for genetic data</li>
          <li>Separate storage systems with enhanced access controls</li>
          <li>Regular security monitoring and threat detection</li>
          <li>Specialized protocols for genetic data handling</li>
        </ul>
      </section>

      <section id="cookies" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Cookies and Tracking Technologies</h2>
        
        <p className="mb-4 leading-relaxed">
          A computer cookie (or "web cookie") is a small text file that a website stores on your browser or device when you visit a website.
        </p>
        
        <p className="mb-4 leading-relaxed">
          We may use the following types of cookies:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Essential cookies for website functionality</li>
          <li>Analytics cookies for usage statistics</li>
          <li>Marketing cookies for personalized advertising (with consent)</li>
          <li>Security cookies for fraud prevention</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          You can control cookie preferences through:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Browser settings and privacy controls</li>
          <li>Our cookie consent management platform</li>
          <li>Account privacy settings</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          Some cookies may be placed by third-party service providers for:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
          <li>Website analytics (e.g., Google Analytics)</li>
          <li>Payment processing</li>
          <li>Customer support chat functionality</li>
        </ul>
      </section>

      <section id="changes" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Changes to this Privacy Policy</h2>
        
        <p className="mb-4 leading-relaxed">
          We may update this Privacy Policy periodically to reflect:
        </p>
        
        <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
          <li>Changes in our data processing practices</li>
          <li>Modifications to applicable laws and regulations</li>
          <li>Introduction of new services or features</li>
          <li>Feedback from users and regulatory guidance</li>
        </ul>
        
        <p className="mb-4 leading-relaxed">
          Material changes will be communicated via email, and you will be informed if additional consents are required based on the material changes.
        </p>
        
        <p className="mb-4 leading-relaxed">
          For any non-material changes, updated Privacy Policies will be posted on our website with the applicable revision date. Your continued use of Services constitutes acceptance of those non-material changes.
        </p>
      </section>

      <section id="contact" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Contact Information</h2>
        
        <p className="mb-4 leading-relaxed">
          For questions, concerns, or requests regarding this Privacy Policy or our general data practices, please contact:
        </p>
        
        <Alert className="mt-4 mb-6 bg-neutral-50">
          <AlertTitle className="font-semibold text-foreground mb-3">Data Protection Officer</AlertTitle>
          <AlertDescription className="text-foreground font-light">
            <p>Chiranjeev India Private Limited</p>
            <p>Email: <a href="mailto:support@chiranjiv.com" className="text-primary-600 hover:underline font-medium">support@chiranjiv.com</a></p>
            <p>Address: 703 Deron Heights, Baner Road, Baner, Pune 411045</p>
          </AlertDescription>
        </Alert>
        
        <p className="mb-4 leading-relaxed">
          We will acknowledge your inquiry within 72 hours and provide a substantive response within 30 days.
        </p>
        
        <p className="mb-4 leading-relaxed">
          For any complaints or grievances related to data processing, in addition to your ability to contact our Data Protection Officer directly, you have the right to file complaints with the Data Protection Board of India.
        </p>
      </section>

      <section className="mb-8">
        <p className="mb-4 leading-relaxed">
          This Privacy Privacy Policy represents our commitment to protecting your personal data and genetic information with the highest standards of privacy and security. We recognize the sensitive nature of genetic data and are dedicated to maintaining your trust through transparent and responsible data practices.
        </p>
      </section>
    </PolicyLayout>
  )
}
