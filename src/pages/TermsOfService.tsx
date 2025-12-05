import { PolicyLayout } from '@/components/PolicyLayout'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TermsOfService() {
  return (
    <PolicyLayout 
      title="Terms Of Service" 
      lastUpdated="November 1, 2025"
    >
      <section id="introduction" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-0">Introduction and Acceptance of Terms</h2>
        
        <p className="mb-4 leading-relaxed">
          These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and Rapidera Technologies Pvt Ltd., a Rapidera incorporated under the laws of India with its registered office at 703 Deron Heights, Baner Road, Baner, Pune 411045, India ("Rapidera", "we", "us", or "our"). By accessing, browsing, or using our website located at https://chiranjiv.com/ (the "Website") or any of our related services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Website or Services.
        </p>
      </section>

      <section id="definitions" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Definitions</h2>
        
        <p className="mb-4 leading-relaxed">
          For the purposes of these Terms:
        </p>
        
        <ol className="list-[lower-alpha] list-outside ml-6 space-y-2 mb-4">
          <li>
            <strong>"Content"</strong> means all text, graphics, images, music, software, audio, video, information, and other materials posted, uploaded, transmitted, or otherwise made available through the Website;
          </li>
          <li>
            <strong>"Intellectual Property Rights"</strong> means all intellectual property rights worldwide, including without limitation, copyrights, trademarks, patents, trade secrets, moral rights, and any other proprietary rights;
          </li>
          <li>
            <strong>"Services"</strong> means all products, services, applications, and functionalities provided by Rapidera through the Website;
          </li>
          <li>
            <strong>"User Content"</strong> means any content that you submit, post, upload, or otherwise transmit through the Website;
          </li>
          <li>
            <strong>"Personal Data"</strong> shall have the meaning ascribed to it under applicable Indian data protection laws.
          </li>
        </ol>
      </section>

      <section id="services" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Services Description</h2>
        
        <p className="mb-4 leading-relaxed">
          Rapidera provides genomic testing, analysis and reporting services, along with associated research. Rapidera reserves the right to modify, suspend, or discontinue any aspect of the Services at any time without prior notice.
        </p>
      </section>

      <section id="accounts" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">User Accounts and Registration</h2>
        
        <p className="mb-4 leading-relaxed">
          <strong>Registration Requirements:</strong> To access certain features of our Services, you may be required to create a user account. You must provide accurate, current, and complete information during registration and keep your account information updated.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Age Restrictions:</strong> You must be at least 18 years of age to create an account or use our Services. By creating an account, you represent and warrant that you are at least 18 years old.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Account Termination:</strong> We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason deemed appropriate by us in our sole discretion.
        </p>
      </section>

      <section id="acceptable-use" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">User Obligations and Acceptable Use</h2>
        
        <p className="mb-4 leading-relaxed">
          <strong>Compliance with Laws:</strong> You agree to comply with all applicable local, state, national, and international laws and regulations in your use of the Website and Services.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Prohibited Activities.</strong> You shall not:
        </p>
        
        <ol className="list-[lower-alpha] list-outside ml-6 space-y-2 mb-4">
          <li>Use the Website or Services for any unlawful purpose or in violation of these Terms;</li>
          <li>Attempt to gain unauthorized access to any portion of the Website or Services;</li>
          <li>Interfere with or disrupt the operation of the Website or Services;</li>
          <li>Transmit any viruses, malware, or other harmful code;</li>
          <li>Engage in any activity that could damage, disable, overburden, or impair our servers or networks;</li>
          <li>Harvest or collect information about other users without their consent;</li>
          <li>Use the Website or Services to transmit spam, chain letters, or other unsolicited communications;</li>
          <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
        </ol>
      </section>

      <section id="intellectual-property" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Intellectual Property Rights</h2>
        
        <p className="mb-4 leading-relaxed">
          <strong>Rapidera IP:</strong> All Content on the Website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Rapidera or its licensors and is protected by Indian and international copyright, trademark, and other intellectual property laws.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Restrictions on Use:</strong> You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any Content except as expressly permitted by these Terms.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Trademarks:</strong> The Chiranjiv and Rapidera names, logos, and all related names, logos, product and service names, designs, and slogans are trademarks of Rapidera. You shall not use such marks without our prior written permission.
        </p>
      </section>

      <section id="privacy" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Privacy and Data Protection</h2>
        
        <p className="mb-4 leading-relaxed">
          <strong>Privacy Policy:</strong> Your privacy is important to us. Please review our Privacy Policy, which governs the collection, use, and disclosure of your Personal Data.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Data Protection Compliance:</strong> We comply with applicable Indian data protection laws, including the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
        </p>
      </section>

      <section id="payment" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Payment Terms</h2>
        
        <p className="mb-4 leading-relaxed">
          <strong>Fees:</strong> Certain Services may be subject to fees. All fees are non-refundable unless otherwise specified.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Payment Processing:</strong> Payments are processed through secure third-party payment processors. You agree to provide accurate payment information and authorize us to charge your designated payment method.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Tax Obligations:</strong> You are responsible for all applicable taxes, including but not limited to goods and services tax (GST) and other taxes as required under Indian law.
        </p>
      </section>

      <section id="disclaimers" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Disclaimers and Warranties</h2>
        
        <p className="mb-4 leading-relaxed">
          <strong className="uppercase">AS IS BASIS:</strong> THE WEBSITE AND SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong className="uppercase">DISCLAIMER:</strong> RAPIDERA DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong className="uppercase">NO GUARANTEE:</strong> RAPIDERA DOES NOT WARRANT THAT THE WEBSITE OR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.
        </p>
      </section>

      <section id="liability" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Limitation of Liability</h2>
        
        <p className="mb-4 leading-relaxed">
          <strong>11.1 LIABILITY CAP:</strong> TO THE MAXIMUM EXTENT PERMITTED BY INDIAN LAW, RAPIDERA'S TOTAL LIABILITY TO YOU FOR ANY DAMAGES ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF THE WEBSITE OR SERVICES SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO THE RAPIDERA IN THE 12 MONTHS PRECEDING THE CLAIM.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong className="uppercase">EXCLUDED DAMAGES:</strong> IN NO EVENT SHALL RAPIDERA BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL.
        </p>
      </section>

      <section id="indemnification" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Indemnification</h2>
        
        <p className="mb-4 leading-relaxed">
          You agree to indemnify, defend, and hold harmless Rapidera, its officers, directors, employees, agents, and affiliates from and against any and all third-party claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of the Website or Services, your User Content, or your violation of these Terms.
        </p>
      </section>

      <section id="third-party" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Third-Party Links</h2>
        
        <p className="mb-4 leading-relaxed">
          The Website may contain links to third-party websites or services. Rapidera is not responsible for the content, privacy policies, or practices of any third-party websites or services. You access such third-party websites or services at your own risk.
        </p>
      </section>

      <section id="modifications" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Modification of Terms</h2>
        
        <p className="mb-4 leading-relaxed">
          Rapidera reserves the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on the Website with a new "Last Updated" date. Your continued use of the Website after such changes constitutes acceptance of the modified Terms.
        </p>
      </section>

      <section id="termination" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Termination</h2>
        
        <p className="mb-4 leading-relaxed">
          <strong>Termination Rights:</strong> Rapidera may terminate or suspend your access to the Website or Services immediately, without prior notice or liability, for any reason, including breach of these Terms.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Effect of Termination:</strong> Upon termination, your right to use the Website and Services will cease immediately. Provisions that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
        </p>
      </section>

      <section id="dispute-resolution" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Dispute Resolution And Governing Law</h2>
        
        <p className="mb-4 leading-relaxed">
          <strong>Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of India.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Jurisdiction:</strong> The courts of Pune, Maharashtra shall have exclusive jurisdiction over any disputes arising out of or relating to these Terms.
        </p>
        
        <p className="mb-4 leading-relaxed">
          <strong>Arbitration:</strong> Any dispute, controversy, or claim arising out of or relating to these Terms shall be settled by arbitration in accordance with the Arbitration and Conciliation Act, 2015. The arbitration shall be conducted in English and shall take place in Pune, Maharashtra, India.
        </p>
      </section>

      <section id="severability" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Severability</h2>
        
        <p className="mb-4 leading-relaxed">
          If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. The invalid or unenforceable provision shall be replaced with a valid and enforceable provision that most closely matches the intent of the original provision.
        </p>
      </section>

      <section id="entire-agreement" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Entire Agreement</h2>
        
        <p className="mb-4 leading-relaxed">
          These Terms, together with our Privacy Policy and any other legal notices published on the Website, constitute the entire agreement between you and Rapidera regarding your use of the Website and Services.
        </p>
      </section>

      <section id="contact" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Contact Information</h2>
        
        <p className="mb-4 leading-relaxed">
          If you have any questions about these Terms, please contact us at:
        </p>
        
        <Alert className="mt-4 mb-4 bg-neutral-50">
          <AlertTitle className="font-semibold text-foreground mb-3">Rapidera Technologies Pvt Ltd.</AlertTitle>
          <AlertDescription className="text-neutral-600 font-light">
            <p>Email: <a href="mailto:support@chiranjiv.com" className="text-primary-600 hover:underline font-medium">support@chiranjiv.com</a></p>
            <p>Address: 703 Deron Heights, Baner Road, Baner, Pune 411045, India</p>
          </AlertDescription>
        </Alert>
      </section>
    </PolicyLayout>
  )
}
