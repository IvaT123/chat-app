import React from "react";
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import './sass/App.scss';
export default class App extends React.Component {
  render() {
    return( 
      <div>   
          <Routes>
              <Route index element={<LoginPage />} />
              <Route path="chat/:username" element={<ChatPage />} />
          </Routes>     
      </div>
    )
  }
}
