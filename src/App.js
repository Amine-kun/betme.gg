import react from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.scss';

import Landing from './Containers/Landing/Landing';
import UserAuth from './Containers/userAuth/userAuth';
import Main from './Containers/Main/Main';
import Settings from './Containers/Settings/Settings';

import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
      <div className="app">
        <AuthProvider>
          <Routes>
            <Route path="/betme" element={<Landing/>}/>
            <Route path="/userAuth/*" element={<UserAuth/>}/>
             
            
            <Route exact path='/*' element={<PrivateRoute/>}>
                  <Route exact path='/*' element={<Main/>}/>
            </Route>
            <Route exact path='/Settings/*' element={<PrivateRoute/>}>
                  <Route exact path='/Settings/*' element={<Settings/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </div>
  );
}

export default App;
