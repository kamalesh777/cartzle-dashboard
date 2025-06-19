import React from 'react'

import { Empty, type EmptyProps } from 'antd'

interface EmptyWrapperProps extends EmptyProps {
  onClick?: () => void
  content?: React.ReactNode
  entity?: string
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
            {`No ${entity} found, `}
            {onClick && (
              <span role="button" onClick={onClick} className="text-primary cursor-pointer">
                click here
              </span>
            )}
            {onClick && ` to add ${entity}`}
          </p>
        )
      }
      {...props}
    />
  )
}

export default EmptyWrapper
