import React, {useState,useEffect} from 'react';
import './Landing.scss';
import '../../Assets/shapes.scss';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setGames} from '../../Redux/games';
import axios from 'axios';

import {files}  from '../../Assets';
import logo from "../../Assets/logo/fullLogo.png";

import {Carousel, TesteCarousel} from '../../Components/Carousel/Carousel';
import Footer from '../../Components/Footer/Footer';

import video from '../../Assets/adv/video.mp4'

const Landing = () => {
	const [supportedGames, setSupportedGames]= useState([]);

	const dispatch = useDispatch();

	useEffect(() => {

		axios.get('https://www.api-arcadia.me/api/on_games/')
			.then(res=>{
					const data=res.data
					setSupportedGames(data);
					dispatch(setGames({data}))
			})
			.catch(err=>console.log(err))
	}, [])

	return (
		<main className="main">
			<header className="landing-nav app-flex">
				<div className="navbar app-flex">
					<img src={logo} alt="logo" className="logo"/>
					<span className="app-flex bar-btns">
						<button className="sub-btn" onClick={()=>window.scrollTo(0, document.body.scrollHeight)}>Downloads</button>
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
			    <video src={video} className="landingbg" type="video/mp" autoPlay muted loop/>

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
				<Carousel supportedGames={supportedGames}/>
			</div>
			<div className="about">
				<p className="head-text">what is SquiStacks?</p>
				<div className="hor-bar"></div>
					<div className="info">
						<div className="detail">
							<div className="infopicsSection">
								<img src={files.raven} alt="raven" className="infopics"/>
							</div>
							<div className="infoDetails app-flex">
								<p className="lg-text">	SquidStacks is a competitive gaming platform where gamers can compete against 
								each others and get rewarded based on each one's skills.</p>
							</div>
						</div>
						<div className="detail detail2">
							<div className="infopicsSection2">
								<img src={files.yasuo} alt="raven" className="infopics"/>
							</div>
							<div className="infoDetails2 app-flex">
								<p className="lg-text">	SquidStacks makes it easy for anyone to challenge other players
									in a varity of supported games, thus gain trophies, rewards and more perks .</p>
							</div>
						</div>
					</div>
			</div>
			<div className="testemoniels app-flex-wrap">
				<img src={files.jhin} className="pannel2" alt="bg"/>
				<span className="blue2"></span>
					<div className="content app-flex-wrap">
						<div>
							<p className="head-text">What Customers say about us</p>
							<div className="hor-bar"></div>
						</div>
						<TesteCarousel/>
					</div>
			</div>
			<div id="Get-Started" className="pre-bottom app-flex">
				<h3 className="head-bold-text">
					Build up your online glory now with 
				</h3>
				<p className="head-bold-text" style={{color: 'var(--blue-color)'}}>SQUIDSTACKS</p>
				<Link to='/UserAuth/Signup'>
					<button className="main-btn dynamic-btn" style={{background:'var(--white-color)', color:'var(--primary-color)',marginTop:'20px', padding:'1rem 4rem'}}>Get Started</button>
				</Link>
				<div className="app-flex">
						{/*<button className="sub-btn download-btn " style={{marginTop:'15px'}}>Download Desktop App</button>*/}
						<a className="sub-btn download-btn " style={{marginTop:'15px', padding:'12px 15px'}} href="https://download1654.mediafire.com/rz02w5erk5fgT295mEIm1SmcG3RRA2R9WYugeCYqJslEEv9h620TV6Ob2LRNtKpW5HmUIlukWf8-D3KH1D3f_ctHhZjBSakPvp_ydNnbS_xaAvLx4F3BfvMkWUMGlwiKsP2qLjqe234HCL49wRtt1br9rK-X6B1yko5rucyaQYYhbw/zj4kx2zwvghn9do/SquidJudge+Setup+1.0.0.exe" download>Download Squid</a>
				</div>
			</div>

			<Footer/>
		</main>
	)
}

export default Landing;