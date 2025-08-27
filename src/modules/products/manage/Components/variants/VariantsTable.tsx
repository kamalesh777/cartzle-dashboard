import React, { useEffect, useMemo, useState } from 'react'

import { FormOutlined } from '@ant-design/icons'
import { Form, type TableColumnsType, type FormInstance } from 'antd'

import { useDispatch, useSelector } from 'react-redux'

import type { VariantCombination, VariantOptionTypes } from '../../types'
import type { RootState } from '@/store/index'
import type { TableRowSelection } from 'antd/es/table/interface'

import { InfoTooltip, TableActionButton } from '@/components/Common'
import { FormItemWrapper, InputNumberWrapper, TableWrapper } from '@/components/Wrapper'

import { setVariantsTable } from '@/store/slices/variantsSlice'
import { getCurrency } from '@/utils/currency'

import { generateSku } from '@/utils/productUtils'

import VariantsGroupModal from '../../modal/VariantsGroupModal'
import { generateGroupedCombinations } from '../../utils/generateGroupedCombinations'

interface PropTypes {
  form: FormInstance
}

const VariantsTable = ({ form }: PropTypes): JSX.Element | null => {
  const dispatch = useDispatch()
  // variants table state from store
  const variantsTableState = useSelector((state: RootState) => state.variants?.variantsTable)

  // variants from form
  const variantsCard = Form.useWatch('variantOptions', form)
  const costPrice = Form.useWatch('costPrice', form)
  const salePrice = Form.useWatch('salePrice', form)
  const groupBy = Form.useWatch('groupBy', form)
  const discount = Form.useWatch('discount', form)

  const selectedVariants = Form.useWatch('variantCombinations', form)
  const productTitle = Form.useWatch('title', form)

  const [openModal, setOpenModal] = useState(false)
  const [selectedList, setSelectedList] = useState<VariantCombination>()
  const [selectedIndex, setSelectedIndex] = useState<number>()

  // filter variants with op_value length > 0
  const variantsArr = useMemo(() => {
    return variantsCard?.filter((variant: VariantOptionTypes) => variant?.opValue?.length > 0)
  }, [variantsCard])

  /**
   * Add default price for all variants
   * @param data - variant data
   * @returns variant data with default price
   */

  const addDefaultPriceForAll = (data: VariantCombination[]): VariantCombination[] => {
    return data.map(item => {
      const updatedItem: VariantCombination = {
        ...item,
        salePrice: item?.salePrice || salePrice,
        costPrice: item?.costPrice || costPrice,
        discount: item?.discount || discount,
        inStock: item?.inStock || false,
        media: item?.media || [],
        sku: generateSku(productTitle, item?.label),
      }

      if (item.children) {
        updatedItem.children = addDefaultPriceForAll(item.children)
      }

      return updatedItem
    })
  }

  //~ generate grouped combinations on variants change
  useEffect(() => {
    if (variantsArr?.length) {
      // generate grouped combinations with variants and groupBy
      const data = generateGroupedCombinations(variantsArr, groupBy, selectedVariants)

      // add default price for all variants
      const finalData = addDefaultPriceForAll(data)
      dispatch(setVariantsTable(finalData))
    } else {
      dispatch(setVariantsTable([]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantsArr, costPrice, salePrice, groupBy, discount])

  // table columns
  const columns: TableColumnsType<VariantCombination> = [
    {
      title: 'All Combinations',
      dataIndex: 'label',
      width: '60%',
      className: 'd-flex align-items-center',
      render: label =>
        label?.split(' x ')?.map((item: string, index: number, array: string[]) => {
          return (
            <div className="pt-1" key={item}>
              <span key={index}>{item}</span>
              {index < array.length - 1 && <span className="fw-bold primary-color mx-2">x</span>}
            </div>
          )
        }),
    },
    {
      title: 'Cost Price',
      dataIndex: 'costPrice',
      width: '15%',
      render: (_, record) => (
        <InputNumberWrapper
          prefix={getCurrency()}
          value={record.costPrice}
          size="small"
          onChange={value => rowChangeHandler({ ...record, costPrice: value as number })}
        />
      ),
    },
    {
      title: 'Sale Price',
      dataIndex: 'salePrice',
      width: '15%',
      render: (_, record) => (
        <InputNumberWrapper
          prefix={getCurrency()}
          value={record.salePrice}
          size="small"
          onChange={value => rowChangeHandler({ ...record, salePrice: value as number })}
          // min={record.costPrice}
          status={(record?.costPrice as number) > (record?.salePrice as number) ? 'error' : undefined}
        />
      ),
    },
    {
      title: <InfoTooltip title="Discount in percentage">Discount</InfoTooltip>,
      dataIndex: 'discount',
      width: '12%',
      render: (_, record) => (
        <InputNumberWrapper
          value={record.discount}
          size="small"
          suffix="%"
          onChange={value => rowChangeHandler({ ...record, discount: value as number })}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'action',
      fixed: 'right',
      width: 50,
      className: 'text-center',
      render: (_, record) => (
        <TableActionButton
          items={[]}
          icon={<FormOutlined onClick={() => editRowHandler(record)} />}
          tooltipTitle="Edit"
        />
      ),
    },
  ]

  // after selection update form values
  const rowSelection: TableRowSelection<VariantCombination> = {
    checkStrictly: false,
    selectedRowKeys: selectedVariants?.length
      ? selectedVariants?.map((item: VariantCombination) => item?.label)
      : [],
    getCheckboxProps: record => ({
      className: record?.parent || variantsArr?.length === 1 ? '' : 'd-none',
    }),
    onChange: (_selectedRowKeys, selectedRows) => {
      form.setFieldValue('variantCombinations', selectedRows)
    },
  }

  /**
   * Handle row change in variants table
   * @param updatedRecord - updated record
   */
  const rowChangeHandler = (updatedRecord: VariantCombination): void => {
    const finalData = (variantsTableState || []).map(item => {
      if (item.label === updatedRecord.label && item.parent) {
        return {
          ...item,
          ...updatedRecord,
          children: item.children?.map(child => ({
            ...child,
            salePrice: updatedRecord.salePrice,
            costPrice: updatedRecord.costPrice,
            discount: updatedRecord.discount,
          })),
        }
      }
      if (!updatedRecord.parent && item.parent) {
        return {
          ...item,
          children: item.children?.map(child =>
            child.label === updatedRecord.label ? { ...child, ...updatedRecord } : child,
          ),
        }
      }
      return item
    })
    dispatch(setVariantsTable(finalData))
  }

  // edit row handler
  const editRowHandler = (record: VariantCombination): void => {
    setSelectedList(record)
    setSelectedIndex(record.rowIndex)
    setOpenModal(true)
  }

  return (
    <div className="mt-3">
      <FormItemWrapper name="variantCombinations" hidden />

      {variantsTableState?.length > 0 && (
        <TableWrapper
          columns={columns}
          rowKey="label"
          // size="small"
          rowSelection={rowSelection}
          dataSource={variantsTableState}
          pagination={false}
          bordered
        />
      )}

      {openModal && (
        <VariantsGroupModal {...{ form, openModal, setOpenModal, selectedList, selectedIndex }} />
      )}
    </div>
  )
}

export default VariantsTable
