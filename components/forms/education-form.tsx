'use client';

import { useState } from 'react';
import { Education } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function EducationForm({ data, onUpdate, onNext, onPrev }: EducationFormProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    };
    onUpdate([...data, newEducation]);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onUpdate(data.map(edu => edu.id === id ? { ...edu, ...updates } : edu));
  };

  const removeEducation = (id: string) => {
    onUpdate(data.filter(edu => edu.id !== id));
  };

  return (
    <Card className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-white/20 dark:border-gray-700/20 shadow-xl">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center">
            <GraduationCap className="w-8 h-8 mr-3 text-blue-600" />
            Education
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Add your educational background
          </p>
        </div>

        {data.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No education entries yet</p>
            <Button
              onClick={addEducation}
              variant="outline"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        )}

        {data.map((education, index) => (
          <Card key={education.id} className="p-6 bg-white/30 dark:bg-gray-900/30 border-white/20 dark:border-gray-600/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Education #{index + 1}
              </h3>
              <Button
                onClick={() => removeEducation(education.id)}
                variant="outline"
                size="sm"
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, { institution: e.target.value })}
                  placeholder="University Name"
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, { degree: e.target.value })}
                  placeholder="Bachelor's Degree"
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                <Input
                  id={`field-${education.id}`}
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, { field: e.target.value })}
                  placeholder="Computer Science"
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                <Input
                  id={`gpa-${education.id}`}
                  value={education.gpa}
                  onChange={(e) => updateEducation(education.id, { gpa: e.target.value })}
                  placeholder="3.8"
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${education.id}`}
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, { startDate: e.target.value })}
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                <Input
                  id={`endDate-${education.id}`}
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, { endDate: e.target.value })}
                  className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor={`description-${education.id}`}>Description</Label>
              <Textarea
                id={`description-${education.id}`}
                value={education.description}
                onChange={(e) => updateEducation(education.id, { description: e.target.value })}
                placeholder="Relevant coursework, achievements, activities..."
                rows={3}
                className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
              />
            </div>
          </Card>
        ))}

        {data.length > 0 && (
          <div className="flex justify-center">
            <Button
              onClick={addEducation}
              variant="outline"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Education
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