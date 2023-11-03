
import axios from 'axios';
import React from 'react';


const ImageuplodeinImagebb = () => {

    const uploadImageToImgBB = () => {
        const imgbbApiKey = '48262f7096c971f7f2f1b695ae2a6be0';
        const fileInput = document.getElementById('fileInput');
        const selectedFile = fileInput.files[0];
        const formData = new FormData();
        formData.append('image', selectedFile);
        axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                key: imgbbApiKey,
            },
        })
            .then(response => {
                const imageUrl = response.data.data.url;
                // Use imageUrl to save it to MongoDB or perform other operations.
                console.log(imageUrl)
            })
            .catch(error => {
                console.error(error);
            });
    };
    return (
        <div>
            <div>
                <input type="file" id="fileInput" />
                <button onClick={uploadImageToImgBB}>Upload Image</button>
            </div>
        </div>
    );
};

export default ImageuplodeinImagebb;