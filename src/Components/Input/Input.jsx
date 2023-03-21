import React, {useState, useEffect} from 'react';
import './Input.scss';
import {AiFillEye , AiFillPhone, AiFillEyeInvisible} from 'react-icons/ai';
import {BiLock} from 'react-icons/bi';
import {RiProfileFill} from 'react-icons/ri';
import {IoPerson} from 'react-icons/io5';
import {MdEmail} from 'react-icons/md';


const Input = ({placeholder, handler, setHandler, type, input}) => {
	const [focused, setFocused] = useState(false);
	const [showPass, setShowPass] = useState(false);

	useEffect(() => {
		if(handler.length > 0){
			setFocused(true);
		}
	}, [input])

	return (
		<div className="input-field"
					onClick={()=> setFocused(true)}>

					<h5 className={`field-title ${focused && 'active'}`}>{placeholder}</h5>
						<span className="app-flex input-adj" style={{gap:'3px'}}>
							{type === 'password' && <BiLock className="icon"/>}
							{input === 'username' && <IoPerson className="icon"/>}
							{input === 'bio' && <RiProfileFill className="icon"/>}
							{input === 'email' && <MdEmail className="icon"/>}
							{input === 'phone' && <AiFillPhone className="icon"/>}

							<input className="input" type={showPass ? 'text' : type} value={handler} onChange={(e)=>setHandler(e.target.value)}/>
							
							{type === 'password'
								&&	<> 
									{showPass
										? <AiFillEye className="icon" onClick={()=> setShowPass(false)}/>
										: <AiFillEyeInvisible className="icon" onClick={()=> setShowPass(true)}/>}
									</>
									}

						</span>
		</div>
	)
}

export default Input;