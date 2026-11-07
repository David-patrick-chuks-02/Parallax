/**
 * File-based routing configuration for Parallax
 * Maps page files to routes automatically
 *
 * File naming convention:
 * - src/pages/index.tsx → /
 * - src/pages/send.tsx → /send
 * - src/pages/explore.tsx → /explore
 * - src/pages/explore/[tab].tsx → /explore/:tab
 */

import type { ReactNode } from 'react';
import { Landing } from './pages/index';
import { Send } from './pages/send';
import { Explore } from './pages/explore';
import { Pitch } from './pages/pitch';

export interface RouteConfig {
  path: string;
  element: (props: any) => ReactNode;
  layout?: 'public' | 'plain';
  props?: Record<string, any>;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: Landing,
    layout: 'public',
  },
  {
    path: '/pitch',
    element: Pitch,
    layout: 'plain',
  },
  {
    path: '/send',
    element: Send,
    layout: 'public',
  },
  {
    path: '/explore',
    element: Explore,
    layout: 'public',
    props: { tab: 'payouts' },
  },
  {
    path: '/explore/corridors',
    element: Explore,
    layout: 'public',
    props: { tab: 'corridors' },
  },
  {
    path: '/explore/stats',
    element: Explore,
    layout: 'public',
    props: { tab: 'stats' },
  },
];
