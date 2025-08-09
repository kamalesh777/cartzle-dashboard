/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Divider, Form, Row, Space, Tag, type FormInstance } from 'antd'

import Cookies from 'js-cookie'
import { lowerCase } from 'lodash'

import { useSelector } from 'react-redux'

import type { UnitGroupType, VariantOptionTypes } from '../../types'
import type { RootState } from '@/store/index'

import {
  CardWrapper,
  FormItemWrapper,
  SpaceWrapper,
  ButtonWrapper,
  TooltipWrapper,
  SelectWrapper,
  ColWrapper,
} from '@/components/Wrapper'
import { LinkWrapper } from '@/components/Wrapper/LinkWrapper'

import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'
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
  const isValueChanged = Cookies.get('isValueChanged')

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
        const unitValue = `${value} ${item?.name}`
        return {
          name: unitValue,
          id: unitValue,
        }
      })
      setUnitOptions([...result, { name: value, id: value }])
    }
  }

  // at the time of edit variant
  useEffect(() => {
    if (inputEdit) {
      const variant = form.getFieldValue(['variants', inputEdit])
      const unitGroupUnits = getSelectedUnitGroup(variant.opName)
      setUnitOptions(unitGroupUnits)
    }
  }, [inputEdit])

  // on unit group select function
  const onUnitGroupSelect = (value: string): void => {
    setSelectedUnitGroup(value)
    const unitGroupUnits = getSelectedUnitGroup(value)
    setUnitOptions(unitGroupUnits)
    // reset the opValue when unit group changes
    form.setFieldValue(['variants', name, 'opValue'], [])
  }

  return (
    <CardWrapper
      bodyStyle={{ padding: '15px' }}
      key={vKey}
      className={`bg-gray-100 ${!inputEdit ? 'cursor-pointer' : ''} ${
        variantsArr?.length - 1 === name ? '' : 'mb-3'
      }`}
      onClick={e => inputEdit === false && editFunc(e, name)}
    >
      {inputEdit !== name ? (
        <SpaceWrapper size={16} className="w-100 justify-content-between">
          <span className="d-flex align-items-center">
            <p className="fw-bold me-2">{form.getFieldValue(['variants', name, 'opName'])}:</p>
            {form.getFieldValue(['variants', name, 'opValue'])?.map((item: string, index: number) => (
              <Tag key={index} color="processing">
                {item}
              </Tag>
            ))}
          </span>
          <Space.Compact>
            <TooltipWrapper title="Edit variant">
              <ButtonWrapper type="link" icon={<EditOutlined />} onClick={event => editFunc(event, name)} />
            </TooltipWrapper>
            <TooltipWrapper title="Delete variant">
              <ButtonWrapper
                type="link"
                icon={<DeleteOutlined />}
                className="error-color"
                onClick={event => removeFunc(event, name)}
              />
            </TooltipWrapper>
          </Space.Compact>
        </SpaceWrapper>
      ) : (
        <Row gutter={COMMON_ROW_GUTTER}>
          <ColWrapper lg={10} sm={9}>
            <FormItemWrapper
              validateFirst
              label="Option Name"
              name={[name, 'opName']}
              className="mb-2"
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
                    <LinkWrapper
                      href="/settings/product-settings#unit-groups"
                      className="primary-color d-block px-2 pb-2"
                      isValueChanged={Boolean(isValueChanged)}
                    >
                      <>
                        <SettingOutlined /> Manage Group
                      </>
                    </LinkWrapper>
                  </div>
                )}
              />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper lg={12} sm={11}>
            <FormItemWrapper
              label="Option Value"
              name={[name, 'opValue']}
              className="mb-2"
              rules={[{ required: true, message: 'Option value is required' }]}
              {...restField}
            >
              <SelectWrapper
                options={getSelectOption(unitOptions, ['name', 'name'], false)}
                // onSelect={onSelect}
                optionFilterProp="label"
                onSearch={text => handleSearch(text)}
                placeholder={'Select Units'}
                mode="multiple"
              />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper lg={2} sm={4}>
            <FormItemWrapper label=" " className="mb-2">
              <Space.Compact>
                <ButtonWrapper
                  className="text-success"
                  onClick={event => saveVariant(event, name)}
                  icon={<CheckOutlined />}
                />
                <ButtonWrapper
                  className="error-color"
                  onClick={e => removeFunc(e, name)}
                  icon={<CloseOutlined />}
                />
              </Space.Compact>
            </FormItemWrapper>
          </ColWrapper>
        </Row>
      )}
    </CardWrapper>
  )
}

export default VariantFields
