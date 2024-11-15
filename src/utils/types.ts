import type React from 'react';

export type Theme = 'lara' | 'sakai' | 'vela' | 'soho';
export type Mode = 'dark' | 'light';

export interface IThemeConfig {
  theme: Theme;
  mode?: Mode;
}

export interface ITabConfig {
  route: string;
  label: string;
  icon: string;
  component: React.ComponentType;
}
