'use client'
import { imageViewer } from '@/app/system-admin/lib/imageViewer';
import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const MerchantCard = ({ merchant }) => {
    const handleImageError = (e) => {
        e.target.src = '/path/to/default-image.png';
    };

    return (
        <div className=''>
            {/* Thumbnail Image with Hover Zoom */}
            <div className="p-6 rounded-xl shadow-sm">
                <h1 className="font-semibold mb-4">Identity Card:</h1>
                <figure className="relative">
                    <Zoom>
                        <img
                            src={imageViewer(merchant?.identityCard)}
                            alt="Enlarged Merchant Identity Card"
                            className="max-h-[30vh] object-contain hover:zoom-image"
                            onError={handleImageError}
                            width="300"
                            height={300}
                        />
                    </Zoom>
                    <figcaption>Merchant identity card.</figcaption>
                </figure>
            </div>
        </div>
    );
};

export default MerchantCard;
