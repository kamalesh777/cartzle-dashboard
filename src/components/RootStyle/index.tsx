'use client'
import { useState, type PropsWithChildren } from 'react'

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import { useServerInsertedHTML } from 'next/navigation'

export const RootStyleRegistry = ({ children }: PropsWithChildren): JSX.Element => {
  const [cache] = useState(() => createCache())

  useServerInsertedHTML(() => (
    <script
      dangerouslySetInnerHTML={{
        __html: `</script>${extractStyle(cache)}<script>`,
      }}
    />
  ))

  return <StyleProvider cache={cache}>{children}</StyleProvider>
}
