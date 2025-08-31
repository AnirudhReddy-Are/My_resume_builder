'use client';

import { useState } from 'react';
import { Experience } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Briefcase, Sparkles } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
  onNext: () => void;
  onPrev: () => void;
  onGenerateAI: (experienceId: string) => void;
  isGenerating: boolean;
}

export function ExperienceForm({ data, onUpdate, onNext, onPrev, onGenerateAI, isGenerating }: ExperienceFormProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
    };
    onUpdate([...data, newExperience]);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onUpdate(data.map(exp => exp.id === id ? { ...exp, ...updates } : exp));
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter(exp => exp.id !== id));
  };

  const addAchievement = (experienceId: string) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (experience) {
      updateExperience(experienceId, {
        achievements: [...experience.achievements, '']
      });
    }
  };

  const updateAchievement = (experienceId: string, achievementIndex: number, value: string) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[achievementIndex] = value;
      updateExperience(experienceId, { achievements: newAchievements });
    }
  };

  const removeAchievement = (experienceId: string, achievementIndex: number) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (experience && experience.achievements.length > 1) {
      const newAchievements = experience.achievements.filter((_, index) => index !== achievementIndex);
      updateExperience(experienceId, { achievements: newAchievements });
    }
  };

  return (
    <Card className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-white/20 dark:border-gray-700/20 shadow-xl">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center">
            <Briefcase className="w-8 h-8 mr-3 text-blue-600" />
            Work Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Share your professional experience
          </p>
        </div>

        {data.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No work experience added yet</p>
            <Button
              onClick={addExperience}
              variant="outline"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        )}

        {data.map((experience, index) => (
          <Card key={experience.id} className="p-6 bg-white/30 dark:bg-gray-900/30 border-white/20 dark:border-gray-600/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Experience #{index + 1}
              </h3>
              <div className="flex space-x-2">
                <Button
                  onClick={() => onGenerateAI(experience.id)}
                  disabled={isGenerating}
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI Enhance
                </Button>
                <Button
                  onClick={() => removeExperience(experience.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${experience.id}`}>Company</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, { company: e.target.value })}
                  placeholder="Company Name"
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`position-${experience.id}`}>Position</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, { position: e.target.value })}
                  placeholder="Job Title"
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`location-${experience.id}`}>Location</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, { location: e.target.value })}
                  placeholder="City, State"
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, { startDate: e.target.value })}
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                <Input
                  id={`endDate-${experience.id}`}
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, { endDate: e.target.value })}
                  disabled={experience.current}
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 disabled:opacity-50"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onCheckedChange={(checked) => updateExperience(experience.id, { 
                    current: checked as boolean,
                    endDate: checked ? '' : experience.endDate
                  })}
                />
                <Label htmlFor={`current-${experience.id}`}>Currently working here</Label>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, { description: e.target.value })}
                placeholder="Brief description of your role and responsibilities..."
                rows={3}
                className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
              />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <Label>Key Achievements</Label>
                <Button
                  onClick={() => addAchievement(experience.id)}
                  variant="outline"
                  size="sm"
                  className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-500/30"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Achievement
                </Button>
              </div>
              {experience.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex space-x-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                    placeholder="Describe a key achievement or responsibility..."
                    className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                  />
                  {experience.achievements.length > 1 && (
                    <Button
                      onClick={() => removeAchievement(experience.id, achIndex)}
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {data.length > 0 && (
          <div className="flex justify-center">
            <Button
              onClick={addExperience}
              variant="outline"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Experience
            </Button>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button
            onClick={onPrev}
            variant="outline"
            className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-800/70"
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Next Step
          </Button>
        </div>
      </div>
    </Card>
  );
}