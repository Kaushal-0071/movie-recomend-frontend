"use client"
import RecommendationUI from '@/components/ragRecomendation'
import React, { useState } from 'react'

const Rag= () => {

const [prompt, setPrompt] = useState('')
const[loading, setLoading] = useState(false)    
const [ragData,setragData] = useState()
const fetchRagRecommendations = async () => {
    setLoading(true); // Set loading state before API call
  
    try {
      const response = await fetch("http://127.0.0.1:5000/rag-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt }), // Sending user input
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("RAG Recommendations:", data);
        setragData(data.recommendation); // Set the received data to state
    } catch (error) {
      console.error("Error fetching RAG recommendations:", error);
    
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  return (
    <div className='flex flex-col items-center justify-center py-5'>

        <input placeholder='enter prompt' className=' flex items-center justify-center' onChange={(e)=> setPrompt(e.target.value)}/>
        <button className='bg-blue-500 text-white px-4 py-2 rounded mt-2' onClick={fetchRagRecommendations}>Submit</button>
        {ragData && <RecommendationUI recommendation={ragData}/>}
    </div>
  )
}

export default Rag