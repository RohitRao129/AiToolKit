import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'


export default function ChangePassword() {

    // create reusable transporter object using the default SMTP transport
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({email: "",OTP:"", password: "", confirmpassword: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/changepassword", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {email: credentials.email,otp:credentials.OTP,password:credentials.password,confirmpassword:credentials.confirmpassword}
            )
        })

        const jsonResponse = await response.json();

        console.log(jsonResponse);

        if (jsonResponse.success !== true) {
            if(jsonResponse.errors==="Incorrect OTP"){
                document.getElementById("otpmsg").innerHTML ="Incorrect OTP";
            }else{
                document.getElementById("otpmsg").innerHTML ="";
            }

            if(jsonResponse.errors[0].path==="password"){
                document.getElementById("passwordmsg").innerHTML = "password must be of length 8 to 24!";
            }
            else{
                document.getElementById("passwordmsg").innerHTML = "";
            }

            if(jsonResponse.errors[0].path==="confirmpassword"){
                document.getElementById("confirmpasswordmsg").innerHTML="Password don`t match!";
            }
            else{
                document.getElementById("confirmpasswordmsg").innerHTML="";
            }


        } else {
            document.getElementsByTagName('form')[0].innerHTML="";
            document.getElementById('head').innerHTML="Password changed";
            setTimeout(() => {
                navigate("/login");
            }, 750);
        }
    }

    const  sendOTP =async (e) =>{
        e.preventDefault();
       
        const response = await fetch("http://localhost:5000/sendotp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {email: credentials.email}
            )
        })

        const jsonResponse = await response.json();
        //console.log(jsonResponse);

        if(jsonResponse.success==true){
            document.getElementById("emailinput").disabled=true;
            document.getElementById("sendotpbutton").style.display="none";
            document.getElementById("otpinput").disabled =false;
            document.getElementById("emailmsg").innerHTML = "OTP sent!";
            document.getElementById("emailmsg").className ="m-1 text-success";
            //localStorage.setItem("OTP",jsonResponse.OTP);
        }
        else{
            
            if(jsonResponse.errors==="Email not registered"){
                document.getElementById("emailmsg").innerHTML = "Email not Registered";
            }
            else if(jsonResponse.errors[0].path==="email"){
                document.getElementById("emailmsg").innerHTML = "Enter Correct email";
            }
        }

    }

    const onChange = (event) => {
        setcredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });


    }


    return (<>
        <div className='d-flex align-items-center justify-content-center'
            style={
                {"height": "100vh", background:"#cececec2"}
        }>

            <div className="col-xs-10 col-md-6 col-lg-4  shadow p-3 mb-5 bg-white rounded-3 mx-auto">

                <h1 id="head" className='text-center text-info my-5'>Change password</h1>


                <form onSubmit={sendOTP}>

                    <div className="col-md-10 mx-auto my-4">
                        <input id="emailinput" className="form-control px-3 py-2" type="email" name="email"
                            value={
                                credentials.email
                            }
                            onChange={onChange}
                            placeholder="E-mail Address"
                            required/>
                        <p id="emailmsg" className='m-1 text-danger'></p>
                    </div>

                    <div id="sendotpbutton" className="form-button my-4 text-center">
                        <button type="submit" className="btn btn-primary px-5">Get Otp</button>
                    </div>
                </form>

                <form  onSubmit={handleSubmit}>

                    <div className="col-md-10 mx-auto my-4">
                        <input id="otpinput" className='form-control px-3 py-2' disabled={true} value ={credentials.OTP} type = "text" name ="OTP" onChange={onChange} placeholder="Enter OTP" required/>
                        <p id="otpmsg" className='m-1 text-danger'></p>
                    </div>

                    <div className="col-md-10 mx-auto my-4">
                        <input className="form-control px-3 py-2" type="password" name="password"
                            value={
                                credentials.password
                            }
                            onChange={onChange}
                            placeholder="Password"
                            required/>
                        <p id="passwordmsg" className='m-1 text-danger'></p>
                    </div>
                    <div className="col-md-10 mx-auto my-4">
                        <input className="form-control px-3 py-2" type="password" name="confirmpassword"
                            value={
                                credentials.confirmpassword
                            }
                            onChange={onChange}
                            placeholder="Confirm Password"
                            required/>
                        <p id="confirmpasswordmsg" className='m-1 text-danger'></p>
                    </div>

                    <div className="form-button my-4 text-center">
                        <button id="submit" type="submit" className="btn btn-primary px-5">Change Password</button>
                    </div>
                    </form>


            </div>
        </div>


    </>)
}
