import React from 'react';
import { Search } from 'lucide-react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Category, Status } from '../../types/issue';

interface IssueFiltersProps {
  categoryFilter: Category | '';
  statusFilter: Status | '';
  searchQuery: string;
  onCategoryChange: (category: Category | '') => void;
  onStatusChange: (status: Status | '') => void;
  onSearchChange: (query: string) => void;
  onResetFilters: () => void;
}

const IssueFilters: React.FC<IssueFiltersProps> = ({
  categoryFilter,
  statusFilter,
  searchQuery,
  onCategoryChange,
  onStatusChange,
  onSearchChange,
  onResetFilters,
}) => {
  const handleCategoryChange = (value: string) => {
    onCategoryChange(value as Category | '');
  };
  
  const handleStatusChange = (value: string) => {
    onStatusChange(value as Status | '');
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Filter by Category"
          options={[
            { value: '', label: 'All Categories' },
            { value: 'Garbage', label: 'Garbage' },
            { value: 'Pothole', label: 'Pothole' },
            { value: 'Lighting', label: 'Lighting' },
            { value: 'Safety', label: 'Safety' },
            { value: 'Other', label: 'Other' },
          ]}
          value={categoryFilter}
          onChange={handleCategoryChange}
          fullWidth
        />
        
        <Select
          label="Filter by Status"
          options={[
            { value: '', label: 'All Statuses' },
            { value: 'Open', label: 'Open' },
            { value: 'Resolved', label: 'Resolved' },
          ]}
          value={statusFilter}
          onChange={handleStatusChange}
          fullWidth
        />
        
        <Input
          label="Search Issues"
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          icon={<Search className="h-5 w-5 text-gray-400" />}
        />
      </div>
      
      {(categoryFilter || statusFilter || searchQuery) && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            onClick={onResetFilters}
            size="sm"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default IssueFilters;