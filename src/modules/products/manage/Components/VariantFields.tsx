import React from 'react'

import { DeleteOutlined } from '@ant-design/icons'
import { Form, Tag, type FormInstance } from 'antd'

import { useSelector } from 'react-redux'

import type { UnitGroupType } from '../types'
import type { RootState } from '@/store/index'

import {
  CardWrapper,
  FormItemWrapper,
  InputWrapper,
  SelectWrapper,
  SpaceWrapper,
  ButtonWrapper,
  TooltipWrapper,
} from '@/components/Wrapper'

interface PropTypes {
  field: { name: number; key: React.Key }
  remove: (index: number) => void
  key: number
  form: FormInstance
  inputEdit: boolean | number
  setInputEdit: (value: boolean | number) => void
}
const VariantFields = ({ field, remove, key, form, inputEdit, setInputEdit }: PropTypes): JSX.Element => {
  const variantOptions = useSelector((state: RootState) => state.variants?.options)
  const variantsPlaceHolder = variantOptions?.map((item: UnitGroupType) => item?.name)
  const { key: vKey, name, ...restField } = field ?? { key: key, name: key }

  /** Save variant
   * @param name - variant name
   * @returns void
   * @description This function is called when the variant is saved
   */
  const saveVariant = async (e: React.MouseEvent, name: number): Promise<void> => {
    e.stopPropagation()
    try {
      // Validate only the specific variant fields
      await form.validateFields([['variants', name]], { recursive: true })
      setInputEdit(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('===error', error)
    }
  }

  const removeFunc = (e: React.MouseEvent, name: number): void => {
    setInputEdit(false)
    remove(name)
    e.stopPropagation()
  }

  const editFunc = (e: React.MouseEvent, name: number): void => {
    setInputEdit(name)
    e.stopPropagation()
  }

  const variantsArr = Form.useWatch('variants', form)

  return (
    <CardWrapper
      bodyStyle={{ padding: '15px' }}
      key={vKey}
      className={`bg-gray-100 ${!inputEdit ? 'cursor-pointer' : ''} ${variantsArr?.length - 1 === vKey ? '' : 'mb-3'}`}
      onClick={e => editFunc(e, name)}
    >
      {inputEdit !== name ? (
        <>
          <SpaceWrapper className="w-100 justify-content-between">
            <p className="fw-bold mb-2">{form.getFieldValue(['variants', name, 'opName'])}</p>
            <TooltipWrapper title="Delete variant">
              <ButtonWrapper
                type="link"
                icon={<DeleteOutlined />}
                className="error-color"
                onClick={event => removeFunc(event, name)}
              />
            </TooltipWrapper>
          </SpaceWrapper>
          {form.getFieldValue(['variants', name, 'opValue'])?.map((item: string, index: number) => (
            <Tag key={index} color="processing">
              {item}
            </Tag>
          ))}
        </>
      ) : (
        <>
          <FormItemWrapper
            label="Option Name"
            name={[name, 'opName']}
            rules={[{ required: true, message: 'Option name is required' }]}
            {...restField}
          >
            <InputWrapper placeholder={variantsPlaceHolder?.at(variantsArr?.length - 1)} />
          </FormItemWrapper>
          <FormItemWrapper
            label="Option Value"
            name={[name, 'opValue']}
            rules={[{ required: true, message: 'Option value is required' }]}
            {...restField}
          >
            <SelectWrapper mode="tags" tokenSeparators={[',', ' ']} showArrow={false} notFoundContent={null} />
          </FormItemWrapper>
          <SpaceWrapper className="w-100 justify-content-between">
            <ButtonWrapper className="error-color" onClick={e => removeFunc(e, name)}>
              Delete
            </ButtonWrapper>
            <ButtonWrapper className="bg-secondary text-white" onClick={event => saveVariant(event, name)}>
              Save
            </ButtonWrapper>
          </SpaceWrapper>
        </>
      )}
    </CardWrapper>
  )
}

export default VariantFields
