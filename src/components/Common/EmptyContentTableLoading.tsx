import { EmptyWrapper } from "../Wrapper"
import { EmptyWrapperProps } from "../Wrapper/EmptyWrapper"
import { TableContentLoaderWithProps } from "./SkeletonLoader/ContentLoader"

interface PropTypes extends EmptyWrapperProps {
    isLoading: boolean
    columns: number[]
    rowCounts?: number
}
const EmptyContentTableLoading = ({ isLoading, columns, rowCounts, ...props }: PropTypes) => {
    return (
        isLoading ? (
            <TableContentLoaderWithProps columnWidth={columns} rowCounts={rowCounts || 5} />
        ) : (
            <EmptyWrapper {...props} />
        )
    )
}

export default EmptyContentTableLoading
