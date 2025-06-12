import React from 'react';
import Modal from '@/components/molecules/Modal';
import ProfileEditForm from '@/components/organisms/ProfileEditForm';

const ProfileEditModal = ({ isOpen, onClose, title, type, formData, setFormData, saving, onSave }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <ProfileEditForm
        type={type}
        formData={formData}
        setFormData={setFormData}
        saving={saving}
        onCancel={onClose}
        onSave={onSave}
      />
    </Modal>
  );
};

export default ProfileEditModal;