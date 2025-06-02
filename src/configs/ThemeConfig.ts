import type { ThemeConfig } from 'antd'

const initialThemeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#fe2df1',
    colorInfo: '#fe2df1',
    // colorBgSolidHover: '#32ff00',
  },
  components: {
    Button: {
      colorLink: 'defaultColor',
    },
    Tooltip: {
      colorBgSpotlight: '#fff',
      colorTextLightSolid: '#000000e0',
      lineHeight: 1.3,
    },
  },
}

export default initialThemeConfig
