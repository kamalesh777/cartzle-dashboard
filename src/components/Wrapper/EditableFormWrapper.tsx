import React from 'react'

import { Form, type FormInstance, type FormItemProps } from 'antd'

import { FormItemWrapper } from '@/components/Wrapper'
import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant'

import { TableContentLoaderWithProps } from '../Common/SkeletonLoader/ContentLoader'

interface EditableFormWrapperProps extends FormItemProps {
  name: string
  label?: string
  editMode: boolean
  form: FormInstance
  children: React.ReactNode
  displayRender?: (value: unknown) => React.ReactNode
  isLoading?: boolean
}

const getDisplayContent = ({
  editMode,
  value,
  children,
  displayRender,
}: {
  editMode: boolean
  value: unknown
  children: React.ReactNode
  displayRender?: (value: unknown) => React.ReactNode
}): React.ReactNode => {
  switch (true) {
    case editMode:
      return children

    case typeof displayRender === 'function':
      return displayRender?.(value)

    case Array.isArray(value):
      return <div>{(value as unknown[]).length ? (value as unknown[]).join(', ') : EMPTY_PLACEHOLDER}</div>

    case typeof value === 'object' && value !== null:
      return <pre>{JSON.stringify(value)}</pre>

    default:
      return <p style={{ margin: 0 }}>{(value || EMPTY_PLACEHOLDER) as string}</p>
  }
}

/**
 * EditableFormWrapper component
 * @param name - name of the field
 * @param label - label of the field
 * @param editMode - edit mode
 * @param form - form instance
 * @param children - children of the field
 * @param displayRender - display render function for custom display eg: (value) => value?.toUpperCase()
 * @param restProps - rest props
 */
const EditableFormWrapper = ({
  name,
  label,
  editMode,
  form,
  children,
  displayRender,
  isLoading,
  ...restProps
}: EditableFormWrapperProps): JSX.Element => {
  // get the value of the field
  const value = Form.useWatch(name, form)
  const content = getDisplayContent({ editMode, value, children, displayRender })

  return (
    <FormItemWrapper name={name} label={label} className={!editMode ? 'mb-2' : ''} {...restProps}>
      {isLoading ? <TableContentLoaderWithProps columnWidth={[100]} rowCounts={1} /> : content}
    </FormItemWrapper>
  )
}

export default EditableFormWrapper
