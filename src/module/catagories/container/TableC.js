import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { catagoriesData, deleteCatagories } from '../redux/thunk'
import Swal from 'sweetalert2';

export default function useTableC() {
    const dispatch = useDispatch()

    const { isLoading, data, page, perPage, totalPages, totalItems } = useSelector(state => state.catagories);
    // console.log("page :", page)
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10)
    // for Searching state
    const [searchQuery, setSearchQuery] = useState("")


    useEffect(() => {
        dispatch(catagoriesData({ page: currentPage, pageSize: limit, searchQuery }))
    }, [dispatch, currentPage, limit, searchQuery])

    const handelSearch = () => {
        dispatch(catagoriesData({ page: 1, pageSize: limit, searchQuery }))
        setCurrentPage(1)
    }

    const prevPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const nextPage = () => {
        setCurrentPage(prevPage => (page < totalPages ? page + 1 : prevPage));
    };

    const changePage = (id) => {
        setCurrentPage(id);
    };


    // delete catagories 
    const handelDelete = (id) => {
        dispatch(deleteCatagories(id)).then(() => {
            dispatch(catagoriesData({ page: currentPage, pageSize: limit, searchQuery }))
        }).catch((err) => {
            console.log("error", err)
            Swal.fire('Cancelled', 'Your catagories is safe :)', 'info');
        })
    }

    return {
        data, handelSearch, currentPage,
        handelDelete, isLoading, page, perPage, searchQuery,
        totalPages, totalItems, changePage, setSearchQuery,
        nextPage, prevPage
    }

}


