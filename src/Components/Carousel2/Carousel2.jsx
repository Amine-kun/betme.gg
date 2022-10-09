import React, {useState, useEffect} from 'react';
import './Carousel2.scss';


export const CarouselItem = ({children, width})=> {
	return(
		<div className="carousel-item" style={{width: width}}>
			<div className="overlay app-flex-wrap">
				<div className="pannel-info">
					<h3>join our open League Of Lengends Solo Tournement</h3>
					<h5>Show your skills and climb the ladder</h5>
				</div>
				<div className="pannel-time">
					<h3>$2000</h3>
					<h5>End on Tuesday 20pm</h5>
				</div>
			</div>
			{children}
		</div>
		);
};

const Carousel2 = ({children}) => {

	const [activeIndex , setActiveIndex] = useState(0);
	const [paused, setPaused] = useState(false);

	const updateIndex = (newIndex) =>{
		if(newIndex < 0){
			newIndex = React.Children.count(children) -1;
		} else if(newIndex >= React.Children.count(children)){
			newIndex = 0;
		}

		setActiveIndex(newIndex);
	}

	useEffect(() => {
		const interval = setInterval(()=>{
			if(!paused){
				updateIndex(activeIndex+1);
			}
		}, 3000);

		return () => {
			if(interval){
				clearInterval(interval);
			}
		};
	})
	return (
		<div className="carousel-main"
			onMouseEnter={()=> setPaused(true)}
			onMouseLeave={()=> setPaused(false)}>
		   <div className="inner" style={{transform:`translateX(-${activeIndex * 100}%)`}}>
		   	{React.Children.map(children, (child, index)=>{
		   		return React.cloneElement(child, {width:'100%'});	   		
		   			   		})}
		   </div>
		   <div className="counter">	
		   	 {React.Children.map(children, (child, i)=>{
		   		return <span className={`sub-counter ${i === activeIndex && 'active'}`} onClick={()=>setActiveIndex(i)}></span>   		
		   			   		})}
		   </div>
		</div>
	)
}

export default Carousel2;