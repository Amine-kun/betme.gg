
import React,  {useState} from 'react';
import './Tournements.scss';
import GamesTable, {GameState} from '../../../../Components/GamesTable/GamesTable';

const Tournements = () => {

	const [showMore, setShowMore] = useState(false);
	const [playerTournaments, setPlayerTournamenets] = useState([]);

	return (
		<section className="tounaments app-flex-wrap">
             <div className="section__header">
						<h4>Your Tournements</h4>
		     </div>
			<span className="crossing-bar"></span>

					<div className="app-flex table-key">
						<h6 style={{marginRight:'auto'}}>Game</h6>
						<h6>Teams</h6>
						<h6 style={{marginLeft:'auto'}}>Status</h6>
					</div>
					
					<span className="crossing-bar"></span>
						<GamesTable showMore={showMore} setShowMore={setShowMore}>
							{playerTournaments.length > 0
								? <>
									{[1,2,3,4,5,6,7].map((game, i)=>
									 i < 4 && (i === 0 || i % 2 === 0 
														? <GameState bg={'var(--primary-color-layer3)'} isFinished={true} status={"win"} key={i}/>
														: <GameState isFinished={true} status={"lose"} key={i}/>) 
								)}
								{showMore && [1,2,3,4,5,6,7].map((game, i)=>
										i > 4 && (i % 2 !== 0 
															? <GameState bg={'var(--primary-color-layer3)'} isFinished={true} status={"win"} key={i}/>
															: <GameState isFinished={true} status={"lose"} key={i}/>) 
	 
									)}
								  </>
								: <span className="full app-flex"><h5>You haven't enroled in any tournament just yet.</h5></span>}
						</GamesTable>
		</section>
	)
}

export default Tournements;