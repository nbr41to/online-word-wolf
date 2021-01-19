
export const theme1 = {
  fonts:{
    ss:'8px',
    small:'12px',
    midium:'16px',
    large:'20px',
    heading:'28px',
  },
  color: '#00AD9F',
  colors:{
    green: '',
    blue: '',
    red: '',
    orange: '',
    pink: '',
  },
}

// エディターがThemeを参照してくれるようになる
type Theme = typeof theme1
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}