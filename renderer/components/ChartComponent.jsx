// import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts"
import { useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ReferenceLine
} from "recharts";
import { Queue } from '@datastructures-js/queue';

export default function Chart({packets}) {
  const DataQueue = useRef(new Queue);
  const mycount = useRef(0);
  // if (data?.length ==0) {
  // if (Data?._elements?.length ==0) {
  //   return <h1>No Data in Channel-1</h1>
  // }

  useEffect(() => {
    helper(packets)
  }, [packets])

  const Remover = () => {
    DataQueue.current.dequeue();
  }

  const helper = packets => {
    if (packets) {
      // for(let i=0;i<packets.length;i++){
      DataQueue.current.enqueue({
        name: "channel - 1",
        dataPoint: packets[0],
        // timePoint: packets[8]
        timePoint: mycount.current
      })
      console.log(DataQueue.current.toArray())
      mycount.current++
      // console.log(mycount.current);
      if (mycount.current > 1000) {
        Remover()
      }
    }
  }

  console.log(DataQueue.current.toArray());

  return (
    // <LineChart  width={800}
    // height={400}
    // // data={data}
    // data={Data.toArray()}
    // margin={{
    //   top: 5,
    //   // right: 30,
    //   // left: 20,
    //   bottom: 5,
    // }}>
    //    {/* <CartesianGrid strokeDasharray="3 3" /> */}
    //       {/* <XAxis dataKey="timePoint" /> */}
    //       <ReferenceLine y={0} stroke="lightgray" />
    //       <YAxis domain={[-75, 75]} tickCount="30" />
    //       <Tooltip />
    //       <Legend />
    //       <Line type="monotone" dataKey="dataPoint" stroke="#82ca9d" dot={false} />
    // </LineChart>)

 <ResponsiveContainer width="100%" aspect={8}>
<LineChart
  data={DataQueue.current.toArray()}
// data={Data.toArray()}
// width={100}
// height={50}
// margin={{ top: 40, right: 80, left: 20, bottom: 10 }}
>
<XAxis dataKey="timePoint" /> 
  <ReferenceLine y={0} stroke="lightgray" />
  <YAxis type="number" domain={[-75, 75]} allowDataOverflow={true} tick={false} label={{ value: 'Fp1', fill: 'white' }} />
  <Line
    dataKey="dataPoint"
    stroke="white"
    dot={false}
  />
</LineChart>
</ResponsiveContainer> ) 
}