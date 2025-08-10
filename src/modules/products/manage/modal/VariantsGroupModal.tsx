import React from 'react'

import { StarFilled, StarOutlined, EyeOutlined } from '@ant-design/icons'
import { Form, Row, Tooltip } from 'antd'

import type { VariantCombination, VariantMedia } from '../types'
import type { FormInstance, Rule } from 'antd/es/form'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'
import {
  ButtonWrapper,
  ColWrapper,
  EmptyWrapper,
  FormItemWrapper,
  InputNumberWrapper,
  ModalWrapper,
  SpaceWrapper,
} from '@/components/Wrapper'

import { MEDIA_BASE_URL } from '@/constants/ApiConstant'
import { CATEGORY_ID, COMMON_ROW_GUTTER, requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { getCurrency } from '@/utils/currency'
import { generateSku } from '@/utils/productUtils'

import { setPrimaryMediaHandler } from '../utils/setPrimaryHandler'

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
  const productTitle = Form.useWatch('title', form)
  const uploadedMediaArr = Form.useWatch('mediaFiles', form)
  const productCategory = Form.useWatch(CATEGORY_ID, form)

  console.log("==productCategory", productCategory)
  const skuValue = generateSku(productTitle, productCategory, selectedList?.label as string)

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
      initialValue: skuValue,
      fieldsProps: {
        readOnly: true,
      },
    },
  ]

  const fileActiveHandler = (uploadedFiles: VariantMedia[], index: number): void => {
    const result = setPrimaryMediaHandler(uploadedFiles, index)
    form.setFieldsValue({ mediaFiles: result })
  }

  console.log("==selectedList", selectedList)

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
                name={['variantCombinations', selectedList?.label, 'mediaIds']}
                label="Variant Images"
              >
                {uploadedMediaArr?.length ? (
                  <div className="media-list-container">
                    {uploadedMediaArr?.map((media: VariantMedia) => (
                      <div key={media?.name} className="media-list">
                        <img
                          src={`${MEDIA_BASE_URL}/${media.fileId}?preview=true&tr=w-100,h-100`}
                          alt={media.name}
                          className="w-20 h-20"
                        />
                        <SpaceWrapper className="upload-action" size={0}>
                          <ButtonWrapper
                            // onClick={() => fileActiveHandler(uploadedMediaArr, selectedList?.label)}
                            type="text"
                            icon={
                              media?.isPrimary ? (
                                <Tooltip title="Primary Image">
                                  <StarFilled style={{ color: '#ffc221' }} />
                                </Tooltip>
                              ) : (
                                <Tooltip title="Set as primary">
                                  <StarOutlined style={{ color: '#FFF' }} />
                                </Tooltip>
                              )
                            }
                            className="p-0"
                          />
                          <ButtonWrapper
                            type="text"
                            icon={<EyeOutlined className="text-white" />}
                            tooltip="View"
                            className="p-0"
                          />
                        </SpaceWrapper>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyWrapper
                    imageStyle={{ width: 100, height: 100, margin: 'auto' }}
                    entity="Media"
                    className="ant-card-bordered p-4 text-center"
                    style={{ borderRadius: '8px' }}
                  />
                )}
              </FormItemWrapper>
            </ColWrapper>
          )}
        </Row>
      </Form>
    </ModalWrapper>
  )
}

export default VariantsGroupModal
