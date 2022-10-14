import React from 'react';
import './SingleConvo.scss';
import {AiOutlineInfoCircle} from 'react-icons/ai';

import picture from '../../../Assets/profile.jpg';
import Message from '../../../Components/Message/Message';



const mockMessages = [{message:"Hello?", sender:{name:'amine', picture:picture}, timeStamp:'13:50'},
					  {message:"brother?", sender:{name:'amine', picture:picture}, timeStamp:'13:50'},
					  {message:"Heloooooo?", sender:{name:'amine', picture:picture}, timeStamp:'13:50'},
					  {message:"test?", sender:{name:'amine', picture:picture}, timeStamp:'13:50'},
					  {message:"Heey, whatsup?", sender:{name:'anass', picture:picture}, timeStamp:'13:52'},
					  {message:"Im, fine Thank you!", sender:{name:'amine', picture:picture}, timeStamp:'13:55'},
					  {message:"Greaat :D ! im glad.", sender:{name:'anass', picture:picture}, timeStamp:'13:58'},
					  {message:"You still there ????", sender:{name:'anass', picture:picture}, timeStamp:'13:58'},
					  {message:"Well, how is life?", sender:{name:'amine', picture:picture}, timeStamp:'13:59'},
					  {message:"Not so much, stressed, maybe?  xd", sender:{name:'anass', picture:picture}, timeStamp:'18:30'}]

const SignleConvo = ({setShowAbout}) => {
	return (
		<section className="singleConvo">
			<div className="convo_header app-flex">
				<div className="other-info app-flex">
					<img src={picture} alt='other' className="other"/>
						<span>
							<h4 className="other-name">Aminedesu</h4>
							<h6 style={{color:'var(--green-color)'}}>online</h6>
						</span>
				</div>
				<span className="settings" onClick={()=>setShowAbout(true)}>
					<AiOutlineInfoCircle/>
				</span>
			</div>
			
			<div className="messages">	
					
				{mockMessages.map((msg, i)=>(
					  <>
						{i > 0 && msg.timeStamp.split(':')[0] > mockMessages[i-1].timeStamp.split(':')[0]
												&& <h6 className="app-flex" style={{marginTop:'20px'}}>Tuesday, {msg.timeStamp} pm</h6> }

						{msg.sender.name === 'amine' 
												? <> {i !== 0 && msg.sender.name === mockMessages[i-1].sender.name 
														? <Message key={i} data={msg} isOwner={true} image={false}/> 
														: <Message key={i} data={msg} isOwner={true} image={true}/>}
						
												  </>
						
												: <>
													{i !== 0 && msg.sender.name === mockMessages[i-1].sender.name 
														? <Message key={i} data={msg} isOwner={false} image={false}/> 
														: <Message key={i} data={msg} isOwner={false} image={true}/>}
												  </>}

					  </>
					))}

			</div>
		</section>
	)
}

export default SignleConvo;