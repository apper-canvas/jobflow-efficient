import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import InfoItem from '@/components/molecules/InfoItem';

const CompanyInfoCard = ({ companyName, location }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <Heading level={3} className="text-lg mb-4">
        About {companyName}
      </Heading>
      <div className="space-y-3 text-sm text-gray-600">
        <InfoItem iconName="Building2" iconClassName="w-4 h-4 text-gray-400">
          Technology Company
        </InfoItem>
        <InfoItem iconName="Users" iconClassName="w-4 h-4 text-gray-400">
          500-1000 employees
        </InfoItem>
        <InfoItem iconName="MapPin" iconClassName="w-4 h-4 text-gray-400">
          {location}
        </InfoItem>
        <InfoItem iconName="Globe" iconClassName="w-4 h-4 text-gray-400">
          www.{companyName.toLowerCase().replace(/\s+/g, '')}.com
        </InfoItem>
      </div>
    </div>
  );
};

export default CompanyInfoCard;