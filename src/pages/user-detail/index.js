import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserDetailInfo, UserDetailRepos } from "service";
import moment from "moment/moment";

import "./styles.scss"

const initalStatePagination = {
    per_page: 5,
    page: 1
}

export default function UserDetailPage() {

    let { username } = useParams();

    const [userDetail, setUserDetail] = useState()
    const [userDetailRepos, setUserDetailRepos] = useState()

    const [pagination, setPagination] = useState();

    const [paginationDetail, setPaginationDetail] = useState();

    useEffect(() => {
        if (username) {
            async function GetInfo() {
                const { avatar_url, name, public_repos, created_at } = await UserDetailInfo({ username })
                setUserDetail({ avatar_url, name, public_repos, created_at })
            }
            GetInfo();
            setPagination(initalStatePagination);
        }
    }, [username])

    useEffect(() => {
        if (username) {
            async function GetInfoRepos() {
                const data = await UserDetailRepos({ username, pagination })
                setUserDetailRepos(data)
                //console.log(full_name, name, html_url, updated_at);
            }
            if (pagination) {
                GetInfoRepos()
            }
        }
    }, [username, pagination])

    useEffect(() => {
        if (userDetail && pagination) {
            const { page, per_page } = pagination;
            const calcInicial = ((page - 1) * per_page) + 1;
            const calcLast = (page) * per_page;
            const inicialItemPageNumber = calcInicial < userDetail.public_repos ? calcInicial : userDetail.public_repos;
            const lastItemPageNumber = calcLast < userDetail.public_repos ? calcLast : userDetail.public_repos;
            setPaginationDetail({ inicialItemPageNumber, lastItemPageNumber, total: userDetail.public_repos });
        }
    }, [pagination, userDetail])


    function HandleClickPrev() {
        if (pagination.page - 1 > 0) {
            setPagination({ ...pagination, page: pagination.page - 1 })
        }
    }

    function HandleClickNext() {
        if (userDetail.public_repos > (pagination.page * pagination.per_page))
            setPagination({ ...pagination, page: pagination.page + 1 })
    }

    if (userDetail === undefined) {
        return;
    }

    if (username === undefined) {
        return;
    }

    return (

        <div className="container mx-auto flex flex-wrap justify-start items-stretch min-h-screen sm:flex-col">
            <div className="container-header">
                <a href="/">Voltar</a>
            </div>
            <div className="container mx-auto flex flex-wrap justify-center items-center flex-grow sm:flex-col lg:flex-row">
                <div className="container-user-left">
                    <img className="avatar-img" src={userDetail.avatar_url} alt="description" />
                    <h4>{userDetail.name || "'Sem nome'"} ({username})</h4>
                    <h5>Total de projetos criados: <span>{userDetail.public_repos}</span> projeto(s)</h5>
                    <h6>Usuário criado em: <span>{moment(userDetail.created_at).format("DD/MM/YYYY")}</span></h6>
                </div>
                <div className="container-user-right">
                    {userDetailRepos && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Projeto
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Full Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ultima Atualização
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            URL
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetailRepos.map(repo => {
                                        return (
                                            <tr className="" key={repo.node_id}>
                                                <th scope="row" className="px-6 py-3">
                                                    {repo.name}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {repo.full_name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {moment(repo.updated_at).format("DD/MM/YYYY")}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a href={repo.html_url} className="" target="_blank" rel="noreferrer">Link</a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="pagination-controls">
                                <label className="text-info">
                                    {paginationDetail && `Mostrando ${paginationDetail.inicialItemPageNumber} ao ${paginationDetail.lastItemPageNumber} de ${paginationDetail.total}`}
                                </label>
                                <div className="controls">
                                    <button onClick={HandleClickPrev}>
                                        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    <button onClick={HandleClickNext}>
                                        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}