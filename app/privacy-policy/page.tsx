import { Shield, Lock, Eye, Users, Database, Mail, Globe, AlertCircle } from "lucide-react";
import { LegalPageLayout } from "@/components/legal-page-layout";
import "@/components/legal-page-styles.css";

export const metadata = {
  title: "Privacy Policy | She Sharp",
  description: "She Sharp's privacy policy - how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout 
      title="Privacy Policy" 
      icon={<Shield className="h-12 w-12 text-white" />}
    >
      <div className="legal-content">
        {/* Introduction */}
        <section className="legal-section">
          <div className="legal-info-box">
            <h2 className="!mt-0">Your Privacy Matters</h2>
            <p className="text-lg mb-0">
              She Sharp is committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website or participate in our 
              events and programs.
            </p>
          </div>
          
          <p className="mt-6">
            As a registered New Zealand charity (CC57025), we adhere to the Privacy Act 2020 and are committed 
            to protecting the privacy of our members, volunteers, sponsors, and website visitors.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="legal-section">
          <h2>Information We Collect</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="legal-highlight-box">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-dark/10 rounded-lg">
                  <Users className="h-6 w-6 text-purple-dark" />
                </div>
                <div>
                  <h3 className="!mt-0 text-lg">Personal Information</h3>
                  <ul className="legal-icon-list !my-3">
                    <li>Name and contact details</li>
                    <li>Professional information</li>
                    <li>Educational background</li>
                    <li>Event participation</li>
                    <li>Mentorship details</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="legal-highlight-box">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-periwinkle-dark/10 rounded-lg">
                  <Globe className="h-6 w-6 text-periwinkle-dark" />
                </div>
                <div>
                  <h3 className="!mt-0 text-lg">Automatic Collection</h3>
                  <ul className="legal-icon-list !my-3">
                    <li>IP address & browser type</li>
                    <li>Device information</li>
                    <li>Pages visited</li>
                    <li>Time spent on site</li>
                    <li>Referring websites</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="legal-section">
          <h2>How We Use Your Information</h2>
          
          <div className="legal-numbered-list">
            <div className="flex items-start gap-4">
              <span className="number">1</span>
              <div>
                <h4 className="font-semibold text-navy-dark mb-2">Event Management</h4>
                <p className="text-gray">Process registrations and manage attendance for our networking events and workshops.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="number">2</span>
              <div>
                <h4 className="font-semibold text-navy-dark mb-2">Mentorship Program</h4>
                <p className="text-gray">Facilitate mentor-mentee matching and program administration.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="number">3</span>
              <div>
                <h4 className="font-semibold text-navy-dark mb-2">Communications</h4>
                <p className="text-gray">Send newsletters, event updates, and program information (with your consent).</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="number">4</span>
              <div>
                <h4 className="font-semibold text-navy-dark mb-2">Service Improvement</h4>
                <p className="text-gray">Analyze usage patterns to enhance our website and services.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="legal-section">
          <h2>Data Security</h2>
          
          <div className="legal-warning-box">
            <div className="flex items-start gap-4">
              <Lock className="h-6 w-6 text-mint-dark mt-1" />
              <div>
                <h3 className="!mt-0 text-lg">Our Security Commitment</h3>
                <p className="mb-0">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the internet is 100% secure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="legal-section">
          <h2>Your Rights</h2>
          
          <p className="mb-6">Under New Zealand privacy law, you have the following rights:</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Eye, title: "Access", desc: "View your personal data" },
              { icon: Database, title: "Correction", desc: "Update inaccurate information" },
              { icon: AlertCircle, title: "Deletion", desc: "Request data removal" },
              { icon: Lock, title: "Restriction", desc: "Limit data processing" },
              { icon: Mail, title: "Opt-out", desc: "Unsubscribe from marketing" },
              { icon: Shield, title: "Portability", desc: "Transfer your data" },
            ].map((right) => (
              <div key={right.title} className="bg-white border border-purple-light/20 rounded-lg p-4 hover:border-purple-mid transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <right.icon className="h-5 w-5 text-purple-dark" />
                  <h4 className="font-semibold text-navy-dark">{right.title}</h4>
                </div>
                <p className="text-sm text-gray">{right.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="legal-section">
          <h2>Contact Us</h2>
          
          <div className="legal-contact-card">
            <h3 className="!mt-0 text-xl mb-4">Privacy Questions or Concerns?</h3>
            <p className="mb-6">
              If you have questions about this Privacy Policy or our privacy practices, we're here to help.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-navy-dark mb-2">Email Us</h4>
                <a href="mailto:privacy@shesharp.org.nz" className="text-purple-dark hover:text-purple-mid transition-colors">
                  privacy@shesharp.org.nz
                </a>
              </div>
              
              <div>
                <h4 className="font-semibold text-navy-dark mb-2">Charity Registration</h4>
                <p className="text-gray">CC57025</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-purple-light/30 rounded-lg">
              <p className="text-sm text-navy-dark mb-0">
                <strong>Response Time:</strong> We aim to respond to all privacy inquiries within 5 business days.
              </p>
            </div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}