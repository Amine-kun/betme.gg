import React,{useState, useContext, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import './Main.scss';
import {MdOutlineClose} from 'react-icons/md';
import {RiMessage3Fill} from 'react-icons/ri';
import {IoPerson} from 'react-icons/io5';
import AuthContext from "../../context/AuthContext";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Profile from '../../Pages/Profile/Profile';
import Home from '../../Pages/Home/Home';
import Lives from '../../Pages/Lives/Lives';
import Challenge from '../../Pages/Challenge/Challenge';
import Tournements from '../../Pages/Tournements/Tournements';
import Chat from '../../Pages/Chat/Chat';
import GameOptions from '../../Pages/GameOptions/GameOptions';

import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

import picture from '../../Assets/profile.jpg';


const friends = [{img: picture, status:true, name:'Aminedesu'},
				 {img: picture, status:false, name:'Anass'},
				 {img: picture, status:true, name:'ANWAR'},
				 {img: picture, status:false, name:'Saad'},
				 {img: picture, status:true, name:'Soukaina'},
				 {img: picture, status:false, name:'Aminedesu2'},
				 {img: picture, status:false, name:'Aminedesu3'},
				 {img: picture, status:true, name:'Aminedesu4'}]

const Main = () => {

	const [showFriends, setShowFriends] = useState(false);
	const { userData } = useContext(AuthContext);
	const client = new W3CWebSocket(`ws://localhost:8000/ws/notification/${userData.main_id}/`);

	client.onmessage = (event) =>{
				 console.log(event.data)
			}
	const click= ()=>{
		let receive = 22;
		const socket = new W3CWebSocket(`ws://localhost:8000/ws/notification/${receive}/`);
		socket.onopen =()=>{
				  		console.log("Connection with Django server Has been established");
				  		socket.send(JSON.stringify({"sender":userData.main_id, "receiver":receive ,"message":'ttestt xd'}))
				  	}
		socket.onmessage = (event) =>{
				 console.log('insocket', event.data)
			}
		
	}
	return (
		<main className="main_page app-flex">
					<Sidebar/>
					
					{showFriends && 
							<div className="friends_list app-flex-wrap">
								<div className="friends-header app-flex">
									<MdOutlineClose className="pointer" onClick={()=>setShowFriends(false)}/>
								</div>
								<div className="container app-flex-wrap">
									{friends.map((friend, i)=>(
										<div className={`friend app-flex ${(i===0 || i%2 === 0) && 'bg-grey'}`} key={i} onClick={()=>click()}>
											<img src={friend.img} alt="friend-img" className="friend-img"/>
											<span className={`status ${!friend.status && 'status-off'}`}></span>
											<h4>{friend.name}</h4>

											<span className="friend-icons app-flex">
												<RiMessage3Fill className="pointer"/>
												<IoPerson className="pointer"/>
											</span>
										</div>
									))}
								</div>
							</div>}

					<section className="Queue">
						<Navbar showFriends={showFriends} setShowFriends={setShowFriends}/>
						<Routes>
							<Route path="/" element={<Home/>}/>
							<Route path="/Profile/*" element={<Profile/>}/>
							<Route path="/Lives" element={<Lives/>}/>
							<Route path="/Challenge/*" element={<Challenge/>}/>
							<Route path="/Tournements" element={<Tournements/>}/>
							<Route path="/Messanger" element={<Chat/>}/>
							<Route path="/Games/*" element={<GameOptions/>}/>
						</Routes>
					</section>
		</main>
	)
}

export default Main;