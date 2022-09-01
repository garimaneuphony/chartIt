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

export default function Chart({Data, label}) {

  return (
 <ResponsiveContainer width="100%" aspect={10}>
  <LineChart
  data={Data.toArray()}
>
<XAxis dataKey="timePoint" /> 
  <ReferenceLine y={0} stroke="lightgray" />
  <YAxis type="number" domain={[-75, 75]} allowDataOverflow={true} tick={false} label={{ value: label, fill: 'white' }} />
  <Line
    dataKey="dataPoint"
    stroke="white"
    dot={false}
    key={label}
  />
</LineChart>
</ResponsiveContainer> ) 
}