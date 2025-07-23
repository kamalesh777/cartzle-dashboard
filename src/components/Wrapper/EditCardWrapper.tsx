import React from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Divider } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { CardProps, FormInstance } from 'antd'

import ButtonWrapper from './ButtonWrapper'
import CardWrapper from './CardWrapper'
import SpaceWrapper from './SpaceWrapper'

interface EditCardWrapperProps extends CardProps {
  footer?: React.ReactNode | null
  editMode: boolean
  form: FormInstance
  setEditMode: (editMode: boolean) => void
}

/**
 * Edit card wrapper component
 * @param children - children of the card
 * @param footer - footer of the card
 * @param restProps - rest props
 * @returns JSX.Element
 */
const EditCardWrapper = ({ children, footer, editMode, form, setEditMode, ...restProps }: EditCardWrapperProps): JSX.Element => {
  // keep the form data for cancel
  const formData = form.getFieldsValue()

  // extra content for edit mode
  const editExtraContent = (
    <ButtonWrapper type="link" className="px-0" onClick={() => setEditMode(true)}>
      <EditOutlined /> Edit
    </ButtonWrapper>
  )
  const cancelHandler = (): void => {
    form.setFieldsValue(formData)
    setEditMode(false)
  }
  // footer content for edit mode
  const footerContent = (
    <SpaceWrapper>
      <ButtonWrapper type="primary" onClick={() => form.submit()}>
        Save
      </ButtonWrapper>
      <ButtonWrapper type="default" onClick={cancelHandler}>
        Cancel
      </ButtonWrapper>
    </SpaceWrapper>
  )
  return (
    <CardWrapper className="mb-3" extra={!editMode ? editExtraContent : null} {...restProps}>
      {children}
      {editMode ? (
        <>
          <Divider style={{ margin: '4px -20px 20px', width: 'auto' }} />
          {/* if footer is not provided then show default footer */}
          {footer || footerContent}
        </>
      ) : null}
    </CardWrapper>
  )
}

export default EditCardWrapper
