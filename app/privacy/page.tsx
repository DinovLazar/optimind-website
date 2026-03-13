import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'OptiMind Privacy Policy — how we collect, use, and protect your information.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            Legal
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-400 dark:text-[#444444] text-sm">Last updated: January 1, 2025</p>
        </div>

        <div className="prose-dark">
          <p>
            OptiMind (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website optimind000.com or use our services. Please read this policy
            carefully. If you disagree with its terms, please discontinue use of our site.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect information about you in various ways:</p>
          <h3>Personal Data You Provide</h3>
          <p>
            When you fill out our contact form or communicate with us, we collect personally
            identifiable information, such as your:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Company name</li>
            <li>Any other information you choose to provide in your message</li>
          </ul>

          <h3>Automatically Collected Data</h3>
          <p>
            When you visit our website, certain information is collected automatically, including:
          </p>
          <ul>
            <li>IP address and general geographic location</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on those pages</li>
            <li>Referring URL</li>
            <li>Device type and operating system</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To send you information about our services when you request it</li>
            <li>To improve our website and services</li>
            <li>To comply with applicable legal obligations</li>
            <li>To prevent fraudulent or abusive use of our services</li>
            <li>To send you transactional emails related to your inquiries</li>
          </ul>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies to enhance your experience on our
            website. Cookies are small data files stored on your device. You can control cookies
            through your browser settings, but disabling cookies may affect certain features of our
            website.
          </p>
          <p>Types of cookies we may use:</p>
          <ul>
            <li><strong className="text-gray-800 dark:text-[#cccccc]">Essential cookies:</strong> Required for the website to function properly.</li>
            <li><strong className="text-gray-800 dark:text-[#cccccc]">Analytics cookies:</strong> Help us understand how visitors interact with our site.</li>
            <li><strong className="text-gray-800 dark:text-[#cccccc]">Preference cookies:</strong> Remember your settings and preferences.</li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>
            We use the following third-party services that may collect or process your data:
          </p>
          <ul>
            <li>
              <strong className="text-gray-800 dark:text-[#cccccc]">Resend</strong> — Used to send transactional emails (contact form confirmations and notifications). Resend processes your email address and name when you submit our contact form. For more information, see{' '}
              <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer">Resend&apos;s Privacy Policy</a>.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-[#cccccc]">Vercel</strong> — Our website is hosted on Vercel, which may collect server logs and analytics. See{' '}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel&apos;s Privacy Policy</a>.
            </li>
          </ul>
          <p>
            We do not sell your personal information to third parties. We may share your information
            with third parties only as necessary to operate our services or as required by law.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the
            purposes outlined in this Privacy Policy, unless a longer retention period is required
            by law. Contact form submissions are retained for up to 2 years to facilitate follow-up
            communication.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            Depending on your location and applicable law, you may have the following rights
            regarding your personal data:
          </p>
          <ul>
            <li><strong className="text-gray-800 dark:text-[#cccccc]">Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong className="text-gray-800 dark:text-[#cccccc]">Correction:</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong className="text-gray-800 dark:text-[#cccccc]">Deletion:</strong> Request deletion of your personal data, subject to legal obligations.</li>
            <li><strong className="text-gray-800 dark:text-[#cccccc]">Objection:</strong> Object to the processing of your personal data.</li>
            <li><strong className="text-gray-800 dark:text-[#cccccc]">Portability:</strong> Request a portable copy of your data in a structured format.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:hello@optimind000.com">hello@optimind000.com</a>. We will respond within
            30 days.
          </p>

          <h2>7. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect your personal
            information from unauthorized access, alteration, disclosure, or destruction. However,
            no method of transmission over the internet or electronic storage is 100% secure, and
            we cannot guarantee absolute security.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our website and services are not directed to individuals under the age of 16. We do not
            knowingly collect personal information from children. If you believe we have
            inadvertently collected information from a minor, please contact us immediately.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            OptiMind is based in North Macedonia. If you are accessing our services from outside
            North Macedonia, your information may be transferred to, stored, and processed in
            countries where our service providers operate. We take steps to ensure adequate
            protection is in place for such transfers.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the
            &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy
            periodically. Your continued use of our website after changes constitutes acceptance of
            the updated policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data
            practices, please contact us:
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
