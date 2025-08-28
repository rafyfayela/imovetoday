import React from 'react';
import { useAuthContext } from '../../../Provider/AuthProvider';

export default function MySession() {
  const { profile, loading } = useAuthContext();

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile?.full_name
  )}&background=0D8ABC&color=fff&rounded=true`;

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>Please log in</div>;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 12px',
      }}
    >
      <span style={{ color: 'black' }}>Hello, {profile.full_name}</span>
      <img
        src={profile.photo_url || fallbackAvatar}
        alt={profile.full_name}
        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
      />
    </div>
  );
}
