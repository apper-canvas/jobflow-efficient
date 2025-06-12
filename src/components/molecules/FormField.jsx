import React from 'react';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Select from '@/components/atoms/Select';
import Checkbox from '@/components/atoms/Checkbox';

const FormField = ({ label, id, type = 'text', options, checkboxLabel, children, className, ...rest }) => {
  const renderControl = () => {
    switch (type) {
      case 'textarea':
        return <Textarea id={id} {...rest} />;
      case 'select':
        return <Select id={id} options={options} {...rest} />;
      case 'checkbox':
        return <Checkbox id={id} label={checkboxLabel} {...rest} />;
      default:
        return <Input id={id} type={type} {...rest} />;
    }
  };

  return (
    <div className={className}>
      {type !== 'checkbox' &amp;&amp; label &amp;&amp; (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {renderControl()}
      {children} {/* For any additional elements like description or error messages */}
    </div>
  );
};

export default FormField;