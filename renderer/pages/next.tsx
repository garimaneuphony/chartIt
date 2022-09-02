import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
const {ipcRenderer} = require('electron')
import Chart from './../components/ChartComponent';
import { Queue } from '@datastructures-js/queue';

function Next() {
  const [isActive, setActive] = useState(true);
  const [buttonText, setButtonText] = useState('Fetch Data Stream');
  const [listenerCount, setCount] = useState(0);
  const DataQueue = useRef(new Queue);
  const [packets, setDataPackets]  = useState([]);
  const mycount = useRef(0)

    const Remover = () => {
    DataQueue.current.dequeue();
  }

  const helper = (packets) => {
    if (packets) {
      DataQueue.current.enqueue({
        name: "channel - 1",
        dataPoint: packets,
        // timePoint: packets[8]
        timePoint: mycount.current
      })
      // console.log(DataQueue.current.toArray())
      mycount.current++
      if (mycount.current > 1000) {
        Remover()
      }
    }
  }

  const getData = () => {
    ipcRenderer.on("device-data",(event,packets)=>{
      setDataPackets(packets);
      helper(packets);
      setCount(listenerCount+1)
    })

    ipcRenderer.on("fetch-data",(event,message)=>{
      if(message=='completed'){
        setActive(true)
        setButtonText('Fetch Data Stream')
      }
    }) 
  }

  const fetchData = () => {
    setActive(false);
    ipcRenderer.invoke('fetch-data').then(() => {
      setButtonText('Fetching In Progress')
    })
    if(listenerCount==0) getData();
  };


  return (
    <React.Fragment>
      <Head>
        <title>Neuphony - Chart It</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center'>
        <img className='ml-auto mr-auto' src='/images/logo.png' />
        <span>⚡ Render the Graph on this Page ⚡</span>
      </div>

      <div className='mt-4 w-full flex-wrap flex justify-center'>
      <button className={isActive ? 'btn-blue': 
      'bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'} 
      onClick={fetchData}>{buttonText}</button>
      </div>

      <div id="chartIt"> 
      <span className='mt-4 w-full flex-wrap flex justify-center'>⚡  Render Chart Here ⚡</span> 
      <Chart DataQue={DataQueue.current} label={'Fp1'} index={0} />
      <Chart DataQue={DataQueue.current} label={'Fp2'} index={1} />
      <Chart DataQue={DataQueue.current} label={'F3'} index={2}  />
      <Chart DataQue={DataQueue.current} label={'F4'} index={3}  />
      <Chart DataQue={DataQueue.current} label={'Fz'} index={6}  />
      <Chart DataQue={DataQueue.current} label={'Pz'} index={7}  /> 
      </div> 

      <div className='mt-10 w-full flex-wrap flex justify-center'>
        <Link href='/home'>
          <a className='btn-blue'>Go to home page</a>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Next
