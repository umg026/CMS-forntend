import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../../../assets/css/preview.css'
import Preview from '../../../shared/components/story_preview/preview';
import pb from '../../../Pocketbase/pocketbase'


function PreviewStory() {

  const [data, setData] = useState(null)
  const [time, setTime] = useState("")
  const { id } = useParams()

  const fetchData = async () => {
    try {
      const res = await pb.collection('New_Story_view').getOne(`${id}`);
      setData(res)

      const time = res?.data?.created;
      const date = new Date(time);
      const formattedDate = date?.toISOString().split('T')[0];
      setTime(formattedDate)
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='bg-gray-100'>
      {
        data && (
          <div className="p-10">
            <Preview data={data} title={data.title} time={time} username={data.username} image={`https://cms.3m3.in/api/files/${data.collectionId}/${data.id}/${data.image}`} description={data?.description} />
          </div>

        )
      }
    </div>
  )
}

export default PreviewStory