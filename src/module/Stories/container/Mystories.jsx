import React, { useEffect, useState } from 'react'
import CardStory from '../../../shared/components/card/CardStory'
import useDetails from '../../../shared/ui/permission/useDetails'
import { useDispatch, useSelector } from 'react-redux'
import { myStories } from '../redux/myStory/thunk'
import pb from '../../../Pocketbase/pocketbase'

function Mystories() {

  const dispatch = useDispatch()
  const { data, permission } = useDetails()
  const [selectCata, setSelectCata] = useState('') // catagories select state
  const [catagories, setCatagories] = useState(null)
  const [searchQuery, setSearchQuery] = useState("") // seraching state
  const [filteredData, setFilteredData] = useState([]); // filter data when we choose catagories in select
  const [selectStatus, setSelectStatus] = useState("")

  const { stdata, isLoading } = useSelector(state => state.mystory)
  console.log("data ", data)
  useEffect(() => {
    if (data?.email) {
      dispatch(myStories(data.email));
    }
  }, [dispatch, data]);

  useEffect(() => {
    fetchCatagories()
    setFilteredData(stdata)
  }, [stdata])
  const fetchCatagories = async () => {
    try {
      const record = await pb.collection('categories').getFullList({
        sort: '-created'
      })
      setCatagories(record)
    }
    catch (error) {
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className="page-content">
        <div className="main-wrapper">
          <div className="all-story-main">
            <div className="flex justify-center items-center h-screen">
              Loading...........
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handelSelctChange = (e) => {
    setSelectCata(e.target.value);
    setSelectStatus(e.target.value)
    const filtered = e.target.value === 'all' ? stdata : stdata.filter(item => item.cataName === e.target.value);
    setFilteredData(filtered);
  }

  const handelStatus = (e) => {
    setSelectStatus(e.target.value)
    const status = e.target.value === 'all' ? stdata : stdata?.filter(item => item.status === e.target.value)
    setFilteredData(status)
  }

  return (
    <>

      <div className="page-content">
        <div className="main-wrapper">
          <div className="all-story-main">
            <div className="all-story-head d-flex justify-content-lg-between justify-content-md-center align-items-center  flex-lg-row flex-md-column flex-wrap">
              <div className="all-story-title">
                <h3 className="px-4 title-h3">All Stories</h3>
              </div>
              <div className="add-story d-flex justify-content-center align-items-center flex-md-wrap flex-wrap ">
                <div className="row">
                  <div className="col-md-4 mb-3 ps-1">
                    <select value={selectStatus} onChange={handelStatus} className="form-select px-2 py-1" style={{ border: '1px solid #afafaf' }}>
                      <option value="all">Status</option>
                      <option value="pending">pending</option>
                      <option value="rejected">rejected</option>
                      <option value="draft">draft</option>
                      <option value="published">published</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 px-1 ">
                    <select className="form-select px-2 py-1" id="category" value={selectCata} onChange={handelSelctChange} style={{ border: '1px solid #afafaf' }}>
                      <option value="All Categories">All Categories</option>
                      {catagories && catagories.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 ps-1">
                    <input type="search"
                      value={searchQuery} autoFocus
                      onChange={(e) => setSearchQuery(e.target.value)} className="form-control px-3 py-1" name="search" id="search" placeholder="search...." />
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ backgroundColor: '#cdcdcd', margin: 0 }} />
            <div className="row py-4">
              {
                filteredData && filteredData
                  .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.cataName.toLowerCase().includes(searchQuery.toLowerCase()) || item.Sdescription.toLowerCase().includes(searchQuery.toLowerCase())) // Add condition to exclude deleted stories
                  .map((story, index) => <CardStory key={index} email={data?.email} story={story} />)
              }
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Mystories
