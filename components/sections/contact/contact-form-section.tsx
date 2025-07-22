"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organisation: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Section className="py-16">
      <Container>
        <Card className="mx-auto max-w-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="organisation">Organisation</Label>
                <Input
                  id="organisation"
                  name="organisation"
                  type="text"
                  value={formData.organisation}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Your message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-purple-dark hover:bg-purple-mid"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}