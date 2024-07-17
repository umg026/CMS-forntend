import React, { useEffect, useState } from 'react'
import CardStory from '../../../shared/components/card/CardStory'
import { useDispatch, useSelector } from 'react-redux';
import '../../../assets/css/custom.css'
import { storiesData } from '../redux/allStory(admin)/story_thunk';
import pb from '../../../Pocketbase/pocketbase';

function Stories() {

  const dispatch = useDispatch();
  // State for pagination

  const { data } = useSelector(state => state.stories); // Fetch data from redux 

  const [cardsData, setCardData] = useState([])

  // const [currentPage, setCurrentPage] = useState(1);
  const [catagories, setCatagories] = useState(null)
  const [selectCata, setSelectCata] = useState('') // catagories select state
  const [selectStatus, setSelectStatus] = useState('') // catagories select state

  // pagination state
  const [searchQuery, setSearchQuery] = useState("") // seraching state

  const [filteredData, setFilteredData] = useState([]); // filter data when we choose catagories in select

  useEffect(() => {
    dispatch(storiesData({ searchQuery }));

    setCardData(data)
  }, [dispatch, searchQuery]);

  useEffect(() => {
    fetchCatagories()
  }, [])

  useEffect(() => {
    setCardData(data);
    setFilteredData(data);
  }, [data]);

  const fetchCatagories = async () => {
    try {
      const record = await pb.collection('categories').getFullList()
      setCatagories(record)
    }
    catch (error) {
      throw error
    }
  }

  const handelSelctChange = (e) => {
    setSelectCata(e.target.value);
    const filtered = e.target.value === 'All Categories' ? data : data.filter(item => item.cataName === e.target.value);
    setFilteredData(filtered);
  }

  
  const handelSelectStatus = (e) => {
    setSelectStatus(e.target.value);
    const filtered = e.target.value === 'all' ? data : data.filter(item => item.status === e.target.value);
    setFilteredData(filtered);
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
                  <div className="col-md-4 mb-3 px-1 ">
                    <select className="form-select px-2 py-1" id="category" value={selectStatus} onChange={handelSelectStatus} style={{ border: '1px solid #afafaf' }}>
                      <option value="all">Status</option>
                      <option value="published">Pubished</option>
                      <option value="pending">Pending</option>

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
              {filteredData && filteredData
                .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.cataName.toLowerCase().includes(searchQuery.toLowerCase()) || item.Sdescription.toLowerCase().includes(searchQuery.toLowerCase())) // Add condition to exclude deleted stories
                .map((story, index) => <CardStory key={index} story={story} />)
              }
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Stories