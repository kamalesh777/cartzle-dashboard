import React, { useEffect } from 'react'

import { Form } from 'antd'

import type { UnitsTypes } from '../../types'
import type { ModalPropTypes } from 'src/types/common'

import { TableContentLoaderWithProps, Toast } from '@/components/Common'
import { FormItemWrapper, ModalWrapper, SelectWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'

import { useGetRequestHandler, usePostRequestHandler } from '@/hook/requestHandler'
import { modalCloseHandler } from '@/utils/commonFunctions'
import { getSelectOption } from '@/utils/disableFunction'

const UnitsManageModal = ({ openModal, setOpenModal, afterSubmit }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const { fetchData, data, isLoading } = useGetRequestHandler<UnitsTypes[]>()
  const { submit } = usePostRequestHandler()

  const [btnLoading, setBtnLoading] = React.useState(false)

  const fetchUnitsList = async (): Promise<void> => {
    await fetchData('/api/unit-list')
  }
  useEffect(() => {
    fetchUnitsList()
  }, [])

  const afterSubmitFunc = (): void => {
    form.resetFields()
    setOpenModal(false)
    afterSubmit?.()
  }

  const onFinish = async (values: any): Promise<void> => {
    const { unitGroupIds, ...rest } = values
    try {
      setBtnLoading(true)
      await submit('post', `/api/unit-create`, { ...rest, unitGroupIds }, null, afterSubmitFunc)
    } catch (err) {
      Toast('error', (err as Error).message)
    } finally {
      setBtnLoading(false)
    }
  }

  // close modal
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)

  return (
    <ModalWrapper
      open={openModal}
      onCancel={closeModal}
      title={'Units'}
      footer={
        <SubmitButtonWrapper
          okText={'Save'}
          okButtonProps={{ loading: btnLoading, onClick: () => form.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <FormItemWrapper name="units" label="Units" rules={requiredFieldRules}>
          {isLoading ? (
            <TableContentLoaderWithProps columnWidth={[100]} rowCounts={1} />
          ) : (
            <SelectWrapper
              mode="tags"
              placeholder="Select units eg. kg, ltr, pcs, qty."
              options={getSelectOption(data, ['name', 'id'], false)}
              tokenSeparators={[',', ' ']} // Add space as a token separator
            />
          )}
        </FormItemWrapper>
      </Form>
    </ModalWrapper>
  )
}

export default UnitsManageModal
