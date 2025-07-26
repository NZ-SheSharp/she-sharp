import Link from "next/link";
import { ChevronRight, FileText, Shield, Cookie, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LegalPageLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated?: Date;
  icon?: React.ReactNode;
}

interface LegalNavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

const legalPages: LegalNavItem[] = [
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    icon: <Shield className="h-5 w-5" />,
    description: "How we protect your data",
  },
  {
    title: "Cookie Policy",
    href: "/cookie-policy",
    icon: <Cookie className="h-5 w-5" />,
    description: "Our use of cookies",
  },
  {
    title: "Terms of Service",
    href: "/terms-of-service",
    icon: <FileText className="h-5 w-5" />,
    description: "Terms of using our services",
  },
  {
    title: "Accessibility",
    href: "/accessibility",
    icon: <Heart className="h-5 w-5" />,
    description: "Our commitment to accessibility",
  },
];

export function LegalPageLayout({ 
  children, 
  title, 
  lastUpdated = new Date(),
  icon 
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-navy-dark">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-purple-light/10" />
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {icon && (
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 backdrop-blur rounded-2xl">
                  {icon}
                </div>
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-lg text-white/80">
              Last Updated: {lastUpdated.toLocaleDateString('en-NZ', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 24C240 24 240 74 480 74C720 74 720 24 960 24C1200 24 1200 74 1440 74V0H0V24Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {legalPages.map((page) => {
              const isActive = page.title === title;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className={cn(
                    "group relative p-4 rounded-xl transition-colors duration-150",
                    isActive 
                      ? "bg-purple-dark text-white shadow-md" 
                      : "bg-white hover:bg-purple-light/20 border border-purple-light/20 hover:border-purple-mid"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      isActive ? "bg-white/20" : "bg-purple-light/30 group-hover:bg-purple-mid/20"
                    )}>
                      <div className={isActive ? "text-white" : "text-purple-dark"}>
                        {page.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={cn(
                        "font-semibold text-sm mb-1",
                        isActive ? "text-white" : "text-navy-dark"
                      )}>
                        {page.title}
                      </h3>
                      <p className={cn(
                        "text-xs",
                        isActive ? "text-white/80" : "text-gray"
                      )}>
                        {page.description}
                      </p>
                    </div>
                  </div>
                  {!isActive && (
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-dark opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-purple-light/20 p-8 md:p-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}