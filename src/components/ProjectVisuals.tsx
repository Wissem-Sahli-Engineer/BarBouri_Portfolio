import type { ReactNode } from 'react';

const LIGHT = '#D7E2EA';
const MAGENTA = '#B600A8';
const VIOLET = '#7621B0';
const ORANGE = '#BE4C00';
const PANEL = '#16161C';
const PANEL_STROKE = 'rgba(215, 226, 234, 0.14)';

export function Frame({ children, glow = MAGENTA }: { children: ReactNode; glow?: string }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
      style={{
        background: `radial-gradient(120% 90% at 85% 0%, ${glow}33 0%, transparent 55%), radial-gradient(90% 80% at 0% 100%, ${VIOLET}26 0%, transparent 60%), #111115`,
        border: `1px solid ${PANEL_STROKE}`,
      }}
    >
      {children}
    </div>
  );
}

function Svg({ viewBox, children }: { viewBox: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full p-[6%]"
      fontFamily="Kanit, sans-serif"
    >
      {children}
    </svg>
  );
}

// Defined once and kept rendered: a gradient inside a display:none SVG can't be referenced by the others.
export function BrandGradientDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={MAGENTA} />
          <stop offset="60%" stopColor={VIOLET} />
          <stop offset="100%" stopColor={ORANGE} />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Deterministic pseudo-random so the generated graphs look the same on every render.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand: () => number) {
  return Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());
}

/* ---------- 01 · Terraform Studio ---------- */

function PromptChat() {
  return (
    <Frame>
      <Svg viewBox="0 0 400 200">
        <rect x="96" y="22" width="284" height="62" rx="20" fill="url(#brand)" />
        <text x="116" y="49" fill="#fff" fontSize="14" fontWeight="500">
          Deploy a GKE cluster with Cloud SQL
        </text>
        <text x="116" y="69" fill="#fff" fontSize="14" fontWeight="300" opacity="0.85">
          and a private VPC in europe-west1
        </text>
        <circle cx="34" cy="138" r="16" fill={PANEL} stroke={PANEL_STROKE} />
        <text x="34" y="143" fill={LIGHT} fontSize="12" fontWeight="600" textAnchor="middle">
          AI
        </text>
        <rect x="60" y="108" width="300" height="62" rx="20" fill={PANEL} stroke={PANEL_STROKE} />
        <text x="80" y="135" fill={LIGHT} fontSize="14" fontWeight="500">
          ✓ Plan validated · 12 resources
        </text>
        <text x="80" y="155" fill={LIGHT} fontSize="12" fontWeight="300" opacity="0.6">
          naming · IAM · sandbox constraints OK
        </text>
      </Svg>
    </Frame>
  );
}

const STAGES = ['validate', 'plan', 'apply', 'verify'];

function Pipeline() {
  const xs = [55, 150, 245, 340];
  return (
    <Frame glow={ORANGE}>
      <Svg viewBox="0 0 400 280">
        <text x="20" y="34" fill={LIGHT} fontSize="15" fontWeight="500" letterSpacing="2">
          GITLAB CI/CD
        </text>
        <text x="380" y="34" fill={LIGHT} fontSize="12" fontWeight="300" opacity="0.5" textAnchor="end">
          main · #128
        </text>
        <line x1={xs[0]} y1="130" x2={xs[3]} y2="130" stroke={PANEL_STROKE} strokeWidth="4" />
        <line x1={xs[0]} y1="130" x2={xs[3]} y2="130" stroke="url(#brand)" strokeWidth="4" className="flow-dash" />
        <circle r="5" fill="#fff">
          <animateMotion dur="2.8s" repeatCount="indefinite" path={`M${xs[0]} 130 H${xs[3]}`} />
        </circle>
        {STAGES.map((stage, i) => (
          <g key={stage}>
            <circle cx={xs[i]} cy="130" r="26" fill={PANEL} stroke="url(#brand)" strokeWidth="3" />
            <path
              d={`M${xs[i] - 9} 131 l6 6 l12 -13`}
              fill="none"
              stroke={LIGHT}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x={xs[i]} y="186" fill={LIGHT} fontSize="14" textAnchor="middle" letterSpacing="1">
              {stage}
            </text>
          </g>
        ))}
        <rect x="20" y="218" width="360" height="40" rx="14" fill={PANEL} stroke={PANEL_STROKE} />
        <text x="38" y="243" fill={LIGHT} fontSize="13" fontWeight="300">
          <tspan fill="#5BD69A">$</tspan> terraform apply · <tspan fontWeight="500">deployed to GCP</tspan>
        </text>
      </Svg>
    </Frame>
  );
}

const AGENTS = ['Planner', 'Validator', 'IaC Generator', 'Deployer'];
const RESOURCES = ['VPC', 'GKE', 'Cloud SQL', 'IAM', 'GCS', 'Pub/Sub'];

function AgentGraph() {
  const agentXs = [85, 228, 372, 515];
  return (
    <Frame>
      <Svg viewBox="0 0 600 480">
        <text x="300" y="34" fill={LIGHT} fontSize="13" opacity="0.5" textAnchor="middle" letterSpacing="3">
          LANGGRAPH · MULTI-AGENT
        </text>

        <rect x="210" y="56" width="180" height="40" rx="20" fill={PANEL} stroke={PANEL_STROKE} />
        <text x="300" y="81" fill={LIGHT} fontSize="14" textAnchor="middle">
          Natural-language request
        </text>
        <line x1="300" y1="96" x2="300" y2="132" stroke={LIGHT} strokeOpacity="0.4" strokeWidth="2" className="flow-dash" />

        <rect x="180" y="132" width="240" height="52" rx="26" fill="url(#brand)" />
        <text x="300" y="164" fill="#fff" fontSize="16" fontWeight="600" textAnchor="middle" letterSpacing="1">
          ORCHESTRATOR
        </text>

        {agentXs.map((x, i) => (
          <g key={AGENTS[i]}>
            <path
              d={`M300 184 C300 220, ${x} 214, ${x} 252`}
              fill="none"
              stroke={LIGHT}
              strokeOpacity="0.35"
              strokeWidth="2"
              className="flow-dash"
            />
            <rect x={x - 64} y="252" width="128" height="46" rx="16" fill={PANEL} stroke="url(#brand)" strokeWidth="1.5" />
            <text x={x} y="281" fill={LIGHT} fontSize="14" textAnchor="middle">
              {AGENTS[i]}
            </text>
            <path
              d={`M${x} 298 C${x} 330, 300 320, 300 352`}
              fill="none"
              stroke={LIGHT}
              strokeOpacity="0.2"
              strokeWidth="2"
            />
          </g>
        ))}

        <rect x="40" y="352" width="520" height="104" rx="26" fill="#101014" stroke={PANEL_STROKE} />
        <text x="64" y="380" fill={LIGHT} fontSize="12" opacity="0.5" letterSpacing="2">
          GOOGLE CLOUD · SANDBOX
        </text>
        {RESOURCES.map((r, i) => (
          <g key={r}>
            <rect x={54 + i * 82} y="396" width="76" height="38" rx="12" fill={PANEL} stroke={PANEL_STROKE} />
            <circle cx={66 + i * 82} cy="415" r="4" fill="#5BD69A" className="pulse" style={{ animationDelay: `${i * 0.3}s` }} />
            <text x={98 + i * 82} y="419" fill={LIGHT} fontSize="10.5" textAnchor="middle">
              {r}
            </text>
          </g>
        ))}
      </Svg>
    </Frame>
  );
}

/* ---------- 02 · Quantum Communities ---------- */

function QuantumCircuit() {
  const qubits = [40, 80, 120, 160];
  const cnots: [number, number, number][] = [
    [150, 0, 1],
    [190, 1, 2],
    [230, 2, 3],
  ];
  return (
    <Frame glow={VIOLET}>
      <Svg viewBox="0 0 400 200">
        {qubits.map((y) => (
          <g key={y}>
            <text x="14" y={y + 5} fill={LIGHT} fontSize="13" opacity="0.6">
              |0⟩
            </text>
            <line x1="44" y1={y} x2="386" y2={y} stroke={LIGHT} strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="66" y={y - 13} width="40" height="26" rx="7" fill="url(#brand)" />
            <text x="86" y={y + 5} fill="#fff" fontSize="12" textAnchor="middle" fontWeight="500">
              Rθ
            </text>
            <rect x="268" y={y - 13} width="40" height="26" rx="7" fill={PANEL} stroke="url(#brand)" strokeWidth="1.5" />
            <text x="288" y={y + 5} fill={LIGHT} fontSize="12" textAnchor="middle">
              Ry
            </text>
            <rect x="334" y={y - 13} width="34" height="26" rx="7" fill={PANEL} stroke={PANEL_STROKE} />
            <path d={`M341 ${y + 6} a10 10 0 0 1 20 0`} fill="none" stroke={LIGHT} strokeWidth="1.5" />
            <line x1="351" y1={y + 6} x2="358" y2={y - 6} stroke={LIGHT} strokeWidth="1.5" />
          </g>
        ))}
        {cnots.map(([x, c, t]) => (
          <g key={x}>
            <line x1={x} y1={qubits[c]} x2={x} y2={qubits[t]} stroke={LIGHT} strokeWidth="1.5" />
            <circle cx={x} cy={qubits[c]} r="5" fill={LIGHT} />
            <circle cx={x} cy={qubits[t]} r="10" fill="none" stroke={LIGHT} strokeWidth="1.5" />
            <line x1={x - 10} y1={qubits[t]} x2={x + 10} y2={qubits[t]} stroke={LIGHT} strokeWidth="1.5" />
          </g>
        ))}
      </Svg>
    </Frame>
  );
}

const CLUSTER_COLORS = [MAGENTA, '#E0569B', VIOLET, '#4E7CF2', '#2FB8A6', ORANGE, '#E2B33C'];

const scatterPoints = (() => {
  const rand = seeded(7);
  const centers = [
    [80, 90],
    [175, 70],
    [300, 85],
    [110, 175],
    [215, 160],
    [320, 175],
    [255, 110],
  ];
  return centers.flatMap(([cx, cy], c) =>
    Array.from({ length: 16 }, () => ({
      x: cx + gaussian(rand) * 16,
      y: cy + gaussian(rand) * 12,
      c,
    }))
  );
})();

function EmbeddingClusters() {
  return (
    <Frame glow={VIOLET}>
      <Svg viewBox="0 0 400 280">
        <text x="20" y="28" fill={LIGHT} fontSize="12" opacity="0.5" letterSpacing="2">
          128-D EMBEDDINGS → HDBSCAN
        </text>
        {scatterPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y + 8} r="3.6" fill={CLUSTER_COLORS[p.c]} opacity="0.9" />
        ))}
        <g>
          <rect x="20" y="222" width="172" height="44" rx="14" fill={PANEL} stroke={PANEL_STROKE} />
          <text x="38" y="250" fill={LIGHT} fontSize="13" fontWeight="300">
            classical <tspan fontWeight="600" fontSize="16">107</tspan>
          </text>
          <rect x="208" y="222" width="172" height="44" rx="14" fill="url(#brand)" />
          <text x="226" y="250" fill="#fff" fontSize="13" fontWeight="300">
            quantum <tspan fontWeight="600" fontSize="16">141</tspan>
          </text>
        </g>
      </Svg>
    </Frame>
  );
}

const communityGraph = (() => {
  const rand = seeded(42);
  const centers = [
    [140, 130],
    [300, 95],
    [460, 140],
    [110, 300],
    [270, 250],
    [440, 300],
    [290, 400],
  ];
  const nodes = centers.flatMap(([cx, cy], c) =>
    Array.from({ length: 13 }, (_, k) => ({
      x: cx + gaussian(rand) * 34,
      y: cy + gaussian(rand) * 28,
      r: k === 0 ? 7 : 3 + rand() * 2.5,
      c,
    }))
  );
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    const hub = n.c * 13;
    if (i !== hub) edges.push([i, hub]);
    const peer = n.c * 13 + Math.floor(rand() * 13);
    if (peer !== i && rand() > 0.35) edges.push([i, peer]);
  });
  for (let k = 0; k < 9; k++) {
    edges.push([Math.floor(rand() * nodes.length), Math.floor(rand() * nodes.length)]);
  }
  return { nodes, edges };
})();

function CommunityGraph() {
  const { nodes, edges } = communityGraph;
  return (
    <Frame glow={VIOLET}>
      <Svg viewBox="0 0 600 480">
        <text x="300" y="30" fill={LIGHT} fontSize="13" opacity="0.5" textAnchor="middle" letterSpacing="3">
          TEMPORAL HETEROGENEOUS GRAPH · GAT + GRU
        </text>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={nodes[a].c === nodes[b].c ? CLUSTER_COLORS[nodes[a].c] : LIGHT}
            strokeOpacity={nodes[a].c === nodes[b].c ? 0.35 : 0.12}
            strokeWidth="1.2"
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={CLUSTER_COLORS[n.c]}
            className={n.r > 6 ? 'pulse' : undefined}
            style={n.r > 6 ? { animationDelay: `${n.c * 0.35}s` } : undefined}
          />
        ))}
      </Svg>
    </Frame>
  );
}

/* ---------- 03 · Ads Automation ---------- */

function ScrapedProducts() {
  return (
    <Frame glow={ORANGE}>
      <Svg viewBox="0 0 400 200">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${22 + i * 124} 22)`}>
            <rect width="108" height="156" rx="18" fill={PANEL} stroke={PANEL_STROKE} />
            <rect x="10" y="10" width="88" height="70" rx="12" fill="url(#brand)" opacity={0.55 + i * 0.15} />
            <rect x="12" y="94" width="70" height="8" rx="4" fill={LIGHT} opacity="0.7" />
            <rect x="12" y="110" width="50" height="8" rx="4" fill={LIGHT} opacity="0.3" />
            <rect x="12" y="128" width="54" height="18" rx="9" fill="none" stroke="#5BD69A" strokeOpacity="0.7" />
            <text x="39" y="141" fill="#5BD69A" fontSize="10" textAnchor="middle">
              scraped
            </text>
          </g>
        ))}
      </Svg>
    </Frame>
  );
}

function BackOffice() {
  const rows = [0.8, 0.55, 0.7, 0.45];
  return (
    <Frame glow={ORANGE}>
      <Svg viewBox="0 0 400 280">
        <rect x="16" y="16" width="70" height="248" rx="16" fill={PANEL} stroke={PANEL_STROKE} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="32" y={44 + i * 30} width="38" height="8" rx="4" fill={LIGHT} opacity={i === 0 ? 0.8 : 0.25} />
        ))}
        <text x="104" y="40" fill={LIGHT} fontSize="15" fontWeight="500">
          Products
        </text>
        <text x="384" y="40" fill={LIGHT} fontSize="11" opacity="0.5" textAnchor="end">
          Laravel · Nuxt
        </text>
        {rows.map((w, i) => (
          <g key={i} transform={`translate(104 ${60 + i * 50})`}>
            <rect width="280" height="40" rx="12" fill={PANEL} stroke={PANEL_STROKE} />
            <rect x="10" y="8" width="24" height="24" rx="7" fill="url(#brand)" opacity="0.8" />
            <rect x="46" y="16" width={140 * w} height="8" rx="4" fill={LIGHT} opacity="0.55" />
            <rect x="214" y="11" width="56" height="18" rx="9" fill={i === 3 ? 'none' : '#5BD69A22'} stroke={i === 3 ? '#E2B33C' : '#5BD69A'} strokeOpacity="0.7" />
            <text x="242" y="24" fill={i === 3 ? '#E2B33C' : '#5BD69A'} fontSize="10" textAnchor="middle">
              {i === 3 ? 'syncing' : 'synced'}
            </text>
          </g>
        ))}
      </Svg>
    </Frame>
  );
}

const N8N_STEPS = ['Trigger', 'Fetch products', 'Write ad copy', 'Create campaign', 'Create ad set', 'Publish ad'];

function N8nWorkflow() {
  // Snake layout: first row left → right, second row right → left.
  const pos = [
    [40, 110],
    [220, 110],
    [400, 110],
    [400, 290],
    [220, 290],
    [40, 290],
  ];
  const W = 160;
  const H = 86;
  const links = pos.slice(0, -1).map(([x, y], i) => {
    const [nx, ny] = pos[i + 1];
    if (ny === y) {
      const forward = nx > x;
      const sx = forward ? x + W : x;
      const ex = forward ? nx : nx + W;
      return `M${sx} ${y + H / 2} L${ex} ${ny + H / 2}`;
    }
    return `M${x + W} ${y + H / 2} C${x + W + 50} ${y + H / 2}, ${nx + W + 50} ${ny + H / 2}, ${nx + W} ${ny + H / 2}`;
  });

  return (
    <Frame glow="#EA4B71">
      <Svg viewBox="0 0 600 480">
        <text x="300" y="40" fill={LIGHT} fontSize="13" opacity="0.5" textAnchor="middle" letterSpacing="3">
          N8N · FACEBOOK ADS WORKFLOW
        </text>
        {links.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke={LIGHT} strokeOpacity="0.3" strokeWidth="2" className="flow-dash" />
            <circle r="4.5" fill="#EA4B71">
              <animateMotion dur="1.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
        {pos.map(([x, y], i) => (
          <g key={N8N_STEPS[i]}>
            <rect x={x} y={y} width={W} height={H} rx="18" fill={PANEL} stroke={PANEL_STROKE} />
            <rect x={x} y={y} width="8" height={H} rx="4" fill={i === 0 ? '#EA4B71' : 'url(#brand)'} />
            <circle cx={x + 34} cy={y + H / 2} r="15" fill={i === 0 ? '#EA4B7133' : `${VIOLET}40`} />
            <text x={x + 34} y={y + H / 2 + 5} fill={LIGHT} fontSize="13" fontWeight="600" textAnchor="middle">
              {i + 1}
            </text>
            <text x={x + 58} y={y + H / 2 + 5} fill={LIGHT} fontSize="13">
              {N8N_STEPS[i]}
            </text>
          </g>
        ))}
      </Svg>
    </Frame>
  );
}

/* ---------- 04 · Tunav ---------- */

const STACK = [
  { label: 'Angular', sub: 'front-end' },
  { label: '.NET', sub: 'REST API' },
  { label: 'SQL', sub: 'database' },
];

function TunavStack() {
  return (
    <Frame glow="#DD0031">
      <Svg viewBox="0 0 400 200">
        <text x="20" y="30" fill={LIGHT} fontSize="12" opacity="0.5" letterSpacing="2">
          FULL STACK
        </text>
        {STACK.map(({ label, sub }, i) => {
          const x = 20 + i * 128;
          return (
            <g key={label}>
              {i > 0 && (
                <line x1={x - 20} y1="110" x2={x} y2="110" stroke={LIGHT} strokeOpacity="0.4" strokeWidth="2" className="flow-dash" />
              )}
              <rect x={x} y="68" width="108" height="84" rx="20" fill={PANEL} stroke={i === 0 ? 'url(#brand)' : PANEL_STROKE} strokeWidth="1.5" />
              <text x={x + 54} y="106" fill={LIGHT} fontSize="17" fontWeight="600" textAnchor="middle">
                {label}
              </text>
              <text x={x + 54} y="128" fill={LIGHT} fontSize="11" opacity="0.55" textAnchor="middle">
                {sub}
              </text>
            </g>
          );
        })}
      </Svg>
    </Frame>
  );
}

const DELIVERY = ['Design', 'Develop', 'Test', 'Deploy'];

function TunavDelivery() {
  return (
    <Frame glow={ORANGE}>
      <Svg viewBox="0 0 400 280">
        <text x="20" y="34" fill={LIGHT} fontSize="15" fontWeight="500" letterSpacing="2">
          JUNE → JULY 2025
        </text>
        <line x1="44" y1="74" x2="44" y2="218" stroke={PANEL_STROKE} strokeWidth="3" />
        <line x1="44" y1="74" x2="44" y2="218" stroke="url(#brand)" strokeWidth="3" className="flow-dash" />
        {DELIVERY.map((step, i) => {
          const y = 74 + i * 48;
          return (
            <g key={step}>
              <circle cx="44" cy={y} r="12" fill={PANEL} stroke="url(#brand)" strokeWidth="2.5" />
              <path d={`M38 ${y} l4 4 l8 -9`} fill="none" stroke={LIGHT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="70" y={y + 5} fill={LIGHT} fontSize="15">
                {step}
              </text>
            </g>
          );
        })}
        <rect x="230" y="198" width="150" height="40" rx="20" fill="#5BD69A1F" stroke="#5BD69A" strokeOpacity="0.7" />
        <circle cx="252" cy="218" r="5" fill="#5BD69A" className="pulse" />
        <text x="268" y="223" fill="#5BD69A" fontSize="13" fontWeight="500">
          In production
        </text>
      </Svg>
    </Frame>
  );
}

function TunavWebsite() {
  return (
    <Frame glow="#DD0031">
      <Svg viewBox="0 0 600 480">
        {/* desktop browser */}
        <rect x="30" y="40" width="470" height="350" rx="22" fill="#101014" stroke={PANEL_STROKE} />
        <circle cx="56" cy="64" r="5" fill="#FF5F57" />
        <circle cx="72" cy="64" r="5" fill="#FEBC2E" />
        <circle cx="88" cy="64" r="5" fill="#28C840" />
        <rect x="140" y="54" width="250" height="20" rx="10" fill={PANEL} />
        <text x="265" y="68" fill={LIGHT} fontSize="11" opacity="0.6" textAnchor="middle">
          tunav
        </text>
        <line x1="30" y1="88" x2="500" y2="88" stroke={PANEL_STROKE} />
        <text x="54" y="118" fill={LIGHT} fontSize="15" fontWeight="700" letterSpacing="1">
          TUNAV
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={300 + i * 48} y="110" width="36" height="7" rx="3.5" fill={LIGHT} opacity="0.35" />
        ))}
        <rect x="54" y="138" width="422" height="120" rx="18" fill="url(#brand)" opacity="0.85" />
        <rect x="78" y="168" width="190" height="14" rx="7" fill="#fff" opacity="0.9" />
        <rect x="78" y="192" width="140" height="9" rx="4.5" fill="#fff" opacity="0.55" />
        <rect x="78" y="216" width="84" height="24" rx="12" fill="#fff" opacity="0.95" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={54 + i * 145} y="276" width="132" height="92" rx="16" fill={PANEL} stroke={PANEL_STROKE} />
            <rect x={70 + i * 145} y="292" width="30" height="30" rx="9" fill="url(#brand)" opacity="0.6" />
            <rect x={70 + i * 145} y="334" width="90" height="7" rx="3.5" fill={LIGHT} opacity="0.5" />
            <rect x={70 + i * 145} y="348" width="60" height="7" rx="3.5" fill={LIGHT} opacity="0.25" />
          </g>
        ))}
        {/* responsive phone view */}
        <rect x="450" y="200" width="120" height="240" rx="22" fill="#0C0C0F" stroke={LIGHT} strokeOpacity="0.35" strokeWidth="2" />
        <rect x="490" y="210" width="40" height="6" rx="3" fill={LIGHT} opacity="0.3" />
        <text x="466" y="240" fill={LIGHT} fontSize="10" fontWeight="700" letterSpacing="1">
          TUNAV
        </text>
        <rect x="462" y="252" width="96" height="70" rx="12" fill="url(#brand)" opacity="0.85" />
        {[0, 1].map((i) => (
          <rect key={i} x="462" y={334 + i * 46} width="96" height="38" rx="10" fill={PANEL} stroke={PANEL_STROKE} />
        ))}
      </Svg>
    </Frame>
  );
}

export const projectVisuals: Record<string, [() => JSX.Element, () => JSX.Element, () => JSX.Element]> = {
  terraform: [PromptChat, Pipeline, AgentGraph],
  quantum: [QuantumCircuit, EmbeddingClusters, CommunityGraph],
  ads: [ScrapedProducts, BackOffice, N8nWorkflow],
  tunav: [TunavStack, TunavDelivery, TunavWebsite],
};
