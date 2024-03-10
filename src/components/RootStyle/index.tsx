'use client'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import { useServerInsertedHTML } from 'next/navigation'
import { useState, type PropsWithChildren } from 'react'

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
