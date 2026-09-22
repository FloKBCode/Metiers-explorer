/**
 * Motif graphique "signature" de l'appli : les métiers comme des points,
 * les compétences comme des connexions. Purement décoratif (les libellés
 * ne représentent pas de vraies relations issues de l'API) — utilisé en
 * fond de la home et en illustration sur la fiche métier.
 */

interface Node {
  x: number;
  y: number;
  r: number;
  color: 'ink' | 'corail' | 'violet' | 'bleu' | 'vert';
  label?: string;
}

interface Edge {
  from: number;
  to: number;
}

const COLORS: Record<Node['color'], string> = {
  ink: 'var(--color-ink)',
  corail: 'var(--color-corail)',
  violet: 'var(--color-violet)',
  bleu: 'var(--color-bleu)',
  vert: 'var(--color-vert-ink, var(--color-ink))',
};

const HERO_NODES: Node[] = [
  { x: 50, y: 46, r: 7, color: 'ink' },
  { x: 18, y: 20, r: 5, color: 'corail', label: 'F1106' },
  { x: 78, y: 16, r: 4.5, color: 'violet', label: 'K2111' },
  { x: 84, y: 52, r: 5, color: 'bleu', label: 'M1607' },
  { x: 62, y: 78, r: 4.5, color: 'vert', label: 'D1501' },
  { x: 12, y: 68, r: 3.5, color: 'ink' },
  { x: 34, y: 86, r: 3, color: 'ink' },
  { x: 90, y: 82, r: 3, color: 'ink' },
  { x: 6, y: 42, r: 3, color: 'ink' },
];

const HERO_EDGES: Edge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 0, to: 4 },
  { from: 1, to: 5 },
  { from: 1, to: 8 },
  { from: 4, to: 6 },
  { from: 3, to: 7 },
  { from: 5, to: 8 },
];

const COMPACT_NODES: Node[] = [
  { x: 50, y: 50, r: 8, color: 'corail' },
  { x: 18, y: 30, r: 5, color: 'ink' },
  { x: 82, y: 28, r: 5, color: 'violet' },
  { x: 80, y: 74, r: 4.5, color: 'bleu' },
  { x: 22, y: 78, r: 4.5, color: 'vert' },
];

const COMPACT_EDGES: Edge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 0, to: 4 },
];

interface NetworkGraphicProps {
  variant?: 'hero' | 'compact';
  className?: string;
}

export function NetworkGraphic({ variant = 'hero', className }: NetworkGraphicProps) {
  const nodes = variant === 'hero' ? HERO_NODES : COMPACT_NODES;
  const edges = variant === 'hero' ? HERO_EDGES : COMPACT_EDGES;

  return (
    <svg
      className={['network-graphic', `network-graphic--${variant}`, className].filter(Boolean).join(' ')}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="var(--border)" strokeWidth="0.4" opacity="0.9">
        {edges.map((edge, i) => {
          const a = nodes[edge.from];
          const b = nodes[edge.to];
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
      </g>
      <g>
        {nodes.map((node, i) => (
          <circle key={i} cx={node.x} cy={node.y} r={node.r} fill={COLORS[node.color]} />
        ))}
      </g>
    </svg>
  );
}
