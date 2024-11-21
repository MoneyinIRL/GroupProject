"use client";

import { useState } from 'react';
import './page.css';
import NavBar from '../frontend/components/NavBar';
import SignUp from '../frontend/components/SignUp';
import Footer from '../frontend/components/Footer';

export default function SignUpPage() {

  return (
    <div className="container">
       
       <NavBar />
       <SignUp  />
       <Footer />
      
    </div>
  );
}
