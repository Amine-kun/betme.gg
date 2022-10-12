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
			<SingleConvo/>

			{showAbout && <ContactorAbout/>}

		</div>
	)
}

export default Chat;