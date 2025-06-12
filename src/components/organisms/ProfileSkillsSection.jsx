import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';
import SkillTag from '@/components/molecules/SkillTag';

const ProfileSkillsSection = ({ profile, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <Heading level={2} className="text-xl">Skills</Heading>
        <Button
          variant="ghost"
          className="px-3 py-1 text-sm"
          onClick={() => onEdit('skills', { skills: profile?.skills || [] })}
        >
          <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
          <span>Edit</span>
        </Button>
      </div>

      {profile?.skills?.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <SkillTag key={skill} skill={skill} index={index} />
          ))}
        </div>
      ) : (
        <Paragraph className="italic">No skills added yet</Paragraph>
      )}
    </motion.div>
  );
};

export default ProfileSkillsSection;