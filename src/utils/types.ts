export type Theme = 'lara' | 'sakai' | 'vela' | 'soho';
export type Mode = 'dark' | 'light';

export interface ThemeConfig {
  theme: Theme;
  mode?: Mode;
}
