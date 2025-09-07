/* eslint-disable no-duplicate-imports */
'use client'
import React, { useState } from 'react'

import { Row, type TableProps } from 'antd'

import type { ListDataTypes } from '../types'
import type { MenuProps } from 'antd'

import TableActionButton from '@/components/Common/TableActionButton'

import { ButtonWrapper, ColWrapper, InputSearchWrapper, TableWrapper } from '@/components/Wrapper'

import AddTemplateForm from '../manage'
import { listData } from '../static/data'

const ThemeLibraryListComp = (): JSX.Element => {
  const [, setSearchValue] = useState<string>('')
  const [openManageModal, setOpenManageModal] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string>('')

  const items: MenuProps['items'] = [
    {
      label: 'Update',
      key: 'update',
      onClick: () => setOpenManageModal(true),
    },
    {
      type: 'divider',
    },
    {
      label: 'Deactivate',
      key: 'deactivate',
      className: 'error-color',
    },
  ]

  // table columns parties list
  const columns: TableProps<ListDataTypes>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '18%',
    },
    {
      title: 'Repo URL',
      dataIndex: 'repoUrl',
      key: 'repoUrl',
      width: '30%',
    },
    {
      title: 'Framework',
      dataIndex: 'framework',
      width: '20%',
    },

    {
      title: 'Env Variables',
      dataIndex: 'envVariables',
      width: '25%',
    },
    {
      title: '',
      key: 'action',
      className: 'text-right',
      render: (_, record) => <TableActionButton items={items} onClick={() => setSelectedId(record?.id)} />,
    },
  ]

  return (
    <>
      <TableWrapper
        columns={columns}
        dataSource={listData}
        title={() => (
          <Row justify={'space-between'}>
            <ColWrapper md={12}>
              <h4 className="ant-card-head-title">Themes</h4>
            </ColWrapper>
            <ColWrapper md={12} className="text-right">
              <div className="d-flex">
                <InputSearchWrapper
                  placeholder="Search by name or phone..."
                  onChange={e => setSearchValue(e.target.value)}
                />
                <ButtonWrapper type="primary" className="ms-2" onClick={() => setOpenManageModal(true)}>
                  Add
                </ButtonWrapper>
              </div>
            </ColWrapper>
          </Row>
        )}
      />
      {openManageModal && (
        <AddTemplateForm
          openModal={openManageModal}
          setOpenModal={setOpenManageModal}
          selectedId={selectedId}
        />
      )}
    </>
  )
}

export default ThemeLibraryListComp
