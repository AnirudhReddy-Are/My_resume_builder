'use client';

import { useState, useCallback } from 'react';
import { ResumeData, FormStep } from '@/types/resume';

const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
};

export function useResumeData() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [isGenerating, setIsGenerating] = useState(false);

  const updatePersonalInfo = useCallback((info: Partial<ResumeData['personalInfo']>) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  }, []);

  const updateEducation = useCallback((education: ResumeData['education']) => {
    setData(prev => ({ ...prev, education }));
  }, []);

  const updateExperience = useCallback((experience: ResumeData['experience']) => {
    setData(prev => ({ ...prev, experience }));
  }, []);

  const updateSkills = useCallback((skills: ResumeData['skills']) => {
    setData(prev => ({ ...prev, skills }));
  }, []);

  const nextStep = useCallback(() => {
    const steps: FormStep[] = ['personal', 'education', 'experience', 'skills', 'preview'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    const steps: FormStep[] = ['personal', 'education', 'experience', 'skills', 'preview'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: FormStep) => {
    setCurrentStep(step);
  }, []);

  return {
    data,
    currentStep,
    isGenerating,
    setIsGenerating,
    updatePersonalInfo,
    updateEducation,
    updateExperience,
    updateSkills,
    nextStep,
    prevStep,
    goToStep,
  };
}