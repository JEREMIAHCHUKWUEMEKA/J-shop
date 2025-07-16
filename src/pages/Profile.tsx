import {
    Box, Typography, Avatar, TextField, Button, Divider,  CircularProgress
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  import { auth, db, storage } from '../../src/firebase';
  import {
    updateProfile,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
  } from 'firebase/auth';
  import {
    doc, getDoc, setDoc,
  } from 'firebase/firestore';
  import {
    ref, uploadBytes, getDownloadURL
  } from 'firebase/storage';
  
  export default function Profile() {
    const user = auth.currentUser;
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
      bio: '',
      location: '',
      phone: '',
      website: '',
      birthday: '',
    });
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [message, setMessage] = useState('');
    const [passwordFields, setPasswordFields] = useState({
      current: '',
      new: '',
      confirm: '',
    });
  
    useEffect(() => {
      const fetchProfile = async () => {
        if (!user) return;
        const docRef = doc(db, 'users', user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setProfile(snap.data() as any);
        }
        setLoading(false);
      };
      fetchProfile();
    }, [user]);
  
    const handleSaveProfile = async () => {
      if (!user) return;
  
      setMessage('Saving...');
      try {
        if (photo) {
          const storageRef = ref(storage, `profilePics/${user.uid}`);
          await uploadBytes(storageRef, photo);
          const url = await getDownloadURL(storageRef);
          await updateProfile(user, { photoURL: url });
          setPhotoURL(url);
        }
  
        await updateProfile(user, { displayName });
        await setDoc(doc(db, 'users', user.uid), profile);
        setMessage('Profile updated successfully.');
      } catch (err: any) {
        setMessage(err.message || 'Error updating profile.');
      }
    };
  
    const handlePasswordChange = async () => {
      const { current, new: newPass, confirm } = passwordFields;
      setMessage('');
      if (newPass !== confirm) return setMessage('New passwords do not match.');
  
      try {
        const credential = EmailAuthProvider.credential(user?.email || '', current);
        await reauthenticateWithCredential(user!, credential);
        await updatePassword(user!, newPass);
        setMessage('Password updated successfully.');
        setPasswordFields({ current: '', new: '', confirm: '' });
      } catch (err: any) {
        setMessage(err.message);
      }
    };
  
    if (loading) {
      return (
        <Box p={4} textAlign="center">
          <CircularProgress />
        </Box>
      );
    }
  
    return (
      <Box p={4} maxWidth={800} mx="auto">
        <Typography variant="h4" mb={3}>My Profile</Typography>

        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar src={photoURL || undefined} sx={{ width: 80, height: 80 }} />
          <Button variant="outlined" component="label">
            Upload Photo
            <input hidden type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} />
          </Button>
        </Box>
  
        <TextField
          label="Full Name"
          fullWidth
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          fullWidth
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Bio"
          fullWidth
          multiline
          rows={3}
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Location"
          fullWidth
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Website"
          fullWidth
          value={profile.website}
          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Birthday"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={profile.birthday}
          onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
          sx={{ mb: 3 }}
        />
  
        <Button variant="contained" onClick={handleSaveProfile}>
          Save Profile
        </Button>
  
        <Divider sx={{ my: 4 }} />
  
        <Typography variant="h6" gutterBottom>Change Password</Typography>
        <TextField
          label="Current Password"
          type="password"
          fullWidth
          value={passwordFields.current}
          onChange={(e) => setPasswordFields({ ...passwordFields, current: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={passwordFields.new}
          onChange={(e) => setPasswordFields({ ...passwordFields, new: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          value={passwordFields.confirm}
          onChange={(e) => setPasswordFields({ ...passwordFields, confirm: e.target.value })}
          sx={{ mb: 2 }}
        />
  
        <Button variant="outlined" onClick={handlePasswordChange}>
          Update Password
        </Button>
  
        {message && <Typography mt={2} color="primary">{message}</Typography>}
      </Box>
    );
  }
  