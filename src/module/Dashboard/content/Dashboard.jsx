import React, { useEffect, useState } from 'react'
import Dashboard_table from './Dashboard_table'
import { useDispatch, useSelector } from 'react-redux';
import useDetails from '../../../shared/ui/permission/useDetails';
import { myStories } from '../../Stories/redux/myStory/thunk';
import axiosInstance from '../../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';


function Dashboard() {
  const { data } = useDetails()

  const [count, setCount] = useState(null)
  const dispatch = useDispatch()
  const { stdata, isLoading } = useSelector(state => state.mystory)

  useEffect(() => {
    if (data?.email) {
      dispatch(myStories(data.email));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (data?.email) {
      fetchCount()
    }
  }, [data?.email]);

  const fetchCount = async () => {
    try {
      const records = await axiosInstance.get("/api/collections/story_status_count/records")
      setCount(records?.data?.items)
    }
    catch (error) {
      toast.error("Something Went Wrong")
      console.log("error", error)
    }
  }
  const allStories = stdata?.filter((item) => {
    return item.status == "published"
  })

  const rejectedStory = stdata?.filter((item) => {
    return item.status == "rejected"
  })


  return (
    <div>
      <Dashboard_table
        rejectedStory={rejectedStory}
        allStories={allStories}
        count={count}
        isLoading={isLoading} />
    </div>
  )
}

export default Dashboard