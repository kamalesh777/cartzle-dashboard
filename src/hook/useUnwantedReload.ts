'use client'
import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { PageLeaveConfirmMessage } from '@/constants/AppConstant'

interface UseUnwantedReload {
  isValueChanged?: boolean
  setIsValueChanged: (value: boolean) => void
  routeNavigation: (e: React.MouseEvent<HTMLAnchorElement>, url: string) => void
}
export function useUnwantedReload(): UseUnwantedReload {
  const router = useRouter()

  const [isValueChanged, setIsValueChanged] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent): void => {
      // set cookie
      Cookies.set('isValueChanged', isValueChanged.toString())
      if (isValueChanged) {
        e.preventDefault()
        e.returnValue = ''
      } else {
        Cookies.remove('isValueChanged')
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isValueChanged])

  // leave confirm modal
  const leaveConfirmModal = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    const confirmLeave = window.confirm(PageLeaveConfirmMessage)
    if (!confirmLeave) {
      e.preventDefault()
    }
    Cookies.remove('isValueChanged')
  }

  const routeNavigation = (e: React.MouseEvent<HTMLAnchorElement>, url: string): void => {
    if (isValueChanged) {
      leaveConfirmModal(e)
    }
    router.push(url)
  }

  return { isValueChanged, setIsValueChanged, routeNavigation }
}
