import React, {useState} from 'react';
import './Chat.scss';
import Conversations from './Conversations/Conversations'
import SingleConvo from './SingleConvo/SingleConvo'
import ContactorAbout from './ContactorAbout/ContactorAbout'

const Chat = () => {

	const [showAbout, setShowAbout] = useState(false);

	return (
		<div className="chat app-flex">
			
			<Conversations/>
			<SingleConvo setShowAbout={setShowAbout}/>

			{showAbout && <ContactorAbout setShowAbout={setShowAbout}/>}

		</div>
	)
}

export default Chat;