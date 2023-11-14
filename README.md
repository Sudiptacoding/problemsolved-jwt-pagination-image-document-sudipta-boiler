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
