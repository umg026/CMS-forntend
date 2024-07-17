import React, { useEffect, useState } from 'react'
import Table from '../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import useDetails from '../../../shared/ui/permission/useDetails';
import { deleteRole, roleData } from '../redux/thunk';
import Swal from 'sweetalert2';


function Container() {
    const dispatch = useDispatch();
    const { role, permission } = useDetails() // fecth permission form locals


    const { data, page, totalPages, totalItems } = useSelector(state => state.role); // Fetch data from redux 

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(6)
    const [searchQuery, setSearchQuery] = useState("")


    useEffect(() => {
        dispatch(roleData({ page: currentPage, pageSize: limit, searchQuery }));
    }, [dispatch, currentPage, limit, searchQuery]);


    const handelSearch = () => {
        dispatch(roleData({ page: 1, pageSize: limit, searchQuery }))
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

    // delete Role with confrim 
    const handelDelete = (id) => {
        dispatch(deleteRole(id))
            .then(() => {
                dispatch(roleData({ page: currentPage, pageSize: limit, searchQuery }));
            })
            .catch((error) => {
                console.error('Error deleting role:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete role. Please try again later.',
                });
            });
    }

    return (
        <>
            <Table
                role={role}
                data={data}
                page={page}
                totalPages={totalPages}
                totalItems={totalItems}
                permission={permission}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handelDelete={handelDelete}
                prevPage={prevPage}
                nextPage={nextPage}
                changePage={changePage}
                handelSearch={handelSearch}
            />
        </>
    )
}

export default Container