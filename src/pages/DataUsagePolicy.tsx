import { PolicyLayout } from '@/components/policy-layout'
import { PolicyCallout } from '@/components/policy-callout'

const sections = [
  { id: 'purpose', label: 'Purpose & Scope' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'classification', label: 'Data Classification' },
  { id: 'permitted-uses', label: 'Permitted Uses' },
  { id: 'prohibited-uses', label: 'Prohibited Uses' },
  { id: 'access-security', label: 'Data Access & Security' },
  { id: 'personal-data', label: 'Personal Data & Privacy' },
  { id: 'genetic-data', label: 'Genetic Data Requirements' },
  { id: 'retention', label: 'Data Retention & Disposal' },
  { id: 'third-party', label: 'Third-Party Data Sharing' },
  { id: 'monitoring', label: 'Monitoring & Enforcement' },
  { id: 'reporting', label: 'Reporting Violations' },
  { id: 'updates', label: 'Policy Updates' }
]

export default function DataUsagePolicy() {
  return (
    <PolicyLayout 
      title="Data Usage Policy" 
      effectiveDate="November ___, 2025" 
      lastUpdated="November ___, 2025"
      category="Internal Policy · Data Governance"
      sections={sections}
    >
      <section id="purpose">
        <h2>Purpose and Scope</h2>
        <p>
          This Data Usage Policy ("Policy") establishes the requirements and standards for the appropriate use, protection, and management of all data assets within Rapidera Technologies Pvt Ltd. This Policy applies to all employees, contractors, consultants, temporary staff, interns, and any other individuals who have access to Rapidera Data ("Users"). This Policy governs all data in any format, including but not limited to electronic, physical, written, or verbal communications, regardless of the medium on which it is stored or transmitted.
        </p>
      </section>
      <section id="definitions">
        <h2>Definitions</h2>
        <p>For purposes of this Policy, the following terms shall have the meanings set forth below:</p>
        <PolicyCallout variant="definition" title="Key Terms">
        <p>
          <strong>"Authorized Use"</strong> means the use of Rapidera Data solely for legitimate business purposes in accordance with this Policy.
        </p>
        <p>
          <strong>"Rapidera Data"</strong> means any and all data, information, records, documents, files, databases, or other materials owned, controlled, processed, or maintained by Rapidera, regardless of format or medium.
        </p>
        <p>
          <strong>"Confidential Information"</strong> means any non-public Rapidera Data that could reasonably be expected to cause harm to Rapidera or its stakeholders if disclosed without authorization, including but not limited to proprietary business information, strategic plans, financial data, and trade secrets.
        </p>
        <p>
          <strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person, including but not limited to names, addresses, phone numbers, email addresses, social security numbers, Genetic Data, financial account information, and any other data that can be used to identify an individual.
        </p>
        <p>
          <strong>"Genetic Data"</strong> means any data relating to the inherited or acquired genetic characteristics of an individual, including but not limited to DNA sequences, RNA sequences, whole genome sequencing data, exome data, genotyping data, genetic variants, SNPs (single nucleotide polymorphisms), copy number variations, epigenetic information, gene expression data, and any analysis or interpretation derived from such data.
        </p>
        <p>
          <strong>"Restricted Data"</strong> means highly sensitive Rapidera Data that requires the highest level of protection, including but not limited to personal data of customers or employees, financial records, legal documents, and information subject to regulatory requirements.
        </p>
        </PolicyCallout>
      </section>
      <section id="classification">
        <h2>Data Classification</h2>
        <p className="mb-6">All Rapidera Data shall be classified into one of the following categories:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-border/30 bg-muted/10 hover:bg-muted/20 transition-all duration-300">
            <h3 className="text-lg font-medium text-foreground mb-2">Public Data</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">Information that has been specifically approved for public disclosure and would not harm Rapidera if released, such as published marketing materials and public announcements.</p>
          </div>
          <div className="p-5 rounded-xl border border-border/30 bg-muted/10 hover:bg-muted/20 transition-all duration-300">
            <h3 className="text-lg font-medium text-foreground mb-2">Internal Data</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">Information intended for use within Rapidera that is not confidential but should not be shared externally without proper authorization, such as internal policies, general business communications, and organizational charts.</p>
          </div>
          <div className="p-5 rounded-xl border border-border/30 bg-amber-500/10 hover:bg-amber-500/20 transition-all duration-300">
            <h3 className="text-lg font-medium text-foreground mb-2">Confidential Data</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">Sensitive business information that could cause harm to Rapidera if disclosed inappropriately, such as business strategies, vendor contracts, employee performance reviews, and customer lists.</p>
          </div>
          <div className="p-5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-all duration-300">
            <h3 className="text-lg font-medium text-foreground mb-2">Restricted Data</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">Highly sensitive information requiring the highest level of protection, such as genetic data, personal data, financial records, legal privileged communications, trade secrets, and information subject to regulatory compliance requirements.</p>
          </div>
        </div>
      </section>
      <section id="permitted-uses">
        <h2>Permitted Uses</h2>
        <p>Users are authorized to access and use Rapidera Data only for the following purposes:</p>
        <ul>
          <li>Performing assigned job duties and responsibilities in furtherance of legitimate business objectives.</li>
          <li>Complying with legal, regulatory, or audit requirements.</li>
          <li>Supporting authorized business operations, decision-making, and strategic planning.</li>
          <li>Providing authorized customer service and support.</li>
          <li>Conducting authorized research and development activities.</li>
        </ul>
      </section>
      <section id="prohibited-uses">
        <h2>Prohibited Uses</h2>
        <p>Users are strictly prohibited from:</p>
        <PolicyCallout variant="warning" title="You must not:">
          <ul>
            <li>Using Rapidera Data for personal gain, commercial purposes unrelated to Rapidera business, or any illegal activities.</li>
            <li>Sharing, disclosing, or transmitting Rapidera Data to unauthorized parties, including family members, friends, or external organizations without proper authorization.</li>
            <li>Accessing Rapidera Data beyond what is necessary for their job responsibilities or without proper authorization.</li>
            <li>Copying, downloading, or removing Rapidera Data from Rapidera premises or systems without explicit written authorization.</li>
            <li>Using Rapidera Data to compete with Rapidera or to benefit competitors.</li>
            <li>Modifying, destroying, or corrupting Rapidera Data without authorization.</li>
            <li>Circumventing security controls or attempting to gain unauthorized access to data systems.</li>
            <li>Using Genetic Data for any discriminatory purpose, for purposes beyond those authorized by consent.</li>
          </ul>
        </PolicyCallout>
      </section>
      <section id="access-security">
        <h2>Data Access and Security</h2>
        <p>
          <strong>Access Control:</strong> Access to Rapidera Data shall be granted on a need-to-know basis and limited to the minimum necessary for Users to perform their job functions.
        </p>
        <p>
          <strong>Authentication:</strong> Users must use strong, unique passwords and enable multi-factor authentication where available. Passwords must not be shared or written down in accessible locations.
        </p>
        <p>
          <strong>Device Security:</strong> All devices used to access Rapidera Data must be properly secured with updated security software, encryption where required, and automatic locking mechanisms.
        </p>
        <p>
          <strong>Network Security:</strong> Rapidera Data must only be accessed through approved networks and systems. Use of public Wi-Fi for accessing Confidential or Restricted Data is prohibited.
        </p>
        <p>
          <strong>Physical Security:</strong> Physical documents containing Rapidera Data must be stored securely and not left unattended in public areas.
        </p>
      </section>
      <section id="personal-data">
        <h2>Personal Data And Privacy</h2>
        <p>
          <strong>Privacy Compliance:</strong> All processing of Personal Data must comply with applicable privacy laws and regulations, including but not limited to the Digital Personal Data Protection Act, 2023 ("DPDPA 2023"); the General Data Protection Regulation (GDPR); and other relevant data protection laws.
        </p>
        <p>
          <strong>Lawful Basis:</strong> Personal Data may only be processed when there is a lawful basis for such processing, such as consent, contract performance, legal obligation, or legitimate business interest.
        </p>
        <p>
          <strong>Data Minimization:</strong> Collection and processing of Personal Data must be limited to what is necessary for the specified business purpose.
        </p>
        <p>
          <strong>Individual Rights:</strong> Users must respect and facilitate the exercise of individual privacy rights, including rights of access, correction, deletion, and portability where applicable.
        </p>
      </section>
      <section id="genetic-data">
        <h2>Genetic Data Specific Requirements</h2>
        <PolicyCallout variant="warning" title="⚠️ Critical: Genetic Data Handling">
          <p className="mb-3 font-medium">Genetic data is the most sensitive category and requires the highest level of care and protection at all times.</p>
        </PolicyCallout>
        <h3 className="mt-6">Enhanced Consent</h3>
        <p>Collection of Genetic Data requires explicit, informed, and written consent that clearly describes:</p>
        <PolicyCallout variant="info" className="mb-6">
          <ul>
            <li>The specific purposes for which the Genetic Data will be used</li>
            <li>The types of analysis that will be performed</li>
            <li>How long the data will be retained</li>
            <li>Whether the data will be shared with third parties</li>
            <li>The individual's right to withdraw consent</li>
            <li>Potential risks and implications of genetic testing</li>
          </ul>
        </PolicyCallout>
        <h3>Purpose Limitation</h3>
        <p>Genetic Data may only be used for the specific purposes disclosed to and authorized by the individual. Any secondary use or repurposing of Genetic Data requires separate explicit consent unless anonymized.</p>
        <h3 className="mt-6">Heightened Security</h3>
        <p>Genetic Data must be subject to enhanced security measures including:</p>
        <PolicyCallout variant="info" className="mb-6">
          <ul>
            <li>Encryption at rest and in transit using industry-standard encryption protocols</li>
            <li>Access limited to specifically authorized personnel with documented business need</li>
            <li>Storage in segregated systems with additional access controls</li>
            <li>Prohibition on storage on portable devices or personal computers</li>
            <li>Regular security audits and penetration testing</li>
          </ul>
        </PolicyCallout>
        <h3 className="mt-6">Discrimination Prohibition</h3>
        <PolicyCallout variant="warning" className="mb-6">
          <p>
            Genetic Data must not be used to discriminate against individuals in employment, promotion, benefits, insurance, or any other employment-related decisions. Users are strictly prohibited from using Genetic Data for any purpose other than the explicitly authorized research, diagnostic, or therapeutic purposes.
          </p>
        </PolicyCallout>
        <h3>Family Implications</h3>
        <p>Users must recognize that Genetic Data may reveal information about biological relatives. Any disclosure or use of Genetic Data must consider and address potential implications for family members.</p>
        <h3>De-identification and Anonymization</h3>
        <p>When Genetic Data is de-identified or anonymized for research purposes, the process must ensure that:</p>
        <ul>
          <li>All direct identifiers are removed</li>
          <li>The risk of re-identification is minimized using current technical standards</li>
          <li>Genealogical databases and other publicly available genetic information are considered in assessing re-identification risk</li>
          <li>A documented process exists to prevent re-identification</li>
        </ul>
        <h3>Research Use</h3>
        <p>Use of Genetic Data for research purposes requires:</p>
        <ul>
          <li>Approval from an Institutional Review Board (IRB) or ethics committee where applicable</li>
          <li>Compliance with all applicable research regulations including the Common Rule and Good Clinical Practice guidelines</li>
          <li>Data use agreements that restrict further use and disclosure</li>
          <li>Regular review of ongoing appropriateness of data use</li>
        </ul>
        <h3>Return of Results</h3>
        <p>Rapidera has established clear policies regarding whether and under what circumstances genetic findings will be returned to individuals, including procedures for handling incidental findings of clinical significance.</p>
        <h3>Right to Withdraw</h3>
        <p>Individuals have the right to withdraw consent for future use of their Genetic Data. Upon withdrawal:</p>
        <ul>
          <li>No new analysis or processing shall occur</li>
          <li>The individual's Genetic Data shall be deleted or returned as requested, except where retention is required by law or where data has been irreversibly anonymized</li>
          <li>Data already incorporated into completed research may remain in published results</li>
        </ul>
        <h3>Regulatory Compliance</h3>
        <p>All collection, use, storage, and disclosure of Genetic Data must comply with applicable laws and regulations.</p>
        <h3>Third-Party Sharing</h3>
        <p>Genetic Data may only be shared with third parties when:</p>
        <ul>
          <li>Explicitly authorized by the individual's informed consent</li>
          <li>Required by law</li>
          <li>Necessary for treatment purposes with healthcare providers</li>
          <li>The data has been properly anonymized</li>
        </ul>
        <p>All third-party recipients must enter into written agreements that impose equivalent or greater protections.</p>
        <h3 className="mt-6">Data Breach Protocol</h3>
        <p>Any unauthorized access, disclosure, or breach involving Genetic Data must be treated as a high-severity incident requiring:</p>
        <PolicyCallout variant="warning" title="🚨 Immediate Action Required" className="mb-6">
          <ul>
            <li>Immediate notification to senior management and legal counsel</li>
            <li>Prompt investigation and containment</li>
            <li>Notification to affected individuals in accordance with applicable law</li>
            <li>Notification to relevant regulatory authorities where required</li>
          </ul>
        </PolicyCallout>
      </section>
      <section id="retention">
        <h2>Data Retention and Disposal</h2>
        <p>
          <strong>Retention Schedules:</strong> Rapidera Data shall be retained in accordance with applicable legal requirements and established retention schedules. Data must not be kept longer than necessary for its intended business purpose. Genetic Data retention periods must be specifically disclosed during the consent process and must not exceed the period necessary for the authorized purpose unless ongoing retention is separately authorized.
        </p>
        <p>
          <strong>Secure Disposal:</strong> When Rapidera Data reaches the end of its retention period or is no longer needed, it must be securely disposed of using approved methods that ensure the data cannot be recovered or reconstructed.
        </p>
        <p>
          <strong>Media Destruction:</strong> Physical media containing Rapidera Data must be destroyed using approved methods, and certificates of destruction must be obtained and retained where required.
        </p>
      </section>
      <section id="third-party">
        <h2>Third-Party Data Sharing</h2>
        <p>
          <strong>Authorization Required:</strong> Sharing Rapidera Data with third parties requires explicit written authorization from management and must be governed by appropriate contracts that include data protection obligations.
        </p>
        <p>
          <strong>Vendor Management:</strong> Third-party vendors with access to Rapidera Data must be vetted for security capabilities and must enter into data processing agreements that include appropriate security and confidentiality requirements.
        </p>
        <p>
          <strong>Cross-Border Transfers:</strong> International transfers of Personal Data must comply with applicable legal requirements and may require additional safeguards such as standard contractual clauses or adequacy decisions.
        </p>
      </section>
      <section id="monitoring">
        <h2>Monitoring and Enforcement</h2>
        <p>
          <strong>Monitoring Rights:</strong> Rapidera reserves the right to monitor, audit, and review data usage and access to ensure compliance with this Policy and applicable laws.
        </p>
        <PolicyCallout variant="warning" title="Violation Consequences" className="mb-6">
          <p>
            Violations of this Policy may result in disciplinary action up to and including termination of employment or engagement, legal action, and potential criminal prosecution.
          </p>
        </PolicyCallout>
        <p>
          <strong>Investigation:</strong> Rapidera will investigate all suspected or reported violations of this Policy and will take appropriate corrective and disciplinary action.
        </p>
      </section>
      <section id="reporting">
        <h2>Reporting Violations</h2>
        <PolicyCallout variant="warning" title="Reporting Obligation" className="mb-6">
          <p>
            Users must immediately report any suspected or actual violations of this Policy, security incidents, unauthorized access to Rapidera Data, or any breach or unauthorized disclosure of Genetic Data.
          </p>
        </PolicyCallout>
        <p>
          <strong>Reporting Channels:</strong> Violations may be reported to direct supervisors, the IT Security team, Human Resources, or through Rapidera's confidential reporting hotline.
        </p>
        <PolicyCallout variant="rights" title="No Retaliation" className="mt-4">
          <p>
            Rapidera prohibits retaliation against individuals who report violations in good faith.
          </p>
        </PolicyCallout>
      </section>
      <section id="updates">
        <h2>Policy Updates And Acknowledgment</h2>
        <p>
          <strong>Policy Updates:</strong> Rapidera reserves the right to modify this Policy at any time. Users will be notified of material changes, and continued access to Rapidera Data constitutes acceptance of any modifications.
        </p>
        <p>
          <strong>Acknowledgment Requirement:</strong> All Users must acknowledge receipt and understanding of this Policy in writing and must re-acknowledge upon any material updates.
        </p>
        <p>
          <strong>Training:</strong> Rapidera may require Users to complete training on data usage and protection practices as a condition of accessing Rapidera Data.
        </p>
      </section>
      <section>
        <p>This Policy is effective immediately and supersedes all previous data usage policies. Questions regarding this Policy should be directed to compliance@chiranjiv.com.</p>
      </section>
    </PolicyLayout>
  )
}


