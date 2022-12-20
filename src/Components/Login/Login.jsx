import React, {useState, useContext} from 'react';
import './Login.scss';
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from "../../context/AuthContext";

const Login = () => {

	const navigate = useNavigate();
	const { loginUser } = useContext(AuthContext);
	const [userCreds, setUserCreds] = useState({username:null, password:null});
	const [status, setStatus] = useState({status:null, message:null});

	const handleLogin = async () =>{
		if(userCreds.username && userCreds.password){

			const  logining = await loginUser(userCreds);
			
			if(logining){
				navigate('/')
			} else {
				setStatus({status:'error', message:'Username or/and Password are wrong.'});
				setTimeout(()=>{setStatus({status:null, message:null})}, 1500)
				}
			} else {
					setStatus({status:'error', message:'You must fill all the options'});
					setTimeout(()=>{setStatus({status:null, message:null})}, 1500)
			}
	}

	return (
		<div className="sign__main app-flex-wrap">
			<div>
				<p className="head-bold-text">Welcome back!</p>
				<p className="sub-text" style={{marginTop:'-12px'}}>Signin to <span className="highlight pointer">1V1Arena</span></p>
			</div>
			<div className="app-flex-wrap inputs">

				{status.status === 'error' && <h5 style={{color:'red', fontWeight:'bold'}}>{status.message}</h5>}

				<input type="text" placeholder="Username" className="input" onChange={(e)=>setUserCreds({...userCreds, username:e.target.value})}/>
				<input type="password" placeholder="Password" className="input" onChange={(e)=>setUserCreds({...userCreds, password:e.target.value})}/>
				<p className="sub-text" style={{marginTop:'5px'}}>You have any issue signing in ? 
				<span className="p-text pointer"> Contact us</span></p>

			</div>
			<div className="btns">
				<Link to="/UserAuth/Signup">
					<button className="sub-btn">Signup</button>
				</Link>
					<span className="bar"></span>
				<button className="main-btn" onClick={()=>handleLogin()}>Signin</button>
			</div>
		</div>
	)
}

export default Login;