import React from 'react'
import {Link} from 'react-router-dom'

export default function Login() {
    
    
    
    
    
    
    return (<>
        <div className='bg-dark text-light d-flex align-items-center 'style={{"height": "100vh"}}>


            <div className="col-xs-10 col-md-6 col-lg-4 border border-3 rounded-3 mx-auto">

                <h3 className='text-center text-info my-5'>Login</h3>


                <form className="requires-validation" novalidate>

                    <div className="col-md-10 mx-auto my-4">
                        <input className="form-control px-3 py-2" type="text" name="name" placeholder="Username/Email" required/>
                        <div className="valid-feedback">Username field is valid!
                        </div>
                        <div className="invalid-feedback">Username field cannot be blank!
                        </div>
                    </div>

                    <div className="col-md-10 mx-auto my-4">
                        <input className="form-control px-3 py-2" type="password" name="password" placeholder="Password" required/>
                        <div className="valid-feedback">Password field is valid!
                        </div>
                        <div className="invalid-feedback">Password field cannot be blank!
                        </div>
                    </div>


                    <div className="col-md-10 mx-auto my-4 text-center">
                        <p>New User? 
                            <Link to="/signup"> Create Account </Link>
                            here.</p>
                    </div>

                    <div className="form-button my-4 text-center">
                        <button id="submit" type="submit" className="btn btn-primary px-5">Login</button>
                    </div>
                </form>


            </div>
        </div>


    </>)
}
