import React,{useState} from 'react';
import './SecuritySettings.scss';
import {Link} from 'react-router-dom';

import Cinput from "../../Components/Input/Input";

const SecuritySettings = () => {

	const [newPass, setSetPass] = useState('');
	const [rePass, setRePass] = useState('');
	const [oldPass, setOldPass] = useState('');

	return (
		<div className="app-flex-wrap security-main">
			<div className="instructs">
				<h3 className="icon">Change Password</h3>	
				<p style={{margin:'8px 0 '}}>
					In order to <span className="highlight">protect your account</span>, make sure your password : 
				</p>
				<ul className="list">
					<li className="list-elem">Is longer than 7 characters.</li>
					<li className="list-elem">Does not match or contain your username, e.g do not use 'username12'.</li>
					<li className="list-elem">Contains at least 10 characters</li>
					<li className="list-elem">Contains at least one special character, e.g '@..' and at least one number</li>
				</ul>
			</div>
			<div className="inputs app-flex-wrap">

				<Cinput placeholder={"New Password"} setHandler={setSetPass} handler={newPass} type="password"/>
				<Cinput placeholder={"Re-enter Your New Password"} setHandler={setRePass} handler={rePass} type="password"/>
				<Cinput placeholder={"Your Old password"} setHandler={setOldPass} handler={oldPass} type="password"/>

				<span className="app-flex" style={{gap:'5px', justifyContent:'flex-start', width:'50%'}}>
					<input type="checkbox" name="isSingout" id="isSignout"/>
					<label htmlFor="isSignout">Do you want to Signout ? </label>
				</span>

			</div>
			<div className="apply app-flex">
				<Link to='/'>
					<button className="sub-btn">
						cancel
					</button>
				</Link>
				<Link to='/Profile'>
					<button className="main-btn">
						Apply
					</button>
				</Link>
			</div>
		</div>
	)
}

export default SecuritySettings