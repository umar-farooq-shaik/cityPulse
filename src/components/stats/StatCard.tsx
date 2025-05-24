import React from 'react';
import Card, { CardBody } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  className = '',
}) => {
  return (
    <Card className={`h-full ${className}`}>
      <CardBody>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
            {change && (
              <p className={`mt-2 text-sm ${
                change.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{change.isPositive ? '+' : ''}{change.value}%</span>
                <span className="sr-only">
                  {change.isPositive ? 'Increased' : 'Decreased'} by
                </span>
              </p>
            )}
          </div>
          <div className="p-2 bg-teal-50 rounded-lg">
            {React.cloneElement(icon as React.ReactElement, {
              className: 'text-teal-600 h-6 w-6',
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatCard;