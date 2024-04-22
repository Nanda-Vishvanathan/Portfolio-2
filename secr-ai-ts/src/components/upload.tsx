import React from 'react';
import TextUploader from './TextUploader';
import './upload.css'

const UploadPage: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-100 to-green-100 animate-gradient"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <span className="text-5xl text-center text-blue font-bold mb-10">secr.ai</span>
        <span className="text-2xl text-center text-blue mb-10">Hi! Please attach your energy usage file (in CSV)</span>
        <div className="mb-10">
          <TextUploader />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;


