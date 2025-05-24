import React from 'react';
import Badge from './Badge';
import { Category } from '../../types/issue';
import { Trash2, FileWarning as RoadWarning, Lightbulb, ShieldAlert, HelpCircle } from 'lucide-react';

interface CategoryBadgeProps {
  category: Category;
  className?: string;
  showIcon?: boolean;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  category, 
  className = '',
  showIcon = true
}) => {
  const getIcon = () => {
    switch (category) {
      case 'Garbage':
        return <Trash2 size={12} className="mr-1" />;
      case 'Pothole':
        return <RoadWarning size={12} className="mr-1" />;
      case 'Lighting':
        return <Lightbulb size={12} className="mr-1" />;
      case 'Safety':
        return <ShieldAlert size={12} className="mr-1" />;
      case 'Other':
      default:
        return <HelpCircle size={12} className="mr-1" />;
    }
  };
  
  return (
    <Badge variant="primary" className={className}>
      {showIcon && getIcon()}
      {category}
    </Badge>
  );
};

export default CategoryBadge;