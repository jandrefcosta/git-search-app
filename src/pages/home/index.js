
import PaginationComponent from "components/pagination";

import { Fragment, useEffect, useState } from "react";
import { SearchUsers } from "service";

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
        <div className="container mx-auto flex justify-center items-center min-h-screen flex-col">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8" >
                <div className="mb-2">
                    <p className="block text-gray-700 font-bold mb-4">
                        Vamos pesquisar um usuário no github? (sneak peek)
                    </p>
                </div>
                <div className="flex items-center">
                    <div className="flex mr-4">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
                            onChange={HandleChange}
                        />
                    </div>
                    <div className="flex">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={HandleSearchUsers}>
                            Pesquisar
                        </button>
                    </div>
                </div>
            </form>
            {users &&
                <Fragment>
                    <div className="flex w-4/5">
                        <div className="flex flex-row sm:flex-col md:flex-row w-full flex-wrap gap-4 justify-center">
                            {users?.map((user, index) => {
                                return (
                                    <div key={user.node_id} className="min-w-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <a href={`/detalhe/${user.login}`}>
                                            <div className="flex flex-col items-center">
                                                <img className="rounded w-36 h-36 cursor-pointer filter grayscale hover:grayscale-0" src={user.avatar_url} alt="Extra large avatar" />
                                                <h6 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">{user.login}</h6>
                                            </div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-8">
                        <PaginationComponent pagination={pagination} next={NextPage} prev={PrevPage} />
                    </div>
                </Fragment>
            }
            {loading &&
                <div role="status">
                    <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div >
    )
}

