import { ButtonWrapper, FormItemWrapper, InputWrapper, ModalWrapper, SelectWrapper, SpaceWrapper, SubmitButtonWrapper, TooltipWrapper, CardWrapper } from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Card, Form } from 'antd'
import React from 'react'
import { ModalPropTypes } from 'src/types/common'

const CategoryManageModal = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>) => {
    const [form] = Form.useForm()
    const onFinish = (values: any): void => {
        console.log('===Category Submitted:', values)
    }
    const closeModal = (): void => modalCloseHandler(setOpenModal, form)

    return (
        <ModalWrapper bodyScroll open={openModal} onCancel={closeModal} title={getModalTitle(selectedId as string)} footer={
            <SubmitButtonWrapper
                okText={'Save'}
                okButtonProps={{ loading: false, onClick: () => form.submit() }}
                cancelButtonProps={{
                    onClick: () => closeModal(),
                }}
            />
        }>
            <Form layout="vertical" form={form} onFinish={onFinish} >
                <FormItemWrapper name="name" label="Name" rules={requiredFieldRules}>
                    <InputWrapper placeholder="eg. Furniture, groceries, etc."/>
                </FormItemWrapper>
                <Form.List name="unit_types">
                    {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                            {fields.map((field) => (
                                    
                                <FormItemWrapper label={field.name === 0 ? "Unit Type" : "" } className='mb-1'>
                                    
                                    <CardWrapper
                                        size="small"
                                        key={field.key}
                                        className='bg-gray-100'
                                        styles={{ body: { paddingBottom: '5px' } }}
                                    >
                                        <ButtonWrapper
                                        type="link"
                                         style={{ zIndex: 500, right: '0px', top: '3px', position: 'absolute' }} size="small"
                                         onClick={() => remove(field.name)}>
                                            <TooltipWrapper title="Remove">
                                                <CloseOutlined />
                                            </TooltipWrapper>
                                        </ButtonWrapper>

                                        <Form.Item label="Name" name={[field.name, 'name']} rules={requiredFieldRules}>
                                            <InputWrapper placeholder="eg. weight, size, ram, etc." />
                                        </Form.Item>
                                        <Form.Item label="Units" name={[field.name, 'units']} rules={requiredFieldRules}>
                                            <SelectWrapper mode="tags" tokenSeparators={[',', ' ']} showArrow={false}  placeholder="eg. kg, cm, m, mm" />
                                        </Form.Item>

                                    </CardWrapper>
                                </FormItemWrapper>
                            ))}

                            <ButtonWrapper className='btn-fixed-bottom-modal primary-color' type="link" onClick={() => add(null, 0)} icon={<PlusOutlined />}>
                                Add Unit Type
                            </ButtonWrapper>
                        </div>
                    )}
                </Form.List>
            </Form>
        </ModalWrapper>
    )
}

export default CategoryManageModal