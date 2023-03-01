import React, {useState, useEffect} from 'react';
import './Sidebar.scss';
import {files} from '../../Assets';
import {useNavigate, useLocation } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

import logo from '../../Assets/logo/fullLogo.png';
import smallLogo from '../../Assets/logo/logo.png';
import {AiFillHome, AiFillStar} from 'react-icons/ai';
import {IoPerson} from 'react-icons/io5';
import {HiFlag} from 'react-icons/hi';
import {CgMediaLive} from 'react-icons/cg';
import {IoGrid} from 'react-icons/io5';
import {MdArrowDropDown} from 'react-icons/md';
import {RiMessage3Fill} from 'react-icons/ri';

const tabs = [{icon:AiFillHome, name:'Home'},
			  {icon:IoPerson, name:'Profile'},
			  {icon:RiMessage3Fill, name:'Messanger'},
			  {icon:HiFlag, name:'Challenge'},
			  {icon:AiFillStar, name:'Tournements'},
			  {icon:CgMediaLive, name:'Lives'},
			  {icon:IoGrid, name:'Games'}];

const games = [{icon:files.Csgo, game:'CS:GO'},
							 {icon:files.League, game:'League of Legends'},
							 {icon:files.Apex, game:'Apex Legends'},
							 {icon:files.Rainbow, game:'Rainbow Six Siege'},
							 {icon:files.fortnite, game:'Fortnite'}];

const getWindowSize = () => {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

const Sidebar = ({startListening, userData}) => {
	const location = useLocation();
	const navigate = useNavigate(); 
	const [windowSize, setWindowSize] = useState(getWindowSize());

	const [activeTab, setActiveTab] = useState('Home');
	const [isCateOpen, setIsCateOpen] = useState(false);
	const [activeGame, setActiveGame] = useState('');
	const [shrink, setShrink] = useState(false);

	const checkPartStatus=(path)=>{
		const PartyStatus = localStorage.getItem("partystatus")
        ? JSON.parse(localStorage.getItem("partystatus"))
        : null;
        
			if(PartyStatus === null){
					let id = uuidv4();
					localStorage.setItem("partystatus", JSON.stringify({status:'creator',team:'A', id:id}));
					startListening();
					navigate(`/${path}/${id}`);
			}

			if(PartyStatus?.status === 'creator'){
				navigate(`/${path}/${PartyStatus.id}`);
			}

			if(PartyStatus?.status === 'invited'){
				navigate(`/${path}/${PartyStatus.id}`);
			}
	}

	const onTabClick = (tab) =>{
		if(tab.name === 'Games'){
			setIsCateOpen(!isCateOpen);
			setActiveTab(tab.name);
		}
		else if(tab.name === 'Profile'){
			navigate(`/Profile/${userData.main_id}`)
		}
		else if(tab.name === 'Home'){
			navigate('/');
			setActiveTab(tab.name);
			setIsCateOpen(false);

		} else if(tab.name === 'Challenge'){
				checkPartStatus(tab.name)
		} else {
			navigate(`/${tab.name}`);
			 setActiveTab(tab.name);
			 setIsCateOpen(false);
		}
		 
	}

	useEffect(() => {
		const handleWindowResize = () =>{
			setWindowSize(getWindowSize());
		}
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);


	useEffect(() => {
		if(windowSize.innerWidth < 1160){
			setShrink(true);
		} else {
			setShrink(false);
		}
	}, [windowSize]);

	useEffect(() => {
			if(location.pathname.split('/')[1] === 'Profile'){
				if(parseInt(location.pathname.split('/')[2]) === parseInt(userData.main_id)){
					setActiveTab(location.pathname.split('/')[1])
				}
				else{
					setActiveTab('')
				}
			}
			else if(location.pathname.split('/')[1] !== ''){
				setActiveTab(location.pathname.split('/')[1]);
			} else {
				setActiveTab('Home');
			}

			if(location.pathname.split('/')[1] === 'Games'){
				setActiveGame(location.pathname.split('/')[2]);
				setIsCateOpen(true);
			} else {
				setIsCateOpen(false);
			}
	}, [location.pathname])

	return (
		<section className={shrink ? "Sidebar_main Sidebar_shrink" : "Sidebar_main"}>
			<div className="Sidebar_container app-flex-wrap">
				
				<img src={logo} className={shrink ? "logo pointer remove" : "logo pointer"} alt="logo" /> 
				<img src={smallLogo} className={shrink ? "smallLogo pointer" : "logo pointer remove"} alt="logo" />

				<div className="tabs app-flex-wrap">
						
					{tabs.map((tab, i)=>(
						<div className={`tab app-flex ${activeTab === tab.name && 'active'} ${shrink && 'shrinkTab'}`} onClick={()=> onTabClick(tab)} key={i}>
							
							<tab.icon className="icon"/>
							<p className={shrink ? "p-text remove" : "p-text"}>{tab.name}</p>
							{tab.name === 'Games' && !shrink && <MdArrowDropDown className={isCateOpen ? 'drop-arrow rotate' : 'drop-arrow'}/>}
						
						</div>
						))}	

						<div className={isCateOpen ? "games show-games" : "games"}>

									{!shrink 
										? games.map((game, i)=>(
											<div className={activeGame === game.game ? 'game tab active' :  'game tab'} key={i} onClick={()=>{setActiveGame(`${game.game}`); navigate(`/Games/${game.game}`)}}>
												<p className="sub-text">{game.game}</p>
											</div>
											))
										: games.map((game, i)=>(
											<div className={activeGame === game.game ? 'game-shrinked tab active' :  'game-shrinked tab'} key={i} onClick={()=>{setActiveGame(`${game.game}`); navigate(`/Games/${game.game}`)}}>
												<img src={game.icon} alt="game-icon" className="game-icon"/>											
											</div>
											))

											}

						</div>
				</div>
			</div>
		</section>
	)
}

export default Sidebar;