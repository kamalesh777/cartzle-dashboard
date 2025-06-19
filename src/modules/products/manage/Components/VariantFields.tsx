import React, { useState } from 'react'

import { Form, type FormInstance } from 'antd'

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
  const [submitted, setSubmitted] = useState<boolean>(false)

  /** Save variant
   * @param name - variant name
   * @returns void
   * @description This function is called when the variant is saved
   */
  const saveVariant = async (name: number): Promise<void> => {
    try {
      // Validate only the specific variant fields
      await form.validateFields([['variants', name]], { recursive: true })
      setSubmitted(true)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('===error', error)
    }
  }

  return (
    <CardWrapper key={vKey} className={`bg-gray-100 ${variantArr?.length !== key + 1 ? 'mb-3' : ''}`}>
      {submitted ? (
        <>Hello</>
      ) : (
        <>
          <FormItemWrapper
            label="Option Name"
            name={[name, 'option_name']}
            rules={[{ required: true, message: 'Option name is required' }]}
            {...restField}
          >
            <InputWrapper />
          </FormItemWrapper>
          <FormItemWrapper
            label="Option Value"
            name={[name, 'option_value']}
            rules={[{ required: true, message: 'Option value is required' }]}
            {...restField}
          >
            <SelectWrapper mode="tags" tokenSeparators={[',']} showArrow={false} />
          </FormItemWrapper>
          <SpaceWrapper className="w-100 justify-content-end">
            <ButtonWrapper onClick={() => remove(name)}>Delete</ButtonWrapper>
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
