export const profile = {
  name: 'Sarra',
  fullName: 'Sarra Bouraoui',
  email: 'sarra.bouraoui@ensi-uma.tn',
  phone: '+216 55 402 857',
  github: 'https://github.com/sarrabouraoui21',
  linkedin: 'https://linkedin.com/in/bouraoui-sarra',
  location: 'Tunis, Tunisia — open to relocation',
};

export const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

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

const img = (file: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F${file}.png&w=1280&q=85`;

export const projects = [
  {
    name: 'Terraform Studio',
    category: 'Internship · Sofrecom – Orange Innov',
    description:
      'A LangGraph platform where 4 specialised agents turn natural-language requests into validated GCP infrastructure plans (10+ resources), then generate, edit and deploy the Terraform through a 4-stage GitLab CI/CD pipeline.',
    link: profile.github,
    images: [
      img('hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db'),
      img('hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8'),
      img('hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327'),
    ],
  },
  {
    name: 'Quantum Communities',
    category: 'Research · ENSI — 3rd place',
    description:
      'Hybrid quantum-classical community detection on temporal heterogeneous graphs: a THGNN (GAT + GRU) learns 128-D researcher embeddings clustered into 107 communities, compared with a variational quantum circuit reaching 141 more coherent ones.',
    link: profile.github,
    images: [
      img('hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f'),
      img('hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1'),
      img('hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea'),
    ],
  },
  {
    name: 'Ads Automation',
    category: 'Project · Scraping & n8n',
    description:
      'A Laravel / Nuxt back-office with product web scraping, plus a 6-step Facebook Ads workflow fully automated with n8n.',
    link: profile.github,
    images: [
      img('hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f'),
      img('hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b'),
      img('hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee'),
    ],
  },
];
