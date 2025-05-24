import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  AlertTriangle,
  MapPin,
  MessageSquare,
  Tag,
  FileText
} from 'lucide-react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Category } from '../../types/issue';
import { aiSuggestCategory } from '../../api/supabase';

interface IssueFormData {
  title: string;
  description: string;
  category: Category;
  location: string;
}

interface IssueFormProps {
  onSubmit: (data: IssueFormData) => Promise<void>;
}

const IssueForm: React.FC<IssueFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IssueFormData>({
    defaultValues: {
      category: 'Other',
    },
  });
  
  const onFormSubmit = async (data: IssueFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAiSuggest = async () => {
    const description = watch('description');
    if (!description || description.length < 10) return;
    
    setCategoryLoading(true);
    try {
      const suggestedCategory = await aiSuggestCategory(description);
      setValue('category', suggestedCategory);
    } catch (error) {
      console.error('Error getting category suggestion:', error);
    } finally {
      setCategoryLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="space-y-4">
        <Input
          label="Issue Title"
          placeholder="Brief title describing the issue"
          fullWidth
          icon={<FileText className="h-5 w-5 text-gray-400" />}
          error={errors.title?.message}
          {...register('title', { 
            required: 'Title is required',
            minLength: {
              value: 5,
              message: 'Title must be at least 5 characters'
            },
            maxLength: {
              value: 100,
              message: 'Title must be less than 100 characters'
            }
          })}
        />
        
        <TextArea
          label="Description"
          placeholder="Please provide details about the issue"
          rows={5}
          fullWidth
          error={errors.description?.message}
          {...register('description', { 
            required: 'Description is required',
            minLength: {
              value: 20,
              message: 'Description must be at least 20 characters'
            }
          })}
        />
        
        <div className="flex justify-between items-end">
          <Select
            label="Category"
            options={[
              { value: 'Garbage', label: 'Garbage' },
              { value: 'Pothole', label: 'Pothole' },
              { value: 'Lighting', label: 'Lighting' },
              { value: 'Safety', label: 'Safety' },
              { value: 'Other', label: 'Other' },
            ]}
            fullWidth
            error={errors.category?.message}
            {...register('category', { required: 'Category is required' })}
          />
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mb-4 ml-2"
            onClick={handleAiSuggest}
            loading={categoryLoading}
            disabled={!watch('description') || watch('description').length < 10}
          >
            Suggest Category
          </Button>
        </div>
        
        <Input
          label="Location"
          placeholder="Enter the address or location"
          fullWidth
          icon={<MapPin className="h-5 w-5 text-gray-400" />}
          error={errors.location?.message}
          {...register('location', { 
            required: 'Location is required',
            minLength: {
              value: 5,
              message: 'Location must be at least 5 characters'
            }
          })}
        />
      </div>
      
      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
          size="lg"
          className="font-semibold"
        >
          Submit Issue Report
        </Button>
      </div>
    </form>
  );
};

export default IssueForm;