import React, { useState, useEffect } from 'react';
import { BadgeAlert as Alert } from 'lucide-react';
import IssuesList from '../components/issues/IssuesList';
import IssueFilters from '../components/issues/IssueFilters';
import { fetchIssues, updateIssueStatus } from '../api/supabase';
import { Issue, Category, Status } from '../types/issue';

const DashboardPage: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<Category | ''>('');
  const [statusFilter, setStatusFilter] = useState<Status | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [resolvingIds, setResolvingIds] = useState<string[]>([]);
  
  const loadIssues = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchIssues(
        categoryFilter || undefined,
        statusFilter || undefined,
        searchQuery || undefined
      );
      setIssues(data);
    } catch (err) {
      console.error('Error loading issues:', err);
      setError('Failed to load issues. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, statusFilter, searchQuery]);
  
  const handleMarkAsResolved = async (id: string) => {
    setResolvingIds(prev => [...prev, id]);
    
    try {
      const updatedIssue = await updateIssueStatus(id, 'Resolved');
      setIssues(prev => 
        prev.map(issue => 
          issue.id === id ? updatedIssue : issue
        )
      );
    } catch (err) {
      console.error('Error resolving issue:', err);
      alert('Failed to resolve issue. Please try again.');
    } finally {
      setResolvingIds(prev => prev.filter(issueId => issueId !== id));
    }
  };
  
  const handleResetFilters = () => {
    setCategoryFilter('');
    setStatusFilter('');
    setSearchQuery('');
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Issues Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Browse, filter, and manage reported issues
        </p>
      </div>
      
      <IssueFilters
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        searchQuery={searchQuery}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
        onSearchChange={setSearchQuery}
        onResetFilters={handleResetFilters}
      />
      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <Alert className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <IssuesList
        issues={issues}
        onMarkAsResolved={handleMarkAsResolved}
        loading={loading}
        resolvingIds={resolvingIds}
      />
    </div>
  );
};

export default DashboardPage;