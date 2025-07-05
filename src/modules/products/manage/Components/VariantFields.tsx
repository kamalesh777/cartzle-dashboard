import React, { useState } from 'react'

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Divider, Form, Space, Tag, type FormInstance } from 'antd'

import { lowerCase } from 'lodash'

import { useSelector } from 'react-redux'

import type { UnitGroupType, VariantOptionTypes } from '../types'
import type { RootState } from '@/store/index'

import {
  CardWrapper,
  FormItemWrapper,
  SpaceWrapper,
  ButtonWrapper,
  TooltipWrapper,
  SelectWrapper,
  InputWrapper,
} from '@/components/Wrapper'
import { getSelectOption } from '@/utils/disableFunction'

interface PropTypes {
  field: { name: number; key: React.Key }
  remove: (index: number) => void
  key: number
  form: FormInstance
  inputEdit: boolean | number
  setInputEdit: (value: boolean | number) => void
}
const VariantFields = ({ field, remove, key, form, inputEdit, setInputEdit }: PropTypes): JSX.Element => {
  const variantOptions = useSelector((state: RootState) => state.variants?.options)
  const variantsPlaceHolder = variantOptions?.map((item: UnitGroupType) => item?.name)
  const { key: vKey, name, ...restField } = field ?? { key: key, name: key }

  const variantsArr = Form.useWatch('variants', form)

  const [unitOptions, setUnitOptions] = useState<UnitGroupType['units'][]>([])
  const [selectedUnitGroup, setSelectedUnitGroup] = useState<string>('')

  /** Save variant
   * @param name - variant name
   * @returns void
   * @description This function is called when the variant is saved
   */
  const saveVariant = async (e: React.MouseEvent, name: number): Promise<void> => {
    e.stopPropagation()
    try {
      // Validate only the specific variant fields
      await form.validateFields([['variants', name]], { recursive: true })
      setInputEdit(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('===error', error)
    }
  }

  const removeFunc = (e: React.MouseEvent, name: number): void => {
    setInputEdit(false)
    remove(name)
    e.stopPropagation()
  }

  const editFunc = (e: React.MouseEvent, name: number): void => {
    setInputEdit(name)
    e.stopPropagation()
  }

  const getSelectedUnitGroup = (v?: string): UnitGroupType['units'][] => {
    const unitGroup = variantOptions?.find((item: UnitGroupType) => item?.name === v)
    const unitGroupUnits = (unitGroup?.units || []) as unknown as UnitGroupType['units'][]
    return unitGroupUnits
  }

  // handle search function for unit options
  const handleSearch = (value: string): void => {
    const unitGroupUnits = getSelectedUnitGroup(selectedUnitGroup)
    if (!value) {
      setUnitOptions(unitGroupUnits)
    } else {
      const result = unitGroupUnits?.map((item: UnitGroupType['units']) => {
        const unitValue = `${value}${item?.value}`
        return {
          value: unitValue,
          id: unitValue,
        }
      })
      setUnitOptions(result)
    }
  }

  // on unit group select function
  const onUnitGroupSelect = (value: string): void => {
    setSelectedUnitGroup(value)
    const unitGroupUnits = getSelectedUnitGroup(value)
    setUnitOptions(unitGroupUnits)
  }

  return (
    <CardWrapper
      bodyStyle={{ padding: '15px' }}
      key={vKey}
      className={`bg-gray-100 ${!inputEdit ? 'cursor-pointer' : ''} ${variantsArr?.length - 1 === name ? '' : 'mb-3'}`}
      onClick={e => inputEdit === false && editFunc(e, name)}
    >
      {inputEdit !== name ? (
        <>
          <SpaceWrapper className="w-100 justify-content-between">
            <p className="fw-bold mb-2">{form.getFieldValue(['variants', name, 'opName'])}</p>
            <TooltipWrapper title="Delete variant">
              <ButtonWrapper
                type="link"
                icon={<DeleteOutlined />}
                className="error-color"
                onClick={event => removeFunc(event, name)}
              />
            </TooltipWrapper>
          </SpaceWrapper>
          {form.getFieldValue(['variants', name, 'opValue'])?.map((item: string, index: number) => (
            <Tag key={index} color="processing">
              {item}
            </Tag>
          ))}
        </>
      ) : (
        <>
          <FormItemWrapper
            label="Option Name"
            name={[name, 'opName']}
            rules={[
              { required: true, message: 'Option name is required' },
              () => ({
                validator(_, value) {
                  // eslint-disable-next-line prettier/prettier
                  const isSameOpNameCount = variantsArr?.filter((item: VariantOptionTypes) => lowerCase(item.opName) === lowerCase(value))
                  // check if value is true
                  if (!value) {
                    return Promise.resolve()
                  }
                  // check if isSameOpName is false
                  if (isSameOpNameCount?.length <= 1) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(`${value} already exists!`))
                },
              }),
            ]}
            {...restField}
          >
            <SelectWrapper
              options={getSelectOption(variantOptions, ['name', 'name'])}
              placeholder={variantsPlaceHolder?.at(variantsArr?.length - 1)}
              onChange={onUnitGroupSelect}
              popupRender={menu => (
                <div>
                  {menu}
                  <Divider className="my-2" />
                  <Space.Compact className="w-100 mb-2 px-2" block>
                    <InputWrapper className="w-100" />
                    <ButtonWrapper icon={<PlusOutlined />}>Add</ButtonWrapper>
                  </Space.Compact>
                </div>
              )}
            />
          </FormItemWrapper>
          <FormItemWrapper
            label="Option Value"
            name={[name, 'opValue']}
            rules={[{ required: true, message: 'Option value is required' }]}
            {...restField}
          >
            <SelectWrapper
              options={getSelectOption(unitOptions, ['value', 'id'])}
              // onSelect={onSelect}
              optionFilterProp="label"
              onSearch={text => handleSearch(text)}
              placeholder={'Select Units'}
              mode="multiple"
            />
          </FormItemWrapper>
          <SpaceWrapper className="w-100 justify-content-between">
            <ButtonWrapper className="error-color" onClick={e => removeFunc(e, name)}>
              Delete
            </ButtonWrapper>
            <ButtonWrapper className="bg-secondary text-white" onClick={event => saveVariant(event, name)}>
              Save
            </ButtonWrapper>
          </SpaceWrapper>
        </>
      )}
    </CardWrapper>
  )
}

export default VariantFields
