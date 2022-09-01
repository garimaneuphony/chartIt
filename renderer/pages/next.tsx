import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
const {ipcRenderer} = require('electron')
import Chart from './../components/ChartComponent';
import { Queue } from '@datastructures-js/queue';

function Next() {
  const [isActive, setActive] = useState(true);
  const [buttonText, setButtonText] = useState('Fetch Data Stream');
  const [listenerCount, setCount] = useState(0);
  const DataQueueOfFp1 = useRef(new Queue);
  const DataQueueOfFp2 = useRef(new Queue);
  const DataQueueOfF3 = useRef(new Queue);
  const DataQueueOfF4 = useRef(new Queue);
  const DataQueueOfFz = useRef(new Queue);
  const DataQueueOfPz = useRef(new Queue);
  const [packets, setDataPackets]  = useState([]);
  const mycount = useRef(0)

  const Remover = () => {
    DataQueueOfFp1.current.dequeue();
    DataQueueOfFp2.current.dequeue();
    DataQueueOfF3.current.dequeue();
    DataQueueOfF4.current.dequeue();
    DataQueueOfFz.current.dequeue();
    DataQueueOfPz.current.dequeue();
  }

  const helper = (packets) => {
    if (packets) {
      DataQueueOfFp1.current.enqueue({
        name: "channel - 1",
        dataPoint: packets[0],
        // timePoint: packets[8]
        timePoint: mycount.current
      })
      DataQueueOfFp2.current.enqueue({
        name: "channel - 2",
        dataPoint: packets[1],
        timePoint: mycount.current
      })
      DataQueueOfF3.current.enqueue({
        name: "channel - 2",
        dataPoint: packets[2],
        timePoint: mycount.current
      })
      DataQueueOfF4.current.enqueue({
        name: "channel - 2",
        dataPoint: packets[3],
        timePoint: mycount.current
      })
      DataQueueOfFz.current.enqueue({
        name: "channel - 2",
        dataPoint: packets[6],
        timePoint: mycount.current
      })
      DataQueueOfPz.current.enqueue({
        name: "channel - 2",
        dataPoint: packets[7],
        timePoint: mycount.current
      })
      console.log(DataQueueOfFp1.current.toArray())
      mycount.current++
      if (mycount.current > 999) {
        Remover()
      }
    }
  }

  const getData = () => {
    ipcRenderer.on("device-data",(event,packets)=>{
      setDataPackets(packets);
      helper(packets)
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
      <Chart Data={DataQueueOfFp1.current} label={'Fp1'} />
      <Chart Data={DataQueueOfFp2.current} label={'Fp2'} />
      <Chart Data={DataQueueOfF3.current} label={'F3'} />
      <Chart Data={DataQueueOfF4.current} label={'F4'} />
      <Chart Data={DataQueueOfFz.current} label={'Fz'} />
      <Chart Data={DataQueueOfPz.current} label={'Pz'} />
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
