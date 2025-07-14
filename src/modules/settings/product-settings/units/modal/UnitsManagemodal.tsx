import React, { useEffect } from 'react'

import { Form } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { getRequest, postRequest } from '@/api/preference/RequestService'
import { Toast } from '@/components/Common'
import { FormItemWrapper, ModalWrapper, SelectWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'
import { getSelectOption } from '@/utils/disableFunction'
import { usePostRequestHandler } from '@/hook/requestHandler'

const UnitsManageModal = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const [unitGroups, setUnitGroups] = React.useState([])
  const [btnLoading, setBtnLoading] = React.useState(false)

  const fetchUnitGroups = async (): Promise<void> => {
    try {
      const resp = await getRequest(`/api/unit-group-list`)
      setUnitGroups(resp.data.result)
    } catch (err) {
      Toast('error', (err as Error).message)
    }
  }

  useEffect(() => {
    fetchUnitGroups()
  }, [])

  const onFinish = async (values: any): Promise<void> => {
    const { unitGroupIds, ...rest } = values
    try {
      setBtnLoading(true)
      const resp = await postRequest(`/api/unit-create`, { ...rest, unitGroupIds })
      Toast('success', resp.data.message)
      form.resetFields()
      setOpenModal(false)
    } catch (err) {
      Toast('error', (err as Error).message)
    } finally {
      setBtnLoading(false)
    }
    // eslint-disable-next-line no-console
    console.log('===Brand Submitted:', values)
  }
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)

  return (
    <ModalWrapper
      width={400}
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
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <FormItemWrapper name="unitGroupIds" label="Unit Group" rules={requiredFieldRules}>
          <SelectWrapper
            placeholder="Select unit group eg. weight, size, etc."
            options={getSelectOption(unitGroups, ['name', 'id'])}
          />
        </FormItemWrapper>
        <FormItemWrapper name="value" label="Value" rules={requiredFieldRules}>
          <SelectWrapper mode="tags" tokenSeparators={[' ', ',']} placeholder="Enter value eg. kg, g, ml, l" />
        </FormItemWrapper>
      </Form>
    </ModalWrapper>
  )
}

export default UnitsManageModal
