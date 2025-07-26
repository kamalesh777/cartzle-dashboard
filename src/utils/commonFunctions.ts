import type { FormInstance } from 'antd'

import { MEDIA_BASE_URL } from '@/constants/ApiConstant'

import { store } from '../store'

const storeData = store?.getState()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
/**
 * Convert an image to base64 Data URL with format and quality options.
 *
 * @param {File|String} imgSource - File object or image URL.
 * @param {String} format - Output format: 'webp', 'png', 'jpeg', 'jpg'.
 * @param {Number} quality - Number between 0 and 1 (e.g. 0.5 for 50%).
 * @returns {Promise<String>} Base64 Data URL.
 */
export const imageToBase64 = (imgSource: string | File, format = 'webp', quality?: number): Promise<string> => {
  format = format.toLowerCase() === 'jpg' ? 'jpeg' : format.toLowerCase()

  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'Anonymous'

    const handleLoad = (): void => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      // toDataURL supports 'image/png', 'image/jpeg', 'image/webp'
      const mimeType = `image/${format}`
      try {
        const dataUrl = canvas.toDataURL(mimeType, quality)
        resolve(dataUrl)
      } catch (e) {
        reject(e)
      }
    }

    img.onload = handleLoad

    img.onerror = reject

    if (typeof imgSource === 'string') {
      img.src = imgSource
    } else {
      // File object: must create a local URL
      img.src = URL.createObjectURL(imgSource)
    }
  })
}

export const hexToRGBA = (hexOrName: string, alpha = 1): string | null => {
  // Named color mapping
  const namedColors: { [key: string]: string } = {
    green: '#00ff00',
    blue: '#0000ff',
    red: '#ff0000',
    white: '#ffffff',
    cyan: '#00ffff',
    silver: '#c0c0c0',
    gray: '#808080',
    grey: '#808080',
    darkblue: '#00008b	',
    black: '#000000',
    lightblue: '#add8e6	',
    orange: '#ffa500',
    purple: '#800080',
    brown: '#a52a2a',
    yellow: '#ffff00	',
    maroon: '#800000',
    lime: '#00ff00',
    magenta: '#ff00ff	',
    olive: '#808000',
    pink: '#ffc0cb	',
    aquamarine: '#7fffd4',
    // Add more named colors as needed
  }

  // Check if the input is a named color
  const hex = hexOrName && namedColors[hexOrName.toLowerCase()]

  // If it's a named color, use the corresponding hex value
  if (hex) {
    hexOrName = hex
  }

  // Remove '#' if present
  hexOrName = hexOrName.replace('#', '')

  // Handle shorthand hex notation (e.g., #FFF)
  if (hexOrName.length === 3) {
    hexOrName = hexOrName
      .split('')
      .map(char => char + char)
      .join('')
  }

  // Parse hexadecimal values
  const bigint = parseInt(hexOrName, 16)

  // Extract RGB components
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  // Validate alpha value
  if (alpha < 0 || alpha > 1) {
    // eslint-disable-next-line no-console
    console.error('Alpha value must be between 0 and 1')
    return null
  }

  // Return RGBA color string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const isLightColor = (rgbaColor: string): boolean => {
  const colorString = rgbaColor.replace('rgba', '')
  const onlyRCode = colorString
    .substring(1, colorString.length - 1)
    .split(',')
    .at(0)
  return Number(onlyRCode) >= 128 ? true : false
}
interface errTypes {
  err: unknown
  response: {
    data: {
      message: string
      status: number
    }
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const errorMsg = (err: errTypes) => err.response.data

export const metaTitle = (title: string): string => `${title} | ${process.env.NEXT_PUBLIC_BRAND_NAME}`

export const getFavicon = (): string => {
  const faviconId = storeData?.company?.details?.faviconId
  return `${MEDIA_BASE_URL}/${faviconId}?preview=true&tr=w-400`
}

// get current path name without slash or include slash based on second param passed
export const getCurrentPath = (path: string, sliceStart: number, sliceEnd: number): string => {
  const splitPath = path.split('/')
  const currentPathname = splitPath.splice(sliceStart, sliceEnd).join('/')
  return currentPathname ? currentPathname : ''
}

// export const goBack = (url: string): void => Router.push(url)

interface ParamTypes {
  id?: string
  matcher?: string
}
export const getCardTitle = (params: ParamTypes, matcher = 'create'): string => {
  return params?.id === matcher ? 'Create' : 'Update'
}
export const getModalTitle = (id: string): string => {
  return !id ? 'Create' : 'Update'
}

export const getDecimal = (amount: number | string = 0, format = true, count = 2): string => {
  if (typeof amount === 'string') {
    return Number(amount).toFixed(count)
  }
  if (format) {
    return amount.toLocaleString('en-IN', {
      // minimumFractionDigits: 2,
      // maximumFractionDigits: 2
    })
  }
  return amount.toFixed(count)
}

type func = (value: boolean) => void

export const modalCloseHandler = (func: func, form?: FormInstance): void => {
  func(false)
  form && form.resetFields()
}

export const generateSubdomain = (companyName: string): string => {
  return companyName
    ?.toLowerCase()
    .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}
