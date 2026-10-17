import { lazy, Suspense } from 'react';
import {
  siAngular,
  siAnsible,
  siClaude,
  siCplusplus,
  siDocker,
  siDotnet,
  siFastapi,
  siGitlab,
  siGooglecloud,
  siGooglegemini,
  siHuggingface,
  siKaggle,
  siLangchain,
  siLaravel,
  siLinux,
  siN8n,
  siOpenjdk,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siTensorflow,
  siTerraform,
} from 'simple-icons';
import FadeIn from '../components/FadeIn';
import type { Skill } from '../components/SkillBalls';

// three.js is heavy, so the canvas is split into its own chunk.
const SkillBalls = lazy(() => import('../components/SkillBalls'));

const skills: Skill[] = [
  { name: 'Google Cloud', icon: siGooglecloud },
  { name: 'Terraform', icon: siTerraform },
  { name: 'Ansible', icon: siAnsible },
  { name: 'GitLab CI/CD', icon: siGitlab },
  { name: 'Docker', icon: siDocker },
  { name: 'Linux', icon: siLinux },
  { name: 'LangChain · LangGraph', icon: siLangchain },
  { name: 'Claude', icon: siClaude },
  { name: 'Gemini', icon: siGooglegemini },
  { name: 'Transformers', icon: siHuggingface },
  { name: 'PyTorch', icon: siPytorch },
  { name: 'TensorFlow', icon: siTensorflow },
  { name: 'scikit-learn', icon: siScikitlearn },
  { name: 'Kaggle', icon: siKaggle },
  { name: 'Python', icon: siPython },
  { name: 'C++', icon: siCplusplus },
  { name: 'Java', icon: siOpenjdk },
  { name: 'FastAPI', icon: siFastapi },
  { name: 'React', icon: siReact },
  { name: 'Angular', icon: siAngular },
  { name: '.NET', icon: siDotnet },
  { name: 'Laravel', icon: siLaravel },
  { name: 'n8n', icon: siN8n },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="pb-10 pt-10">
      <FadeIn y={40} className="px-5 sm:px-8 md:px-10">
        <h2
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Skills
        </h2>
      </FadeIn>
      <FadeIn delay={0.15} className="px-5 sm:px-8 md:px-10">
        <p
          className="mx-auto mb-4 mt-6 max-w-[520px] text-center font-light uppercase tracking-wide text-[#D7E2EA]/70 sm:mb-14"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          The tools i use to build cloud platforms, AI agents and web apps
        </p>
      </FadeIn>
      {/* Full-bleed: the canvas spans the whole section so the balls aren't boxed in. */}
      <Suspense fallback={<div className="h-screen" />}>
        <SkillBalls skills={skills} />
      </Suspense>
    </section>
  );
}
