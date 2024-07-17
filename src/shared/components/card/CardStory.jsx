import React, { useEffect, useState } from 'react'
import Parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../axiosInstance/axiosInstance'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { myStories } from '../../../module/Stories/redux/myStory/thunk'
import useDetails from '../../ui/permission/useDetails'

function CardStory({ story, email }) {
    const dispatch = useDispatch()
    const { permission } = useDetails()

    const pubDate = story.pub_date.split(' ')[0]

    const reviewStory = permission?.some(
        (item) => item.story === "review"
    );
    const updateStory = permission?.some(
        (item) => item.story === "delete" || item.story == "update"
    );
    // console.log("permissions :", updateStory)

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure to confirm delete ?")

        if (confirmed) {
            try {
                const result = await axiosInstance.delete(`/story/delete/${story.Sid}`)
                // console.log(result)
                toast.success(`story delete successfully`)
                dispatch(myStories(email));

            } catch (error) {
                toast.error(`${error.response.data.msg}`)
            }
        }
    }

    return (
        <>
            <div className="col-sm-6 col-md-4 p-2 rounded-lg col-12">
                <div className="card h-[470px]">
                    <img src={`https://cms.3m3.in/api/files/New_Story_view/${story.id}/${story.image}`} className="card-img-top h-60" alt="..." />
                    <div className="card-body">
                        <div className="story-title-type d-flex justify-content-between align-items-center ">
                            <h6 className="story-date">{!pubDate ? "not publish yet" : pubDate}</h6>
                            <div>
                                <h6 className="mini">{story.cataName}</h6>
                                <h6 className={story.status === "pending" || story.status == "draft" || story.status == "rejected" ? "bg-red-400 text-center mt-2 rounded-md text-white text-[13px] px-2 py-1" : "bg-green-400 text-center mt-2 rounded-md text-white text-[13px] px-2 py-1"}>{story.status}</h6>
                            </div>
                        </div>
                        <div className="story-title">
                            <h5 className="card-title m-0" style={{ color: "black", padding: "10px 0px 10px 0px", fontSize: "16px", width: "100%", height: "32px", overflow: "hidden" }}>{story.title}</h5>
                        </div>
                        <div className="pt-2" style={{ overflow: "hidden", color: "gray" }}>
                            {Parse(`<p>${story?.Sdescription?.substring(0, 100)}</p>`)}
                        </div>
                        {

                            reviewStory && (
                                <Link target={story.status == "published" ? "_blank" : ""} to={story.status == "published" ? `${story.domainurl}` : `/stories/preview/${story.id}`} className="btn btn btn-success btn-i mt-4" style={{ marginLeft: "2px" }}>
                                    <i className="fa-regular fa-eye" />{story.status == "published" ? "Live Preview" : "Preview"}
                                </Link>
                            )
                        }
                        {
                            story.status == "draft" || story.status == "rejected" ? (
                                updateStory && (
                                    <React.Fragment>
                                        <Link to={`/stories/edit/${story.id}`} className="btn btn btn-info btn-i mt-4" style={{ marginLeft: "2px" }}>
                                            <i className="fa-regular fa-pen-to-square" />Edit
                                        </Link>
                                        <button onClick={handleDelete} className="btn btn btn-danger btn-i mt-4" style={{ marginLeft: "2px" }}>
                                            <i className="fa-regular fa-trash-can" />Delete
                                        </button>
                                    </React.Fragment>
                                )
                            ) : null
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default CardStory