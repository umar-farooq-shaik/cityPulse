import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || Math.random().toString(36).substring(2, 9);
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={`
            block w-full rounded-md border-gray-300
            focus:border-teal-500 focus:ring-teal-500 sm:text-sm
            bg-white px-3 py-2 border shadow-sm
            disabled:opacity-70 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;