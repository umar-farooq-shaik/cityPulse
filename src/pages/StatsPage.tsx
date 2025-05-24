import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  ClipboardList,
  AlertOctagon,
  CheckCircle,
  PieChart as PieChartIcon
} from 'lucide-react';

import Card, { CardBody } from '../components/ui/Card';
import StatCard from '../components/stats/StatCard';
import { fetchStats } from '../api/supabase';
import { IssueStats, Category } from '../types/issue';

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<IssueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        console.error('Error loading stats:', err);
        setError('Failed to load statistics. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadStats();
  }, []);
  
  const getCategoryData = () => {
    if (!stats) return [];
    
    return Object.entries(stats.categoryBreakdown).map(([category, count]) => ({
      name: category,
      value: count,
    }));
  };
  
  const getStatusData = () => {
    if (!stats) return [];
    
    return [
      { name: 'Open', value: stats.openIssues },
      { name: 'Resolved', value: stats.resolvedIssues },
    ];
  };
  
  const COLORS = ['#2c7a7b', '#4fd1c5', '#38b2ac', '#81e6d9', '#e6fffa'];
  const STATUS_COLORS = ['#ed8936', '#38a169'];
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Statistics</h1>
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
        <p className="mt-2 text-gray-600">
          Overview of reported issues and their status
        </p>
      </div>
      
      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Issues"
              value={stats.totalIssues}
              icon={<ClipboardList />}
            />
            <StatCard
              title="Open Issues"
              value={stats.openIssues}
              icon={<AlertOctagon />}
            />
            <StatCard
              title="Resolved Issues"
              value={stats.resolvedIssues}
              icon={<CheckCircle />}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <CardBody>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <PieChartIcon className="h-5 w-5 mr-2 text-teal-600" />
                  Issues by Category
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getCategoryData()}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#2c7a7b" name="Number of Issues" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
            
            <Card className="overflow-hidden">
              <CardBody>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <PieChartIcon className="h-5 w-5 mr-2 text-teal-600" />
                  Issues by Status
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getStatusData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getStatusData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsPage;