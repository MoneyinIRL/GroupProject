"use client";

import { useState } from 'react';
import './page.css';
import NavBar from '../frontend/components/NavBar';
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
