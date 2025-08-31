'use client';

import { useState } from 'react';
import { PersonalInfo } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: Partial<PersonalInfo>) => void;
  onNext: () => void;
  onGenerateAI: () => void;
  isGenerating: boolean;
}

export function PersonalInfoForm({ data, onUpdate, onNext, onGenerateAI, isGenerating }: PersonalInfoFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!data.email.trim()) newErrors.email = 'Email is required';
    if (!data.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <Card className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-white/20 dark:border-gray-700/20 shadow-xl">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Personal Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Let's start with your basic details
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => onUpdate({ fullName: e.target.value })}
              placeholder="John Doe"
              className={`bg-white/50 dark:bg-gray-900/50 border-white/30 dark:border-gray-600/30 ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="john@example.com"
              className={`bg-white/50 dark:bg-gray-900/50 border-white/30 dark:border-gray-600/30 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className={`bg-white/50 dark:bg-gray-900/50 border-white/30 dark:border-gray-600/30 ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => onUpdate({ location: e.target.value })}
              placeholder="New York, NY"
              className="bg-white/50 dark:bg-gray-900/50 border-white/30 dark:border-gray-600/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={data.linkedin}
              onChange={(e) => onUpdate({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/johndoe"
              className="bg-white/50 dark:bg-gray-900/50 border-white/30 dark:border-gray-600/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio URL</Label>
            <Input
              id="portfolio"
              value={data.portfolio}
              onChange={(e) => onUpdate({ portfolio: e.target.value })}
              placeholder="https://johndoe.dev"
              className="bg-white/50 dark:bg-gray-900/50 border-white/30 dark:border-gray-600/30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="summary">Professional Summary</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onGenerateAI}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'AI Generate'}
            </Button>
          </div>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => onUpdate({ summary: e.target.value })}
            placeholder="Write a brief professional summary or let AI generate one for you..."
            rows={4}
            className="bg-white/50 dark:bg-gray-900/50 border-white/30 dark:border-gray-600/30"
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Next Step
          </Button>
        </div>
      </div>
    </Card>
  );
}