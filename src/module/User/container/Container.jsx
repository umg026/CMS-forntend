import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useDetails from '../../../shared/ui/permission/useDetails';
import Table from '../components/Table';
import { userData, deleteUser } from '../redux/thunk';
import Swal from 'sweetalert2';


function Container() {
  const dispatch = useDispatch();
  const { role, permission } = useDetails() // fecth permission form locals


  const { data, page, perPage, totalPages, totalItems } = useSelector(state => state.userData); // Fetch data from redux 
 console.log("data",data)
 
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10)
  // for Searching state
  const [searchQuery, setSearchQuery] = useState("")
  const [selectUser, setSelectUser] = useState("")
  const [filtredData, setFiltredData] = useState(null)

  useEffect(() => {
    dispatch(userData({ page: currentPage, pageSize: limit, searchQuery }));
  }, [dispatch, currentPage, limit, searchQuery]);

  useEffect(() => {
    if (data) {
      setFiltredData(data)
    }
  }, [data])
  // for searching function :
  const handelSearch = () => {
    dispatch(userData({ page: 1, pageSize: limit, searchQuery }))
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
    dispatch(deleteUser(id)).then(() => {
      dispatch(userData({ page: 1, pageSize: limit, searchQuery }))
    }).catch((err) => {
      console.error('Error deleting role:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete role. Please try again later.',
      });
    })
  };
  //  =======================

  const handelSelctChange = (e) => {
    setSelectUser(e.target.value);
    const filtered = e.target.value === 'All' ? data : data.filter(item => item.expand.role_id.role_type === e.target.value);
    setFiltredData(filtered);
  }

  return (
    <>
      <Table
        role={role}
        permission={permission}
        page={page}
        selectUser={selectUser}
        setSelectUser={setSelectUser}
        filtredData={filtredData}
        handelSelctChange={handelSelctChange}
        nextPage={nextPage}
        prevPage={prevPage}
        changePage={changePage}
        handelSearch={handelSearch}
        setLimit={setLimit}
        handelDelete={handelDelete}
        setSearchQuery={setSearchQuery}
        limit={limit}
        searchQuery={searchQuery}
        currentPage={currentPage}
        perPage={perPage}
        totalPages={totalPages}
        totalItems={totalItems}
      />

    </>
  )
}

export default Container