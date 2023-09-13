import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function SignUp() {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({username: "", email: "", password: "", confirmpassword: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {username: credentials.username, email: credentials.email, password: credentials.password, confirmpassword: credentials.confirmpassword}
            )
        })

        const jsonResponse = await response.json();

        console.log(jsonResponse);

        if (jsonResponse.success !== true) {
            alert("wrong credentials");
        } else {
            alert("account created");
            navigate("/");
        }
    }

    const onChange = (event) => {
        setcredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }


    return (<>
        <div className='bg-dark text-light d-flex align-items-center justify-content-center'
            style={
                {"height": "100vh"}
        }>

            <div className="col-xs-10 col-md-6 col-lg-4 border border-3 rounded-3 mx-auto">

                <h1 className='text-center text-info my-5'>Register</h1>


                <form onSubmit={handleSubmit}>

                    <div className="col-md-10 mx-auto my-4">
                        <input className="form-control px-3 py-2" type="text" name="username"
                            value={
                                credentials.username
                            }
                            onChange={onChange}
                            placeholder="Full Name"
                            required/>
                    </div>

                    <div className="col-md-10 mx-auto my-4">
                        <input className="form-control px-3 py-2" type="email" name="email"
                            value={
                                credentials.email
                            }
                            onChange={onChange}
                            placeholder="E-mail Address"
                            required/>

                    </div>

                    <div className="col-md-10 mx-auto my-4">
                        <input className="form-control px-3 py-2" type="password" name="password"
                            value={
                                credentials.password
                            }
                            onChange={onChange}
                            placeholder="Password"
                            required/>

                    </div>
                    <div className="col-md-10 mx-auto my-4">
                        <input className="form-control px-3 py-2" type="password" name="confirmpassword"
                            value={
                                credentials.confirmpassword
                            }
                            onChange={onChange}
                            placeholder="Confirm Password"
                            required/>

                    </div>

                    <div className="col-md-10 mx-auto my-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                            <label className="form-check-label">I confirm that all data are correct</label>

                        </div>
                    </div>

                    <div className="col-md-10 mx-auto my-4 text-center">
                        <p>Already registered?
                            <Link to="/login">
                                Login
                            </Link>
                            here.</p>
                    </div>

                    <div className="form-button my-4 text-center">
                        <button id="submit" type="submit" className="btn btn-primary px-5">Register</button>
                    </div>
                </form>


            </div>
        </div>


    </>)
}
