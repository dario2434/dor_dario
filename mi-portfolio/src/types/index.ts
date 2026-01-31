// Tipo para un proyecto
export interface Project {
  id: string;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  imagen?: string;
  demoUrl?: string;
  repoUrl?: string;
}

// Tipo para una habilidad
export interface Skill {
  id: string;
  nombre: string;
  logo: string;
  descripcion: string;
  nivel: number; // 0-100
  categoria: 'Frontend' | 'Backend' | 'Tools' | 'Other';
}

// Tipo para experiencia laboral
export interface Experience {
  id: string;
  cargo: string;
  empresa: string;
  periodo: string;
  descripcion: string;
  tecnologias?: string[];
}

// Tipo para el perfil completo
export interface Profile {
  nombre: string;
  titulo: string;
  email: string;
  github?: string;
  linkedin?: string;
  sobreMi: string;
  foto: string;
  telefono?: string;
  direccion?: string;
  idiomas?: Array<{
    nombre: string;
    nivel: string;
  }>;
  extras?: string[];
}

// Tipo para el CV completo
export interface CV {
  perfil: Profile;
  proyectos: Project[];
  habilidades: Skill[];
  experiencia: Experience[];
}

