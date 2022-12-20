import React, {useState, useContext}from 'react';
import './Signup.scss';
import {Link, useNavigate} from	'react-router-dom';
import AuthContext from "../../context/AuthContext";

var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


const Signup = () => {

	const { registerUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const [status, setStatus] = useState({status:null, message:null});
	const [userData, setUserData] = useState({username:null, 
											  first_name:null, 
											  last_name:null, 
											  email:null,
											  password:null,
											  phone:null,
											  country:null,
											  birthday:null})

	const handleUserRegister = () =>{
		let {username, first_name, last_name, email, password, phone, country, birthday} = userData;

		if(username && first_name && last_name && email && password && phone && country && birthday){
				
			const register = registerUser(userData);
			if(register === true){
				  setStatus({status:'success', message:'User have been created!'});
		          setTimeout(()=>{setStatus({status:null, message:null})}, 1000)
		          setTimeout(()=>{navigate('/UserAuth/Login')}, 2000)
			} else {
				setStatus({status:'error', message:'Failed to create New User'})
				setTimeout(()=>{setStatus({status:null, message:null})}, 1500)
			}

		} else {
			setStatus({status:'error', message:'You must fill all the options'});
			setTimeout(()=>{setStatus({status:null, message:null})}, 1500)
		}
	}

	return (
		<div className="sign__main signup app-flex-wrap">
			<div>
				<p className="head-bold-text">Welcome to <span className="pointer" style={{color:'var(--blue-color)'}}>1V1Arena!</span></p>
				<h5 className="sub-text" style={{marginTop:'-12px'}}>Feel free to join us !</h5>
			</div>

			<form className="app-flex-wrap inputs">

				{status.status === 'error' && <p style={{color:'red', fontWeight:'bold'}}>{status.message}</p>}

				<div className="app-flex" style={{gap:'10px'}}>
					<input type="text" placeholder="Firstname" className="input" onChange={(e)=>setUserData({...userData, first_name:e.target.value})}/>
					<input type="text" placeholder="Lastname" className="input" onChange={(e)=>setUserData({...userData, last_name:e.target.value})}/>
				</div>

				<input type="text" placeholder="Username" className="input" onChange={(e)=>setUserData({...userData, username:e.target.value})}/>
				<input type="text" placeholder="Email" className="input" onChange={(e)=>setUserData({...userData, email:e.target.value})}/>
				<input type="password" placeholder="Password" className="input" onChange={(e)=>setUserData({...userData, password:e.target.value})}/>

				<input type="number" placeholder="Your Phone Number" className="input" onChange={(e)=>setUserData({...userData, phone:e.target.value})}/>
				<select className="input select" onClick={(e)=>setUserData({...userData, country:e.target.value})}>
					<option className="option">Your country</option>
					{country_list.map((country, i)=>(
						<option className="option" key={i}>{country}</option>
						))}
				</select>
				<div className="app-flex inputs">
					<p className="sub-text" style={{width:'30%'}}>Your birthday :</p>
					<input type="date" placeholder="date" className="input birthday" onChange={(e)=>setUserData({...userData, birthday:e.target.value})}/>
				</div>
				
				<p className="sub-text" style={{marginTop:'5px'}}>Already have an account ? 
				  <Link to="/UserAuth/Login">
					<button className="p-text sub-btn pointer" style={{marginLeft:'5px'}}>Signin.</button>
				  </Link>
				</p>

			</form>
			
			<div className="btns">
					<button className="main-btn" onClick={()=>{handleUserRegister(); }}>Signup</button>
					{status.status === 'success' && <h5 style={{color:'var(--green-color)'}}>{status.message}</h5>}
			</div>
		</div>
	)
}

export default Signup;