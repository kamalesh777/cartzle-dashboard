/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React from 'react'

import { ArrowRightOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons'
import { Form, Tabs } from 'antd'

import type { ProductFormValueTypes } from '../types'

import type { PositionType } from './types'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { ButtonWrapper, CardWrapper, SpaceWrapper } from '@/components/Wrapper'
import { PRODUCT_LIST_ROUTE, ProductTabsArr } from '@/constants/AppConstant'

import { useUnwantedReload } from '@/hook/useUnwantedReload'

import AdditionalTab from './Components/AdditionalTab'
import GeneralTab from './Components/GeneralTab'
import VariationTab from './Components/VariationTab'

// Product manage component
const ProductManageComp = (): JSX.Element => {
  const { setIsValueChanged } = useUnwantedReload()
  const [currentTab, setCurrentTab] = React.useState<number>(ProductTabsArr[0])

  const [form] = Form.useForm()

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
