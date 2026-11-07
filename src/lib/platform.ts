/**
 * Single source of truth for the product and the network it settles on.
 * Copy that names the chain, network or asset reads from here.
 */
export const PLATFORM = {
  /** Product name. */
  name: 'Horizon Cash',
  /** One-line positioning, used in the footer and auth screens. */
  tagline: 'Move money anywhere on Earth, powered by Blaaiz',
  /** How the chain is described in prose. */
  chain: 'Blaaiz',
  /** Network the escrow contract targets. The preview does not connect to it yet. */
  network: 'demo',
  /** Bounty asset. */
  asset: 'USDC',
} as const;

/** GitHub's language colours, so language dots read the way contributors expect. */
export const LANG_COLOR: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Rust: '#dea584',
  Solidity: '#aa6746',
  Go: '#00add8',
  Python: '#3572a5',
  MDX: '#fcb32c',
  CSS: '#663399',
};

/** Real GitHub avatar for an organization. Falls back to a letter tile on error. */
export const orgAvatar = (org: string, size = 80) =>
  `https://github.com/${encodeURIComponent(org)}.png?size=${size}`;
