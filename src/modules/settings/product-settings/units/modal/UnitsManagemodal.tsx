import React, { useEffect } from 'react'

import { Form } from 'antd'

import type { UnitsTypes } from '../../types'
import type { ModalPropTypes } from 'src/types/common'

import { postRequest } from '@/api/preference/RequestService'
import { TableContentLoaderWithProps, Toast } from '@/components/Common'
import { FormItemWrapper, ModalWrapper, SelectWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'

import { useGetRequestHandler } from '@/hook/requestHandler'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'
import { getSelectOption } from '@/utils/disableFunction'

const UnitsManageModal = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const { fetchData: fetchUnits, data, isLoading } = useGetRequestHandler<UnitsTypes[]>()

  const [btnLoading, setBtnLoading] = React.useState(false)

  useEffect(() => {
    fetchUnits('/api/unit-list')
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
      open={openModal}
      onCancel={closeModal}
      title={getModalTitle(selectedId as string)}
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
