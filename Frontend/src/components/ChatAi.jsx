import React, { useEffect, useState } from 'react'
import conf from '../conf/conf';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

function ChatAi() {
const genAI = new GoogleGenerativeAI(conf.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const [prompt, setPrompt] = useState("")
const [responses, setResponses] = useState([]);
async function generateResponse(){ 
    try{
        const result = await model.generateContent(prompt);
        setResponses(prev => [...prev, result.response.text()]);
        setPrompt(""); // Clear the input after submission
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

  return (
    <div className='flex flex-col '>
    <div className='flex-1 overflow-y-auto p-4 lg:px-20 mb-16'>
        {responses.map((response, index) => (
            <div key={index} className="mb-4">
                <div className="bg-whiteBg dark:bg-slate-500 p-4 rounded-lg shadow-md font-dolce text-lg tracking-wider dark:text-whiteBg">
                    <ReactMarkdown>{response}</ReactMarkdown>
                </div>
            </div>
        ))}
    </div>
    <div className='fixed bottom-0 left-0 right-0 border-gray-300 p-10 bg-none flex items-center lg:px-40'>
      <input 
        type="text" 
        className="border border-gray-300 rounded-xl w-full p-2 mr-2 font-dolce tracking-wider focus:outline-none  " 
        id="" 
        onChange={(e)=>setPrompt(e.target.value)}
        value={prompt} 
       />
      <button onClick={generateResponse} className=' w-1/6 rounded-xl py-2 ml-1 bg-black text-white transition duration-500 dark:hover:bg-gray-900 hover:bg-buttons1 hover:bg-opacity-50 font-dolce tracking-wider'>
        Ask
      </button>
    </div>
      
    </div>
  )
}

export default ChatAi
