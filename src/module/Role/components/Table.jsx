import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Table({ handelDelete, page, totalPages, totalItems, currentPage, prevPage, nextPage,
    data, handelSearch, searchQuery, setSearchQuery, role, permission, changePage }) {

    // console.log("data in component :", data)
    return (
        <>
            <div className="page-content">
                <div className="main-wrapper">
                    <div className="all-story-main">
                        <div className="row align-items-end ">
                            <div className="col-md-6 col-sm-12">
                                <h3 className="title-h3 m-0">All Role :</h3>
                            </div>
                            <div className="col-md-6 col-sm-12 text-end">
                                <div className="flex justify-end gap-3">
                                    <form className="max-w-sm">
                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-950 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                                                    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                                                </svg>
                                            </div>
                                            {/* input field  */}
                                            <input type="text" value={searchQuery} autoFocus
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="search role name...." required />
                                        </div>
                                        <button type="submit" onClick={handelSearch} className="hidden p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                            <span className="sr-only">Search</span>
                                        </button>
                                    </form>
                                    <div className="">
                                        {
                                            role === "admin" && permission?.map((item, index) => {
                                                if (item.role === "create") {
                                                    return (
                                                        <Link to="create" key={index} type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Role</Link>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3" style={{ backgroundColor: '#cdcdcd' }} />
                        </div>
                        {/* --------------------------table------------------------------- */}
                        <div className="story-table">
                            <div className="table-responsive">
                                <table className="table table-striped" style={{ border: 'none' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Module</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data?.items &&
                                            data?.items?.filter(item => item?.role_name?.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .map((item, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.role_name}</td>
                                                        <td>{item.role_type}</td>
                                                        <td>

                                                            {
                                                                (() => {
                                                                    let items = String(item?.module);
                                                                    let wbswbh = items?.substr(1, item?.module.length - 2).split(',');
                                                                    let arr = [...new Set(wbswbh)];
                                                                    return arr.map((item, index) => (
                                                                        <p key={index}>{item.trim()}</p>
                                                                    ));
                                                                })()
                                                            }
                                                        </td>

                                                        <td className='flex gap-1'>
                                                            {
                                                                role === "admin" && permission?.map((items, index) => {
                                                                    if (items.role === "update") {
                                                                        return (
                                                                            <div className="edit-delete-icons" key={index}>
                                                                                <Link to={`edit/${item.id}`} className="edit-icon" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top"><i className="far fa-edit" /></Link>
                                                                            </div>
                                                                        )
                                                                    } else if (items.role === "delete") {
                                                                        return (
                                                                            <div className="edit-delete-icons" key={index}>
                                                                                {
                                                                                    item.is_deleted == true ? <button type='button' onClick={() => toast.success("role already soft deleted")} className="delete-icon" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top"><i className="far fa-trash-alt" /></button> : <button type='button' onClick={() => handelDelete(item.id)} className="delete-icon" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top"><i className="far fa-trash-alt" /></button>
                                                                                }

                                                                            </div>
                                                                        )
                                                                    }
                                                                })
                                                            }

                                                        </td>
                                                    </tr>
                                                ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ===========pagination =============== */}
                        <div className="row">
                            <div className="col-sm-12 col-md-5">
                                <div className="dataTables_info" id="complex-header_info" role="status" aria-live="polite">
                                    Showing <span className='px-2'> {page}</span>
                                    to
                                    <span className='px-2'>{totalPages}</span>Page
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                                <div className="dataTables_paginate paging_simple_numbers" id="complex-header_paginate">
                                    <ul className="pagination">
                                        <li className={`paginate_button cursor-pointer page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <div onClick={prevPage} className="page-link">Previous</div>
                                        </li>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (

                                            <li key={number} className="paginate_button page-item ">
                                                <div
                                                    onClick={() => changePage(number)} className="page-link"> {number}</div>
                                            </li>

                                        ))}

                                        <li className={`paginate_button cursor-pointer page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <div onClick={nextPage} className="page-link">Next</div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Table