import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  events: [
    { name: "Explore Events", href: "/events" },
    { name: "Google Educator Conference", href: "/events/google-educator" },
  ],
  about: [
    { name: "About Us", href: "/about" },
    { name: "Join Our Team", href: "/join" },
    { name: "For Sponsors", href: "/sponsors/corporate" },
  ],
  media: [
    { name: "Podcasts", href: "/media/podcasts" },
    { name: "Newsletters", href: "/media/newsletters" },
    { name: "In the Press", href: "/media/press" },
    { name: "Photo Gallery", href: "/media/gallery" },
  ],
  mentorship: [
    { name: "Mentorship Program", href: "/mentorship" },
    { name: "Meet our Mentors", href: "/mentorship/mentors" },
    { name: "Become a Mentee", href: "/mentorship/mentee" },
  ],
  contact: [
    { name: "Contact Us", href: "/contact" },
    { name: "Donate", href: "/donate" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="container px-4 py-12 md:px-6">
        {/* Newsletter Section */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Subscribe to stay updated</h3>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-mid"
            />
            <button className="px-6 py-2 bg-purple-dark hover:bg-purple-mid rounded-md font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        <Separator className="bg-white/20 mb-12" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4 text-mint-dark">Events</h4>
            <ul className="space-y-2">
              {footerLinks.events.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-mint-dark">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-mint-dark">Media</h4>
            <ul className="space-y-2">
              {footerLinks.media.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-mint-dark">Mentorship</h4>
            <ul className="space-y-2">
              {footerLinks.mentorship.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-mint-dark">Contact</h4>
            <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-mid to-periwinkle-dark bg-clip-text text-transparent">
              She Sharp
            </span>
            <span>|</span>
            <Link
              href="https://register.charities.govt.nz/Charity/CC57025"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Registered NZ Charity #CC57025
            </Link>
          </div>
          <div>
            © {new Date().getFullYear()} She Sharp. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}