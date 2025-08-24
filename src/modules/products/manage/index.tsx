/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'

import { ArrowRightOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons'
import { Form, Tabs } from 'antd'

import { useDispatch } from 'react-redux'

import type { ProductDataTypes, ProductFormValueTypes } from '../types'

import type { PositionType } from './types'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { ButtonWrapper, CardWrapper, SpaceWrapper } from '@/components/Wrapper'
import FormWrapper from '@/components/Wrapper/FormWrapper'
import { PRODUCT_LIST_ROUTE, ProductTabsArr } from '@/constants/AppConstant'

import { usePostRequestHandler } from '@/hook/requestHandler'
import { useUnwantedReload } from '@/hook/useUnwantedReload'

import { setVariantsTable } from '@/store/slices/variantsSlice'

import AdditionalTab from './Components/tabs/AdditionalTab'
import GeneralTab from './Components/tabs/GeneralTab'
import VariationTab from './Components/tabs/VariationTab'

interface Props {
  data: ProductDataTypes
}

// Product manage component
const ProductManageComp = ({ data }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const { setIsValueChanged } = useUnwantedReload()
  const firstIndex = ProductTabsArr[0] || 0
  const lastIndex = ProductTabsArr[2]
  const [currentTab, setCurrentTab] = useState<number>(firstIndex)
  const { submit, buttonLoading } = usePostRequestHandler()

  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      const result = {
        ...data,
      }
      form.setFieldsValue(result)
      dispatch(setVariantsTable(data?.variantCombinations || []))
    }
  }, [data])

  // tabs array
  const tabsArray = [
    {
      label: 'General',
      key: firstIndex.toString(),
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

  // next handler
  const nextHandler = async (): Promise<void> => {
    // Exit if already beyond last tab
    if (currentTab > lastIndex) return

    // If on last tab, submit the form
    if (currentTab === lastIndex) {
      await form.submit()
      return
    }

    try {
      await form.validateFields({ recursive: true })
      setCurrentTab(prevState => prevState + 1)
    } catch (error) {
      console.error('==Validation failed:', error)
    }
  }

  // previous handler
  const prevHandler = (): void => {
    if (currentTab <= firstIndex) {
      return
    }
    setCurrentTab(prevState => +prevState - 1)
  }

  /** Operations slot */
  const OperationsSlot: Record<PositionType, React.ReactNode> = {
    left: firstIndex !== currentTab ? <ButtonWrapper onClick={prevHandler}>Back</ButtonWrapper> : null,
    right: (
      <ButtonWrapper type="primary" onClick={nextHandler} loading={buttonLoading}>
        {lastIndex === currentTab ? 'Save' : 'Next'}
        {lastIndex === currentTab ? <SaveOutlined /> : <ArrowRightOutlined />}
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
    const { uploadMedia, mediaFiles, ...rest } = formValue

    const payload = {
      ...rest,
    }

    const API_ENDPOINT = data?.id ? `/api/product-update/${data?.id}` : '/api/product-create'
    await submit(data?.id, API_ENDPOINT, payload, PRODUCT_LIST_ROUTE)
  }

  /** Main component */
  const MAIN_COMP = (
    <>
      <FormWrapper
        form={form}
        onFinish={formSubmitHandler}
        onValuesChange={() => setIsValueChanged(true)}
        log
      >
        <CardWrapper>
          <Tabs
            centered
            onChange={tabChangeHandler}
            defaultActiveKey={firstIndex.toString()}
            activeKey={currentTab.toString()}
            items={tabsArray}
            tabBarExtraContent={OperationsSlot}
          />
        </CardWrapper>
      </FormWrapper>
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
