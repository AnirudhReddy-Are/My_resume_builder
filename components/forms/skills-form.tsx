'use client';

import { useState } from 'react';
import { Skill } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Zap, Sparkles } from 'lucide-react';

interface SkillsFormProps {
  data: Skill[];
  onUpdate: (data: Skill[]) => void;
  onNext: () => void;
  onPrev: () => void;
  onGenerateAI: () => void;
  isGenerating: boolean;
}

export function SkillsForm({ data, onUpdate, onNext, onPrev, onGenerateAI, isGenerating }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate', category: 'Technical' });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name.trim(),
        level: newSkill.level as Skill['level'],
        category: newSkill.category as Skill['category'],
      };
      onUpdate([...data, skill]);
      setNewSkill({ name: '', level: 'Intermediate', category: 'Technical' });
    }
  };

  const removeSkill = (id: string) => {
    onUpdate(data.filter(skill => skill.id !== id));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'Advanced': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Intermediate': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'Beginner': return 'bg-gradient-to-r from-gray-500 to-slate-500';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
      case 'Soft': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'Language': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200';
      case 'Other': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Card className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-white/20 dark:border-gray-700/20 shadow-xl">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center">
            <Zap className="w-8 h-8 mr-3 text-blue-600" />
            Skills & Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Showcase your technical and soft skills
          </p>
        </div>

        <Card className="p-6 bg-white/30 dark:bg-gray-900/30 border-white/20 dark:border-gray-600/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Add New Skill</h3>
            <Button
              onClick={onGenerateAI}
              disabled={isGenerating}
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              {isGenerating ? 'Generating...' : 'AI Suggest'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="skillName">Skill Name</Label>
              <Input
                id="skillName"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="React, Communication, etc."
                className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillLevel">Level</Label>
              <Select value={newSkill.level} onValueChange={(value) => setNewSkill({ ...newSkill, level: value })}>
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillCategory">Category</Label>
              <Select value={newSkill.category} onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}>
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Soft">Soft Skills</SelectItem>
                  <SelectItem value="Language">Language</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={addSkill}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </div>
        </Card>

        {data.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Your Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((skill) => (
                <Card key={skill.id} className="p-4 bg-white/30 dark:bg-gray-900/30 border-white/20 dark:border-gray-600/20 hover:bg-white/40 dark:hover:bg-gray-900/40 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{skill.name}</h4>
                    <Button
                      onClick={() => removeSkill(skill.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800 h-6 w-6 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge className={getCategoryColor(skill.category)}>
                      {skill.category}
                    </Badge>
                    <Badge className={`${getLevelColor(skill.level)} text-white border-0`}>
                      {skill.level}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
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
            Preview Resume
          </Button>
        </div>
      </div>
    </Card>
  );
}