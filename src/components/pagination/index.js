const { useEffect, useState } = require("react")

export default function PaginationComponent(props) {
    
    const [pagination, setPagination] = useState();

    useEffect(() => {
        if (props) {
            const { total_count, page, per_page } = props.pagination;
            const calcInicial = ((page - 1) * per_page) + 1;
            const calcLast = (page) * per_page;
            const inicialItemPageNumber = calcInicial < total_count ? calcInicial : total_count;
            const lastItemPageNumber = calcLast < total_count ? calcLast : total_count;
            setPagination({ inicialItemPageNumber, lastItemPageNumber, total: total_count })
        }
    }, [props])
    
    if (!pagination) {
        return;
    }

    return (
        <div className="inline-flex mt-2 xs:mt-0 items-center">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={props.prev}>
                <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd">
                    </path>
                </svg>
                Prev
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-400 mx-8">
                Showing <span className="font-semibold text-gray-900 dark:text-white">
                    {pagination.inicialItemPageNumber}
                </span> to <span className="font-semibold text-gray-900 dark:text-white">
                    {pagination.lastItemPageNumber}
                </span> of <span className="font-semibold text-gray-900 dark:text-white">
                    {pagination.total}
                </span> Entries
            </span>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={props.next}>
                Next
                <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
            </button>
        </div>
    )
}