import { LucideIcon, Calendar, Users, Briefcase, Heart, Mic, Mail, Camera, FileText, Award } from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  children?: NavigationItem[];
}

export interface NavigationButton {
  title: string;
  href: string;
  variant: "default" | "outline" | "ghost";
}

export const navigationConfig: {
  items: NavigationItem[];
  buttons: NavigationButton[];
} = {
  items: [
    {
      title: "Events",
      href: "/events",
      icon: Calendar,
      children: [
        {
          title: "Explore Events",
          href: "/events",
          description: "Discover upcoming events and workshops",
          icon: Calendar,
        },
        {
          title: "Google Educator Conference",
          href: "/events/google-educator",
          description: "Annual education technology conference",
          icon: Award,
        },
      ],
    },
    {
      title: "About Us",
      href: "/about",
      icon: Users,
    },
    {
      title: "For Sponsors",
      href: "/sponsors/corporate-sponsorship",
      icon: Briefcase,
    },
    {
      title: "Join our Team",
      href: "/join-our-team",
      icon: Heart,
    },
    {
      title: "Media",
      href: "/media",
      icon: Mic,
      children: [
        {
          title: "Podcasts",
          href: "/media/podcasts",
          description: "Listen to inspiring women in tech stories",
          icon: Mic,
        },
        {
          title: "Newsletters",
          href: "/media/newsletters",
          description: "Subscribe to our monthly newsletter",
          icon: Mail,
        },
        {
          title: "In the Press",
          href: "/media/news-and-press",
          description: "Media coverage and press releases",
          icon: FileText,
        },
        {
          title: "Photo Gallery",
          href: "/media/photo-gallery",
          description: "Event highlights and memorable moments",
          icon: Camera,
        },
        {
          title: "Impact Report",
          href: "/media/impact-report",
          description: "Our annual impact and achievements",
          icon: FileText,
        },
      ],
    },
    {
      title: "Contact Us",
      href: "/contact",
      icon: Mail,
    },
    {
      title: "Mentorship",
      href: "/mentorship",
      icon: Users,
      children: [
        {
          title: "Mentorship Program",
          href: "/mentorship",
          description: "Learn about our mentorship initiatives",
          icon: Users,
        },
        {
          title: "Meet our Mentors",
          href: "/mentorship/mentors",
          description: "Connect with experienced professionals",
          icon: Award,
        },
        {
          title: "Become a Mentee",
          href: "/mentorship/mentee",
          description: "Apply to join our mentorship program",
          icon: Users,
        },
      ],
    },
  ],
  buttons: [
    {
      title: "Explore Events",
      href: "/events",
      variant: "outline",
    },
    {
      title: "Donate",
      href: "/donate",
      variant: "default",
    },
  ],
};