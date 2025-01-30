import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Local state for edit mode and form fields
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    // email: user?.email || '',
    profilePicture: user?.profilePicture || '/default-avatar.png',
  });

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/user/signIn');
    }
  }, [user, navigate]);

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile picture upload (Preview Only)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePicture: imageUrl });
    }
  };

  // Toggle Edit Mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle Save (Here you would send data to an API)
  const handleSave = () => {
    console.log('Saved Data:', formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container py-5 my-5 text-center">
      <h1>Welcome, {formData.firstName}!</h1>
      <div className="profile-details">
        {/* Profile Picture */}
        <img
          src={formData.profilePicture}
          alt="User Avatar"
          className="profile-avatar"
          style={{ width: '150px', borderRadius: '50%' }}
        />
        {isEditing && (
          <input type="file" accept="image/*" onChange={handleFileChange} />
        )}

        {/* Editable Form */}
        <div className="profile-info">
          <p>
            <strong>First Name:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            ) : (
              formData.firstName
            )}
          </p>

          <p>
            <strong>Last Name:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            ) : (
              formData.lastName
            )}
          </p>

          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        {/* Edit & Save Buttons */}
        <button onClick={toggleEdit} className="btn btn-primary m-2">
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
        {isEditing && (
          <button onClick={handleSave} className="btn btn-success m-2">
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
