"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Users, Calendar, Award, Target } from "lucide-react";
import { useState } from "react";
import { layoutSystem, layoutClasses } from "@/lib/layout-system";

interface ROIMetrics {
  brandExposure: string;
  networkingEvents: number;
  talentPipeline: string;
  speakingOpportunities: string;
  customWorkshops: number;
  mediaReach: string;
}

const packageROI: Record<string, ROIMetrics> = {
  bronze: {
    brandExposure: "2,200+ members across digital channels",
    networkingEvents: 8,
    talentPipeline: "Access to event attendees only",
    speakingOpportunities: "None",
    customWorkshops: 0,
    mediaReach: "Quarterly social media mentions",
  },
  silver: {
    brandExposure: "2,200+ members + 5,000+ social media followers",
    networkingEvents: 8,
    talentPipeline: "2 mentorship program slots",
    speakingOpportunities: "1 speaking opportunity per year",
    customWorkshops: 0,
    mediaReach: "Monthly social media features",
  },
  gold: {
    brandExposure: "Premium placement across all channels",
    networkingEvents: 8,
    talentPipeline: "5 mentorship slots + recruitment booth access",
    speakingOpportunities: "3 speaking opportunities per year",
    customWorkshops: 1,
    mediaReach: "Bi-weekly features + newsletter inclusion",
  },
  platinum: {
    brandExposure: "Exclusive partner status with maximum visibility",
    networkingEvents: 8,
    talentPipeline: "Unlimited mentorship + priority talent access",
    speakingOpportunities: "Speaking rights at all major events",
    customWorkshops: 4,
    mediaReach: "Weekly features + dedicated success stories",
  },
};

export function ROICalculatorSection() {
  const [selectedPackage, setSelectedPackage] = useState<string>("gold");
  const [companyGoals, setCompanyGoals] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    if (selectedPackage && companyGoals) {
      setShowResults(true);
    }
  };

  const metrics = packageROI[selectedPackage];

  return (
    <Section bgColor="white">
      <Container size="content">
        <div>
          <Card className="border-2 border-purple-dark/10">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-12 h-12 bg-purple-light rounded-full flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-purple-dark" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-navy-dark">
                Partnership ROI Calculator
              </CardTitle>
              <CardDescription className="text-lg text-gray mt-2">
                Discover the value and impact of partnering with She Sharp
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Package Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-navy-dark">
                  Select Your Partnership Level
                </Label>
                <RadioGroup
                  value={selectedPackage}
                  onValueChange={setSelectedPackage}
                  className={layoutClasses(
                    "grid gap-4",
                    "md:grid-cols-2"
                  )}
                >
                  <div className="flex items-start space-x-3 p-4 rounded-lg border-2 hover:border-purple-dark/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="bronze" id="bronze" className="mt-1" />
                    <Label htmlFor="bronze" className="cursor-pointer flex-1">
                      <div className="font-semibold text-navy-dark">Bronze Partnership</div>
                      <div className="text-sm text-gray mt-1">$5,000 annual investment</div>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 p-4 rounded-lg border-2 hover:border-purple-dark/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="silver" id="silver" className="mt-1" />
                    <Label htmlFor="silver" className="cursor-pointer flex-1">
                      <div className="font-semibold text-navy-dark">Silver Partnership</div>
                      <div className="text-sm text-gray mt-1">$10,000 annual investment</div>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 p-4 rounded-lg border-2 hover:border-purple-dark/50 transition-colors cursor-pointer bg-mint-light/20">
                    <RadioGroupItem value="gold" id="gold" className="mt-1" />
                    <Label htmlFor="gold" className="cursor-pointer flex-1">
                      <div className="font-semibold text-navy-dark">Gold Partnership</div>
                      <div className="text-sm text-gray mt-1">$20,000 annual investment</div>
                      <div className="text-xs text-mint-dark font-medium mt-1">RECOMMENDED</div>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 p-4 rounded-lg border-2 hover:border-purple-dark/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="platinum" id="platinum" className="mt-1" />
                    <Label htmlFor="platinum" className="cursor-pointer flex-1">
                      <div className="font-semibold text-navy-dark">Platinum Partnership</div>
                      <div className="text-sm text-gray mt-1">$50,000+ annual investment</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Company Goals */}
              <div className="space-y-4">
                <Label htmlFor="goals" className="text-base font-semibold text-navy-dark">
                  What are your diversity & inclusion goals?
                </Label>
                <Textarea
                  id="goals"
                  placeholder="E.g., Increase female representation in technical roles, build employer brand among women in STEM, create pathways for early-career talent..."
                  value={companyGoals}
                  onChange={(e) => setCompanyGoals(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>

              {/* Calculate Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleCalculate}
                  size="lg"
                  className="bg-purple-dark hover:bg-purple-mid"
                  disabled={!companyGoals}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Calculate Partnership Value
                </Button>
              </div>

              {/* Results */}
              {showResults && metrics && (
                <Alert className="bg-periwinkle-light border-periwinkle-dark/20">
                  <Target className="h-5 w-5 text-periwinkle-dark" />
                  <AlertTitle className="text-lg font-semibold text-navy-dark mb-4">
                    Your Expected Partnership ROI
                  </AlertTitle>
                  <AlertDescription className="space-y-4">
                    <div className={layoutClasses(
                      "grid gap-4",
                      "md:grid-cols-2"
                    )}>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-purple-dark mt-0.5" />
                        <div>
                          <div className="font-medium text-navy-dark">Brand Exposure</div>
                          <div className="text-sm text-gray">{metrics.brandExposure}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-purple-dark mt-0.5" />
                        <div>
                          <div className="font-medium text-navy-dark">Networking Events</div>
                          <div className="text-sm text-gray">{metrics.networkingEvents} events per year</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-purple-dark mt-0.5" />
                        <div>
                          <div className="font-medium text-navy-dark">Talent Pipeline</div>
                          <div className="text-sm text-gray">{metrics.talentPipeline}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-purple-dark mt-0.5" />
                        <div>
                          <div className="font-medium text-navy-dark">Speaking Opportunities</div>
                          <div className="text-sm text-gray">{metrics.speakingOpportunities}</div>
                        </div>
                      </div>
                    </div>
                    
                    {metrics.customWorkshops > 0 && (
                      <div className="pt-2 border-t border-periwinkle-dark/10">
                        <div className="font-medium text-navy-dark mb-1">Additional Benefits:</div>
                        <ul className="text-sm text-gray space-y-1">
                          <li>• {metrics.customWorkshops} custom diversity workshop{metrics.customWorkshops > 1 ? 's' : ''} per year</li>
                          <li>• {metrics.mediaReach}</li>
                          <li>• Priority access to She Sharp talent network</li>
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-periwinkle-dark/10">
                      <p className="text-sm text-navy-dark font-medium">
                        Based on your goals, this partnership level can help you achieve measurable impact
                        in diversity hiring, employer branding, and community engagement.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Next Steps */}
              {showResults && (
                <div className="text-center space-y-4 pt-4">
                  <p className="text-gray">
                    Ready to make a difference in women's representation in STEM?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild className="bg-purple-dark hover:bg-purple-mid">
                      <a href="#contact">Schedule a Partnership Discussion</a>
                    </Button>
                    <Button asChild variant="outline" className="border-purple-dark text-purple-dark hover:bg-purple-light">
                      <a href="/docs/sponsorship-guide-2025.pdf" download>Download Full Guide</a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}