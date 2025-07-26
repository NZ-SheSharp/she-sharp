"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Target, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Award,
  CheckCircle2,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const growthMilestones = [
  {
    phase: "Foundation",
    month: "Month 1-2",
    description: "Build strong foundation and clarify career goals",
    progress: 100,
    achievements: [
      "Complete skills assessment",
      "Define SMART career goals",
      "Create personal development plan",
      "Establish mentor relationship"
    ],
    icon: Rocket,
    color: "purple"
  },
  {
    phase: "Skill Building",
    month: "Month 3-4",
    description: "Develop technical and soft skills with mentor guidance",
    progress: 100,
    achievements: [
      "Complete skill-building workshops",
      "Work on real projects",
      "Receive technical mentoring",
      "Build professional portfolio"
    ],
    icon: BookOpen,
    color: "mint"
  },
  {
    phase: "Network Growth",
    month: "Month 5-6",
    description: "Expand professional network and industry connections",
    progress: 75,
    achievements: [
      "Attend industry events",
      "Connect with professionals",
      "Practice elevator pitch",
      "Join professional communities"
    ],
    icon: Users,
    color: "periwinkle"
  },
  {
    phase: "Career Acceleration",
    month: "Beyond 6 months",
    description: "Apply learnings and pursue career opportunities",
    progress: 50,
    achievements: [
      "Apply for target positions",
      "Negotiate offers confidently",
      "Continue lifelong learning",
      "Become a mentor yourself"
    ],
    icon: TrendingUp,
    color: "navy"
  }
];

const resources = [
  {
    title: "Career Planning Toolkit",
    description: "Templates and guides for career goal setting",
    icon: Target,
    link: "#"
  },
  {
    title: "Skills Assessment",
    description: "Identify your strengths and growth areas",
    icon: Star,
    link: "#"
  },
  {
    title: "Interview Prep Guide",
    description: "Resources to ace your next interview",
    icon: Award,
    link: "#"
  }
];

export function MenteeGrowthPathSection() {
  return (
    <Section className="py-16 lg:py-24 bg-gradient-to-b from-white to-purple-light/10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-purple-light text-purple-dark border-purple-dark/20">
            Your Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Your Growth Path as a Mentee
          </h2>
          <p className="text-lg text-gray max-w-3xl mx-auto">
            Follow a structured journey designed to accelerate your career growth with 
            personalized mentorship and resources
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {growthMilestones.map((milestone, index) => (
            <motion.div
              key={milestone.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-${milestone.color}-light/20`}>
                        <milestone.icon className={`h-6 w-6 text-${milestone.color}-dark`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-navy-dark">
                          {milestone.phase}
                        </h3>
                        <Badge variant="outline" className="mt-1">
                          {milestone.month}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {milestone.progress}%
                    </span>
                  </div>

                  <Progress value={milestone.progress} className="h-2 mb-4" />
                  
                  <p className="text-gray mb-4">{milestone.description}</p>
                  
                  <div className="space-y-2">
                    {milestone.achievements.map((achievement) => (
                      <div key={achievement} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-mint-dark flex-shrink-0" />
                        <span className="text-gray-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-navy-dark mb-6 text-center">
            Exclusive Mentee Resources
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.title} className="text-center">
                <div className="inline-flex p-4 rounded-full bg-purple-light/20 mb-4">
                  <resource.icon className="h-8 w-8 text-purple-dark" />
                </div>
                <h4 className="font-semibold text-navy-dark mb-2">
                  {resource.title}
                </h4>
                <p className="text-sm text-gray mb-4">
                  {resource.description}
                </p>
                <Button
                  asChild
                  variant="link"
                  className="text-purple-dark hover:text-purple-mid"
                >
                  <Link href={resource.link}>
                    Access Resource →
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}