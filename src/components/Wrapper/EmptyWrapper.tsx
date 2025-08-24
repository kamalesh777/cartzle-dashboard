import React from 'react'

import { Empty, type EmptyProps } from 'antd'

export interface EmptyWrapperProps extends EmptyProps {
  onClick?: () => void
  content?: React.ReactNode
  entity: string
  bordered?: boolean
}

/** Empty wrapper component
 * @param onClick - Click handler
 * @param content - Content to be displayed
 * @param entity - Entity name
 * @returns JSX.Element
 */
const EmptyWrapper = ({ onClick, content, entity, ...props }: EmptyWrapperProps): JSX.Element => {
  return (
    <Empty
      description={
        content || (
          <p>
            {`No ${entity} found `}
            {onClick && (
              <span role="button" onClick={onClick} className="text-primary cursor-pointer">
                click here
              </span>
            )}
            {onClick && ` to add`}
          </p>
        )
      }
      className={`${!props.bordered ? '' : 'ant-card-bordered'} p-4 text-center`}
      {...props}
    />
  )
}

export default EmptyWrapper
