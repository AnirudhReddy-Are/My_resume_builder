'use client';

import { useResumeData } from '@/hooks/use-resume-data';
import { ProgressIndicator } from '@/components/progress-indicator';
import { PersonalInfoForm } from '@/components/forms/personal-info-form';
import { EducationForm } from '@/components/forms/education-form';
import { ExperienceForm } from '@/components/forms/experience-form';
import { SkillsForm } from '@/components/forms/skills-form';
import { ResumePreview } from '@/components/resume-preview';
import { generateResumeContent, enhanceResumeSection } from '@/lib/openai';
import { toast } from 'sonner';

export function ResumeBuilder() {
  const {
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
  } = useResumeData();

  const handleGeneratePersonalSummary = async () => {
    setIsGenerating(true);
    try {
      const result = await generateResumeContent(data.personalInfo, 'summary');
      updatePersonalInfo({ summary: result.content });
      toast.success('AI generated your professional summary!');
    } catch (error) {
      toast.error('Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateSkills = async () => {
    setIsGenerating(true);
    try {
      const result = await generateResumeContent({ 
        personalInfo: data.personalInfo, 
        experience: data.experience,
        education: data.education 
      }, 'skills');
      if (result.skills) {
        updateSkills(result.skills);
        toast.success('AI suggested relevant skills based on your background!');
      }
    } catch (error) {
      toast.error('Failed to generate skills. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnhanceExperience = async (experienceId: string) => {
    setIsGenerating(true);
    try {
      const experience = data.experience.find(exp => exp.id === experienceId);
      if (experience) {
        const result = await enhanceResumeSection(
          `${experience.position} at ${experience.company}: ${experience.description}`,
          'experience'
        );
        
        const updatedExperience = data.experience.map(exp => 
          exp.id === experienceId 
            ? { 
                ...exp, 
                description: result.description || exp.description,
                achievements: result.achievements || exp.achievements
              }
            : exp
        );
        updateExperience(updatedExperience);
        toast.success('AI enhanced your work experience!');
      }
    } catch (error) {
      toast.error('Failed to enhance experience. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={data.personalInfo}
            onUpdate={updatePersonalInfo}
            onNext={nextStep}
            onGenerateAI={handleGeneratePersonalSummary}
            isGenerating={isGenerating}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={data.education}
            onUpdate={updateEducation}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={data.experience}
            onUpdate={updateExperience}
            onNext={nextStep}
            onPrev={prevStep}
            onGenerateAI={handleEnhanceExperience}
            isGenerating={isGenerating}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={data.skills}
            onUpdate={updateSkills}
            onNext={nextStep}
            onPrev={prevStep}
            onGenerateAI={handleGenerateSkills}
            isGenerating={isGenerating}
          />
        );
      case 'preview':
        return (
          <ResumePreview
            data={data}
            onPrev={prevStep}
            onEdit={(section) => goToStep(section as any)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <ProgressIndicator currentStep={currentStep} onStepClick={goToStep} />
        <div className="animate-in slide-in-from-right-5 duration-500">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}