import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './Main.scss';

import Profile from '../../Pages/Profile/Profile';
import Home from '../../Pages/Home/Home';
import Lives from '../../Pages/Lives/Lives';
import Challenge from '../../Pages/Challenge/Challenge';
import Tournements from '../../Pages/Tournements/Tournements';

import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

const Main = () => {
	return (
		<div className="main_page app-flex">
					<Sidebar/>
					<div className="Queue">
						<Navbar/>
						<Routes>
							<Route path="/" element={<Home/>}/>
							<Route path="/Profile/*" element={<Profile/>}/>
							<Route path="/Lives" element={<Lives/>}/>
							<Route path="/Challenge" element={<Challenge/>}/>
							<Route path="/Tournements" element={<Tournements/>}/>
						</Routes>
					</div>
		</div>
	)
}

export default Main;