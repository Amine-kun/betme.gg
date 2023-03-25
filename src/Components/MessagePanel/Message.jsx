import React, {useState, useEffect} from 'react';
import './Message.css';
import Loading from '../Loading/Loading';
import {BsCheck} from 'react-icons/bs';
const Message = ({status, message, loading}) => {

	return (
		<section className={`message-main app-flex ${status && 'showPannel'}`}>
			{loading && <Loading/>}
			{!loading &&
				<>
					<BsCheck style={{fontSize:'2.5rem', color:'white'}}/>
					<h5 style={{marginLeft:'-15px'}}>{message}</h5>
				</>
			}	
		</section>
	)
}

export default Message