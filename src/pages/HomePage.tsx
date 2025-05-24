import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ClipboardEdit, BarChart3 } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-6 sm:py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
          <span className="text-teal-700">City</span>
          <span>Pulse</span>
        </h1>
        <p className="mt-5 text-xl text-gray-500">
          Empowering citizens to report and track urban civic issues for a better community
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate('/report')}
            icon={<ClipboardEdit className="h-5 w-5" />}
          >
            Report an Issue
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/dashboard')}
            icon={<BarChart3 className="h-5 w-5" />}
          >
            View Issues
          </Button>
        </div>
      </div>
      
      <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
            <div className="mt-6 space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-teal-700">1</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Report an Issue</h3>
                  <p className="mt-1 text-gray-500">Submit details about urban issues you encounter</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-teal-700">2</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Track Progress</h3>
                  <p className="mt-1 text-gray-500">Monitor the status of reported issues</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-teal-700">3</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">See Results</h3>
                  <p className="mt-1 text-gray-500">Help improve your community through citizen engagement</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-teal-700 p-8 text-white flex items-center">
            <div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="mt-4">
                CityPulse is dedicated to improving urban environments by empowering citizens to actively participate in identifying and resolving civic issues. By streamlining communication between residents and city administrators, we facilitate faster problem resolution and promote community engagement.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate('/stats')}
                  className="border-white text-white hover:bg-white hover:text-teal-700"
                >
                  View City Stats
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;