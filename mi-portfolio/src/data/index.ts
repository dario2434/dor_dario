import cvDataRaw from './cv.json';
import type { CV, Project, Skill, Experience, Profile } from '../types';

// castear los datos del JSON con los tipos correctos
const cvData = cvDataRaw as CV;

// castear las habilidades para asegurar que la categoría sea válida
cvData.habilidades = cvData.habilidades.map((skill: Skill) => ({
  ...skill,
  categoria: skill.categoria as 'Frontend' | 'Backend' | 'Tools' | 'Other',
}));

export const perfil: Profile = cvData.perfil;
export const proyectos: Project[] = cvData.proyectos;
export const habilidades: Skill[] = cvData.habilidades;
export const experiencia: Experience[] = cvData.experiencia;

export default cvData;

