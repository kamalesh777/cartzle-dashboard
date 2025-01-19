import React, { useState } from 'react'

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Form, Input, Radio, Upload } from 'antd'

import { ButtonWrapper, FormItemWrapper, ModalWrapper, SelectWrapper } from '@/components/Wrapper'
import { MeasurementOptions } from '@/constants/AppConstant'

interface PropTypes {
  open: boolean
  setOpen: (param: boolean) => void
}

interface FormValues {
  name: string
  image: string
  price: string
  price_method: string
  width: {
    value: string
    unit: string
  }
  thickness: {
    value: string
    unit: string
  }
  length: {
    value: string
    unit: string
  }
}

const CreateWoodModalComp = ({ open, setOpen }: PropTypes): JSX.Element => {
  const [form] = Form.useForm()
  // check price method is equal to cft or not
  const isCFTPrice = Form.useWatch('price_method', form) === 'cft'

  const [loading] = useState(false)

  const modalCloseHandler = (): void => {
    setOpen(false)
  }

  const priceOptions = [
    { label: 'CFT', value: 'cft' },
    { label: 'Individual', value: 'individual' },
  ]

  const formSubmitHandler = (values: FormValues): void => {
    // eslint-disable-next-line no-console
    console.log('===values', values)
  }

  return (
    <ModalWrapper title="Add Wood Details" open={open} onCancel={modalCloseHandler} onOk={() => form.submit()}>
      <Form form={form} onFinish={formSubmitHandler}>
        <FormItemWrapper name="name" label="Wood Name" colon>
          <Input />
        </FormItemWrapper>
        <FormItemWrapper name="image" label="Wood Image">
          <Upload>
            <ButtonWrapper icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>Click to Upload</ButtonWrapper>
          </Upload>
        </FormItemWrapper>

        <FormItemWrapper label="Price Method" name="price_method" initialValue={priceOptions[0]?.value}>
          <Radio.Group options={priceOptions} />
        </FormItemWrapper>

        {!isCFTPrice && (
          <>
            {/* Wood width */}
            <FormItemWrapper name={['width', 'value']} label="Wood Width">
              <Input
                addonAfter={
                  <FormItemWrapper name={['width', 'unit']} initialValue={MeasurementOptions[0]?.value} noStyle>
                    <SelectWrapper options={MeasurementOptions} style={{ width: '90px' }} />
                  </FormItemWrapper>
                }
              />
            </FormItemWrapper>
            {/* Wood Thickness */}
            <FormItemWrapper name={['thickness', 'value']} label="Wood Thickness">
              <Input
                addonAfter={
                  <FormItemWrapper name={['thickness', 'unit']} initialValue={MeasurementOptions[0]?.value} noStyle>
                    <SelectWrapper options={MeasurementOptions} style={{ width: '90px' }} />
                  </FormItemWrapper>
                }
              />
            </FormItemWrapper>
            {/* Wood Length */}
            <FormItemWrapper name={['length', 'value']} label="Wood Length">
              <Input
                addonAfter={
                  <FormItemWrapper name={['length', 'unit']} initialValue={MeasurementOptions[1]?.value} noStyle>
                    <SelectWrapper options={MeasurementOptions} style={{ width: '90px' }} />
                  </FormItemWrapper>
                }
              />
            </FormItemWrapper>
          </>
        )}

        {/* Wood Price */}
        <FormItemWrapper name="price" label="Wood Price">
          <Input />
        </FormItemWrapper>
      </Form>
    </ModalWrapper>
  )
}

export default CreateWoodModalComp
