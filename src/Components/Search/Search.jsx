import React,{useState} from 'react'
import './Search.scss';
import {useNavigate} from 'react-router-dom';

import {MdOutlineClose} from 'react-icons/md';
import Loading from '../Loading/Loading';
import useAxios from '../../utils/useAxios';

import {MdPersonAddAlt1} from 'react-icons/md';

const Search = ({search, setSearch, userData}) => {

	const api = useAxios();
	const navigate = useNavigate();

	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false)

	const handleSearch = (term) =>{
		if(term.length > 2){
			setLoading(true)
			api.get(`/api/search?q=${term}`)
			.then(res=>{
				setResult(res.data.data);
				setLoading(false);
			})
			.catch(err=>console.log(err))
		} else{
			setResult([])
		}
		
	}

 	const addFriend = (friendID)=>{
 		api.post('/api/send_notification/',{
 			receiver_id:friendID,
 			verb:'FriendRequest',
 			message:`${userData.username} has sent you a friend Request.`
 		}).then(res=>console.log(res.data)).catch(err=>console.log('cannot send a friend request.'))
 	}

	return (
		<div className={`search-main app-flex-wrap ${search && 'show-search'}`}>
			<div className="app-flex-wrap search_container">
				<MdOutlineClose className="pointer close-icon" onClick={()=>setSearch(false)}/>
				<input placeholder="Search..." className="search" type="text" onChange={(e)=>handleSearch(e.target.value)}/>
			</div>
			<div className="result_container app-flex-wrap">
				{loading && <Loading/>}
				{!loading && result.length === 0 && 
									  <div className="result">
										<p style={{opacity:'0.7'}}>Your search results ...</p>
									  </div>}
				{!loading && result.length > 0 && 
						result.map((oneResult, i)=>(
							<div className="result app-flex pointer" onClick={()=>{setSearch(false); navigate(`/Profile/${oneResult.main_id}`)}}>
								<img className="picture" alt='user-p' src={oneResult.profile_picture}/>
								<h4>{oneResult.username.charAt(0).toUpperCase() + oneResult.username.slice(1)}</h4>
								<div className="icon-side">
									<MdPersonAddAlt1 className="add-icon" onClick={(e)=>{e.stopPropagation(); addFriend(oneResult.main_id)}}/>
								</div>
							</div>
							))
						}
			</div>
		</div>
	)
}

export default Search