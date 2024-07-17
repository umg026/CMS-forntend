import React, { useEffect, useState } from 'react'
import "../../../assets/css/preview.css"
import "../../../assets/css/responsive_preview.css"
import widget from "../../../assets/images/user-1.jpg"
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import pb from '../../../Pocketbase/pocketbase'
import { toast } from 'react-toastify'
import useDetails from '../../ui/permission/useDetails'
import MarkdownPreview from '@uiw/react-markdown-preview';
import axiosInstance from '../../../axiosInstance/axiosInstance'



function Preview({ time, username, image, title, description, data }) {

    const { role, permission } = useDetails() // fecth permission form locals
    const { id } = useParams()
    // const redirect = useNavigate()
    const [post, setPost] = useState("")
    // console.log("data", data)

    const redirect = useNavigate()
    const handelBack = () => {
        redirect(-1)
    }

    let currentDateTime = new Date();

    // Extract date components
    let year = currentDateTime.getFullYear();
    let month = String(currentDateTime.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    let dates = String(currentDateTime.getDate()).padStart(2, '0');
    let hours = String(currentDateTime.getHours()).padStart(2, '0');
    let minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    let seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

    // Construct the formatted date string
    let formattedDateTime = `${year}-${month}-${dates} ${hours}:${minutes}:${seconds}`;


    const update = {
        // ...data,
        "status": "published",
        "pub_date": formattedDateTime
    }
    const rejected = {
        "status": "rejected"
    }

    // for Publish Content 
    const handleAprove = async () => {
        try {
            await pb.collection('stories').update(`${data.Sid}`, update);
            toast.success("stroie update successfully")
            redirect("/stories")
        }
        catch (error) {
            toast.error(error);
        }
    }

    // for draft result : 
    const handleDraft = async () => {
        try {
            await pb.collection('stories').update(`${data.Sid}`, rejected);
            toast.success("stroie rejected successfully")
            redirect("/stories")

        }
        catch (error) {
            console.log(error);
        }
    }
    // console.log(process.env.REACT_APP_BASEURL)
    // delte story 
    const handelDelete = async () => {
        const confrim = window.confirm("Are You sure to delete this story")
        if (confrim) {

            try {
                const res = await axiosInstance.delete(`/story/delete/${data.Sid}`)
                toast.success("story delete successfully")
                redirect("/stories")
            }
            catch (error) {
                toast.error(`${error.response.data.msg}`)
                console.log(error)
                // throw error
            }
        }


    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://cms.3m3.in/api/files/${data?.collectionName}/${data?.id}/${data?.content}`);
                const markdownText = await response.text();

                setPost(markdownText);
            } catch (error) {
                console.error('Error fetching Markdown:', error);
            }
        };

        fetchData();

    }, [])

    return (
        <>

            <div className="page-content" style={{ backgroundColor: "white", borderRadius: "10px", marginTop: "45px" }}>
                <div className="main-wrapper">
                    <div className="preview-card">
                        <div className="title-head-preview d-flex align-items-center justify-content-between py-4">

                            <div className='text-2xl flex gap-1'>
                                <button onClick={handelBack} className="pt-2 px-2 block no-underline font-semibold text-black">
                                    <IoArrowBack />
                                </button>
                                <span className='text-[16px] mt-2 font-semibold'>{data.title}</span>

                            </div>

                            {
                                role === "admin" && permission?.map((item, index) => {
                                    if (item.story === "update") {
                                        if (data.status == "pending") {
                                            return (
                                                <div key={index} className="flex gap-3">
                                                    <button
                                                        onClick={handleAprove}
                                                        className='px-2 bg-green-500 text-white shadow-lg rounded py-2'>Approve</button>
                                                    <button onClick={handleDraft} className='px-2 bg-red-500 text-white shadow-lg rounded py-2'>Reject</button>
                                                </div>
                                            );
                                        }
                                    }
                                    else if (item.story === "delete") {
                                        if (data.status == "published") {
                                            return (
                                                <button key={index} onClick={handelDelete} className='px-2 bg-red-500 text-white shadow-lg rounded py-2'>Delete</button>
                                            );
                                        }

                                    }
                                    return null;
                                })
                            }

                        </div>
                        <div className="head-bg">
                            <div className="container">
                                <div className="bg-contents">
                                    <div className="bg-head">
                                        <h1 className='text-xl text-white leading-tight text-center'>{data.title}</h1>
                                    </div>
                                    <div className="bg-subhead d-flex align-items-baseline ">
                                        <i className="fa-regular fa-user" />
                                        <p>| By @{username}</p>
                                        <i className="fa-solid fa-calendar-days" />
                                        {
                                            data.status == "published" ? <p>| {data.pub_date.slice(0,10)}</p> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                                <a href={image}>
                                    <div className="related-img">
                                        <img src={image} width={"100%"} height={"100px"} alt="content_image" className="img-fluid round-img" />
                                    </div>
                                </a>
                                <div className="relate-content">
                                    <div className="view">
                                        <a href="">
                                            <i className="fa-regular fa-eye" />
                                            <p>10</p>
                                        </a>
                                        <a href="">
                                            <i className="fa-regular fa-message" />
                                            <p>20 Comments</p>
                                        </a>

                                    </div>
                                    <div className="like">
                                        <p> <i className="fa-solid fa-heart" /></p>
                                    </div>
                                </div>
                                <div className="plan-par my-3">
                                    <h4 className='text-xl pb-3'>Plan Your Itinerary:-</h4>
                                    <p>
                                        <MarkdownPreview source={post} style={{ padding: 16 }} />
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="right-sticky">
                                    <div className="border-most-read">
                                        <div className="most-read">
                                            <h3>Most Read</h3>
                                            <hr className="bg-black hr_line" style={{ height: 2 }} />
                                            <a href="#" className="read-main">
                                                <div className="left-img">
                                                    <img src={widget} alt="" className="widget-img round-img" />
                                                </div>
                                                <div className="right-text">
                                                    <h4>Tell-A-Tool: Guide To Web Design And Development Tools</h4>
                                                </div>
                                            </a>
                                            <a href="#" className="read-main">
                                                <div className="left-img">
                                                    <img src={widget} alt="" className="widget-img round-img" />
                                                </div>
                                                <div className="right-text">
                                                    <h4>Tell-A-Tool: Guide To Web Design And Development Tools</h4>
                                                </div>
                                            </a>
                                            <a href="#" className="read-main">
                                                <div className="left-img">
                                                    <img src={widget} alt="" className="widget-img round-img" />
                                                </div>
                                                <div className="right-text">
                                                    <h4>Tell-A-Tool: Guide To Web Design And Development Tools</h4>
                                                </div>
                                            </a>
                                            <a href="#" className="read-main">
                                                <div className="left-img">
                                                    <img src={widget} alt="" className="widget-img round-img" />
                                                </div>
                                                <div className="right-text">
                                                    <h4>Tell-A-Tool: Guide To Web Design And Development Tools</h4>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Preview