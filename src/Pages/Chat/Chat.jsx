import React from 'react';
import './Chat.scss';
import Conversations from './Conversations/Conversations'
import SingleConvo from './SingleConvo/SingleConvo'
import ContactorAbout from './ContactorAbout/ContactorAbout'

const Chat = () => {

	return (
		<div className="chat app-flex">
			
			<Conversations/>
			<SingleConvo/>
			<ContactorAbout/>

		</div>
	)
}

export default Chat;