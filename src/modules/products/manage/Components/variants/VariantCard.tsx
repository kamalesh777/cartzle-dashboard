/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'

import { Form, type FormInstance } from 'antd'
import { Plus } from 'lucide-react'

import { useDispatch } from 'react-redux'

import type { UnitGroupType } from '../../types'

import { getRequest } from '@/api/preference/RequestService'
import { InfoTooltip, TableContentLoaderWithProps, Toast } from '@/components/Common'
import {
  ButtonWrapper,
  CardWrapper,
  EmptyWrapper,
  FormItemWrapper,
  SelectWrapper,
  SpaceWrapper,
} from '@/components/Wrapper'

import { CATEGORY_ID } from '@/constants/AppConstant'
import { setVariantOptions } from '@/store/slices/variantsSlice'

import { getSelectOption } from '@/utils/disableFunction'

import VariantFields from './VariantFields'

interface PropTypes {
  form: FormInstance
}

/** Variant card component */
const VariantCardComp = ({ form }: PropTypes): JSX.Element => {
  const dispatch = useDispatch()

  const variantsArr = Form.useWatch('variantOptions', form)
  const categoryId = Form.useWatch(CATEGORY_ID, form)

  const [inputEdit, setInputEdit] = useState<boolean | number>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchVariant = async (): Promise<void> => {
    try {
      const res = await getRequest(`/api/category-details/${categoryId}`)
      if (res.data.success) {
        const result = res.data.result
        const variantOptions = result?.unitGroups?.map((item: UnitGroupType) => ({
          name: item?.name,
          id: item?.id,
          units: item?.units,
        }))
        dispatch(setVariantOptions(variantOptions))
      }
    } catch (error) {
      Toast('error', (error as Error).message)
    }
  }
  useEffect(() => {
    if (categoryId) {
      fetchVariant()
    }
  }, [categoryId])

  const groupByOptions = useMemo(() => {
    const data = getSelectOption(variantsArr, ['opName', 'opName'])
    return data
  }, [variantsArr])

  useEffect(() => {
    setLoading(true)
    // if in db groupBy already added then use it otherwise the last index of variantsArr
    form.setFieldsValue({
      groupBy: variantsArr?.at(-1)?.opName,
    })
    setTimeout(() => setLoading(false), 600)
  }, [form, variantsArr])

  const addFunc = async (add: (index?: number | null, position?: number) => void): Promise<void> => {
    try {
      await form.validateFields([['variantOptions']], { recursive: true })
      setInputEdit(0)
      add(null, 0)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('===error', error)
    }
  }

  return (
    <>
      <Form.List name="variantOptions">
        {(fields, { add, remove }) => (
          <CardWrapper
            title={
              <div className="d-flex justify-content-between align-items-center">
                <InfoTooltip title="Add variants if product has multiple variants">
                  Variant Options
                </InfoTooltip>
                <ButtonWrapper
                  onClick={() => addFunc(add)}
                  icon={<Plus />}
                  type="link"
                  className="p-0 primary-color"
                >
                  Add Variant
                </ButtonWrapper>
              </div>
            }
          >
            {fields?.length > 0 ? (
              fields.map((field, index) => (
                <VariantFields
                  key={index}
                  rowKey={index}
                  {...{ field, form, remove, inputEdit, setInputEdit }}
                />
              ))
            ) : (
              <EmptyWrapper onClick={() => addFunc(add)} entity="Variant Options" />
            )}
          </CardWrapper>
        )}
      </Form.List>
      {/* Group By variant */}
      {groupByOptions && groupByOptions?.length > 0 && (
        <CardWrapper styles={{ body: { padding: '15px 20px' } }} style={{ margin: '20px 0 0' }}>
          <SpaceWrapper size={16} align="center">
            <span className="fw-bold">Group By: </span>
            <FormItemWrapper name="groupBy" className="mb-0">
              {loading ? (
                <TableContentLoaderWithProps columnWidth={[100]} rowCounts={1} />
              ) : (
                <SelectWrapper style={{ minWidth: '160px' }} options={groupByOptions || []} />
              )}
            </FormItemWrapper>
          </SpaceWrapper>
        </CardWrapper>
      )}{' '}
    </>
  )
}

export default VariantCardComp
