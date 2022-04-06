import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import CloudIcon from '../assets/svg/cloud-icon.svg';

export function MyDropzone({ handler }) {
    const onDrop = useCallback(acceptedFiles => {
        handler(acceptedFiles[0]);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <>
                <div className='pod-file-picker'>
                    <img src={CloudIcon} alt="cloud icon" />
                    <div>
                        <div className="pod-file-picker-instruction">
                            Drop an image file here or click to upload
                        </div>
                        <div className="pod-file-picker-types">
                            .Jpeg or .Png up to 512KB in size. 700px x
                            700px high resolution recommended
                        </div>
                    </div>
                </div>
                <input
                    {...getInputProps()}
                    style={{ display: "none" }}
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/tiff"
                    // onChange={(e) => {
                    //     setUploadPicture();
                    //     handleFile(e, "artwork");
                    // }}
                />
            </>
            {/* {
        isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
    } */}
        </div >
    )
}