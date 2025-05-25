'use client'
import React, { useEffect, useState } from 'react'

import { EllipsisOutlined, MinusCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Dropdown, Form, Input, Space, type MenuProps } from 'antd'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { ButtonWrapper, FormItemWrapper, InputWrapper, ModalWrapper, TableWrapper } from '@/components/Wrapper'
import { CONTROL_PANEL_ROUTE } from '@/constants/AppConstant'

interface FormValues {
  page: string
  cards: string[]
}

const PageMenuList = (): JSX.Element => {
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const supposeObject = {
    page: 'Puja',
    cards: ['card1', 'card2', 'ayushi'],
  }

  useEffect(() => {
    if (supposeObject) {
      form.setFieldsValue(supposeObject)
    }
  }, [supposeObject])

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ]

  const items: MenuProps['items'] = [
    {
      label: 'Update Role',
      key: 'update_role',
    },
    {
      label: 'Delete Role',
      key: 'delete_role',
    },
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '',
      key: 'action',
      className: 'text-right',
      render: () => (
        <Dropdown menu={{ items }} trigger={['click']}>
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ]

  const closeModalhandler = (): void => {
    setOpenModal(false)
  }

  const actionComponent = (
    <Space>
      <Input prefix={<SearchOutlined />} placeholder="Search..." />
      <ButtonWrapper type="primary" onClick={() => setOpenModal(true)}>
        Add Page
      </ButtonWrapper>
    </Space>
  )
  const mainComp = <TableWrapper dataSource={dataSource} columns={columns} />

  const formSubmitHandler = async (values: FormValues): Promise<void> => {
    console.log('===values', values)
  }
  return (
    <>
      <DynamicPageLayout goBackUrl={CONTROL_PANEL_ROUTE} MainComp={mainComp} ActionComp={actionComponent} />
      <ModalWrapper open={openModal} onCancel={closeModalhandler} title="Add Pages" onOk={() => form.submit()}>
        <Form layout="vertical" onFinish={formSubmitHandler} form={form}>
          <FormItemWrapper name="page" label="Page Name">
            <InputWrapper />
          </FormItemWrapper>
          <Form.List name="cards">
            {(fields, { add, remove }, {}) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item label={index === 0 ? 'Cards Name' : ''} required={false} key={field.key}>
                    <Space.Compact block>
                      <Form.Item
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
                      </Form.Item>
                      {fields.length > 1 ? <MinusCircleOutlined className="ms-2" onClick={() => remove(field.name)} /> : null}
                    </Space.Compact>
                  </Form.Item>
                ))}
                <Form.Item>
                  <ButtonWrapper type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Add card
                  </ButtonWrapper>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </ModalWrapper>
    </>
  )
}

export default PageMenuList
