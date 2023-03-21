import React, {useState, useEffect} from 'react';
import './ProfileSettings.scss';
import {Link} from 'react-router-dom';

import {files} from '../../Assets';
import picture from '../../Assets/profile.jpg';
import Cinput from "../../Components/Input/Input";

import {BiCamera} from 'react-icons/bi';
import {FiEdit} from 'react-icons/fi';

import useAxios from '../../utils/useAxios'; 

const mockValues = ['Aminedesu', 'Disgusting kayn one trick', 'Aminehlab@gmail.com', '0668059743'];

const ProfileSettings = () => {

	const [username, setUsername] = useState(mockValues[0]);
	const [bio, setBio] = useState(mockValues[1]);
	const [email, setEmail] = useState(mockValues[2]);
	const [num, setNum] = useState(mockValues[3]);

	const api = useAxios();

	const verifyEmail = () =>{
		api.post('api/send_verification/',{
			targetEmail: email,
		}).then(res=>{
			console.log(res)
		})
		 .catch(err=>console.log(err))
	}

	useEffect(() => {
		api.get('api/user/').then(res=>{
			let data = res.data.userData;

			setUsername(data.username);
			setBio(data.bio);
			setEmail(data.email);
			setNum(data.phone);
			
		}).catch(err=>console.log(err))
	}, [])

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
				<span className="app-flex" style={{gap:'10px', width:'100%', height:'auto'}}>
					<Cinput placeholder={"Email Adresse"} handler={email} setHandler={setEmail} type="email" input="email"/>
					<button className="main-btn" style={{padding:'0.94rem 1.8rem'}} onClick={()=>verifyEmail()}>Verify</button>
				</span>
				<span className="app-flex" style={{gap:'10px', width:'100%', height:'auto'}}>
					<Cinput placeholder={"Phone Number"} handler={num} setHandler={setNum} type="number" input="phone"/>
					<button className="main-btn" style={{padding:'0.94rem 1.8rem'}}>Verify</button>
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
		</section>
	)
}

export default ProfileSettings;