import React from 'react'

import { Row } from 'antd'

import type { VariantCombination } from '../types'
import type { ModalPropTypes } from 'src/types/common'

import { ColWrapper, FormItemWrapper, InputNumberWrapper, ModalWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER, requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { getCurrency } from '@/utils/currency'

const VariantsGroupModal = ({ openModal, setOpenModal, selectedList }: ModalPropTypes<VariantCombination>): JSX.Element => {
  const closeModal = (): void => modalCloseHandler(setOpenModal)
  return (
    <ModalWrapper open={openModal} onCancel={closeModal} title="Group Variants" width={700}>
      <Row gutter={COMMON_ROW_GUTTER}>
        <ColWrapper md={8}>
          <FormItemWrapper
            name={['variantCombinations', selectedList?.label, 'sellPrice']}
            label="Sell Price"
            rules={requiredFieldRules}
          >
            <InputNumberWrapper prefix={getCurrency()} />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={8}>
          <FormItemWrapper
            name={['variantCombinations', selectedList?.label, 'costPrice']}
            label="Cost Price"
            rules={requiredFieldRules}
          >
            <InputNumberWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={8}>
          <FormItemWrapper name={['variantCombinations', selectedList?.label, 'available']} label="Available">
            <InputNumberWrapper />
          </FormItemWrapper>
        </ColWrapper>
      </Row>
    </ModalWrapper>
  )
}

export default VariantsGroupModal
