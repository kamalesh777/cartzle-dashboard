import { MEDIA_BASE_URL } from '@/constants/ApiConstant';
import { Image, ImageProps } from 'antd';
import React, { useState } from 'react';

interface PropTypes extends ImageProps {
  src?: string;
  visible?: boolean;
  setVisible?: (value: boolean) => void;
  multiple?: boolean;
  items?: string[];
}

export const getPreviewImageUrl = (value: string) =>
    value?.startsWith('http')
      ? value
      : `${MEDIA_BASE_URL}/${value}?preview=true`;

const ImagePreview = ({
  src,
  visible = false,
  setVisible,
  multiple = false,
  items = [],
  ...props
}: PropTypes) => {
  
  /**
   * Fallback image for image preview
   */
  const fallbackImage = `${MEDIA_BASE_URL}/6882ad4d5c7cd75eb8762b74?preview=true&tr=w-200,h-200`;
  const [current, setCurrent] = useState(items?.indexOf(src || ''));

  /**
   * Handle visible change
   * @param value - visible value
   */
  const handleVisibleChange = (value: boolean) => {
    setVisible?.(value);
  }

  /**
   * Render image
   * @param imageSrc - image source
   * @param withPreview - whether to show preview
   * @returns JSX.Element
   */
  const renderImage = (imageSrc: string, withPreview = false) => (
    <Image
      src={getPreviewImageUrl(imageSrc)}
      style={{ display: 'none' }}
      fallback={fallbackImage}
      preview={
        withPreview
          ? {
              visible,
              src: getPreviewImageUrl(imageSrc),
              onVisibleChange: setVisible,
            }
          : {}
      }
      {...props}
    />
  )

  return multiple ? (
    <Image.PreviewGroup
        preview={{ 
            visible, 
            onVisibleChange: handleVisibleChange,
            current: current,
            onChange: (index) => {
                setCurrent(index)
            },
        }}
    >
      {items.map((item) => renderImage(item))}
    </Image.PreviewGroup>
  ) : (
    src ? renderImage(src, true) : null
  );
};

export default ImagePreview;
