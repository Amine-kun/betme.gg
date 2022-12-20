import React, {useEffect} from 'react';
import './Landing.scss';
import '../../Assets/shapes.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {files}  from '../../Assets';
import logo from "../../Assets/logo/fullLogo.png";

import {Carousel, TesteCarousel} from '../../Components/Carousel/Carousel';
import Footer from '../../Components/Footer/Footer';

const Landing = () => {

	// useEffect(() => {
	// 	axios.get('http://localhost:8000/on_games/')
	// 	.then(data=>console.log(data))	
	// }, [])

	return (
		<main className="main">
			<header className="landing-nav app-flex">
				<div className="navbar app-flex">
					<img src={logo} alt="logo" className="logo"/>
					<span className="app-flex bar-btns">
						<Link to='/UserAuth/Login'>
							<button className="sub-btn">Signin</button>
						</Link>
						<Link to='/UserAuth/Signup'>
							<button className="main-btn">Signup</button>
						</Link>
					</span>
				</div>
			</header>
			<div className="pannel app-flex-wrap">
				<img src={files.jhin} className="landingbg" alt="bg"/>
				<span className="blur"></span>
					<div className="wrapper">
						<div className="landing-text app-flex-wrap">
							<p className="head-bold-text">A New Home For Competitive Gamers.</p>
							<p className="p-text">Challenge your friends and win real money.</p>
							<p className="p-text">Push your limits. Start playing NOW!</p>
							<Link to='/UserAuth/Signup'>
								<button className="main-btn dynamic-btn" style={{marginTop:'15px'}}>Get Started</button>
							</Link>
						</div>
					</div>
			</div>
			<div className="carousel">
				<p className="head-text">Featured Games</p>
				<div className="hor-bar"></div>
				<Carousel/>
			</div>
			<div className="about">
				<p className="head-text">what is 1v1Arena?</p>
				<div className="hor-bar"></div>
					<div className="info">
						<div className="detail">
							<div className="infopicsSection">
								<img src={files.raven} alt="raven" className="infopics"/>
							</div>
							<div className="infoDetails app-flex">
								<p className="lg-text">	1v1Arena makes it easy for anyone to bet on any esport team
									in a varity of supported games, thus again trophies, money and more perks .</p>
							</div>
						</div>
						<div className="detail detail2">
							<div className="infopicsSection2">
								<img src={files.yasuo} alt="raven" className="infopics"/>
							</div>
							<div className="infoDetails2 app-flex">
								<p className="lg-text">	1v1Arena makes it easy for anyone to bet on any esport team
									in a varity of supported games, thus again trophies, money and more perks .</p>
							</div>
						</div>
					</div>
			</div>
			<div className="testemoniels app-flex-wrap">
				<img src={files.streetfighter} alt="pannel2" className="pannel2"/>
				<span className="blue2"></span>
					<div className="content app-flex-wrap">
						<div>
							<p className="head-text">What Customers say about us</p>
							<div className="hor-bar"></div>
						</div>
						<TesteCarousel/>
					</div>
			</div>
			<div className="pre-bottom app-flex">
				<h3 className="head-bold-text">
					Build up your online glory now with 
				</h3>
				<p className="head-bold-text" style={{color: 'var(--blue-color)'}}>1V1ARENA</p>
				<Link to='/UserAuth/Signup'>
					<button className="main-btn dynamic-btn" style={{background:'var(--white-color)', color:'var(--primary-color)',marginTop:'20px', padding:'1rem 4rem'}}>Get Started</button>
				</Link>
			</div>

			<Footer/>
		</main>
	)
}

export default Landing;