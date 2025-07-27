import React from 'react'

import { Form, Row } from 'antd'

import type { VariantCombination } from '../types'
import type { FormInstance, Rule } from 'antd/es/form'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'
import { ColWrapper, FormItemWrapper, InputNumberWrapper, ModalWrapper } from '@/components/Wrapper'
import UploadWrapper from '@/components/Wrapper/UploadWrapper'
import { COMMON_ROW_GUTTER, requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { getCurrency } from '@/utils/currency'

interface FieldsArrType {
  name: string
  label: React.ReactNode
  rules?: Rule[]
  initialValue?: string | number
  fieldsProps?: {
    value?: string | number
    readOnly?: boolean
  }
}

interface Props extends ModalPropTypes<VariantCombination> {
  form: FormInstance
}

const VariantsGroupModal = ({ openModal, setOpenModal, selectedList, form }: Props): JSX.Element => {
  const closeModal = (): void => modalCloseHandler(setOpenModal)
  const renderPrefix = (name: string): string => {
    if (name === 'sellPrice' || name === 'costPrice') {
      return getCurrency()
    }
    return ''
  }

  const fieldsArr: FieldsArrType[] = [
    {
      name: 'sellPrice',
      label: 'Sell Price',
      rules: requiredFieldRules,
    },
    {
      name: 'costPrice',
      label: 'Cost Price',
      rules: requiredFieldRules,
    },
    {
      name: 'available',
      label: 'Available',
      rules: requiredFieldRules,
    },
    {
      name: 'sku',
      label: <InfoTooltip title="Available product in stock">SKU</InfoTooltip>,
      initialValue: 'adad',
      fieldsProps: {
        readOnly: true,
      },
    },
  ]

  return (
    <ModalWrapper
      open={openModal}
      onCancel={closeModal}
      title={`Variants: ${selectedList?.label}`}
      width={600}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={COMMON_ROW_GUTTER}>
          {fieldsArr?.map((item: FieldsArrType) => (
            <ColWrapper md={12} key={item.name}>
              <FormItemWrapper
                name={['variantCombinations', 0, item.name]}
                label={item.label}
                rules={item.rules}
                initialValue={item.initialValue}
              >
                <InputNumberWrapper prefix={renderPrefix(item.name)} {...item.fieldsProps} />
              </FormItemWrapper>
            </ColWrapper>
          ))}
          {selectedList?.parent && (
            <ColWrapper md={24}>
              <FormItemWrapper
                name={['variantCombinations', selectedList?.label, 'images']}
                label="Product Images"
              >
                <UploadWrapper />
              </FormItemWrapper>
            </ColWrapper>
          )}
        </Row>
      </Form>
    </ModalWrapper>
  )
}

export default VariantsGroupModal
