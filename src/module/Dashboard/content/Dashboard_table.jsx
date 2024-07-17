import React, { useState } from 'react'
import '../../../assets/css/custom.css'
import { Link } from 'react-router-dom'

function Dashboard_table({ count, rejectedStory, allStories, isLoading }) {
    // console.log("rejected st :", rejectedStory)
    const [searchQuery, setSearchQuery] = useState("") // seraching state


    return (
        <>
            <div className="page-content">
                <div className="main-wrapper">
                    <div className="row">
                        <div className="col-md-6 col-xl-3">
                            <div className="card stat-widget">
                                <div className="card-body">
                                    <h5 className="ds-card-title">Published Story</h5>
                                    {
                                        count && count?.map((item, index) => {
                                            return <h2 key={index}>{item.status == "published" ? item.Story_count : ''}</h2>
                                        })
                                    }
                                    <p>All story added</p>
                                    <div className="d-progress">
                                        <div className="progress-bar bg-primary progress-bar-striped" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="card stat-widget">
                                <div className="card-body">
                                    <h5 className="ds-card-title">Pending Story</h5>
                                    {
                                        count && count?.map((item, index) => {
                                            return <h2 key={index}>{item.status == "pending" ? item.Story_count : ""}</h2>
                                        })
                                    }
                                    <p>Add Blogs by Author</p>
                                    <div className="d-progress">
                                        <div className="progress-bar bg-danger progress-bar-striped" role="progressbar" style={{ width: '60%' }} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="card stat-widget">
                                <div className="card-body">
                                    <h5 className="ds-card-title">Draft story</h5>
                                    {
                                        count && count?.map((item, index) => {
                                            return <h2 key={index}>{item.status == "draft" ? item.Story_count : ""}</h2>
                                        })
                                    }
                                    <p>All Categories</p>
                                    <div className="d-progress">
                                        <div className="progress-bar bg-success progress-bar-striped" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="card stat-widget">
                                <div className="card-body">
                                    <h5 className="ds-card-title">Rejected Story</h5>
                                    {
                                        count && count?.map((item, index) => {
                                            return <h2 key={index}>{item.status == "rejected" ? item.Story_count : ""}</h2>
                                        })
                                    }
                                    <p>From last week</p>
                                    <div className="d-progress">
                                        <div className="progress-bar bg-info progress-bar-striped" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ========== counts ================================================================================== */}
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="card px-3 st-card">
                                <div className="card-body flex justify-between gap-4">
                                    <h4 className="s-card-title mb-0 mt-1">All Stories</h4>
                                    <div>
                                        <input type="search"
                                            value={searchQuery} autoFocus
                                            onChange={(e) => setSearchQuery(e.target.value)} className="form-control px-3 py-1" name="search" id="search" placeholder="search...." />
                                    </div>
                                </div>
                                <hr />
                                <div className="story-list">
                                    <div className="table-responsive">
                                        <table className="table table-striped" style={{ border: 'none' }}>
                                            <thead >
                                                <tr>
                                                    <th scope="col"><h5>Story</h5></th>
                                                    <th scope="col"><h5>Title</h5></th>
                                                    <th scope="col"><h5>Categories</h5></th>
                                                    <th scope="col"><h5>Status</h5></th>
                                                    <th scope="col"><h5>Preview</h5></th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    allStories && allStories
                                                        .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.cataName.toLowerCase().includes(searchQuery.toLowerCase())) // Add condition to exclude deleted stories
                                                        .map((item, index) => {
                                                            return <tr key={index}>
                                                                <td>
                                                                    <Link target='_blank' to={`${item.domainurl}`}>
                                                                        <div className="story-img">
                                                                            <img src={`https://cms.3m3.in/api/files/${item.collectionName}/${item.id}/${item.image}`} alt="img" />
                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td>{item.title ? item.title.slice(0, 40) : ""}</td>
                                                                <td>{item.cataName}</td>
                                                                <td>
                                                                    <p className={item.status == "published" ? "text-green-600" : "text-red-600"}>
                                                                        {item.status}
                                                                    </p>
                                                                </td>
                                                                <td>

                                                                    <Link target="_blank" to={item.domainurl} className="btn btn btn-success btn-i flex" style={{ marginLeft: "2px" }}>
                                                                        <i className="fa-regular fa-eye mt-1" />Preview
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ========= Rejected stories ============================= */}
                        <div className="col-md-12 col-lg-4">
                            <div className="reject-s-main">
                                <div className="card px-3 reject-card">
                                    <div className="card-rs">
                                        <h5 className="rs-card-title mb-0">Rejected Story</h5>
                                        {
                                            rejectedStory && rejectedStory.map((item, index) => {
                                                return (
                                                    <Link key={index} to={`stories/preview/${item.id}`}>
                                                        <div className="r-story" >
                                                            <div className="rs-rt-flex">
                                                                <div className="rs-img">
                                                                    <img height={100} width={100} src={`https://cms.3m3.in/api/files/${item.collectionName}/${item.id}/${item.image}`} alt="img" />
                                                                </div>
                                                                <div className="rs-title">
                                                                    <h5 className="mb-0">{item.title}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="rs-action">
                                                                <div className="rs-edit">
                                                                    <Link to={`stories/edit/${item.id}`} className="edit-icon" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top"><i className="far fa-edit" /></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        }
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

export default Dashboard_table

