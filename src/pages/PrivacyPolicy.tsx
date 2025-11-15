import { PolicyLayout } from '@/components/policy-layout'
import { PolicyCallout } from '@/components/policy-callout'

const sections = [
  { id: 'introduction', label: 'Introduction & Scope' },
  { id: 'information-collected', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'research-use', label: 'Research Use & Data Sharing' },
  { id: 'legal-basis', label: 'Legal Basis for Processing' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'international-transfers', label: 'International Data Transfers' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'age-restriction', label: 'Age Restriction' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'changes', label: 'Changes to this Policy' },
  { id: 'contact', label: 'Contact & Complaints' }
]

export default function PrivacyPolicy() {
  return (
    <PolicyLayout 
      title="Privacy Policy" 
      effectiveDate="November ___, 2025" 
      lastUpdated="November ___, 2025"
      category="Privacy & Data Protection"
      sections={sections}
    >
      <section id="introduction">
        <h2>Introduction and Scope</h2>
        <p>
          This Privacy Policy ("Privacy Policy") governs the collection, use, processing, storage, and disclosure of personal data by
          Rapidera Technologies Pvt Ltd. ("we", "us", or "our"), a company incorporated under the laws of India through our website
          https://chiranjiv.com/ ("Website") and related genomic testing services ("Services").
        </p>
        <p>
          This Privacy Policy applies to all users ("you" or "your") of our Website and Services, and describes how we handle your personal data,
          including sensitive genetic information, in compliance with the Digital Personal Data Protection Act, 2023 ("DPDPA 2023") and other applicable
          Indian laws.
        </p>
        <p>
          By accessing our Website or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
          If you do not agree with this Privacy Policy, please do not use our Website or Services.
        </p>
      </section>
      <section id="information-collected">
        <h2>Information We Collect</h2>
        <p>
          Through our website and through information we may directly provide to you outside of the website (for example, through packages we mail to
          you), we collect and process the following categories of personal data:
        </p>
        <h3>Account Information</h3>
        <ul>
          <li>Name, email address, phone number, date of birth</li>
          <li>Username and password</li>
          <li>Billing and shipping addresses</li>
          <li>Payment information (processed by third-party payment processors)</li>
        </ul>
        <h3>Genetic Samples and Biological Data</h3>
        <ul>
          <li>Physical biological samples (saliva, blood, or other specimens)</li>
          <li>Raw genetic data extracted from your samples</li>
          <li>Processed genetic information and genomic sequences</li>
          <li>Genetic variants and mutations identified through testing</li>
        </ul>
        <h3>Health and Medical Information</h3>
        <ul>
          <li>Health questionnaires and medical history</li>
          <li>Family medical history</li>
          <li>Lifestyle and wellness information</li>
          <li>Test results and genetic reports</li>
        </ul>
        <p>Additionally, we may collect the following information through the website:</p>
        <h3>Technical and Usage Information</h3>
        <ul>
          <li>IP addresses, browser type, device information</li>
          <li>Website navigation patterns and interaction data</li>
          <li>Cookies and similar tracking technologies</li>
          <li>Log files and analytics data</li>
        </ul>
        <h3>Communication Data</h3>
        <ul>
          <li>Customer service interactions</li>
          <li>Survey responses and feedback</li>
          <li>Marketing communication preferences</li>
        </ul>
      </section>
      <section id="how-we-use">
        <h2>How We Use Your Information</h2>
        <p>We use your personal data for the following primary purposes with your explicit consent:</p>
        <ul>
          <li>Processing genetic samples and conducting genomic analyses</li>
          <li>Generating personalized genetic reports and health insights</li>
          <li>Providing customer support and account management</li>
          <li>Processing payments and managing subscriptions</li>
          <li>Communicating test results and updates</li>
        </ul>
        <p>We may use your genetic data for research purposes only with your separate, explicit opt-in consent:</p>
        <ul>
          <li>Contributing to genetic research studies and scientific publications</li>
          <li>Developing new genetic tests and improving existing methodologies</li>
          <li>Population genetics research and medical discoveries</li>
          <li>Pharmacogenomics and precision medicine research</li>
        </ul>
        <p>
          You have complete control over research participation and may opt-in or opt-out at any time through your account settings. Research
          participation is entirely voluntary and separate from our primary testing services.
        </p>
      </section>
      <section id="research-use">
        <h2>Research Use and Data Sharing</h2>
        <PolicyCallout variant="info" title="Research Use – Always Optional">
          <p className="mb-3">All research participation is entirely voluntary and requires your explicit opt-in consent. You can change your preference at any time through your account settings.</p>
        </PolicyCallout>
        <h3 className="mt-6">Anonymization & Safeguards</h3>
        <p>Before any research use or third-party sharing, genetic data undergoes rigorous anonymization:</p>
        <ul>
          <li>Removal of all direct identifiers (name, contact information, account details)</li>
          <li>Assignment of random research identifiers</li>
          <li>Aggregation with other anonymized datasets</li>
          <li>Implementation of technical and procedural safeguards to prevent re-identification</li>
        </ul>
        <h3 className="mt-6">Research Partners</h3>
        <p>With your explicit opt-in consent, we may share anonymized genetic data with:</p>
        <ul>
          <li>Academic research institutions and universities</li>
          <li>Pharmaceutical companies conducting legitimate research</li>
          <li>Government health agencies and regulatory bodies</li>
          <li>International research consortiums and collaboratives</li>
        </ul>
        <h3 className="mt-6">Data Sharing Guidelines</h3>
        <p>We agree to use the following guidelines with regard to any use of data for research:</p>
        <ul>
          <li>All research partnerships are governed by strict data sharing agreements</li>
          <li>Third parties must demonstrate legitimate research purposes</li>
          <li>Recipients are contractually prohibited from attempting re-identification</li>
          <li>Regular audits ensure compliance with data sharing terms</li>
        </ul>
        <p>Data may also be shared as required by law.</p>
      </section>
      <section id="legal-basis">
        <h2>Legal Basis For Processing</h2>
        <p>Under DPDPA 2023 Section 6, we process your personal data based on the following legal grounds:</p>
        <h3>Consent</h3>
        <ul>
          <li>Explicit consent for genetic testing services</li>
          <li>Separate opt-in consent for research participation</li>
          <li>Consent for marketing communications</li>
        </ul>
        <h3>Legitimate Interests</h3>
        <ul>
          <li>Website functionality and security</li>
          <li>Fraud prevention and detection</li>
          <li>Business analytics and improvement</li>
        </ul>
        <h3>Legal Obligations</h3>
        <ul>
          <li>Compliance with regulatory requirements</li>
          <li>Tax and accounting obligations</li>
          <li>Law enforcement requests where legally mandated</li>
        </ul>
      </section>
      <section id="data-retention">
        <h2>Data Retention</h2>
        <p>Core genetic data that has been anonymized and included in research datasets is retained indefinitely for the following reasons:</p>
        <ul>
          <li>Long-term longitudinal research studies require extended data retention</li>
          <li>Scientific reproducibility and validation of research findings</li>
          <li>Contribution to ongoing medical and genetic research advancement</li>
        </ul>
        <p>We will review our retention of genetic data periodically to assure that we are not maintaining any genetic data for which there is no longer a legitimate purpose.</p>
        <p>Outside of core genetic data, we will retain Identifiable Personal Data for the following terms:</p>
        <ul>
          <li>Account information: Retained while your account remains active</li>
          <li>Personal identifiers linked to genetic data: Retained for 10 years after account closure</li>
          <li>Payment and transaction data: Retained for 10 years for accounting purposes</li>
          <li>Communication records: Retained for 10 years</li>
        </ul>
        <p>
          Upon account deletion, we will remove your identifiable personal information and account data. However, anonymized genetic data that has been
          incorporated into research databases cannot be retrieved or deleted, as it has been irreversibly anonymized and may be part of ongoing or
          completed research studies.
        </p>
      </section>
      <section id="international-transfers">
        <h2>International Data Transfers</h2>
        <p>We may transfer your personal data outside India to:</p>
        <ul>
          <li>Cloud storage providers and data centers</li>
          <li>Research collaborators and institutions</li>
          <li>Service providers and technology partners</li>
        </ul>
        <p>All international transfers are protected by the following, as applicable:</p>
        <ul>
          <li>Standard contractual clauses approved under DPDPA 2023</li>
          <li>Adequacy decisions where applicable</li>
          <li>Binding corporate rules and certification programs</li>
          <li>Additional technical and organizational measures</li>
        </ul>
        <p>We will inform you of specific international transfers through this Privacy Policy or direct communication where required by law.</p>
      </section>
      <section id="your-rights">
        <h2>Your Rights Under DPDPA 2023, Section 11</h2>
        <p>You have the following rights regarding your personal data:</p>
        <PolicyCallout variant="rights" title="Right of Access" className="mb-6">
          <p className="mb-3">Which includes the right to:</p>
          <ul>
            <li>Request information about personal data we hold about you</li>
            <li>Obtain copies of your genetic reports and test results</li>
            <li>Understand how your data is being processed</li>
          </ul>
        </PolicyCallout>
        <PolicyCallout variant="rights" title="Right to Correction" className="mb-6">
          <p className="mb-3">Which includes the right to:</p>
          <ul>
            <li>Request correction of inaccurate personal information</li>
            <li>Update your account and contact details</li>
            <li>Modify health questionnaire responses</li>
          </ul>
        </PolicyCallout>
        <PolicyCallout variant="rights" title="Right to Data Portability" className="mb-6">
          <p>Which includes the right to request your personal data in a structured, commonly used format.</p>
        </PolicyCallout>
        <PolicyCallout variant="rights" title="Right to Withdraw Consent" className="mb-6">
          <p className="mb-3">Which includes the right to:</p>
          <ul>
            <li>Withdraw consent for research participation at any time</li>
            <li>Opt-out of marketing communications</li>
            <li>(with the understanding that withdrawal does not affect previously conducted research using anonymized data)</li>
          </ul>
        </PolicyCallout>
        <p>To exercise your rights, contact us at privacy@chiranjiv.com, or through your account settings.</p>
      </section>
      <section id="age-restriction">
        <h2>Age Restriction and Verification</h2>
        <p>
          Our Services are available only to individuals who are 18 years of age or older. We do not knowingly collect genetic samples or personal data from individuals under 18 years of age, and any samples or data found to have been collected by anyone under the age of 18 will be deleted.
        </p>
      </section>
      <section id="data-security">
        <h2>Data Security</h2>
        <p>We agree to provide the following technical safeguards:</p>
        <ul>
          <li>End-to-end encryption for data transmission and storage</li>
          <li>Multi-factor authentication for account access</li>
          <li>Regular security assessments and penetration testing</li>
          <li>Secure data centers with physical access controls</li>
        </ul>
        <p>Additionally, we agree to implement the following organizational measures:</p>
        <ul>
          <li>Employee training on data protection and genetic data sensitivity</li>
          <li>Role-based access controls and need-to-know principles</li>
          <li>Regular security audits and compliance reviews</li>
          <li>Incident response and breach notification procedures</li>
        </ul>
        <PolicyCallout variant="info" title="Extra Protection for Genetic Data" className="mt-6">
          <p className="mb-3">Given the sensitive nature of genetic information, we provide the following special protections:</p>
          <ul>
            <li>Additional encryption layers for genetic data</li>
            <li>Separate storage systems with enhanced access controls</li>
            <li>Regular security monitoring and threat detection</li>
            <li>Specialized protocols for genetic data handling</li>
          </ul>
        </PolicyCallout>
      </section>
      <section id="cookies">
        <h2>Cookies and Tracking Technologies</h2>
        <p>A computer cookie (or "web cookie") is a small text file that a website stores on your browser or device when you visit a website.</p>
        <p>We may use the following types of cookies:</p>
        <ul>
          <li>Essential cookies for website functionality</li>
          <li>Analytics cookies for usage statistics</li>
          <li>Marketing cookies for personalized advertising (with consent)</li>
          <li>Security cookies for fraud prevention</li>
        </ul>
        <p>You can control cookie preferences through:</p>
        <ul>
          <li>Browser settings and privacy controls</li>
          <li>Our cookie consent management platform</li>
          <li>Account privacy settings</li>
        </ul>
        <p>Some cookies may be placed by third-party service providers for:</p>
        <ul>
          <li>Website analytics (e.g., Google Analytics)</li>
          <li>Payment processing</li>
          <li>Customer support chat functionality</li>
        </ul>
      </section>
      <section id="changes">
        <h2>Changes to this Privacy Policy</h2>
        <p>We may update this Privacy Policy periodically to reflect:</p>
        <ul>
          <li>Changes in our data processing practices</li>
          <li>Modifications to applicable laws and regulations</li>
          <li>Introduction of new services or features</li>
          <li>Feedback from users and regulatory guidance</li>
        </ul>
        <p>
          Material changes will be communicated via email, and you will be informed if additional consents are required based on the material changes.
        </p>
        <p>
          For any non-material changes, updated Privacy Policies will be posted on our website with the applicable revision date. Your continued use of Services constitutes acceptance of those non-material changes.
        </p>
      </section>
      <section id="contact">
        <h2>Contact Information</h2>
        <p>For questions, concerns, or requests regarding this Privacy Policy or our general data practices, please contact:</p>
        <div className="mt-4 p-6 glass-backdrop backdrop-blur-sm border border-border/30 rounded-xl">
          <p className="font-semibold text-foreground mb-3">Data Protection Officer</p>
          <p className="text-muted-foreground font-light">Rapidera Technologies Pvt Ltd.</p>
          <p className="text-muted-foreground font-light">Email: <a href="mailto:privacy@chiranjiv.com" className="text-primary hover:underline font-medium">privacy@chiranjiv.com</a></p>
          <p className="text-muted-foreground font-light">Phone: <a href="tel:+919022823271" className="text-primary hover:underline font-medium">902-282-3271</a></p>
          <p className="text-muted-foreground font-light">Address: 703 Deron Heights, Baner Road, Baner, Pune 411045</p>
        </div>
        <p className="mt-4">We will acknowledge your inquiry within 72 hours and provide a substantive response within 30 days.</p>
        <p>
          For any complaints or grievances related to data processing, in addition to your ability to contact our Data Protection Officer directly, you have the right to file complaints with the Data Protection Board of India.
        </p>
      </section>
      <section>
        <p>
          This Privacy Policy represents our commitment to protecting your personal data and genetic information with the highest standards of privacy and security. We recognize the sensitive nature of genetic data and are dedicated to maintaining your trust through transparent and responsible data practices.
        </p>
      </section>
    </PolicyLayout>
  )
}


