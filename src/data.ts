export const profile = {
  name: 'Sarra',
  fullName: 'Sarra Bouraoui',
  email: 'sarra.bouraoui@ensi-uma.tn',
  phone: '+216 55 402 857',
  github: 'https://github.com/sarrabouraoui21',
  linkedin: 'https://linkedin.com/in/bouraoui-sarra',
  location: 'Tunis, Tunisia — open to relocation',
};

export const services = [
  {
    name: 'Cloud & DevOps',
    description:
      'GCP infrastructure as code with Terraform and Ansible, automated through GitLab CI/CD pipelines, with Docker, Linux and IAM done to production standards.',
  },
  {
    name: 'Agentic AI',
    description:
      'Multi-agent systems built with LangGraph and LangChain that turn natural-language requests into validated, executable plans and automate real workflows.',
  },
  {
    name: 'Deep Learning',
    description:
      'Neural networks with PyTorch and TensorFlow — from graph neural networks (GAT, GRU, THGNN) to quantum machine learning experiments.',
  },
  {
    name: 'LLM & NLP',
    description:
      'Transformers, SciBERT and generative AI — prompt engineering and LLM integration with Claude and Gemini into useful products.',
  },
  {
    name: 'Full Stack',
    description:
      'Web apps from database to UI with Angular, React, .NET, FastAPI and REST APIs, shipped all the way to production.',
  },
];

export const projects = [
  {
    id: 'terraform',
    name: 'Terraform Studio',
    category: 'Internship · Sofrecom – Orange Innov',
    description:
      'A LangGraph platform where 4 specialised agents turn natural-language requests into validated GCP infrastructure plans (10+ resources), then generate, edit and deploy the Terraform through a 4-stage GitLab CI/CD pipeline.',
    link: profile.github,
  },
  {
    id: 'quantum',
    name: 'Quantum Communities',
    category: 'Research · ENSI — 3rd place',
    description:
      'Hybrid quantum-classical community detection on temporal heterogeneous graphs: a THGNN (GAT + GRU) learns 128-D researcher embeddings clustered into 107 communities, compared with a variational quantum circuit reaching 141 more coherent ones.',
    link: profile.github,
  },
  {
    id: 'ads',
    name: 'Ads Automation',
    category: 'Project · Scraping & n8n',
    description:
      'A Laravel / Nuxt back-office with product web scraping, plus a 6-step Facebook Ads workflow fully automated with n8n.',
    link: profile.github,
  },
];
