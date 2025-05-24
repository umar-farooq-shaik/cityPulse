import React from 'react';
import IssueCard from './IssueCard';
import { Issue } from '../../types/issue';

interface IssuesListProps {
  issues: Issue[];
  onMarkAsResolved: (id: string) => void;
  loading: boolean;
  resolvingIds: string[];
}

const IssuesList: React.FC<IssuesListProps> = ({ 
  issues, 
  onMarkAsResolved,
  loading,
  resolvingIds
}) => {
  if (loading && issues.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse bg-white rounded-lg shadow-md h-64">
            <div className="h-6 bg-gray-200 rounded m-6"></div>
            <div className="h-4 bg-gray-200 rounded mx-6 my-2"></div>
            <div className="h-4 bg-gray-200 rounded mx-6 my-2"></div>
            <div className="h-4 bg-gray-200 rounded mx-6 my-2 w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (issues.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">No issues found</h3>
        <p className="mt-2 text-gray-600">
          There are no issues matching your current filters.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          onMarkAsResolved={onMarkAsResolved}
          loading={resolvingIds.includes(issue.id)}
        />
      ))}
    </div>
  );
};

export default IssuesList;