import React, { useContext, useEffect, useState } from "react";
import api from "../api.js";
import { Mycontext } from "./Mycontext.jsx";
import { useParams } from "react-router";
import { Ticket } from "lucide-react";

export const Queue = () => {
  let { theme } = useContext(Mycontext);
  const [queue,setQueue] = useState(null);
  const { queueId } = useParams();
  
  useEffect(()=>{
    const getQueue = async () => {
    try {
      let response =await api.get(`/queue/${queueId}`);
      console.log(response);
      setQueue(response.data);
    } catch (err) {
      console.log(err); 
    }
  };
    getQueue();
  },[queueId]);

   if (!queue) return <div className="h-screen w-screen mt-60 m-auto" >Loading queue…</div>;
   else if(queue.length==0) return <>
   <section className={`h-screen w-full mt-0 m-auto flex justify-center items-center ${theme==='dark'?"bg-blue-950":'bg-white'}`} >
   <h1 className="text-2xl text-black mt-25" >queue is empty</h1>
   </section>
   </>
  return (
    <>
      <section className={`mt-25 flex justify-center items-center gap-2 `} >
        {
        queue.map((t,i)=>
        <div key={i}  className={`w-9/12 h-100 rounded-2xl ${theme==='dark'?'border-slate-800/50 bg-blue-600/30':'border-slate-100/50 bg-blue-600'} `} >{t}</div>
        )
      }
      </section>
    </>
  );
};
