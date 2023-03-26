import React,{useState, useEffect, useContext} from 'react';
import './SecuritySettings.scss';
import {Link} from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import AuthContext from "../../context/AuthContext";

import Cinput from "../../Components/Input/Input";

const SecuritySettings = () => {

	const [newPass, setSetPass] = useState('');
	const [rePass, setRePass] = useState('');
	const [oldPass, setOldPass] = useState('');

	const api = useAxios();
	const { logoutUser } = useContext(AuthContext);

	useEffect(() => {
		console.log('ss')
	}, [])

	const changePassword =()=>{
		api.put('/api/update_info/',{
			oldPassword:oldPass,
			newPassword:newPass,
			rePassword:rePass
		})
		.then(res=>{
			logoutUser()
		})
		.catch(err=>console.log(err))
	}

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

				<Cinput placeholder={"Your Old password"} setHandler={setOldPass} handler={oldPass} type="password"/>
				<Cinput placeholder={"New Password"} setHandler={setSetPass} handler={newPass} type="password"/>
				<Cinput placeholder={"Re-enter Your New Password"} setHandler={setRePass} handler={rePass} type="password"/>

				<label htmlFor="isSignout" className="app-flex checkbox" style={{justifyContent:'flex-start', width:'100%'}}>
					<input type="checkbox" name="isSingout" id="isSignout" className="check-icon"/>
					<span>Do you want to Signout ? </span>
				</label>

			</div>
			<div className="apply app-flex">
				<Link to='/'>
					<button className="sub-btn">
						cancel
					</button>
				</Link>
					<button className="main-btn" onClick={()=>changePassword()}>
						Apply
					</button>
			</div>
		</div>
	)
}

export default SecuritySettings