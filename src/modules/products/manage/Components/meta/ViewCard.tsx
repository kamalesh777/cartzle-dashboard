import React, { useState } from 'react'

import { Tabs, Typography } from 'antd'

import { CardWrapper } from '@/components/Wrapper'

const MetaViewCard = (): JSX.Element => {
  const [meta] = useState({
    seoTitle: '',
    seoDescription: '',
    ogTitle: '',
    ogImage: '',
  })
  return (
    <Tabs
      defaultActiveKey="google"
      style={{ marginTop: 20 }}
      items={[
        {
          key: 'google',
          label: 'Google Search Preview',
          children: (
            <CardWrapper style={{ background: '#fff' }}>
              <Typography.Text style={{ color: '#1a0dab', fontSize: 18 }}>
                {meta?.seoTitle || 'Your product title here'}
              </Typography.Text>
              <div style={{ color: '#006621', fontSize: 14 }}>www.example.com/product-name</div>
              <div style={{ color: '#545454', fontSize: 14 }}>
                {meta?.seoDescription ||
                  'Your product description will appear here as a snippet in search results.'}
              </div>
            </CardWrapper>
          ),
        },
        {
          key: 'social',
          label: 'Social Preview',
          children: (
            <CardWrapper
              style={{
                background: '#f0f2f5',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {meta?.ogImage ? (
                <img
                  src={meta?.ogImage}
                  alt="OG Preview"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 4,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 120,
                    height: 120,
                    background: '#d9d9d9',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    color: '#888',
                  }}
                >
                  No Image
                </div>
              )}
              <div>
                <Typography.Text strong>{meta.ogTitle || 'Your social share title'}</Typography.Text>
                <div style={{ color: '#555' }}>
                  {meta.seoDescription ||
                    'This description will appear when the product is shared on social media.'}
                </div>
              </div>
            </CardWrapper>
          ),
        },
      ]}
    />
  )
}

export default MetaViewCard
