import React from 'react';
import './Login.scss';
import {Link} from 'react-router-dom';

const Login = () => {
	return (
		<div className="sign__main app-flex-wrap">
			<div>
				<p className="head-bold-text">Welcome back!</p>
				<p className="sub-text" style={{marginTop:'-12px'}}>Signin to <span className="highlight pointer">1V1Arena</span></p>
			</div>
			<div className="app-flex-wrap inputs">
				<input type="text" placeholder="Email" className="input"/>
				<input type="password" placeholder="Password" className="input"/>
				<p className="sub-text" style={{marginTop:'5px'}}>You have any issue signing in ? 
				<span className="p-text pointer"> Contact us</span></p>

			</div>
			<div className="btns">
				<Link to="/UserAuth/Signup">
					<button className="sub-btn">Signup</button>
				</Link>
					<span className="bar"></span>
				<button className="main-btn">Signin</button>
			</div>
		</div>
	)
}

export default Login;