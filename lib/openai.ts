export async function generateResumeContent(data: Partial<any>, section: string) {
  const response = await fetch('/api/generate-resume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data, section }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate resume content');
  }

  return response.json();
}

export async function enhanceResumeSection(content: string, section: string) {
  const response = await fetch('/api/enhance-resume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, section }),
  });

  if (!response.ok) {
    throw new Error('Failed to enhance resume content');
  }

  return response.json();
}