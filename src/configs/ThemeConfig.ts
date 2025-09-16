import { type ThemeConfig } from 'antd'

const initialThemeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#0eb7b7',
    colorInfo: '#0eb7b7',
    borderRadius: 5,
    colorText: 'rgba(0,0,0,0.75)',
    // colorBgSolidHover: '#32ff00',
  },
  // algorithm: theme.darkAlgorithm,
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
