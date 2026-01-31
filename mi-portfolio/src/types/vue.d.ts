// Declaration file for cv.json data
import type { CV, Project, Skill, Experience, Profile } from './index';

declare module '../data/cv.json' {
  const cvData: CV;
  export default cvData;
}

// Type assertions for JSON data
export function assertSkill(data: unknown): Skill[] {
  const skills = data as Skill[];
  skills.forEach((skill) => {
    if (!['Frontend', 'Backend', 'Tools', 'Other'].includes(skill.categoria)) {
      skill.categoria = 'Other';
    }
  });
  return skills;
}

