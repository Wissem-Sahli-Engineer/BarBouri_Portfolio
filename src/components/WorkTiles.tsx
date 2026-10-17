import type { ReactNode } from 'react';
import { Frame, projectVisuals } from './ProjectVisuals';

type Token = [string, string?];

const C = {
  key: '#E0569B',
  str: '#5BD69A',
  fn: '#8FB4FF',
  num: '#E2B33C',
  dim: 'rgba(215, 226, 234, 0.45)',
};

function CodeTile({ file, lines, glow }: { file: string; lines: Token[][]; glow?: string }) {
  return (
    <Frame glow={glow}>
      <div className="absolute inset-0 flex flex-col p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-sm font-light text-[#D7E2EA]/50">{file}</span>
        </div>
        <pre className="overflow-hidden font-mono text-[12px] leading-6 text-[#D7E2EA]">
          {lines.map((line, i) => (
            <div key={i}>
              <span className="mr-4 inline-block w-4 text-right" style={{ color: C.dim }}>
                {i + 1}
              </span>
              {line.map(([text, color], j) => (
                <span key={j} style={{ color }}>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    </Frame>
  );
}

function StatTile({ value, label, sub, glow }: { value: string; label: string; sub: ReactNode; glow?: string }) {
  return (
    <Frame glow={glow}>
      <div className="absolute inset-0 flex flex-col justify-between p-7">
        <span className="text-sm font-light uppercase tracking-widest text-[#D7E2EA]/50">{sub}</span>
        <div>
          <div className="hero-heading text-[88px] font-black leading-none">{value}</div>
          <div className="mt-2 text-lg font-medium uppercase tracking-wide text-[#D7E2EA]">{label}</div>
        </div>
      </div>
    </Frame>
  );
}

const [PromptChat, Pipeline, AgentGraph] = projectVisuals.terraform;
const [QuantumCircuit, EmbeddingClusters, CommunityGraph] = projectVisuals.quantum;
const [ScrapedProducts, BackOffice, N8nWorkflow] = projectVisuals.ads;

const terraformCode = () => (
  <CodeTile
    file="main.tf"
    lines={[
      [['resource ', C.key], ['"google_container_cluster" ', C.str], ['"main" {']],
      [['  name     = '], ['"sandbox-gke"', C.str]],
      [['  location = '], ['var', C.key], ['.region']],
      [['  network  = '], ['google_compute_network', C.fn], ['.vpc.id']],
      [['  initial_node_count = '], ['2', C.num]],
      [['}']],
    ]}
  />
);

const langgraphCode = () => (
  <CodeTile
    file="agents.py"
    lines={[
      [['graph ', ''], ['= '], ['StateGraph', C.fn], ['(InfraState)']],
      [['graph.'], ['add_node', C.fn], ['('], ['"planner"', C.str], [', planner)']],
      [['graph.'], ['add_node', C.fn], ['('], ['"validator"', C.str], [', validator)']],
      [['graph.'], ['add_node', C.fn], ['('], ['"generator"', C.str], [', generate_iac)']],
      [['graph.'], ['add_node', C.fn], ['('], ['"deployer"', C.str], [', deploy)']],
      [['app '], ['= '], ['graph.'], ['compile', C.fn], ['()']],
    ]}
  />
);

const thgnnCode = () => (
  <CodeTile
    file="thgnn.py"
    glow="#7621B0"
    lines={[
      [['class ', C.key], ['THGNN', C.fn], ['(nn.Module):']],
      [['  '], ['def ', C.key], ['__init__', C.fn], ['(self, dim='], ['128', C.num], ['):']],
      [['    self.gat '], ['= '], ['GATConv', C.fn], ['(dim, dim, heads='], ['4', C.num], [')']],
      [['    self.gru '], ['= '], ['nn.GRU', C.fn], ['(dim, dim)']],
      [['# embeddings → HDBSCAN', C.dim]],
      [['labels '], ['= '], ['HDBSCAN', C.fn], ['().fit_predict(z)']],
    ]}
  />
);

const gitlabCode = () => (
  <CodeTile
    file=".gitlab-ci.yml"
    glow="#BE4C00"
    lines={[
      [['stages', C.key], [':']],
      [['  - '], ['validate', C.str]],
      [['  - '], ['plan', C.str]],
      [['  - '], ['apply', C.str]],
      [['  - '], ['verify', C.str]],
      [['image', C.key], [': '], ['hashicorp/terraform', C.str]],
    ]}
  />
);

const agentsStat = () => <StatTile value="4" label="Specialised AI agents" sub="Sofrecom · Orange Innov" />;
const resourcesStat = () => <StatTile value="10+" label="GCP resources planned" sub="Terraform Studio" glow="#BE4C00" />;
const communitiesStat = () => <StatTile value="141" label="Quantum communities" sub="vs 107 classical" glow="#7621B0" />;
const podiumStat = () => <StatTile value="3rd" label="End-of-year project" sub="ENSI · best pitch grade" />;
const n8nStat = () => <StatTile value="6" label="Ads steps automated" sub="n8n workflow" glow="#EA4B71" />;

export const workTilesRow1 = [
  PromptChat,
  terraformCode,
  agentsStat,
  Pipeline,
  langgraphCode,
  AgentGraph,
  resourcesStat,
  gitlabCode,
  ScrapedProducts,
];

export const workTilesRow2 = [
  QuantumCircuit,
  thgnnCode,
  communitiesStat,
  CommunityGraph,
  podiumStat,
  EmbeddingClusters,
  N8nWorkflow,
  n8nStat,
  BackOffice,
];
