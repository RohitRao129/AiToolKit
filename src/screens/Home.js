import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
                <Navbar/>
                
                <div className='d-flex flex-wrap justify-content-evenly'>
                    
                    <div className="card my-5" style={{width: "18rem"}}>
                        <img src="https://images.unsplash.com/photo-1679083216051-aa510a1a2c0e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8Q2hhdEdwdHx8fHx8fDE2OTQ0NjA5OTk&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800" className="card-img-top" alt="..."/>
                        <div className="card-body pb-0 d-flex flex-column">
                            <h5 className="card-title text-center border py-1">Generate Text</h5>
                            <p className="card-text">generate Text from text prompt.</p>
                            <Link to="/textgeneration" className="btn btn-primary w-100 mt-auto mb-2">Take me there</Link>
                        </div>
                    </div>

                    <div className="card my-5" style={{width: "18rem"}}>
                        <img src="https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8TWlkam91cm5leXx8fHx8fDE2OTQ0NjEwNDY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800" className="card-img-top" alt="..."/>
                        <div className="card-body pb-0 d-flex flex-column ">
                            <h5 className="card-title text-center border py-1">Generate Image</h5>
                            <p className="card-text">generate audio from Image prompt.</p>
                            <Link to="/imagegeneration" className="btn btn-primary w-100 mt-auto mb-2">Take me there</Link>
                        </div>
                    </div>

                    <div className="card my-5" style={{width: "18rem"}}>
                        <img src="https://images.unsplash.com/photo-1525022340574-113732565927?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8QXVkaW98fHx8fHwxNjk0NDYxMTg1&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800" className="card-img-top" alt="..."/>
                        <div className="card-body pb-0 d-flex flex-column">
                            <h5 className="card-title text-center border py-1">Generate Audio</h5>
                            <p className="card-text">generate audio from text prompt.</p>
                            <Link to="/audiogeneration" className="btn btn-primary w-100 mt-auto mb-2">Take me there</Link>
                        </div>
                    </div>

                    <div className="card my-5" style={{width: "18rem"}}>
                        <img src="https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8Ym9va3x8fHx8fDE2OTQ0NjEzMTg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800" className="card-img-top" alt="..."/>
                        <div className="card-body pb-0 d-flex flex-column">
                            <h5 className="card-title text-center border py-1">Saved</h5>
                            <p className="card-text">Browse your saved generations with their respective prompt.</p>
                            <Link to="/savedgenerations" className="btn btn-primary w-100 mt-auto mb-2">Go to Saved</Link>
                        </div>
                    </div>


                </div>
                
                <div className='h-100 text -light'>dfsaf</div>
                <Footer/>

        </>
    )
}
