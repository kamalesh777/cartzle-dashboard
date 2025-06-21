import React, { useEffect } from 'react'

import { Form, type TableColumnsType } from 'antd'

// eslint-disable-next-line no-duplicate-imports

import type { VariantCombination, VariantOptionTypes } from '../types'
// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'

import { TableActionButton } from '@/components/Common'

import { FormItemWrapper, InputNumberWrapper, TableWrapper } from '@/components/Wrapper'
import { getCurrency } from '@/utils/currency'

import { generateGroupedCombinations } from '../utils/generateGroupedCombinations'
import { ArrowDownOutlined } from '@ant-design/icons'
import VariantsGroupModal from '../modal/VariantsGroupModal'

interface PropTypes {
  form: FormInstance
}

const VariantsTable = ({ form }: PropTypes): JSX.Element | null => {
  const variants = Form.useWatch('variants', form)
  const groupBy = Form.useWatch('group_by', form)

  const [computedVariants, setComputedVariants] = React.useState<VariantCombination[]>([])
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedList, setSelectedList] = React.useState<VariantCombination[]>([])  

  useEffect(() => {
    const variantsArr = variants?.filter((variant: VariantOptionTypes) => variant?.op_value?.length > 0)
    // check if variantsArr is not empty
    if (variantsArr?.length) {
      const data = generateGroupedCombinations(variantsArr, groupBy)
      setComputedVariants(data as VariantCombination[])
    } else {
      setComputedVariants([])
    }
  }, [variants, groupBy])

  // Table columns
  const columns: TableColumnsType<VariantCombination> = [
    {
      title: 'Variant',
      dataIndex: 'label',
      width: '40%',
      className: 'd-flex align-items-center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '25%',
      render: (_, record) => {
        return (
          <FormItemWrapper name={['variants_table', record.groupKey, 'price']} noStyle>
            <InputNumberWrapper prefix={getCurrency()} size="small" />
          </FormItemWrapper>
        )
      },
    },
    {
      title: 'Available',
      dataIndex: 'available',
      width: '20%',
      render: (_, record) => (
        <FormItemWrapper name={['variants_table', record.groupKey, 'available']} noStyle>
          <InputNumberWrapper size="small" />
        </FormItemWrapper>
      ),
    },
  ]

  // Row click handler
  const rowClick = (record: VariantCombination) => {
    setSelectedList([record])
    setOpenModal(true)
  }

  console.log("===selectedList:", selectedList)

  // Table row selection
  const rowSelection: TableRowSelection<VariantCombination> = {
    checkStrictly: false,
    onChange: (selectedRowKeys, selectedRows) => {
      // form.setFieldsValue({
      //   variants_table: selectedRows,
      // })
      // eslint-disable-next-line no-console
      console.log('===selectedRowKeys:', selectedRows)
    },
  }

  const expandable = {
    expandedRowKeys: []
  }

  return (
    <>
      {computedVariants?.length > 0 ? (
        <TableWrapper
          columns={columns}
          rowKey="label"
          rowSelection={rowSelection}
          dataSource={computedVariants}
          expandable={expandable}
          onRow={(record) => ({
            onClick: () => rowClick(record),
          })}
        />
      ) : null}
      {
        openModal ? (
          <VariantsGroupModal openModal={openModal} setOpenModal={setOpenModal} />
        ) : null
      }
    </>
  )
}

export default VariantsTable
