'use client'

import React, { useEffect, useState } from 'react'

import { Progress } from 'antd'
import Link from 'next/link'

import type { FormInstance } from 'antd/es/form/Form'

import { ButtonWrapper } from '@/components/Wrapper'

interface PropTypes {
  form?: FormInstance
  currentStep: number
}

const Step3Content = ({ form, currentStep }: PropTypes): JSX.Element => {
  const { company } = form?.getFieldsValue()
  const subdomain = company?.subdomain ? company.subdomain : ''
  const finalDomain = `https://${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN_NAME}`

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (currentStep === 2) {
      const duration = 20000 // total time in ms
      const intervalTime = 50
      const steps = duration / intervalTime
      const increment = 100 / steps

      const interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + increment
          if (next >= 100) {
            clearInterval(interval)
            return 100
          }
          return next
        })
      }, intervalTime)

      return () => clearInterval(interval)
    }
    return () => null
  }, [currentStep])

  const getProgressText = (): string => {
    if (progress < 20) return 'Initializing workspace...'
    if (progress < 50) return `Processing ${Math.round(progress)}%...`
    if (progress < 80) return 'Building resources...'
    if (progress < 100) return 'Almost ready...'
    return 'Workspace is ready!'
  }

  return (
    <div className="p-4 rounded-3 text-center">
      {progress < 99 ? (
        <>
          <Progress
            percent={Math.round(progress)}
            type="line"
            status={progress < 100 ? 'active' : 'success'}
          />
          <p className="mt-2">{getProgressText()}</p>
        </>
      ) : (
        <>
          <h2 className="mt-4">Successfully Built 🎉</h2>
          <p>Your workspace is ready. Click below to log in!</p>
          <Link href={finalDomain}>
            <ButtonWrapper className="mt-4" type="primary">
              Go Now
            </ButtonWrapper>
          </Link>
        </>
      )}
    </div>
  )
}

export default Step3Content
