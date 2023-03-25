import React, {useState, useEffect} from 'react';
import './Verification.scss';
import Loading from '../../Components/Loading/Loading';
import useAxios from '../../utils/useAxios';
import {useLocation, useNavigate} from 'react-router-dom';

import emailPic from '../../Assets/icons/email.png'

const Verification = () => {
	const [status, setStatus] = useState('WIP');
	const location = useLocation();
	const navigate = useNavigate();
	const api = useAxios();

	const userData = localStorage.getItem("userinfo")
		                      ? JSON.parse(localStorage.getItem("userinfo"))
		                      : null 
	useEffect(() => {
		let path = location.pathname.split('/')[2];
		if(path.length === 32){
			api.put('api/send_verification/',{
				token:path
			})
			.then(res=>{
				if(res.data.status === 'EMAIL_VERIFIED'){
					setStatus('SUCCESS');
					setTimeout(()=>{navigate('/Settings/')},2000)
				}

			})
			.catch(err=>{
				console.log(err)
				setStatus('ERR')
				setTimeout(()=>{navigate('/')},2000)
			})
		}else {
			navigate('/Settings/')
		}
	}, [])

	return (
		<section className="ver_container app-flex-wrap">
			<img src={emailPic} alt="emailing" className="email-pic"/>
			<div className="app-flex-wrap mid">
				<h2>Verifying you email address</h2>
				<p>
					Hi <b className="highlight">{userData.username.charAt(0).toUpperCase() + userData.username.slice(1)}</b>
					! Thanks for using SquidStacks! We're happy you're here. Let's verify you email address.
				</p>
				<p>Please hold tight while we are verifying you email.</p>

				{status === 'WIP' && <Loading/>}
				{status === 'SUCCESS' && <h5 className="done msg_panel">Your email has been Verified.</h5>}
				{status === 'ERR' && <h5 className="failed msg_panel">There has been an error while verifying your email, please refresh the page and contact our support if the problem remains.</h5>}

			</div>
			<span className="splitter"></span>
			<div>
				<h5>All Rights Reserved to <b className="highlight">SquidStacks.</b></h5>
			</div>
		</section>
	)
}

export default Verification;