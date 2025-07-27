import React, { useEffect, useState } from 'react'

import { Progress } from 'antd'

// import LogoWrapper from '../Wrapper/LogoWrapper'

// Page loader component
const PageLoader = (): JSX.Element | null => {
  const [progress, setProgress] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 14
        if (next >= 100) {
          clearInterval(interval)
          return 100
        }
        return next
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center flex-column"
      style={{ marginTop: '-50px' }}
    >
      {/* <LogoWrapper collapsed={false} className="text-center mb-3" /> */}
      <Progress
        className="w-50 mt-2"
        percent={progress}
        format={percent => (percent ? (percent < 100 ? 'Loading....' : 'Done') : '')}
        percentPosition={{ align: 'center', type: 'outer' }}
        size="small"
      />
    </div>
  )
}

export default PageLoader
