import React from 'react';
import './Footer.scss';
import logo from '../../Assets/logo/fullLogo.png';

const Footer = () => {

	const up =()=>{
		window.scrollTo(0,0);
	}

	return (
		<div className="footer app-flex">
				<div className="footer__main app-flex">
					<img src={logo} className="logo" alt="logo"/>
					<div className="tabs">
						<h5>News</h5>
						<h5>Tournements</h5>
						<h5>Signup</h5>
						<h5>Signin</h5>
					</div>
					<div className="contact">
						<h5>Email</h5>
						<h5>Number</h5>
						<h5>Sociale media 1</h5>
						<h5>Sociale media 2</h5>
					</div>
				</div>
				<button onClick={()=>up()} className="arrow">
					        <svg
					          xmlns="http://www.w3.org/2000/svg"
					          width="24"
					          height="24"
					          viewBox="0 0 24 24">
						          <path fill="none" d="M0 0h24v24H0V0z" />
						          <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
					        </svg>
				 </button>
				<div className="copyright">
					<p>All rights reserved 2022</p>
				</div>
		</div>
	)
}

export default Footer;