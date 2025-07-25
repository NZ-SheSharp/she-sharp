"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setFormData({ fullName: "", email: "", message: "" });
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-light text-navy-dark">Send us a message</h2>
      
      {isSuccess && (
        <div className="flex items-center gap-3 p-4 bg-mint-light border border-mint-dark rounded-lg">
          <CheckCircle className="h-5 w-5 text-navy-dark" />
          <div>
            <p className="font-medium text-navy-dark">Message sent!</p>
            <p className="text-sm text-gray">We'll get back to you within 48 hours.</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-navy-dark font-normal">
            Your Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="h-12 border-gray/20 focus:border-purple-dark transition-colors"
            placeholder="Jane Doe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-navy-dark font-normal">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="h-12 border-gray/20 focus:border-purple-dark transition-colors"
            placeholder="jane@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="text-navy-dark font-normal">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={8}
            required
            value={formData.message}
            onChange={handleChange}
            className="min-h-[200px] border-gray/20 focus:border-purple-dark transition-colors resize-none"
            placeholder="Tell us what's on your mind..."
          />
        </div>
        
        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-purple-dark hover:bg-purple-mid transition-colors h-12 text-base font-normal"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}