import React, { PropsWithChildren } from 'react'

import { RootStyleRegistry } from './RootStyle'

const IndexLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <html lang="en">
    <RootStyleRegistry>
      <body>{children}</body>
    </RootStyleRegistry>
  </html>
)

export default IndexLayout
