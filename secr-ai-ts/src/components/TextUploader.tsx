import React, { useState } from 'react';
import { S3 } from 'aws-sdk';
import './TextUploader.css'

const TextUploader: React.FC = () => {
  const [text,setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const s3 = new S3({
      region: 'eu-north-1',
      accessKeyId: '**************',
      secretAccessKey: '*********************',
    });

    const params: S3.PutObjectRequest = {
      Bucket: 'energy-bucket',
      Key: selectedFile.name,
      Body: selectedFile,
    };

    try {
      await s3.upload(params).promise();
      console.log('File uploaded successfully');
      setUploadStatus("File uploaded successfully")
      setText('');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus("Error uploading file")
    }
  };

  return (

  <div className="file-card">
    <input
      type="file"
      id="file-input"
      onChange={handleFileChange}
      accept=".csv"
      multiple={false}
      className="file-input"
    />
    <label htmlFor="file-input" className="file-input-label">
      Attach File
    </label>
    <button onClick={handleUpload} disabled={!selectedFile} className="upload-button">
      Upload
    </button>
    {uploadStatus && (
      <div className="upload-status">
        <p className="text-xsm">{uploadStatus}</p>
      </div>
    )}
  </div>
  );
};

export default TextUploader;
