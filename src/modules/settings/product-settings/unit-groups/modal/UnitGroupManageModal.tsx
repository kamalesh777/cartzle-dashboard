import React, { useEffect } from 'react'

import { Form } from 'antd'

import type { UnitsPayload } from '../../types'
import type { ModalPropTypes } from 'src/types/common'

import { getRequest } from '@/api/preference/RequestService'
import { TableContentLoaderWithProps, Toast } from '@/components/Common'
import {
  FormItemWrapper,
  InputWrapper,
  ModalWrapper,
  SelectWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { useGetRequestHandler, usePostRequestHandler } from '@/hook/requestHandler'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'
import { getSelectOption } from '@/utils/disableFunction'

const UnitGroupManageModal = ({
  openModal,
  setOpenModal,
  selectedId,
}: ModalPropTypes<never>): JSX.Element => {
  const { fetchData: fetchUnits, data: units, isLoading } = useGetRequestHandler<UnitsPayload[]>()
  const { submit } = usePostRequestHandler()
  const [form] = Form.useForm()

  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    fetchUnits('/api/unit-list')
    if (selectedId) {
      fetchUnitGroupdetails(selectedId)
    }
  }, [selectedId])

  // fetch unit group details by id
  const fetchUnitGroupdetails = async (id: string): Promise<void> => {
    try {
      setLoading(true)
      const resp = await getRequest(`/api/unit-group-details/${id}`)
      const result = resp.data.result
      form.setFieldsValue({
        name: result.name,
        unitIds: result.units.map((item: UnitsPayload) => item.id),
      })
    } catch (err) {
      Toast('error', (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  // handle form submit
  const onFinish = (values: any): void => {
    submit(selectedId, '/api/unit-group-create', values, null)
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
          okButtonProps={{ loading: false, onClick: () => form.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <FormItemWrapper name="name" label="Name" rules={requiredFieldRules}>
          {isLoading || loading ? (
            <TableContentLoaderWithProps columnWidth={[100]} rowCounts={1} />
          ) : (
            <InputWrapper placeholder="Enter name eg. width, height, length" />
          )}
        </FormItemWrapper>
        <FormItemWrapper name="unitIds" label="Units" rules={requiredFieldRules}>
          {isLoading || loading ? (
            <TableContentLoaderWithProps columnWidth={[100]} rowCounts={1} />
          ) : (
            <SelectWrapper
              mode="multiple"
              placeholder="Enter name eg. cm, m, kg, g"
              options={getSelectOption(units, ['name', 'id'])}
              // optionFilterProp="label"
            />
          )}
        </FormItemWrapper>
      </Form>
    </ModalWrapper>
  )
}

export default UnitGroupManageModal
