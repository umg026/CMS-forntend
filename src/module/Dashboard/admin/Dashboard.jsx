import React, { useEffect, useState } from 'react'
import Dashboard_table from './Dashboard_table'
import pb from '../../../Pocketbase/pocketbase';


function Dashboard() {
  const [data, setData] = useState(null)
  const [publish, setPublish] = useState(null)


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const records = await pb.collection('New_Story_view').getFullList();
      setData(records)

      // console.log(records)
    }
    catch (error) {
      throw error;
    }
  }
  const pending = data?.filter((item, index) => {
    return item.status === "pending"
  })
  const Publish = data?.filter((item, index) => {
    return item.status === "published"
  })

 


  return (
    <div>
      <Dashboard_table data={data} Publish={Publish} pending={pending} />
      {/* <MarkDown>
        {post}
      </MarkDown> */}

      {/* <Markdown /> */}
    </div>
  )
}

export default Dashboard