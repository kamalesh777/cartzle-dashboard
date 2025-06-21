import { ColWrapper, FormItemWrapper, InputNumberWrapper, ModalWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER, requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'
import { Row } from 'antd'
import React from 'react'
import { ModalPropTypes } from 'src/types/common'
import { VariantCombination } from '../types'
import { getCurrency } from '@/utils/currency'

const VariantsGroupModal = ({ openModal, setOpenModal, selectedList }: ModalPropTypes<VariantCombination>): JSX.Element => {

  const closeModal = (): void => modalCloseHandler(setOpenModal)
  return (
    <ModalWrapper open={openModal} onCancel={closeModal} title="Group Variants" width={700}>
        
      <Row gutter={COMMON_ROW_GUTTER}>
        <ColWrapper md={8}>
          <FormItemWrapper name={['variants_table', selectedList?.label, 'sell_price']} label="Sell Price" rules={requiredFieldRules}>
            <InputNumberWrapper prefix={getCurrency()} />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={8}>
          <FormItemWrapper name={['variants_table', selectedList?.label, 'cost_price']} label="Cost Price" rules={requiredFieldRules}>
            <InputNumberWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={8}>
          <FormItemWrapper name={['variants_table', selectedList?.label, 'available']} label="Available">
            <InputNumberWrapper />
          </FormItemWrapper>
        </ColWrapper>
      </Row>
    </ModalWrapper>
  )
}

export default VariantsGroupModal