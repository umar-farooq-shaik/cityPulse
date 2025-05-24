import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck } from 'lucide-react';
import IssueForm from '../components/issues/IssueForm';
import Card, { CardBody } from '../components/ui/Card';
import { createIssue } from '../api/supabase';

const ReportIssuePage: React.FC = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (data: any) => {
    try {
      await createIssue({
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        status: 'Open',
      });
      
      setSubmitSuccess(true);
      
      // Reset success message and redirect after delay
      setTimeout(() => {
        setSubmitSuccess(false);
        navigate('/dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting issue:', error);
      alert('Failed to submit issue. Please try again.');
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Report an Issue</h1>
        <p className="mt-2 text-gray-600">
          Help improve your city by reporting issues you encounter
        </p>
      </div>
      
      {submitSuccess ? (
        <Card className="bg-green-50 border border-green-200 animate-fadeIn">
          <CardBody className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <ClipboardCheck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-green-800">Issue Reported Successfully!</h3>
            <p className="mt-2 text-green-600">
              Thank you for your submission. Redirecting to the dashboard...
            </p>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <IssueForm onSubmit={handleSubmit} />
          </CardBody>
        </Card>
      )}
      
      <div className="mt-8 bg-teal-50 rounded-lg p-6 border border-teal-100">
        <h3 className="text-lg font-medium text-teal-800">Tips for effective reporting:</h3>
        <ul className="mt-2 text-teal-700 space-y-1">
          <li>• Be specific about the issue's location</li>
          <li>• Include relevant details in your description</li>
          <li>• Select the most appropriate category</li>
          <li>• Provide context about potential impact</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportIssuePage;