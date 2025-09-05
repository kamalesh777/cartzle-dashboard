/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-duplicate-imports */
import React, { useEffect, useMemo, useState } from 'react'

import { Form, Tabs, Typography } from 'antd'

import { Settings } from 'lucide-react'

import type { FormInstance } from 'antd'

import { ButtonWrapper, FormItemWrapper, SpaceWrapper } from '@/components/Wrapper'

import { previewMediaUrl } from '@/utils/mediaUtils'

import SeoManageCard from './SeoManageCard'

const SeoViewCard = ({ form }: { form: FormInstance }): JSX.Element => {
  const title = Form.useWatch('title', form)
  const description = Form.useWatch('description', form)
  const mediaArr = Form.useWatch('media', form)
  const seoDetails = Form.useWatch('seo', form)

  const [openSeoModal, setOpenSeoModal] = useState(false)

  // get og image
  const ogImage = useMemo(() => mediaArr?.find((item: any) => item?.isPrimary)?.fileId, [mediaArr])

  useEffect(() => {
    form.setFieldsValue({
      seo: {
        title: title,
        description: description,
        ogTitle: title,
        ogImage: ogImage ? previewMediaUrl(`${ogImage}?tr=w-120,h-120`) : '',
      },
    })
  }, [title, description, ogImage])

  const handleManage = (): void => {
    setOpenSeoModal(true)
  }

  const socialContent = (
    <>
      {seoDetails?.ogImage ? (
        <img
          src={seoDetails?.ogImage}
          alt="OG Preview"
          style={{
            width: 120,
            height: 120,
            objectFit: 'cover',
            borderRadius: 4,
            border: '1px solid rgb(236, 236, 236)',
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
        <Typography.Paragraph className="mb-0 mt-1" strong>
          {seoDetails?.ogTitle || 'Your social share title'}
        </Typography.Paragraph>
        <Typography.Paragraph style={{ color: '#555', fontSize: 14 }}>
          {seoDetails?.description ||
            'This description will appear when the product is shared on social media.'}
        </Typography.Paragraph>
      </div>
    </>
  )
  const googleContent = (
    <SpaceWrapper direction="vertical" size={0}>
      <Typography.Paragraph
        className="mb-0"
        style={{ color: '#1a0dab', fontSize: 18 }}
        ellipsis={{ rows: 1, suffix: '' }}
      >
        {seoDetails?.title || 'Your product title here'}
      </Typography.Paragraph>
      <Typography.Paragraph
        className="mb-1"
        style={{ color: '#006621', fontSize: 14 }}
        ellipsis={{ rows: 1, suffix: '' }}
      >
        www.example.com/{title || 'product-name'}
      </Typography.Paragraph>
      <Typography.Paragraph style={{ color: '#545454', fontSize: 14 }}>
        {seoDetails?.description ||
          'Your product description will appear here as a snippet in search results.'}
      </Typography.Paragraph>
    </SpaceWrapper>
  )

  const tabsArr = [
    {
      key: 'google',
      label: 'Google Search Preview',
    },
    {
      key: 'social',
      label: 'Social Preview',
    },
  ]

  const finalTabs = tabsArr.map(tab => {
    return {
      ...tab,
      children: (
        <div className="seo-card">
          <div className="seo-content">{tab.key === 'google' ? googleContent : socialContent}</div>
          <ButtonWrapper type="link" className="p-0 ms-2 h-auto" tooltip="Manage" onClick={handleManage}>
            <Settings />
          </ButtonWrapper>
        </div>
      ),
    }
  })

  return (
    <>
      <FormItemWrapper name="seo" hidden />
      <Tabs defaultActiveKey="google" items={finalTabs} style={{ overflow: 'hidden' }} />
      <SeoManageCard
        openModal={openSeoModal}
        setOpenModal={setOpenSeoModal}
        selectedList={seoDetails}
        form={form}
      />
    </>
  )
}

export default SeoViewCard
