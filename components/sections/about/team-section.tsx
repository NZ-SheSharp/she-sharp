"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Mahsa McCauley (Mohaghegh)",
    roles: ["Trustee", "Ambassador", "Founder and Chair"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64811ab760ae807f1dc87e65_Team_1_Masha.png",
    description: "Dr Mahsa McCauley is a Senior Lecturer and Director of Women in Tech in AUT's School of Computer, Engineering, and...",
    featured: true
  },
  {
    name: "Mike McCauley",
    roles: ["Trustee", "Ambassador", "Assets Manager"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64811c5d42437e3bb5b152b3_Team_2_Mike.png",
    description: "Mike is a Digital Delivery Manager on the ICT Leadership team at Metlifecare, where he oversees the strategy and delivery of...",
    featured: true
  },
  {
    name: "Raquel Anne Maderazo",
    roles: ["Ambassador", "Event Manager"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66d6b441043c6ce5cc64bcdb_Raquel.png",
    description: "Raquel is a certified Project Management Professional (PMP®) with a master's degree in IT Project Management from AUT..."
  },
  {
    name: "Sabrina Teoh",
    roles: ["Ambassador", "Event Manager"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66d7e895dccee90db8608d3e_Sabrina.png",
    description: "Sabrina is a product development engineer at FPH, known for her passion for learning and self-improvement. She thrives on diverse..."
  },
  {
    name: "Isha Sangrolkar",
    roles: ["Ambassador", "Website Lead"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/670e25e2f9fe2264ba4018d8_image%20(1).png",
    description: "Isha is pursuing her Master of Computer and Information Sciences degree at AUT, focusing on expanding her expertise in the field. With a..."
  },
  {
    name: "Iuliia Shmykova",
    roles: ["Ambassador", "Data Insight Manager"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6522343c421d58adf9529c1f_IIulia.png",
    description: "Iuliia is currently pursuing her Master's degree in IT Project Management at AUT, having shifted from Financial Analytics to the Product..."
  },
  {
    name: "Alyssa Pausanos",
    roles: ["Ambassador", "Website Maintenance"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67229f74af4304fe122b5273_Alyssa.png",
    description: "Alyssa is a first class BE (Hons) software engineering graduate from Auckland University of Technology, passionate about empowering more..."
  },
  {
    name: "Meeta Patel",
    roles: ["Ambassador", "Industry"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66d67ca7e3a1ff33201a2c10_Meeta.png",
    description: "Dr. Meeta Patel is an experienced scientist with over 20 years of research expertise. As a Senior Scientist and Sustainability Lead at..."
  },
  {
    name: "Neda Stefanovic",
    roles: ["Ambassador", "Content Creator"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/666951eddd9fcebde4e63dfc_Neda.png",
    description: "Neda is currently in the final year of studies at AUT, working towards completing a Bachelor of Science degree in Molecular..."
  },
  {
    name: "Gowri Lokesh",
    roles: ["Ambassador", "Digital Designer"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67229d32b8ee169914b78ecc_Gowri%20(1).png",
    description: "Meet Gowri! After spending two dedicated years as a quality analyst in network security, Gowri realized that her true passion wasn't just..."
  },
  {
    name: "Sara Ghafoor",
    roles: ["Ambassador", "Secretary"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/652774fc247ee7d771e65d2c_Sara.png",
    description: "Sara is an electrical engineering graduate currently pursuing a master's in computer information sciences, effectively bridging insights..."
  },
  {
    name: "Ania Migdałek-Jabłońska",
    roles: ["Ambassador"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6796cd0279f5325b87cc5966_Ania.png",
    description: "Ania brings years of experience to the digital marketing space, with a proven ability to launch and drive growth. Her approach..."
  }
];

// Extract all unique roles
const allRoles = Array.from(new Set(teamMembers.flatMap(member => member.roles))).sort();

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter members based on role and search query
  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesRole = roleFilter === "all" || member.roles.includes(roleFilter);
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.roles.some(role => role.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesRole && matchesSearch;
    });
  }, [roleFilter, searchQuery]);

  return (
    <Section className="bg-gradient-to-b from-white to-purple-light/5 py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Meet Our People</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            The passionate team of leaders, innovators, and advocates driving change in the tech industry
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="mb-6 text-center sm:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 text-purple-dark font-medium"
          >
            <Search className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Search & Filter"}
          </button>
        </div>

        {/* Filters */}
        <div className={cn(
          "mb-8 transition-all duration-300 sm:block",
          showFilters ? "block" : "hidden"
        )}>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {allRoles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Team Grid - Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredMembers.map((member, index) => (
            <Card
              key={member.name}
              className={cn(
                "group relative overflow-hidden cursor-pointer transition-all hover:shadow-xl",
                member.featured && "xs:col-span-2 sm:col-span-2 lg:col-span-2 lg:row-span-2"
              )}
              onClick={() => setSelectedMember(member)}
            >
              <div className={cn(
                "relative",
                member.featured ? "aspect-[4/3]" : "aspect-square"
              )}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardContent className={cn(
                "relative p-4",
                member.featured ? "sm:p-6 lg:p-8" : "sm:p-5"
              )}>
                <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                  {member.roles.slice(0, 2).map((role) => (
                    <Badge 
                      key={role} 
                      variant={role.includes("Trustee") ? "default" : "secondary"}
                      className={cn(
                        "text-xs",
                        role.includes("Trustee") && "bg-purple-dark hover:bg-purple-dark/90",
                        role.includes("Founder") && "bg-gradient-to-r from-purple-dark to-periwinkle text-white"
                      )}
                    >
                      {role}
                    </Badge>
                  ))}
                  {member.roles.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{member.roles.length - 2}
                    </Badge>
                  )}
                </div>
                <h3 className={cn(
                  "font-semibold text-navy line-clamp-1",
                  member.featured ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                )}>
                  {member.name}
                </h3>
                <p className={cn(
                  "mt-2 text-gray-600",
                  member.featured ? "text-sm sm:text-base line-clamp-3 sm:line-clamp-4" : "text-xs sm:text-sm line-clamp-2"
                )}>
                  {member.description}
                </p>
              </CardContent>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-dark to-periwinkle transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Card>
          ))}
        </div>

        {/* No results message */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No team members found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("all");
              }}
              className="mt-4 text-purple-dark hover:text-purple-mid font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Member Detail Sheet - Optimized for mobile */}
        <Sheet open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
            {selectedMember && (
              <>
                <SheetHeader className="pb-4">
                  <div className="relative h-48 sm:h-64 -mx-6 -mt-6 mb-4 sm:mb-6">
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <SheetTitle className="text-xl sm:text-2xl text-navy px-2">{selectedMember.name}</SheetTitle>
                  <div className="flex flex-wrap gap-2 mt-2 px-2">
                    {selectedMember.roles.map((role) => (
                      <Badge 
                        key={role} 
                        variant={role.includes("Trustee") ? "default" : "secondary"}
                        className={cn(
                          "text-xs",
                          role.includes("Trustee") && "bg-purple-dark hover:bg-purple-dark/90",
                          role.includes("Founder") && "bg-gradient-to-r from-purple-dark to-periwinkle text-white"
                        )}
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </SheetHeader>
                <SheetDescription className="mt-4 sm:mt-6 text-sm sm:text-base px-2">
                  {selectedMember.description}
                </SheetDescription>
              </>
            )}
          </SheetContent>
        </Sheet>
      </Container>
    </Section>
  );
}