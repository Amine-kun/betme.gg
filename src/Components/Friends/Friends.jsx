import React from 'react';
import './Friends.scss';
import {useNavigate} from 'react-router-dom';
import {MdOutlineClose} from 'react-icons/md';
import {RiMessage3Fill} from 'react-icons/ri';
import {BiSend} from 'react-icons/bi';

const Friends = ({ws, setShowFriends ,friends ,inviteFriend}) => {
	const navigate = useNavigate()
	return (
						<div className="friends_list app-flex-wrap">
								<div className="friends-header app-flex">
									<MdOutlineClose className="pointer" onClick={()=>setShowFriends(false)}/>
								</div>
								<div className="container app-flex-wrap">
									{friends?.length < 1
										? <p>You have no friends for the moment.</p>
										:friends?.map((friend, i)=>(
											<div className={`friend pointer app-flex ${(i===0 || i%2 === 0) && 'bg-grey'}`} key={i} onClick={()=>navigate(`/Profile/${friend.id}`)}>
												<img src={friend.profile_picture} alt="friend-img" className="friend-img"/>
												<span className={`status ${!friend && 'status-off'}`}></span>
												<h4>{friend.username}</h4>

												<span className="friend-icons app-flex">
													<RiMessage3Fill className="pointer" onClick={(e)=>{e.stopPropagation();navigate(`/Messanger/`)}}/>
													{ws !== null && <button className="sub-btn invite app-flex" onClick={(e)=>{e.stopPropagation();inviteFriend(friend.id)}}>
																		<BiSend/> 
																		<h5 className="pointer">
																			Invite
																		</h5>
																	</button>}
												</span>
											</div>
									))}
								</div>
							</div>
	)
}

export default Friends