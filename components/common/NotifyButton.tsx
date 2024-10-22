"use client";

import React from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotifyButtonProps {
  authorPhone: string;
  postTitle: string;
  username: string;
  userPhone: string;
  userId: string;
  personname: string;
  resume: string; 
  available: boolean; 
}

const NotifyButton: React.FC<NotifyButtonProps> = ({ authorPhone, personname, postTitle, username, userPhone, userId, available, resume }) => {
  const sendSMS = async () => {
    if (!available) {
      toast.error('This listing is not available.');
      return; 
    }

    if (!resume) {
      toast.error('You cannot apply because you are not a caregiver. Please upload your resume.');
      return; 
    }

    try {
      const response = await axios.post('/api/send-sms', {
        authorPhone,
        postTitle,
        personname,
        username,
        userPhone,
        userId,
      });

      if (response.data.success) {
        toast.success('SMS sent successfully!');
      } else {
        toast.error(`Failed to send SMS: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      toast.error('There was an error sending the SMS.');
    }
  };

  return (
    <>
      <Button size="lg" onClick={sendSMS}>
        Apply
      </Button>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </>
  );
};

export default NotifyButton;
