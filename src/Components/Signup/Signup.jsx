import React from 'react';
import './Signup.scss';
import {Link} from	'react-router-dom';

var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


const Signup = () => {
	return (
		<div className="sign__main signup app-flex-wrap">
			<div>
				<p className="head-bold-text">Welcome to <span className="pointer" style={{color:'var(--blue-color)'}}>1V1Arena!</span></p>
				<p className="sub-text" style={{marginTop:'-12px'}}>Feel free to join us !</p>
			</div>
			<div className="app-flex-wrap inputs">
				<div className="app-flex" style={{gap:'10px'}}>
					<input type="text" placeholder="Firstname" className="input"/>
					<input type="text" placeholder="Lastname" className="input"/>
				</div>

				<input type="text" placeholder="Email" className="input"/>
				<input type="password" placeholder="Password" className="input"/>

				<input type="number" placeholder="Your Phone Number" className="input"/>
				<select className="input select">
					<option className="option">Your country</option>
					{country_list.map((country, i)=>(
						<option className="option" key={i}>{country}</option>
						))}
				</select>
				<div className="app-flex inputs">
					<p className="sub-text" style={{width:'30%'}}>Your birthday :</p>
					<input type="date" placeholder="date" className="input birthday"/>
				</div>
				
				<p className="sub-text" style={{marginTop:'5px'}}>Already have an account ? 
				  <Link to="/UserAuth/Login">
					<button className="p-text sub-btn pointer" style={{marginLeft:'5px'}}>Signin.</button>
				  </Link>
				</p>

			</div>
			<div className="btns">
					<button className="main-btn">Signup</button>
			</div>
		</div>
	)
}

export default Signup;