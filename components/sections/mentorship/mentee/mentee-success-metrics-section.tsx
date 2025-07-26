"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  GraduationCap,
  BarChart3,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { globalStats } from "@/lib/data/stats";

const successMetrics = [
  {
    icon: TrendingUp,
    value: `${globalStats.mentorship.promotionRate.mentees}x`,
    label: "More likely to be promoted",
    description: "Mentees are 5x more likely to receive promotions within 2 years",
    color: "purple"
  },
  {
    icon: DollarSign,
    value: `${globalStats.impact.salaryIncrease}%`,
    label: "Average salary increase",
    description: "Mentees report an average 23% salary increase after program completion",
    color: "mint"
  },
  {
    icon: Briefcase,
    value: "78%",
    label: "Career transitions",
    description: "Successfully transitioned to their target role or industry",
    color: "periwinkle"
  },
  {
    icon: GraduationCap,
    value: `${globalStats.mentorship.skillImprovement}%`,
    label: "Skill improvement",
    description: "Report significant improvement in technical and soft skills",
    color: "navy"
  }
];

const careerOutcomes = [
  { role: "Software Engineer", percentage: 32 },
  { role: "Product Manager", percentage: 24 },
  { role: "Data Scientist", percentage: 18 },
  { role: "UX/UI Designer", percentage: 15 },
  { role: "Engineering Manager", percentage: 11 }
];

export function MenteeSuccessMetricsSection() {
  return (
    <Section className="py-16 lg:py-24 bg-gradient-to-br from-purple-light/10 via-white to-mint-light/10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-mint-light text-mint-dark border-mint-dark/20">
            Proven Results
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Success by the Numbers
          </h2>
          <p className="text-lg text-gray max-w-3xl mx-auto">
            Our mentorship program delivers real, measurable impact on careers
          </p>
        </motion.div>

        {/* Success Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {successMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-full bg-${metric.color}-light/20 mb-4`}>
                    <metric.icon className={`h-6 w-6 text-${metric.color}-dark`} />
                  </div>
                  <div className="text-3xl font-bold text-navy-dark mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {metric.label}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Career Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-navy-dark">
              Where Our Mentees Are Now
            </h3>
            <BarChart3 className="h-6 w-6 text-purple-dark" />
          </div>
          
          <div className="space-y-4">
            {careerOutcomes.map((outcome) => (
              <div key={outcome.role}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {outcome.role}
                  </span>
                  <span className="text-sm text-gray-600">
                    {outcome.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${outcome.percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-purple-dark to-purple-mid h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-purple-light/10 rounded-lg">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-purple-dark mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{globalStats.mentorship.mentees}+ mentees</span> have 
                  participated in our program, with many going on to become mentors themselves, 
                  creating a cycle of empowerment and support.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}