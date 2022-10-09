import React, {useState} from 'react';
import './Carousel.scss';
import './testeCarousel.scss';

import { files } from '../../Assets';

import Teste from '../Testes/Testes';
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from 'react-icons/bs';


const featuredGames = [
	{	game:'League of legends',
		url:files.lol
	}, 
	{	game:'apex',
		url:files.apexWalp
	}, 
	{	game:'COD:warzon',
		url:files.warzone
	}, 
	{	game:'valorant',
		url:files.valo
	}, 
	{	game:'PUBG',
		url:files.pubg
	}, 
	{	game:'minecraft',
		url:files.minecraft
	}, 
	{	game:'streetfighters',
		url:files.streetfighter2
	}, 
	{	game:'League of legends',
		url:files.lol
	}];
	
const Carousel = () => {

	const gap = 16;

	const [showPrev, setShowPrev] = useState(false);
	const [showNext, setShowNext] = useState(true);

	const next = () => {
			const carousel = document.getElementById("carousel__main");
			const content = document.getElementById("element_div");

			carousel.scrollBy(carousel.offsetWidth + gap, 0);

			if (carousel.scrollWidth !== 0) {
		        setShowPrev(true);
		    }
		    if (content.scrollWidth - carousel.offsetWidth - gap <= carousel.scrollLeft + carousel.offsetWidth) {
		        setShowNext(false);
		    }
	}

	const prev = () => {
			const carousel = document.getElementById("carousel__main");
			const content = document.getElementById("element_div");

			carousel.scrollBy(-(carousel.offsetWidth + gap), 0);

		    if (carousel.scrollLeft - carousel.offsetWidth - gap <= 0) {
		        setShowPrev(false);
		    }
		    if (!content.scrollWidth - carousel.offsetWidth - gap <= carousel.scrollLeft + carousel.offsetWidth) {
		        setShowNext(true);
		    }
	}

	return (
		<>
			<div id="carousel__main" className="carousel__main app-flex">
						<div id="element_div" className="element_div app-flex">
								{
									featuredGames.map((game, i)=>(
										<div className="element" key={i}>
											<img src={game.url} className="carousel-element" alt={game.game}/>
											<span className='overlay app-flex'>
												<p className="overlay-text">{game.game}</p>
											</span>
										</div>
										))
								}
						</div>
			</div>
					
					{ showPrev && 
						<button id="prev" onClick={()=>prev()}>
					        <svg
					          xmlns="http://www.w3.org/2000/svg"
					          width="24"
					          height="24"
					          viewBox="0 0 24 24">
						          <path fill="none" d="M0 0h24v24H0V0z" />
						          <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
				  	        </svg>
				       </button>
					}

					 {showNext && 
					 	<button id="next" onClick={()=>next()}>
					        <svg
					          xmlns="http://www.w3.org/2000/svg"
					          width="24"
					          height="24"
					          viewBox="0 0 24 24">
						          <path fill="none" d="M0 0h24v24H0V0z" />
						          <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
					        </svg>
				       </button>
					
					 }

		</>
	)
}

const TesteCarousel = () => {
	const gap = 16;

	const next = () => {
			const carousel = document.querySelector(".testemoniel__Carousel");
			
			carousel.scrollBy(carousel.offsetWidth + gap, 0);

	}

	const prev = () => {
			const carousel = document.querySelector(".testemoniel__Carousel");

			carousel.scrollBy(-(carousel.offsetWidth + gap), 0);
	}
	return (
			<>
				<div className="app-flex testemoniel__Carousel">
						<div className="testes app-flex">
								<Teste/>
								<Teste/>
								<Teste/>
								<Teste/>
								<Teste/>
								<Teste/>
								<Teste/>
						</div>
				</div>
					<div style={{alignSelf:'center'}}>
							<BsFillArrowLeftCircleFill className="icons" onClick={()=>prev()}/>
							<BsFillArrowRightCircleFill className="icons"onClick={()=>next()}/>
					</div>
			</>
		)
}


export {Carousel, TesteCarousel};


			