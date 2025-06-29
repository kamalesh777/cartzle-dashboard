import React, { useEffect, useMemo, useState } from 'react'

import { FormOutlined } from '@ant-design/icons'
import { Form, type TableColumnsType, type FormInstance } from 'antd'

import { useDispatch, useSelector } from 'react-redux'

import type { VariantCombination, VariantOptionTypes } from '../types'
import type { RootState } from '@/store/index'
import type { TableRowSelection } from 'antd/es/table/interface'

import { InfoTooltip, TableActionButton } from '@/components/Common'
import { FormItemWrapper, InputNumberWrapper, TableWrapper } from '@/components/Wrapper'
import { setVariantsTable } from '@/store/slices/variantsSlice'
import { getCurrency } from '@/utils/currency'

import VariantsGroupModal from '../modal/VariantsGroupModal'
import { generateGroupedCombinations } from '../utils/generateGroupedCombinations'

interface PropTypes {
  form: FormInstance
}

const VariantsTable = ({ form }: PropTypes): JSX.Element | null => {
  const dispatch = useDispatch()
  // variants table state from store
  const variantsTableState = useSelector((state: RootState) => state.variants?.variantsTable)

  // variants from form
  const variantsCard = Form.useWatch('variants', form)
  const costPrice = Form.useWatch('costPrice', form)
  const salePrice = Form.useWatch('salePrice', form)
  const groupBy = Form.useWatch('groupBy', form)

  const [openModal, setOpenModal] = useState(false)
  const [selectedList, setSelectedList] = useState<VariantCombination>()

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
        sellPrice: item?.sellPrice || salePrice,
        costPrice: item?.costPrice || costPrice,
        available: 0,
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
      const data = generateGroupedCombinations(variantsArr, groupBy, variantsTableState)
      // add default price for all variants
      const finalData = addDefaultPriceForAll(data)
      dispatch(setVariantsTable(finalData))
    } else {
      dispatch(setVariantsTable([]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantsArr, costPrice, salePrice, groupBy])

  // table columns
  const columns: TableColumnsType<VariantCombination> = [
    {
      title: 'Variant',
      dataIndex: 'label',
      width: '40%',
      className: 'd-flex align-items-center',
      render: label =>
        label?.split(' x ')?.map((item: string, index: number, array: string[]) => {
          return (
            <>
              <span key={index}>{item}</span>
              {index < array.length - 1 && <span className="fw-bold primary-color mx-2">x</span>}
            </>
          )
        }),
    },
    {
      title: <InfoTooltip title="Cost Price">Price</InfoTooltip>,
      dataIndex: 'costPrice',
      width: '20%',
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
      title: <InfoTooltip title="Sell Price">Price</InfoTooltip>,
      dataIndex: 'sellPrice',
      width: '20%',
      render: (_, record) => (
        <InputNumberWrapper
          prefix={getCurrency()}
          value={record.sellPrice}
          size="small"
          onChange={value => rowChangeHandler({ ...record, sellPrice: value as number })}
        />
      ),
    },
    {
      title: <InfoTooltip title="Available product in stock">SKU</InfoTooltip>,
      dataIndex: 'available',
      width: '20%',
      render: (_, record) => (
        <InputNumberWrapper
          prefix={getCurrency()}
          value={record.available}
          size="small"
          disabled={record?.children && record?.children?.length > 0}
          onChange={value => rowChangeHandler({ ...record, available: value as number })}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'action',
      fixed: 'right',
      width: 50,
      className: 'text-right',
      render: (_, record) => (
        <TableActionButton items={[]} icon={<FormOutlined onClick={() => editRowHandler(record)} />} tooltipTitle="Edit" />
      ),
    },
  ]

  const rowSelection: TableRowSelection<VariantCombination> = {
    checkStrictly: false,
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
            sellPrice: updatedRecord.sellPrice,
            costPrice: updatedRecord.costPrice,
            available: updatedRecord.available,
          })),
        }
      }
      if (!updatedRecord.parent && item.parent) {
        return {
          ...item,
          children: item.children?.map(child => (child.label === updatedRecord.label ? { ...child, ...updatedRecord } : child)),
        }
      }
      return item
    })

    dispatch(setVariantsTable(finalData))
    form.setFieldValue('variantsTable', finalData)
  }

  // edit row handler
  const editRowHandler = (record: VariantCombination): void => {
    setSelectedList(record)
    setOpenModal(true)
  }

  return (
    <>
      <FormItemWrapper name="variantsTable" hidden />

      {variantsTableState?.length > 0 && (
        <TableWrapper
          columns={columns}
          rowKey="label"
          rowSelection={rowSelection}
          dataSource={variantsTableState}
          pagination={false}
          expandable={{
            indentSize: 0,
          }}
        />
      )}

      {openModal && <VariantsGroupModal openModal={openModal} setOpenModal={setOpenModal} selectedList={selectedList} />}
    </>
  )
}

export default VariantsTable
