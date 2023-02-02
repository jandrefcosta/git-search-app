
import PaginationComponent from "components/pagination";

import { Fragment, useEffect, useState } from "react";
import { SearchUsers } from "service";

import Spinner from "react-spinkit";

import './style.scss'

const initalStatePagination = {
    per_page: 12,
    page: 1
}

export default function HomePage() {

    const [searchTerm, setSearchTerm] = useState()
    const [users, setUsers] = useState()
    const [pagination, setPagination] = useState();

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (pagination) {
            async function GetUsers() {
                setLoading(true)
                setUsers(undefined);
                try {
                    const { items, total_count } = await SearchUsers({ searchTerm, pagination })
                    setUsers(items)
                    if (total_count !== pagination.total_count)
                        setPagination({ ...pagination, total_count })
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false)
                }
            }
            GetUsers();
        }
        /*searchTerm don't need to be a dependency*/
        // eslint-disable-next-line 
    }, [pagination])

    function HandleChange(e) {
        const { target: { value } } = e
        setSearchTerm(value)
    }

    function HandleSearchUsers(e) {
        e?.preventDefault();
        if (searchTerm) {
            setPagination(initalStatePagination);
        }
    }

    function PrevPage() {
        if (pagination.page - 1 > 0) {
            setPagination({ ...pagination, page: pagination.page - 1 })
        }
    }

    function NextPage() {
        if (pagination.total_count > (pagination.page * pagination.per_page))
            setPagination({ ...pagination, page: pagination.page + 1 })
    }

    return (
        <div className="container">
            <form className="search_form" >
                <div className="search_form_title">
                    <p className="search_form_title__p">
                        Let's search a user on github? (sneak peek)
                    </p>
                </div>
                <div className="search_form_actions">
                    <div className="search_form_actions__input">
                        <input id="username" type="text" placeholder="Username"
                            onChange={HandleChange}
                        />
                    </div>
                    <div className="search_form_actions__button">
                        <button type="submit" onClick={HandleSearchUsers}>
                            Search
                        </button>
                    </div>
                </div>
            </form>
            {users &&
                <Fragment>
                    <div className="search_results_container">
                        <div className="search_results_container__content">
                            {users?.map((user, index) => {
                                return (
                                    <div key={user.node_id} className="search_results__item">
                                        <a href={`/detalhe/${user.login}`}>
                                            <div className="search_results__item_card">
                                                <img src={user.avatar_url} alt="user avatar" />
                                                <p>{user.login}</p>
                                            </div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <PaginationComponent pagination={pagination} next={NextPage} prev={PrevPage} />
                    </div>
                </Fragment>
            }
            {loading &&
                <div className="loading" role="status">
                    <Spinner name="ball-scale-multiple" fadeIn="none" />
                </div>
            }
        </div >
    )
}

