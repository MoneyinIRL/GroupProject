"use client";

import { useState } from 'react';
import './page.css';
import NavBar from '../frontend/components/NavBar';
//when you finish this, uncomment this line, add it to the return, and change the explort name, it should work
//import (export name) from '../frontend/components/addmovieform';
import Footer from '../frontend/components/Footer';

export default function AddItemPage() {

  return (
    <div className="container">
       
       <NavBar />
       <Footer />
      
    </div>
  );
}