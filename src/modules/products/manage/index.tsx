/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect } from 'react'

import { ArrowRightOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons'
import { Form, Tabs } from 'antd'

import type { ProductFormValueTypes } from '../types'

import type { PositionType } from './types'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { ButtonWrapper, CardWrapper, SpaceWrapper } from '@/components/Wrapper'
import { PRODUCT_LIST_ROUTE, ProductTabsArr } from '@/constants/AppConstant'

import { useUnwantedReload } from '@/hook/useUnwantedReload'

import AdditionalTab from './Components/tabs/AdditionalTab'
import GeneralTab from './Components/tabs/GeneralTab'
import VariationTab from './Components/tabs/VariationTab'

// Product manage component
const ProductManageComp = (): JSX.Element => {
  const { setIsValueChanged } = useUnwantedReload()
  const [currentTab, setCurrentTab] = React.useState<number>(ProductTabsArr[0])

  const [form] = Form.useForm()

  const result = {
    title: 'Samsung Galaxy A35 5G',
    description:
      "The Samsung Galaxy A35 5G is a sleek blend of style and performance. Its stunning design, featuring Corning Gorilla Glass Victus+, and linear camera layout, sets it apart. Capture life's moments with the 50 MP wide-angle camera, even in low light, thanks to enhanced sensors. Record steady videos with Super HDR, OIS, and VDIS. Protect your data with Samsung Knox Vault, while enjoying the vibrant 16.83 cm FHD+ Super AMOLED display. Experience seamless multitasking with the improved GPU and NPU, and store all your content with a large internal storage. Stay connected longer with the 5000mAh battery and IP67-rated protection against spills and dust. Enjoy up to 5 years of security updates and easy data transfer with Smart Switch and Quick Share. With One UI 6, personalise your experience effortlessly. The Samsung Galaxy A35 5G: where style meets substance in a compact package.",
    category: 'c506ccda-382e-49de-9551-6cd838da33f0',
    costPrice: 18999,
    salePrice: 21999,
    profit: 3000,
    margin: '15.79',
    variants: [
      {
        opName: 'rom',
        opValue: ['256gb', '128gb'],
      },
      {
        opName: 'ram',
        opValue: ['8gb', '16gb'],
      },
    ],
    variantCombinations: [
      {
        label: '16gb',
        options: {
          ram: '16gb',
        },
        parent: true,
        key: '16gb',
        sellPrice: 19999,
        costPrice: 16999,
        available: 0,
        children: [
          {
            label: '256gb x 16gb',
            options: {
              rom: '256gb',
              ram: '16gb',
            },
            parent: false,
            key: '16gb-0',
            sellPrice: 19999,
            costPrice: 16999,
            available: 0,
          },
          {
            label: '128gb x 16gb',
            options: {
              rom: '128gb',
              ram: '16gb',
            },
            parent: false,
            key: '16gb-1',
            sellPrice: 19999,
            costPrice: 16999,
            available: 0,
          },
        ],
      },
      {
        label: '256gb x 16gb',
        options: {
          rom: '256gb',
          ram: '16gb',
        },
        parent: false,
        key: '16gb-0',
        sellPrice: 19999,
        costPrice: 16999,
        available: 0,
      },
      {
        label: '128gb x 16gb',
        options: {
          rom: '128gb',
          ram: '16gb',
        },
        parent: false,
        key: '16gb-1',
        sellPrice: 19999,
        costPrice: 16999,
        available: 0,
      },
    ],
    groupBy: 'ram',
  }

  useEffect(() => {
    form.setFieldsValue(result)
  }, [])

  // tabs array
  const tabsArray = [
    {
      label: 'General',
      key: ProductTabsArr[0].toString(),
      children: <GeneralTab form={form} />,
    },
    {
      label: 'Variation',
      key: ProductTabsArr[1].toString(),
      children: <VariationTab form={form} />,
    },
    {
      label: 'Additional',
      key: ProductTabsArr[2].toString(),
      children: <AdditionalTab form={form} />,
    },
  ]

  const nextHandler = async (): Promise<void> => {
    if (currentTab >= ProductTabsArr[2]) {
      return
    }
    await form.validateFields({ recursive: true })
    setCurrentTab(prevState => +prevState + 1)
  }

  /** Operations slot */
  const OperationsSlot: Record<PositionType, React.ReactNode> = {
    left:
      ProductTabsArr[0] !== currentTab ? (
        <ButtonWrapper onClick={() => setCurrentTab(prevState => prevState - 1)}>Back</ButtonWrapper>
      ) : null,
    right: (
      <ButtonWrapper type="primary" onClick={nextHandler}>
        {ProductTabsArr[2] !== currentTab ? 'Next' : 'Save'}
        {ProductTabsArr[2] !== currentTab ? <ArrowRightOutlined /> : <SaveOutlined />}
      </ButtonWrapper>
    ),
  }

  const tabChangeHandler = async (key: string): Promise<void> => {
    await form.validateFields({ recursive: true })
    setCurrentTab(Number(key))
  }

  /** Form submit handler
   * @param formValue - Form values
   * @returns void
   * @description This function is called when the form is submitted
   */
  const formSubmitHandler = async (formValue: ProductFormValueTypes): Promise<void> => {
    const payload = {
      ...formValue,
    }
    console.log('===formValue', payload)
  }

  /** Main component */
  const MAIN_COMP = (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={formSubmitHandler}
        onValuesChange={() => setIsValueChanged(true)}
      >
        <CardWrapper>
          <Tabs
            centered
            onChange={tabChangeHandler}
            defaultActiveKey={ProductTabsArr[0].toString()}
            activeKey={currentTab.toString()}
            items={tabsArray}
            tabBarExtraContent={OperationsSlot}
          />
        </CardWrapper>
      </Form>
    </>
  )

  /** Action component */
  const ACTION_COMP = (
    <ButtonWrapper type="default" className="primary-color">
      <SpaceWrapper>
        <UploadOutlined /> Import CSV
      </SpaceWrapper>
    </ButtonWrapper>
  )

  return (
    <DynamicPageLayout
      MainComp={MAIN_COMP}
      goBackUrl={PRODUCT_LIST_ROUTE}
      hideTitle
      ActionComp={ACTION_COMP}
    />
  )
}

export default ProductManageComp
