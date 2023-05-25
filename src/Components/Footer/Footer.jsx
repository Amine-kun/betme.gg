import React from 'react';
import './Footer.scss';
import logo from '../../Assets/logo/fullLogo.png';
import {useNavigate} from 'react-router-dom';

const Footer = () => {
	const navigate = useNavigate();

	const up =()=>{
		window.scrollTo(0,0);
	}

	return (
		<footer className="footer app-flex">
				<div className="footer__main app-flex">
					<img src={logo} className="logo" alt="logo"/>
					<div className="tabs">
						<h5 className="pointer" onClick={()=>navigate('/')}>News</h5>
						<h5 className="pointer" onClick={()=>navigate('/')}>Tournements</h5>
						<h5 className="pointer" onClick={()=>navigate('/UserAuth/Signup')}>Signup</h5>
						<h5 className="pointer" onClick={()=>navigate('/UserAuth/Login')}>Signin</h5>
					</div>
					<div className="contact-footer">
						<h5 className="pointer">contact@squidstacks.com</h5>
						<h5 className="pointer">0666666666</h5>
						<h5 className="pointer">Facebook</h5>
						<h5 className="pointer">Discord</h5>
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
					<p>© 2023 SquidStacks</p>
				</div>
		</footer>
	)
}

export default Footer;