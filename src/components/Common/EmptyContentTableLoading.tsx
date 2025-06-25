import type { EmptyWrapperProps } from '../Wrapper/EmptyWrapper'

import { EmptyWrapper } from '../Wrapper'
import { TableContentLoaderWithProps } from './SkeletonLoader/ContentLoader'

interface PropTypes extends EmptyWrapperProps {
  isLoading: boolean
  columns: number[]
  rowCounts?: number
}
const EmptyContentTableLoading = ({ isLoading, columns, rowCounts, ...props }: PropTypes): JSX.Element => {
  return isLoading ? (
    <TableContentLoaderWithProps columnWidth={columns} rowCounts={rowCounts || 5} />
  ) : (
    <EmptyWrapper {...props} />
  )
}

export default EmptyContentTableLoading
