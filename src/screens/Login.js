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

        //console.log(jsonResponse);
        
        if (jsonResponse.success !== true) {
            if(jsonResponse.code===1){
                document.getElementById("usernamemsg").innerHTML="Wrong Username";
            }
            else{
                document.getElementById("usernamemsg").innerHTML="";
            }

            if(jsonResponse.code===2){
                document.getElementById("passwordmsg").innerHTML="Wrong Password";
            }
            else{
                document.getElementById("passwordmsg").innerHTML="";
            }

            if(jsonResponse.code===0){
                document.getElementById("forgotpasswordmsg").innerHTML="Invalid inputs";
            }

            if(jsonResponse.code >0){
                document.getElementById("forgotpasswordmsg").innerHTML="<a style='text-decoration: none;' href='/changepassword'>Forgot Password?</a>";
            }

           
        } else {
            localStorage.setItem("authToken",jsonResponse.authToken);
            document.getElementsByTagName('form')[0].innerHTML="";
            document.getElementById('head').innerHTML="Loging In";
            setTimeout(() => {
                navigate("/");
            }, 750);
            
        }
    }

    const onChange = (event) => {
        setcredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }


    return (<>
        <div className='d-flex align-items-center '
            style={
                {"height": "100vh", background:"#cececec2"}
        }>


            <div className="col-xs-10 col-md-6 col-lg-4 shadow p-3 mb-5 bg-white rounded-3 mx-auto">

                <h3 id="head" className='text-center text-info my-5'>Login</h3>


                <form onSubmit={handleSubmit}>
                    
                    <div className="col-md-10 mx-auto my-4">
                        <input className="form-control px-3 py-2" type="text" name="username"
                            value={
                                credentials.username
                            }
                            onChange={onChange}
                            placeholder="Full Name"
                            required/>
                        <p id="usernamemsg" className='m-1 text-danger'></p>
                    </div>

                    <div className="col-md-10 mx-auto my-4">
                        <input className="form-control px-3 py-2" type="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" required/>
                        <p id="passwordmsg" className='m-1 text-danger'></p>
                    </div>

                    
                    <div className="col-md-10 mx-auto my-4 text-center">
                        <p id="forgotpasswordmsg" className='text-danger' ></p>
                        <p>New User? <Link to="/signup" style={{textDecoration:"none"}}>Create Account</Link> here.</p>
                    </div>

                    <div className="form-button my-4 text-center">
                        <button id="submit" type="submit" className="btn btn-primary px-5">Login</button>
                    </div>
                </form>


            </div>
        </div>


    </>)
}
