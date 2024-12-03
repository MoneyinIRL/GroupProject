"use client";


import { useState } from 'react';
import './page.css';
import NavBar from './frontend/components/NavBar';
import NotFoundSplash from './frontend/components/SplashFourOhFour';
import Footer from './frontend/components/Footer';

export default function Home() {

  return (
    <div className="container">
       
       <NavBar />
       <NotFoundSplash/>
       <Footer />
      
    </div>
  );
}
