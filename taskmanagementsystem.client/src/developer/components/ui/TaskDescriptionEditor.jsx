import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const EditorComponent = ({ setTask, task, initialValue, handleEditorChange , editorHeight = 300 }) => {

    const handleImageUpload = async (blobInfo, success, failure) => {
        try {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                success(response.data.imageUrl);
            } else {
                failure('HTTP Error: ' + response.status);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            failure('Error uploading image');
        }
    };

    const initialContent = initialValue ? initialValue.toString() : '';

    return (
        <Editor
            apiKey='a8q0posg6rjxpcsfyuofahqd8m9mwiyxrhp309gufer8ddtg'
            initialValue={initialContent}
            init={{
                minHeight: editorHeight,
                menubar: 'tools',
                plugins: 'image table emoticons',
                toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | table | emoticons | image',
                content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; .tox-edit-area {background- color: #0d7ded !important;} .tox-statusbar__branding { display: none !important; }',
                images_upload_handler: handleImageUpload,
                branding: false,
                resize: false,
            }}
            onEditorChange={handleEditorChange}
            className=""
        />
    );
};

export default EditorComponent;
