"use client"; // If using Next.js App Router

import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card"; // ShadCN UI
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

// Sample Data (Replace this with actual data)  
const data = [
  { date: "2024-03-01 08:00", gunshotCount: 5 },
  { date: "2024-03-01 12:00", gunshotCount: 12 },
  { date: "2024-03-01 16:00", gunshotCount: 9 },
  { date: "2024-03-02 08:00", gunshotCount: 15 },
  { date: "2024-03-02 12:00", gunshotCount: 6 },
  { date: "2024-03-02 16:00", gunshotCount: 11 },
];

// Framer Motion animation settings
const chartMotion = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function GunshotTrends() {
  return (
    <motion.div initial="hidden" animate="visible" variants={chartMotion}>
      <Card>
        <CardHeader>
          <CardTitle>Gunshot Trends Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="gunshotCount" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
