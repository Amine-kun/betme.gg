import React, {useState} from 'react';
import './Message.scss';

const MessageOwner = ({data, isOwner, image}) => {

	const [hover, setHover] = useState(false)

	return (
		<div className={`message-div app-flex ${isOwner && 'owner'} ${image && 'pushTop'}`} 
			 onMouseEnter={()=>setHover(true)}
			 onMouseLeave={()=>setHover(false)}>

						{image && <img src={data.sender.picture} alt="message-pic" className="message-pic pointer"/>}
						<span className="app-flex-wrap wrapper">
							{image && <p className="message m-right">{data.message}</p>}
							{!image && <p className={isOwner ? 'dublicated-sender' : 'dublicated-sender-other'}>{data.message}</p>}
							<h6 className={`timeStamp right ${hover && 'showTime'}`}>{data.timeStamp} pm</h6>
						</span>
		
		</div>
	)
}


export default MessageOwner;