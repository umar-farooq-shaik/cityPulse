import React from 'react';
import Badge from './Badge';
import { Status } from '../../types/issue';

interface IssueStatusBadgeProps {
  status: Status;
  className?: string;
}

const IssueStatusBadge: React.FC<IssueStatusBadgeProps> = ({ status, className }) => {
  const variant = status === 'Open' ? 'warning' : 'success';
  
  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
};

export default IssueStatusBadge;