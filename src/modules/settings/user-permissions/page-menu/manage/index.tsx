import React from 'react'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { Form, Space, Input } from 'antd'

import type { FormValues } from '../types'
import type { ModalPropTypes } from 'src/types/common'

import { ModalWrapper, FormItemWrapper, InputWrapper, ButtonWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'

const PageMenuModal = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()
  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)

  const formSubmitHandler = async (values: FormValues): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log('===values', values)
  }

  return (
    <ModalWrapper
      open={openModal}
      onCancel={closeModal}
      title={getModalTitle(selectedId as string)}
      footer={
        <SubmitButtonWrapper
          okText={'Save'}
          okButtonProps={{ loading: false, onClick: () => form.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
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
                    <MinusCircleOutlined className="ms-2" onClick={() => remove(field.name)} />
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
