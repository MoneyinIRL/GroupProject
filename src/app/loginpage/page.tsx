"use client";

import { useState } from 'react';
import './page.css';
import NavBar from '../frontend/components/NavBar';
import LogIn from '../frontend/components/LogIn';
import FootingA from '../frontend/Footings';

export default function LogInPage() {

  return (
    <div className="container">
       
       <NavBar />
       <FootingA />
       <LogIn  />
      
    </div>
  );
}
