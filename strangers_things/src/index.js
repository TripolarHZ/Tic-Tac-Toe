import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    Create,
    Delete,
    Update,
    Read
  } from './Posts';
import{
    Register,
    Login,
    Me,
} from './Users';

  const App = () =>{

    return <div className = 'app'>
        <h1>Posts</h1>
        <Read />
    </div>
  }

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )