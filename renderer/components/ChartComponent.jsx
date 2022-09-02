import { useEffect, useRef} from "react";
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

export default function Chart({DataQue, label, index}) {
  const DataQueue = useRef(new Queue);
  const countPackets = useRef(0);
  console.log(DataQue, ++countPackets.current);

  // const filterData = () => DataQue.toArray().map(queue => ({...queue, dataPoint: queue.dataPoint[0] }))

  return ( 
 <ResponsiveContainer width="100%" aspect={10}>
  <LineChart
  data={DataQue.toArray().map(queue => ({...queue, dataPoint: queue.dataPoint[index] }))}
>
<XAxis dataKey="timePoint" /> 
  <ReferenceLine y={0} stroke="lightgray" />
  <YAxis type="number" domain={[-75, 75]} allowDataOverflow={true} tick={false} label={{ value: label, fill: 'white' }} />
  <Line
    dataKey="dataPoint"
    stroke="white"
    dot={false}
  />
</LineChart>
</ResponsiveContainer> 
) 
}