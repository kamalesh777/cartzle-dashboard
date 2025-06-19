import React, { useState } from 'react'

import { Form, Tag, type FormInstance } from 'antd'

import { CardWrapper, FormItemWrapper, InputWrapper, SelectWrapper, SpaceWrapper, ButtonWrapper } from '@/components/Wrapper'

interface PropTypes {
  field: { name: number; key: React.Key }
  remove: (index: number) => void
  key: number
  form: FormInstance
}
const VariantFields = ({ field, remove, key, form }: PropTypes): JSX.Element => {
  const { key: vKey, name, ...restField } = field ?? { key: key, name: key }

  const variantArr = Form.useWatch('variants', form)
  const [inputEdit, setInputEdit] = useState<boolean>(true)

  /** Save variant
   * @param name - variant name
   * @returns void
   * @description This function is called when the variant is saved
   */
  const saveVariant = async (name: number): Promise<void> => {
    try {
      // Validate only the specific variant fields
      await form.validateFields([['variants', name]], { recursive: true })
      setInputEdit(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('===error', error)
    }
  }

  const variantsPlaceHolder = ['Color', 'Size', 'Material']

  return (
    <CardWrapper
      key={vKey}
      className={`bg-gray-100 cursor-pointer ${variantArr?.length !== key + 1 ? 'mb-3' : ''}`}
      onClick={() => setInputEdit(true)}
    >
      {!inputEdit ? (
        <>
          <p className="fw-bold mb-2">{form.getFieldValue(['variants', name, 'option_name'])}</p>
          {form.getFieldValue(['variants', name, 'option_value']).map((item: string, index: number) => (
            <Tag key={index} color="processing">
              {item}
            </Tag>
          ))}
        </>
      ) : (
        <>
          <FormItemWrapper
            label="Option Name"
            name={[name, 'option_name']}
            rules={[{ required: true, message: 'Option name is required' }]}
            {...restField}
          >
            <InputWrapper placeholder={variantsPlaceHolder[name]} />
          </FormItemWrapper>
          <FormItemWrapper
            label="Option Value"
            name={[name, 'option_value']}
            rules={[{ required: true, message: 'Option value is required' }]}
            {...restField}
          >
            <SelectWrapper mode="tags" tokenSeparators={[',']} showArrow={false} notFoundContent={null} />
          </FormItemWrapper>
          <SpaceWrapper className="w-100 justify-content-between">
            <ButtonWrapper className="error-color" onClick={() => remove(name)}>
              Delete
            </ButtonWrapper>
            <ButtonWrapper className="bg-secondary text-white" onClick={() => saveVariant(name)}>
              Save
            </ButtonWrapper>
          </SpaceWrapper>
        </>
      )}
    </CardWrapper>
  )
}

export default VariantFields
