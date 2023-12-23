import './App.css';
import Navigation from './components/Navbar';
import ImageUpload from './components/ImageUpload';
import React, { Component } from 'react';
export default function App() {
  return (
    <div className='maindiv'>
      <Navigation / >
      <div className='ImageUpload'><ImageUpload/></div>
    </div>
  )
}
