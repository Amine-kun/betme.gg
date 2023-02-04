import React,{useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import './Main.scss';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import useAxios from '../../utils/useAxios';

import Profile from '../../Pages/Profile/Profile';
import Home from '../../Pages/Home/Home';
import Lives from '../../Pages/Lives/Lives';
import Challenge from '../../Pages/Challenge/Challenge';
import Tournements from '../../Pages/Tournements/Tournements';
import Chat from '../../Pages/Chat/Chat';
import GameOptions from '../../Pages/GameOptions/GameOptions';

import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import Friends from '../../Components/Friends/Friends';
import Search from '../../Components/Search/Search';


const Main = () => {

	const [search, setSearch ] = useState(false);
	const [showFriends, setShowFriends] = useState({status:false,team:'A'});
	const [friends, setFriends] = useState([]);
	const [isOn, setIsOn] = useState(false);
	const [lobbyPlayers, setLobbyPlayers] = useState([]);
	const [ws, setWs] = useState(null);
	const api = useAxios();

    const userData = localStorage.getItem("userinfo")
		                      ? JSON.parse(localStorage.getItem("userinfo"))
		                      : null 


	const getParty =()=>{
		const PartyStatus = localStorage.getItem("partystatus")
        ? JSON.parse(localStorage.getItem("partystatus"))
        : null;
        return PartyStatus;
	}
	
	const startListening = () =>{
		setIsOn(!isOn);
	}

	const inviteFriend = (friendID)=>{
		let party = getParty();
 		if (party !== null){
 			api.post('/api/send_notification/',{

 			receiver_id:friendID,
 			verb: party.id,
 			message:`${userData.username} Wants to play ${showFriends.team === 'A' ? 'with' : 'against'} you!`

 		}).then((res)=>console.log(res.data)).catch((err)=>console.log('cannot sent invite to you friend'))
 		}
 	}

	useEffect(() => {
		let party = getParty();
	 	if (party !== null){
	 		var gameSocket = new W3CWebSocket(`wss://www.api-arcadia.me/ws/create-game/${party.id}/`);
	 		setWs(gameSocket);
	 		gameSocket.onopen = (event) =>{
					 gameSocket.send(JSON.stringify({"verb":"open", "user":userData,"status":party.status, "team":party.team}))
				}

			gameSocket.onmessage = (event) =>{
					let data = JSON.parse(event.data)
					 setLobbyPlayers(data.players.players)
				}

			gameSocket.onerror = (event) =>{
					console.log('socket error')
				}
			gameSocket.onclose =(event) =>{
				setWs(null);
				setLobbyPlayers([]);
			}
	 	}
	 }, [isOn])

	useEffect(()=>{
		api.get(`/api/friends/`)
			.then((res)=>setFriends(res.data.data))
			.catch((err)=>console.log('cannot get friends'))
	},[showFriends])


	return (
		<main className="main_page app-flex">
					<Sidebar  startListening={startListening} userData={userData}/>					
					{showFriends.status && <Friends ws={ws} setShowFriends={setShowFriends} friends={friends} inviteFriend={inviteFriend}/>}
					<Search search={search} setSearch={setSearch} userData={userData}/>

					<section className="Queue">
						<Navbar setSearch={setSearch} friends={friends} showFriends={showFriends} setShowFriends={setShowFriends} startListening={startListening} getParty={getParty}/>
						<Routes>
							<Route path="/" element={<Home/>}/>
							<Route path="/Profile/*" element={<Profile userData={userData} friends={friends} />}/>
							<Route path="/Lives" element={<Lives/>}/>
							<Route path="/Challenge/*" element={<Challenge setShowFriends={setShowFriends} userData={userData} getParty={getParty} lobbyPlayers={lobbyPlayers} ws={ws}/>}/>
							<Route path="/Tournements" element={<Tournements/>}/>
							<Route path="/Messanger" element={<><p>Coming soon...</p></>}/>
							<Route path="/Games/*" element={<GameOptions/>}/>
						</Routes>
					</section>
		</main>
	)
}

export default Main;