import Image from 'next/image'
import React from 'react'

import type { ImageProps } from 'next/image'

const NextImage: React.FC<ImageProps> = ({ src, alt, width, height, className, ...restProps }): JSX.Element => {
  return <Image src={src} alt={alt} width={width} height={height} className={className} {...restProps} />
}

export default NextImage
