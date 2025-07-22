import React from 'react'
import CardWrapper from './CardWrapper'
import { CardProps, Divider, FormInstance } from 'antd'
import SpaceWrapper from './SpaceWrapper'
import ButtonWrapper from './ButtonWrapper'
import { EditOutlined } from '@ant-design/icons'

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
    // extra content for edit mode
    const editExtraContent = (
        <ButtonWrapper type="link" className='px-0' onClick={() => setEditMode(true)}>
            <EditOutlined /> Edit
        </ButtonWrapper>
    )

    // footer content for edit mode
    const footerContent = (
        <SpaceWrapper>
            <ButtonWrapper type="primary" onClick={() => form.submit()}>
                Save
            </ButtonWrapper>
            <ButtonWrapper type="default" onClick={() => setEditMode(false)}>
                Cancel
            </ButtonWrapper>
        </SpaceWrapper>
    )
    return (
        <CardWrapper className="mb-3" extra={!editMode ? editExtraContent : null} {...restProps}>
            {children}
            {editMode ? (
                <>
                <Divider style={{ margin: '4px -20px 20px', width: 'auto' }}/>
                {/* if footer is not provided then show default footer */}
                {footer || footerContent}
                </>
            ) : null}
        </CardWrapper>
    )
}

export default EditCardWrapper