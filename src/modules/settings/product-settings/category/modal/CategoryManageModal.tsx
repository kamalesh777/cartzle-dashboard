import React, { useEffect } from 'react'

import { Form } from 'antd'

import type { UnitsPayload, CategoryList, UnitGroupExpand } from '../../types'

import type { ModalPropTypes } from 'src/types/common'

import { FormItemWrapper, InputWrapper, ModalWrapper, SelectWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { useGetRequestHandler, usePostRequestHandler } from '@/hook/requestHandler'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'

import { getSelectOption, type ArrOptions } from '@/utils/disableFunction'

const CategoryManageModal = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const { submit, buttonLoading } = usePostRequestHandler<CategoryList>()

  // fetch all unit types
  const { fetchData: fetchUnitTypes, data: unitTypes } = useGetRequestHandler<UnitGroupExpand[]>()
  // fetch all units
  const { fetchData: fetchUnits } = useGetRequestHandler<UnitsPayload[]>()

  // fetch unit types
  useEffect(() => {
    fetchUnitTypes('/api/unit-group-list')
  }, [])

  // fetch units
  useEffect(() => {
    fetchUnits(`/api/unit-list/${selectedId}`)
  }, [selectedId])

  const onFinish = async (values: CategoryList): Promise<void> => {
    await submit('create-category', values, null, () => {
      form.resetFields()
      setOpenModal(false)
    })
  }
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)

  return (
    <ModalWrapper
      open={openModal}
      onCancel={closeModal}
      title={getModalTitle(selectedId as string)}
      footer={
        <SubmitButtonWrapper
          okText={'Save'}
          okButtonProps={{ loading: buttonLoading, onClick: () => form.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} initialValues={{ unitTypes: [{ id: '', units: [] }] }}>
        <FormItemWrapper name="name" label="Name" rules={requiredFieldRules}>
          <InputWrapper placeholder="eg. Furniture, groceries, etc." />
        </FormItemWrapper>
        <Form.Item name="unitGroupIds" label="Unit Group" rules={requiredFieldRules}>
          <SelectWrapper
            mode="multiple"
            placeholder="Select unit types"
            options={getSelectOption(unitTypes as unknown as ArrOptions, ['name', 'id'])}
          />
        </Form.Item>
      </Form>
    </ModalWrapper>
  )
}

export default CategoryManageModal
