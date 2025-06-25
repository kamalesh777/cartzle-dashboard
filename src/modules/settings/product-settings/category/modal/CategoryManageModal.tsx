import React, { useEffect } from 'react'

import { CloseOutlined, PlusOutlined } from '@ant-design/icons'

import { Form } from 'antd'

import type { UnitTypePayload, UnitsPayload, CategoryList, CategoryPayload } from '../../types'

import type { ModalPropTypes } from 'src/types/common'

import { TableContentLoaderWithProps } from '@/components/Common'
import {
  ButtonWrapper,
  FormItemWrapper,
  InputWrapper,
  ModalWrapper,
  SelectWrapper,
  SubmitButtonWrapper,
  TooltipWrapper,
  CardWrapper,
} from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { useGetRequestHandler, usePostRequestHandler } from '@/hook/requestHandler'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'

import { getSelectOption, type ArrOptions } from '@/utils/disableFunction'

const CategoryManageModal = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const { submit, buttonLoading } = usePostRequestHandler<CategoryList>()

  // fetch all unit types
  const { fetchData: fetchUnitTypes, data: unitTypes, isLoading: unitTypesLoading } = useGetRequestHandler<UnitTypePayload[]>()
  // fetch all units
  const { fetchData: fetchUnits, data: units } = useGetRequestHandler<UnitsPayload[]>()

  // fetch unit types
  useEffect(() => {
    fetchUnitTypes('/api/unit-types-list')
  }, [fetchUnitTypes])

  // fetch units
  useEffect(() => {
    fetchUnits(`/api/units-list/${selectedId}`)
  }, [fetchUnits, selectedId])

  const onFinish = async (values: CategoryPayload): Promise<void> => {
    await submit('create-category', values, null, () => {
      form.resetFields()
      setOpenModal(false)
    })
  }
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)

  return (
    <ModalWrapper
      bodyScroll
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
        <Form.List name="unitTypes">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map(field => (
                <FormItemWrapper key={field.key} label={field.name === 0 ? 'Unit Type' : ''} className="mb-1">
                  <CardWrapper size="small" key={field.key} className="bg-gray-100" styles={{ body: { paddingBottom: '5px' } }}>
                    <ButtonWrapper
                      disabled={fields.length === 1}
                      type="link"
                      style={{ zIndex: 500, right: '0px', top: '3px', position: 'absolute' }}
                      size="small"
                      onClick={() => remove(field.name)}
                    >
                      <TooltipWrapper title="Remove">
                        <CloseOutlined />
                      </TooltipWrapper>
                    </ButtonWrapper>

                    <Form.Item label="Name" name={[field.name, 'id']} rules={requiredFieldRules}>
                      {unitTypesLoading ? (
                        <TableContentLoaderWithProps columnWidth={[100]} rowCounts={1} />
                      ) : (
                        <SelectWrapper
                          options={getSelectOption(unitTypes as unknown as ArrOptions, ['name', 'id'])}
                          placeholder="eg. weight, size, ram, etc."
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="Units" name={[field.name, 'units']} rules={requiredFieldRules}>
                      <SelectWrapper
                        optionFilterProp="label"
                        options={getSelectOption(units as unknown as ArrOptions, ['value', 'id'])}
                        mode="multiple"
                        showArrow={false}
                        placeholder="eg. kg, cm, m, mm"
                      />
                    </Form.Item>
                  </CardWrapper>
                </FormItemWrapper>
              ))}

              <ButtonWrapper
                className="btn-fixed-bottom-modal primary-color"
                type="link"
                onClick={() => add(null, 0)}
                icon={<PlusOutlined />}
              >
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
