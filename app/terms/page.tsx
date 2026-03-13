import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'OptiMind Terms & Conditions — the rules and guidelines governing use of our services.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            Legal
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-400 dark:text-[#444444] text-sm">Last updated: January 1, 2025</p>
        </div>

        <div className="prose-dark">
          <p>
            Please read these Terms and Conditions (&quot;Terms&quot;) carefully before using the website
            at optimind000.com or engaging OptiMind&apos;s services. By accessing or using our website
            and services, you agree to be bound by these Terms. If you do not agree, please do not
            use our services.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing our website or entering into a service agreement with OptiMind, you
            confirm that you are at least 18 years old, have the legal authority to enter into
            agreements on behalf of yourself or your organization, and agree to be bound by these
            Terms and our Privacy Policy.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            OptiMind provides AI-powered customer support automation services, including but not
            limited to:
          </p>
          <ul>
            <li>Custom AI customer support agents for email and live chat</li>
            <li>Agent training on client-provided business data</li>
            <li>Ongoing maintenance, monitoring, and performance reporting</li>
            <li>Optional weekly newsletter generation services (when available)</li>
          </ul>
          <p>
            The specific scope, deliverables, pricing, and timelines for each client engagement
            will be detailed in a separate service agreement or statement of work.
          </p>

          <h2>3. Use of the Website</h2>
          <p>
            You agree to use our website only for lawful purposes. You must not:
          </p>
          <ul>
            <li>Use the website in any way that violates applicable local, national, or international law</li>
            <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
            <li>Attempt to gain unauthorized access to our systems or networks</li>
            <li>Use the website to transmit harmful, offensive, or disruptive content</li>
            <li>Scrape, crawl, or extract data from our website without prior written consent</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on this website — including but not limited to text, graphics, logos,
            icons, and software — is the property of OptiMind and is protected by applicable
            intellectual property laws. You may not reproduce, distribute, or create derivative
            works without our express written permission.
          </p>
          <p>
            Upon full payment for services, OptiMind grants clients a non-exclusive, non-transferable
            license to use the AI agent and deliverables provided as part of their service agreement,
            solely for their own internal business purposes.
          </p>

          <h2>5. Client Responsibilities</h2>
          <p>
            Clients engaging OptiMind&apos;s services agree to:
          </p>
          <ul>
            <li>Provide accurate, up-to-date business information for agent training</li>
            <li>Obtain all necessary rights and permissions for any data, content, or materials provided to OptiMind</li>
            <li>Designate a point of contact to review agent outputs and provide feedback</li>
            <li>Comply with all applicable laws governing the use of automated messaging and AI systems in their jurisdiction</li>
            <li>Not misrepresent the AI agent as a human to end customers in violation of applicable law</li>
          </ul>

          <h2>6. Payment Terms</h2>
          <p>
            Payment terms will be specified in each client&apos;s individual service agreement. Unless
            otherwise agreed in writing:
          </p>
          <ul>
            <li>Invoices are due within 14 days of issuance</li>
            <li>Late payments may incur interest at 1.5% per month</li>
            <li>OptiMind reserves the right to suspend services for accounts with overdue balances</li>
          </ul>

          <h2>7. Confidentiality</h2>
          <p>
            Both parties agree to keep confidential any non-public information disclosed during the
            course of the engagement. This includes business data, product information, customer
            data, pricing, and technical specifications. Confidentiality obligations survive
            termination of the service agreement for a period of three (3) years.
          </p>

          <h2>8. Data and Privacy</h2>
          <p>
            Our collection and use of personal data is governed by our{' '}
            <a href="/privacy">Privacy Policy</a>. Clients are responsible for ensuring they have
            the appropriate legal basis to share any customer or business data with OptiMind for
            the purposes of agent training and operation.
          </p>

          <h2>9. Disclaimers and Limitation of Liability</h2>
          <p>
            Our website and services are provided &quot;as is&quot; without warranties of any kind, express
            or implied. OptiMind does not guarantee that:
          </p>
          <ul>
            <li>AI agent responses will be 100% accurate or free from errors</li>
            <li>Services will be uninterrupted or error-free at all times</li>
            <li>Results will meet any specific performance benchmarks not expressly agreed in writing</li>
          </ul>
          <p>
            To the maximum extent permitted by law, OptiMind shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of your use of our
            services, even if we have been advised of the possibility of such damages. Our total
            liability shall not exceed the amount paid by you to OptiMind in the three months
            preceding the claim.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless OptiMind and its founders, employees,
            and agents from and against any claims, liabilities, damages, losses, and expenses
            arising out of: (a) your use of our services; (b) your violation of these Terms;
            (c) your violation of any third-party rights; or (d) any content you provide to
            OptiMind for agent training.
          </p>

          <h2>11. Termination</h2>
          <p>
            Either party may terminate a service engagement in accordance with the terms set out in
            the relevant service agreement. OptiMind reserves the right to terminate or suspend
            access to its services immediately, without notice, for conduct that OptiMind believes
            violates these Terms or is harmful to other users, OptiMind, or third parties.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            Republic of North Macedonia, without regard to its conflict of law provisions. Any
            disputes arising under these Terms shall be subject to the exclusive jurisdiction of
            the courts of North Macedonia.
          </p>

          <h2>13. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. When we do, we will update the
            &quot;Last updated&quot; date. Continued use of our website or services after changes constitutes
            acceptance of the new Terms. For active service clients, material changes will be
            communicated directly via email.
          </p>

          <h2>14. Contact</h2>
          <p>
            For questions about these Terms, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:hello@optimind000.com">hello@optimind000.com</a></li>
            <li>Company: OptiMind</li>
            <li>Location: Strumica, North Macedonia</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
