import '../../../assets/css/custom.css'
import React, { useEffect, useState } from 'react'
import Create from './Create'
import Update from './Update'
import useDetails from '../../../shared/ui/permission/useDetails'
import Table from '../components/Table'
import useTableC from './TableC'
import { useDispatch } from 'react-redux'
import { catagoriesData } from '../redux/thunk'



export default function Catagories() {

    const { role, permission } = useDetails()

    const [isUpdate, setIsupdate] = useState(false)
    const { data, handelSearch, currentPage,
        handelDelete, page, perPage, setSearchQuery, searchQuery,
        totalPages, totalItems, changePage,
        nextPage, prevPage } = useTableC()

    const [updateItem, setUpdateItem] = useState(null)


    const setUpdatePayload = (item) => {
        // console.log("update id :", item.id)
        setUpdateItem(item)
        setIsupdate(true)
    }


    // view bypermissions 
    const createCategories = permission?.some(
        (item) => item.categories === "create" || item.categories === "update"
    );

    const viewCategories = permission?.some(
        (item) => item.categories === "view" || role === "content_author"
    );



    return (
        <>
            <div className="page-content">
                <div className="main-wrapper">
                    <div className="category-form">
                        <div className="row">
                            {
                                createCategories && (
                                    <div className="col-sm-12 col-md-5">
                                        <h3 className="title-h3">
                                            {isUpdate
                                                ? "Update Category"
                                                : "Add Categories"}
                                        </h3>
                                        <hr className="my-3" />
                                        {isUpdate ? (
                                            <Update
                                                updateItem={updateItem}
                                                setIsupdate={setIsupdate}
                                            />
                                        ) : (
                                            <Create />
                                        )}
                                    </div>
                                )}
                            {
                                viewCategories && (
                                    <div className="col-sm-12 col-md-7">
                                        <Table
                                        createCategories={createCategories}
                                            permission={permission}
                                            currentPage={currentPage}
                                            page={page}
                                            nextPage={nextPage}
                                            prevPage={prevPage}
                                            changePage={changePage}
                                            handelSearch={handelSearch}
                                            setSearchQuery={setSearchQuery}
                                            totalPages={totalPages}
                                            totalItems={totalItems}
                                            data={data}
                                            perPage={perPage}
                                            searchQuery={searchQuery}
                                            handelDelete={handelDelete}
                                            role={role}
                                            setUpdatePayload={setUpdatePayload} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
