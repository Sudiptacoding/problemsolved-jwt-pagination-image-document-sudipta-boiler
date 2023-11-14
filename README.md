# Simple solution problem

- JWT fontend and backend

- Image uplode in image bb and genatate a url with progress

- Pagenation for show product

- React auto search with tooltip

- Slider for webside

- Image zoom with tilt

- Image Uplode With Progress
- import axios from 'axios';
import React, { useState } from 'react';

const ImageUplode = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadImageToImgBB = () => {
        const imgbbApiKey = '48262f7096c971f7f2f1b695ae2a6be0'; // Replace with your ImgBB API key

        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        setUploading(true);
        setUploadProgress(0);

        axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                key: imgbbApiKey,
            },
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(progress);
            },
        })
            .then(response => {
                setUploading(false);
                setImageUrl(response.data.data.url);
                console.log(response.data.data.url);
                // Use imageUrl to save it to MongoDB or perform other operations.
            })
            .catch(error => {
                setUploading(false);
                console.error(error);
            });
    };


    return (
        <div>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={uploadImageToImgBB}>Upload Image</button>

                {uploading && <div>Uploading: {uploadProgress}%</div>}

                {imageUrl && <img src={imageUrl} alt="Uploaded" />}
            </div>
        </div>
    );
};

export default ImageUplode;


- Cookie Setup

- 
-             .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            })




- Smooth Behaber

- <a onClick={() => document.getElementById('newApp').scrollIntoView({ behavior: 'smooth' })} className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-7 py-3.5 leading-6 border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700">
                                    <span>New Appartment</span>
                                </a>
