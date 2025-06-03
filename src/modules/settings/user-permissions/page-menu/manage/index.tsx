import React from 'react'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { Form, Space, Input } from 'antd'

import type { FormValues } from '../types'
import type { ModalPropTypes } from 'src/types/common'

import { ModalWrapper, FormItemWrapper, InputWrapper, ButtonWrapper } from '@/components/Wrapper'
import { modalCloseHandler } from '@/utils/commonFunctions'

const PageMenuModal = ({ openModal, setOpenModal }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()
  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)

  const formSubmitHandler = async (values: FormValues): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log('===values', values)
  }

  return (
    <ModalWrapper open={openModal} onCancel={closeModal} title="Add Pages" onOk={() => form.submit()}>
      <Form layout="vertical" onFinish={formSubmitHandler} form={form}>
        <FormItemWrapper name="page" label="Page Name">
          <InputWrapper />
        </FormItemWrapper>
        <Form.List name="cards">
          {(fields, { add, remove }, {}) => (
            <>
              {fields.map((field, index) => (
                <FormItemWrapper label={index === 0 ? 'Cards Name' : ''} required={false} key={field.key}>
                  <Space.Compact block>
                    <FormItemWrapper
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input card name.',
                        },
                      ]}
                      noStyle
                    >
                      <Input />
                    </FormItemWrapper>
                    {fields.length > 1 ? <MinusCircleOutlined className="ms-2" onClick={() => remove(field.name)} /> : null}
                  </Space.Compact>
                </FormItemWrapper>
              ))}
              <FormItemWrapper>
                <ButtonWrapper type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Add card
                </ButtonWrapper>
              </FormItemWrapper>
            </>
          )}
        </Form.List>
      </Form>
    </ModalWrapper>
  )
}

export default PageMenuModal
