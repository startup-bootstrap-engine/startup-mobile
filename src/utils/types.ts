export type Theme = 'lara' | 'sakai' | 'vela' | 'soho';
export type Mode = 'dark' | 'light';

export interface IThemeConfig {
  theme: Theme;
  mode?: Mode;
}
