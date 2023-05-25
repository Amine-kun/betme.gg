import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import './userAuth.scss';
import Login from "../../Components/Login/Login";
import Signup from "../../Components/Signup/Signup";

const userAuth = () => {
	return (
			<main className="userauth">
				<div className="navbar">
					<Link to="/squidstacks">
						<button className="sub-btn">Back</button>
					</Link>
				</div>
				<Routes>
					<Route path="/Login" element={<Login/>}/>
					<Route path="/Signup" element={<Signup/>}/>
				</Routes>
			</main>
	)
}

export default userAuth;