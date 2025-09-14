import type { LayoutConfig } from '../types/layout-config'

export const layoutConfig: LayoutConfig[] = [
  {
    id: 'homepage',
    name: 'Homepage Layout',
    path: '/',
    components: [
      {
        id: 'header',
        name: 'Header',
        type: 'text',
        props: {
          content: 'Header',
        },
      },
    ],
  },
]
