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
      colorBgSpotlight: '#000000e0',
      colorTextLightSolid: '#fff',
      lineHeight: 1.3,
      fontSize: 14,
    },
  },
}

export default initialThemeConfig
