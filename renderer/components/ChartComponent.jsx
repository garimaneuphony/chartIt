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

export default function Chart({Data}) {

  return (
 <ResponsiveContainer width="100%" aspect={8}>
  <LineChart
  data={Data.toArray()}
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