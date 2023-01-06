import React from 'react'
import './Search.scss';
import {MdOutlineClose} from 'react-icons/md';

import useAxios from '../../utils/useAxios'

const Search = ({search, setSearch}) => {
	const api = useAxios();
	const handleSearch = (term) =>{
		api.get(`/api/search?q=${term}`)
			.then(res=>console.log(res.data))
			.catch(err=>console.log(err))
	}

	return (
		<div className={`search-main app-flex-wrap ${search && 'show-search'}`}>
			<div className="app-flex-wrap search_container">
				<MdOutlineClose className="pointer close-icon" onClick={()=>setSearch(false)}/>
				<input placeholder="Search..." className="search" type="text" onChange={(e)=>handleSearch(e.target.value)}/>
			</div>
			<div>
				xxxxx
			</div>
		</div>
	)
}

export default Search