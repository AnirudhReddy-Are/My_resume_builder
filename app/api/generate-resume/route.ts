import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { data, section } = await request.json();

    // For demo purposes, we'll return mock AI-generated content
    // In a real app, you would integrate with OpenAI API here
    
    let content = '';
    let skills = null;

    switch (section) {
      case 'summary':
        content = `Dynamic and results-driven professional with expertise in ${data.fullName ? 'technology and innovation' : 'various fields'}. Proven track record of delivering high-quality solutions and driving business growth. Passionate about continuous learning and contributing to team success through collaborative problem-solving and strategic thinking.`;
        break;
      
      case 'skills':
        skills = [
          { id: '1', name: 'JavaScript', level: 'Advanced', category: 'Technical' },
          { id: '2', name: 'React', level: 'Advanced', category: 'Technical' },
          { id: '3', name: 'Node.js', level: 'Intermediate', category: 'Technical' },
          { id: '4', name: 'Communication', level: 'Expert', category: 'Soft' },
          { id: '5', name: 'Leadership', level: 'Advanced', category: 'Soft' },
          { id: '6', name: 'Problem Solving', level: 'Expert', category: 'Soft' },
        ];
        break;
    }

    return NextResponse.json({ content, skills });
  } catch (error) {
    console.error('Error generating resume content:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume content' },
      { status: 500 }
    );
  }
}