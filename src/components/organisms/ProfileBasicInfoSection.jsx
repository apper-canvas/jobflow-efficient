import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';
import ProfileAvatar from '@/components/molecules/ProfileAvatar';
import InfoItem from '@/components/molecules/InfoItem';

const ProfileBasicInfoSection = ({ profile, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-8"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-6">
          <ProfileAvatar initial={profile?.name?.charAt(0) || 'U'} />
          <div>
            <Heading level={1} className="text-3xl mb-2">
              {profile?.name || 'User Name'}
            </Heading>
            <div className="space-y-1 text-gray-600">
<InfoItem iconName="Mail" iconClassName="w-4 h-4">
                {profile?.email || 'No email provided'}
              </InfoItem>
              {profile?.phone && (
                <InfoItem iconName="Phone" iconClassName="w-4 h-4">
                  {profile.phone}
                </InfoItem>
              )}
              {profile?.location && (
                <InfoItem iconName="MapPin" iconClassName="w-4 h-4">
                  {profile.location}
                </InfoItem>
              )}
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="px-4 py-2"
          onClick={() => onEdit('basic', profile)}
        >
          <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
          <span>Edit</span>
        </Button>
</div>

      {profile?.summary && (
        <div>
          <Heading level={3} className="text-lg mb-2">
            Professional Summary
          </Heading>
          <Paragraph className="leading-relaxed">{profile.summary}</Paragraph>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileBasicInfoSection;