import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'


export default function Login() {
    let navigate =useNavigate();
    const [credentials, setcredentials] = useState({username: "", password: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {username: credentials.username, password: credentials.password}
            )
        })

        const jsonResponse = await response.json();

        console.log(jsonResponse);

        if (jsonResponse.success !== true) {
            alert("wrong credentials");
        } else {
            alert("Logged In");
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
        <div className='bg-dark text-light d-flex align-items-center '
            style={
                {"height": "100vh"}
        }>


            <div className="col-xs-10 col-md-6 col-lg-4 border border-3 rounded-3 mx-auto">

                <h3 className='text-center text-info my-5'>Login</h3>


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
                        <input className="form-control px-3 py-2" type="password" name="password"
                            value={
                                credentials.password
                            }
                            onChange={onChange}
                            placeholder="Password"
                            required/>

                    </div>


                    <div className="col-md-10 mx-auto my-4 text-center">
                        <p>New User?
                            <Link to="/signup">
                                Create Account
                            </Link>
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
