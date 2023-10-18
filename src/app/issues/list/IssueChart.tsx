'use client';
import { Card } from '@radix-ui/themes';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Rectangle,
} from 'recharts';

interface Prop {
  open: number;
  inProgress: number;
  closed: number;
}

function IssueChart({ open, inProgress, closed }: Prop) {
  const data = [
    { label: 'Open', issues: open },
    { label: 'In Progress', issues: inProgress },
    { label: 'Closed', issues: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="issues"
            barSize={60}
            activeBar={<Rectangle stroke="#6e56cf" strokeWidth="2px" />}
            fill="#6e56cf"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default IssueChart;
