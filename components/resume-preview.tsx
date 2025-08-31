'use client';

import { ResumeData } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Edit, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { exportToPDF } from '@/lib/pdf-export';

interface ResumePreviewProps {
  data: ResumeData;
  onPrev: () => void;
  onEdit: (section: string) => void;
}

export function ResumePreview({ data, onPrev, onEdit }: ResumePreviewProps) {
  const handleExportPDF = async () => {
    try {
      await exportToPDF('resume-preview', `${data.personalInfo.fullName}_Resume.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Resume Preview
        </h2>
        <div className="flex space-x-3">
          <Button
            onClick={handleExportPDF}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card id="resume-preview" className="p-12 bg-white dark:bg-gray-900 shadow-2xl max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600 dark:text-gray-400">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {data.personalInfo.location}
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </div>
            )}
            {data.personalInfo.portfolio && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Portfolio
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Summary</h2>
              <Button
                onClick={() => onEdit('personal')}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
              <Button
                onClick={() => onEdit('experience')}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-blue-500 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.position}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right text-gray-600 dark:text-gray-400">
                      <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{exp.description}</p>
                  )}
                  {exp.achievements.length > 0 && exp.achievements[0] && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      {exp.achievements.filter(achievement => achievement.trim()).map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
              <Button
                onClick={() => onEdit('education')}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-purple-500 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right text-gray-600 dark:text-gray-400">
                      <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h2>
              <Button
                onClick={() => onEdit('skills')}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Technical', 'Soft', 'Language', 'Other'].map(category => {
                const categorySkills = data.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;

                return (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      {category} Skills
                    </h3>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <Badge className={`${getLevelColor(skill.level)} text-white border-0`}>
                            {skill.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrev}
          variant="outline"
          className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-800/70"
        >
          Previous
        </Button>
        <Button
          onClick={handleExportPDF}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Resume
        </Button>
      </div>
    </div>
  );
}