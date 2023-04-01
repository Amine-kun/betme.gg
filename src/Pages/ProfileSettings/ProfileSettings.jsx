import React, {useState, useEffect} from 'react';
import './ProfileSettings.scss';
import {Link, useNavigate} from 'react-router-dom';

import {files} from '../../Assets';
import picture from '../../Assets/profile.jpg';
import Cinput from "../../Components/Input/Input";
import MessagePanel from '../../Components/MessagePanel/Message';

import {BiCamera} from 'react-icons/bi';
import {FiEdit} from 'react-icons/fi';

import useAxios from '../../utils/useAxios'; 

const mockValues = ['username', 'bio', 'email', '00000000000'];

const ProfileSettings = () => {

	const [username, setUsername] = useState(mockValues[0]);
	const [bio, setBio] = useState(mockValues[1]);
	const [email, setEmail] = useState(mockValues[2]);
	const [num, setNum] = useState(mockValues[3]);
	const [profilepic, setProfilepic] = useState(picture);

	const [image, setImage] = useState(null);

	const [isV, setIsV] = useState(false);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState({show:false ,status:false, message:null})

	const api = useAxios();
	const navigate = useNavigate();

	const verifyEmail = () =>{
		api.post('api/send_verification/',{
			targetEmail: email,
		}).then(res=>{
			setLoading(true)
			setMessage({show:true, status:true, message:'Sending email...'})
			if(res.data.status === 'EMAIL_SENT'){
				setMessage({show:true, status:true, message:'A verification link has been sent to your email'})
				setTimeout(()=>{setLoading(false)}, 1000)
				setTimeout(()=>{setMessage({...message, show:false})},3000)
			} else {
				setMessage({show:true,status:false, message:'There has been an issue, please try again later!'})
				setTimeout(()=>{setLoading(false)}, 1000)
				setTimeout(()=>{setMessage({...message, show:false})},3000)
			}
		})
		 .catch(err=>console.log(err))
	}

	const updateInfo = () =>{
		api.put('api/user/',{
			username: username.toLowerCase(),
			bio:bio,
			email:email,
			number:num
		})
		.then((res)=>{
			let data = res.data.userData;

			setUsername(data.username);
			setBio(data.bio);
			setEmail(data.email);
			setNum(data.phone);
			setIsV(data.isVerified);
			setProfilepic(data.profile_picture)
			
			localStorage.setItem("userinfo", JSON.stringify(data));
			navigate('/')
		})
		.catch(err=>console.log(err))
	}

	const updateImage = async()=>{
		api.post('/api/upload_photo/',{
			image: image
		},{
			headers:{
				"Content-Type":"multipart/form-data"
			}
		}).then(res=>{
			updateInfo();
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
			setIsV(data.isVerified);
			setProfilepic(data.profile_picture)
			
			localStorage.setItem("userinfo", JSON.stringify(data));

		}).catch(err=>console.log(err))
	}, [])

	return (
		<section className="main-setting">
			<MessagePanel status={message.show} message={message.message} loading={loading}/>
			<div className="first">	
				<img src={files.raven} alt="setting-walp" className="settings-walp"/>
				<span className="upload-walp">
						<FiEdit className="edit-icon"/>
						<input type="file" placeholder="upload" className="uploader"/>
					</span>
				<div className="user-img-div"> 
					<img src={profilepic} alt="user-prev-img" className="user-img"/>
					
					<span className="upload">
						<BiCamera className="camera-icon"/>
						<input type="file" placeholder="upload" className="uploader" onChange={(e)=>{setImage(e.target.files[0]); setProfilepic(URL.createObjectURL(e.target.files[0]))}}/>
					</span>
				</div>
			</div>
			<div className="inputs app-flex">
				<Cinput placeholder={"Username"} handler={username} setHandler={setUsername} type="text" input="username"/>
				<Cinput placeholder={"Bio"} handler={bio} setHandler={setBio} type="text" input="bio"/>
				<Cinput placeholder={"Phone Number"} handler={num} setHandler={setNum} type="number" input="phone"/>
				<span className="app-flex" style={{gap:'10px', width:'100%', height:'auto'}}>
					<Cinput placeholder={"Email Adresse"} handler={email} setHandler={setEmail} type="email" input="email"/>
					{isV && <button className='main-btn' style={{padding:'0.94rem 1.8rem'}} >Verified</button>}
					{!isV && <button className='attention-btn' style={{padding:'0.94rem 1.8rem'}} onClick={()=>verifyEmail()}>Verify</button>}
				</span>
				
				
			</div>
			<div className="apply app-flex">
				<Link to='/'>
					<button className="sub-btn">
						cancel
					</button>
				</Link>
				<button className="main-btn" onClick={()=>{updateImage()}}>
						Apply
				</button>
			</div>
		</section>
	)
}

export default ProfileSettings;