import React from 'react';
import { motion } from 'framer-motion';
import Pill from '@/components/atoms/Pill';

const SkillTag = ({ skill, index }) => {
  return (
    <motion.span
      key={skill}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Pill variant="primary">{skill}</Pill>
    </motion.span>
  );
};

export default SkillTag;