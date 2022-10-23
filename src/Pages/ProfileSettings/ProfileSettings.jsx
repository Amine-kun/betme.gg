import React, {useState} from 'react';
import './ProfileSettings.scss';
import {Link} from 'react-router-dom';

import {files} from '../../Assets';
import picture from '../../Assets/profile.jpg';
import Cinput from "../../Components/Input/Input";

import {BiCamera} from 'react-icons/bi';
import {FiEdit} from 'react-icons/fi';

const mockValues = ['Aminedesu', 'Disgusting kayn one trick', 'Aminehlab@gmail.com', '0668059743'];

const ProfileSettings = () => {

	const [username, setUsername] = useState(mockValues[0]);
	const [bio, setBio] = useState(mockValues[1]);
	const [email, setEmail] = useState(mockValues[2]);
	const [num, setNum] = useState(mockValues[3]);

	return (
		<section className="main-setting">
			<div className="first">	
				<img src={files.raven} alt="setting-walp" className="settings-walp"/>
				<span className="upload-walp">
						<FiEdit className="edit-icon"/>
						<input type="file" placeholder="upload" className="uploader"/>
					</span>
				<div className="user-img-div"> 
					<img src={picture} alt="user-prev-img" className="user-img"/>
					
					<span className="upload">
						<BiCamera className="camera-icon"/>
						<input type="file" placeholder="upload" className="uploader"/>
					</span>
				</div>
			</div>
			<div className="inputs app-flex">
				<Cinput placeholder={"Username"} handler={username} setHandler={setUsername} type="text" input="username"/>
				<Cinput placeholder={"Bio"} handler={bio} setHandler={setBio} type="text" input="bio"/>
				<Cinput placeholder={"Email Adresse"} handler={email} setHandler={setEmail} type="email" input="email"/>
				<Cinput placeholder={"Phone Number"} handler={num} setHandler={setNum} type="number" input="phone"/>
				
				
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
		</section>
	)
}

export default ProfileSettings;