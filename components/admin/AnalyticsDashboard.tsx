'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Calendar, GraduationCap, FileText, DollarSign, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics data
    setTimeout(() => setLoading(false), 1000);
  }, [timeRange]);

  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', users: 1850, mentors: 120, mentees: 380 },
    { month: 'Feb', users: 1920, mentors: 132, mentees: 395 },
    { month: 'Mar', users: 2050, mentors: 145, mentees: 420 },
    { month: 'Apr', users: 2180, mentors: 158, mentees: 445 },
    { month: 'May', users: 2247, mentors: 168, mentees: 468 },
    { month: 'Jun', users: 2350, mentors: 184, mentees: 492 },
  ];

  const eventData = [
    { name: 'Workshops', value: 45, color: '#9b2e83' },
    { name: 'Networking', value: 30, color: '#c05aac' },
    { name: 'Training', value: 20, color: '#e091d3' },
    { name: 'THRIVE', value: 15, color: '#f3c4e8' },
    { name: 'Social', value: 10, color: '#fae5f5' },
  ];

  const engagementData = [
    { day: 'Mon', pageViews: 4500, sessions: 2300, activeUsers: 890 },
    { day: 'Tue', pageViews: 5200, sessions: 2800, activeUsers: 1020 },
    { day: 'Wed', pageViews: 4800, sessions: 2500, activeUsers: 950 },
    { day: 'Thu', pageViews: 5500, sessions: 2900, activeUsers: 1100 },
    { day: 'Fri', pageViews: 6200, sessions: 3200, activeUsers: 1250 },
    { day: 'Sat', pageViews: 3800, sessions: 1900, activeUsers: 720 },
    { day: 'Sun', pageViews: 3200, sessions: 1600, activeUsers: 580 },
  ];

  const mentorshipStats = [
    { metric: 'Active Pairs', value: 143, change: 12, trend: 'up' },
    { metric: 'Completed Sessions', value: 892, change: 8.5, trend: 'up' },
    { metric: 'Average Rating', value: 4.7, change: 0.2, trend: 'up' },
    { metric: 'Match Success Rate', value: 87, change: -2, trend: 'down' },
  ];

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mentorshipStats.map((stat) => (
          <Card key={stat.metric}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.metric}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.metric === 'Average Rating' ? stat.value.toFixed(1) : stat.value.toLocaleString()}
                    {stat.metric === 'Match Success Rate' && '%'}
                  </p>
                </div>
                <div className={cn(
                  "flex items-center text-sm font-medium",
                  stat.trend === 'up' ? "text-green-600" : "text-red-600"
                )}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {Math.abs(stat.change)}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth Trends</CardTitle>
          <CardDescription>Total users, mentors, and mentees over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="users" stackId="1" stroke="#9b2e83" fill="#9b2e83" fillOpacity={0.6} />
              <Area type="monotone" dataKey="mentees" stackId="2" stroke="#c05aac" fill="#c05aac" fillOpacity={0.6} />
              <Area type="monotone" dataKey="mentors" stackId="2" stroke="#e091d3" fill="#e091d3" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Event Distribution</CardTitle>
            <CardDescription>Breakdown of events by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {eventData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
            <CardDescription>Page views, sessions, and active users</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pageViews" fill="#9b2e83" />
                <Bar dataKey="sessions" fill="#c05aac" />
                <Bar dataKey="activeUsers" fill="#e091d3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Statistics</CardTitle>
          <CardDescription>Comprehensive platform metrics and KPIs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">This Month</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Last Month</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Change</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { category: 'New Registrations', current: 156, previous: 142, icon: Users },
                  { category: 'Event Attendees', current: 384, previous: 356, icon: Calendar },
                  { category: 'Mentorship Sessions', current: 89, previous: 76, icon: GraduationCap },
                  { category: 'Resources Downloaded', current: 512, previous: 489, icon: FileText },
                  { category: 'Revenue', current: '$12,450', previous: '$11,200', icon: DollarSign },
                  { category: 'Active Users', current: 1823, previous: 1756, icon: Activity },
                ].map((row) => {
                  const change = typeof row.current === 'number' && typeof row.previous === 'number'
                    ? ((row.current - row.previous) / row.previous * 100).toFixed(1)
                    : '11.1';
                  const isPositive = parseFloat(change) > 0;
                  
                  return (
                    <tr key={row.category} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <row.icon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-900">{row.category}</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 text-sm font-medium text-gray-900">
                        {typeof row.current === 'number' ? row.current.toLocaleString() : row.current}
                      </td>
                      <td className="text-right py-3 px-4 text-sm text-gray-500">
                        {typeof row.previous === 'number' ? row.previous.toLocaleString() : row.previous}
                      </td>
                      <td className="text-right py-3 px-4">
                        <span className={cn(
                          "text-sm font-medium",
                          isPositive ? "text-green-600" : "text-red-600"
                        )}>
                          {isPositive ? '+' : ''}{change}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}