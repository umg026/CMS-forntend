import React, { useEffect, useState } from 'react'
import Profile1 from '../../../assets/images/profile-image-1.png'
import Profile2 from '../../../assets/images/profile-image.png'
import Profile3 from '../../../assets/images/profile-image-3.jpg'

function Dashboard_table({ data, Publish, pending }) {
    // console.log("data", Publish)
    return (
        <>
            <div className="page-content">
                <div className="main-wrapper">
                    <div className="row">
                        <div className="col-md-6 col-xl-3">
                            <div className="card stat-widget">
                                <div className="card-body">
                                    <h5 className="card-title">All Story</h5>
                                    <h2>{data?.length}</h2>
                                    <p>From last week</p>
                                    <div className="d-progress">
                                        <div className="progress-bar bg-info progress-bar-striped" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="card stat-widget">
                                <div className="card-body">
                                    <h5 className="card-title">Blogs</h5>
                                    <h2>{Publish?.length}</h2>
                                    <p>Orders in waitlist</p>
                                    <div className="d-progress">
                                        <div className="progress-bar bg-success progress-bar-striped" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="card stat-widget">
                                <div className="card-body">
                                    <h5 className="card-title">Author</h5>
                                    <h2>{pending?.length}</h2>
                                    <p>For last 30 days</p>
                                    <div className="d-progress">
                                        <div className="progress-bar bg-danger progress-bar-striped" role="progressbar" style={{ width: '60%' }} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="card stat-widget">
                                <div className="card-body">
                                    <h5 className="card-title">Add story</h5>
                                    <h2>87</h2>
                                    <p>Orders in waitlist</p>
                                    <div className="d-progress">
                                        <div className="progress-bar bg-primary progress-bar-striped" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="card table-widget">
                                <div className="card-body">
                                    <h5 className="card-title">Recent Orders</h5>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Customer</th>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Invoice</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row"><img src={Profile1} alt="" />Anna Doe</th>
                                                    <td>Modern</td>
                                                    <td>#53327</td>
                                                    <td>$20</td>
                                                    <td><span className="badge bg-info">Shipped</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><img src={Profile2} alt="" />John Doe</th>
                                                    <td>Alpha</td>
                                                    <td>#13328</td>
                                                    <td>$25</td>
                                                    <td><span className="badge bg-success">Paid</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><img src={Profile3} alt="" />Anna Doe</th>
                                                    <td>Lime</td>
                                                    <td>#35313</td>
                                                    <td>$20</td>
                                                    <td><span className="badge bg-danger">Pending</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><img src={Profile1} alt="" />John Doe</th>
                                                    <td>Circl Admin</td>
                                                    <td>#73423</td>
                                                    <td>$23</td>
                                                    <td><span className="badge bg-primary">Shipped</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><img src={Profile3} alt="" />Nina Doe</th>
                                                    <td>Space</td>
                                                    <td>#54773</td>
                                                    <td>$20</td>
                                                    <td><span className="badge bg-success">Paid</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <div className="card stat-widget">
                                <div className="card-body">
                                    <h5 className="card-title">Recent Posts</h5>
                                    <div className="transactions-list">
                                        <div className="tr-item">
                                            <div className="tr-company-name">
                                                <div className="tr-icon tr-card-icon tr-card-bg-primary text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                                                </div>
                                                <div className="tr-text">
                                                    <h4>New post reached 7k+ likes</h4>
                                                    <p>02 March</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="transactions-list">
                                        <div className="tr-item">
                                            <div className="tr-company-name">
                                                <div className="tr-icon tr-card-icon tr-card-bg-info text-info">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitch"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" /></svg>
                                                </div>
                                                <div className="tr-text">
                                                    <h4>Developer AMA is now live</h4>
                                                    <p>01 March</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="transactions-list">
                                        <div className="tr-item">
                                            <div className="tr-company-name">
                                                <div className="tr-icon tr-card-icon tr-card-bg-danger text-danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x={2} y={2} width={20} height={20} rx={5} ry={5} /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                                </div>
                                                <div className="tr-text">
                                                    <h4>52 unread messages</h4>
                                                    <p>23 February</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="transactions-list">
                                        <div className="tr-item">
                                            <div className="tr-company-name">
                                                <div className="tr-icon tr-card-icon tr-card-bg-warning text-warning">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1={3} y1={6} x2={21} y2={6} /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                                </div>
                                                <div className="tr-text">
                                                    <h4>2 new orders from shop page</h4>
                                                    <p>17 February</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="transactions-list">
                                        <div className="tr-item">
                                            <div className="tr-company-name">
                                                <div className="tr-icon tr-card-icon tr-card-bg-info text-info">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                                                </div>
                                                <div className="tr-text">
                                                    <h4>Hashtag #circl is trending</h4>
                                                    <p>03 February</p>
                                                </div>
                                            </div>
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

export default Dashboard_table

