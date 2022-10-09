import react from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.scss';

import Landing from './Containers/Landing/Landing';
import UserAuth from './Containers/userAuth/userAuth';
import Main from './Containers/Main/Main';

function App() {
  return (
    <div className="app">
      <Routes> 
        <Route path="/betme" element={<Landing/>}/>
        <Route path="/userAuth/*" element={<UserAuth/>}/>
        <Route path="/*" element={<Main/>}/>
      </Routes>
    </div>
  );
}

export default App;
