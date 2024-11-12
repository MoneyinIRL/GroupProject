"use client";

import { useState } from 'react';
import './page.css';
import NavBar from '../frontend/components/NavBar';
import LogIn from '../frontend/components/LogIn';
import Footer from '../frontend/components/Footer';

export default function LogInPage() {

  return (
    <div className="container">
       
       <NavBar />
       <LogIn  />
       <Footer />
      
    </div>
  );
}
