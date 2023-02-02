import { useEffect, useState } from "react";

import "./style.scss"

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
        <div className="controls_pagination">
            <button className="controls_pagination__prev"
                onClick={props.prev}>
                <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd">
                    </path>
                </svg>
                Prev
            </button>
            <span className="controls_pagination__details">
                Showing
                <span> {pagination.inicialItemPageNumber} </span>
                to
                <span> {pagination.lastItemPageNumber} </span>
                of
                <span> {pagination.total} </span>
                Entries
            </span>
            <button className="controls_pagination__next"
                onClick={props.next}>
                Next
                <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
            </button>
        </div>
    )
}