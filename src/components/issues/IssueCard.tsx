import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Card, { CardBody, CardFooter, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import IssueStatusBadge from '../ui/IssueStatusBadge';
import CategoryBadge from '../ui/CategoryBadge';
import { Issue } from '../../types/issue';
import { CheckCircle } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
  onMarkAsResolved: (id: string) => void;
  loading?: boolean;
}

const IssueCard: React.FC<IssueCardProps> = ({ 
  issue, 
  onMarkAsResolved,
  loading = false
}) => {
  const handleResolveClick = () => {
    onMarkAsResolved(issue.id);
  };
  
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  return (
    <Card hoverable className="h-full flex flex-col">
      <CardHeader className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900 pr-2">{issue.title}</h3>
        <div className="flex space-x-2">
          <CategoryBadge category={issue.category} />
          <IssueStatusBadge status={issue.status} />
        </div>
      </CardHeader>
      <CardBody className="flex-grow">
        <p className="text-gray-600 mb-2">
          <span className="font-medium text-gray-700">Location:</span> {issue.location}
        </p>
        <p className="text-gray-600 line-clamp-3">{issue.description}</p>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <Badge variant="default" className="text-gray-600">
          {formatDate(issue.createdAt)}
        </Badge>
        {issue.status === 'Open' && (
          <Button 
            size="sm"
            variant="outline"
            onClick={handleResolveClick}
            disabled={loading}
            loading={loading}
            icon={<CheckCircle size={16} />}
          >
            Mark Resolved
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default IssueCard;