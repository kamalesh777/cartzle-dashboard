import React, { useEffect, useState } from 'react'

import { Form } from 'antd'

import type { CategoryList, UnitGroupExpand } from '../../types'

import type { ModalPropTypes } from 'src/types/common'

import { getRequest } from '@/api/preference/RequestService'
import { TableContentLoaderWithProps, Toast } from '@/components/Common'
import { FormItemWrapper, InputWrapper, ModalWrapper, SelectWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { useGetRequestHandler, usePostRequestHandler } from '@/hook/requestHandler'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'
import { getSelectOption, type ArrOptions } from '@/utils/disableFunction'

const CategoryManageModal = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const { submit, buttonLoading } = usePostRequestHandler<CategoryList>()

  // fetch all unit types
  const { fetchData: fetchUnitGroups, data: unitTypes } = useGetRequestHandler<UnitGroupExpand[]>()
  const [loading, setLoading] = useState<boolean>(false)

  // fetch unit types
  useEffect(() => {
    fetchUnitGroups('/api/unit-group-list')
    if (selectedId) {
      fetchCategoryDetails(selectedId)
    }
  }, [selectedId])

  const fetchCategoryDetails = async (id: string): Promise<void> => {
    try {
      setLoading(true)
      const resp = await getRequest(`/api/category-details/${id}`)
      const result = resp.data.result
      const unitGroupIds = result.unitGroups.map((item: UnitGroupExpand) => item.id)
      form.setFieldsValue({
        name: result.name,
        unitGroupIds,
      })
    } catch (err) {
      Toast('error', (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const onFinish = async (values: CategoryList): Promise<void> => {
    await submit(selectedId, '/api/category-create', values, null, () => {
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
          {loading ? (
            <TableContentLoaderWithProps columnWidth={[100]} rowCounts={1} />
          ) : (
            <InputWrapper placeholder="eg. Furniture, groceries, etc." />
          )}
        </FormItemWrapper>
        <Form.Item name="unitGroupIds" label="Unit Group" rules={requiredFieldRules}>
          {loading ? (
            <TableContentLoaderWithProps columnWidth={[100]} rowCounts={1} />
          ) : (
            <SelectWrapper
              mode="multiple"
              placeholder="Select unit types"
              options={getSelectOption(unitTypes as unknown as ArrOptions, ['name', 'id'])}
            />
          )}
        </Form.Item>
      </Form>
    </ModalWrapper>
  )
}

export default CategoryManageModal
