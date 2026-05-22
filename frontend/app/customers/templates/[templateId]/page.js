import React from 'react';
import { Button } from '@/components/ui/button';
import { FaFacebook, FaTwitter, FaLinkedin, FaLink } from 'react-icons/fa';

const TemplatesDetailPage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-8  text-black dark:text-white">
    {/* Image Section */}
    <div className="lg:w-2/3 mb-6 lg:mb-0">
        <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIvu7fGhIyiqSpzyAFX2dZZJWModa3JEhUug&s" 
            alt="Template" 
            className="rounded-lg shadow-lg w-full"
        />
    </div>
      <div className="max-w-5xl mx-auto p-6 rounded-2xl ">
        <h1 className="text-3xl font-bold mb-4">Template Name</h1>
        <p className="text-gray-400 mb-4">
          For creating pages inside, require to use plugin: Pages manager. You will be able to create structure with designs: index, blog, contact us, etc.
        </p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2 text-black">
            <p className='text-black dark:text-white'>🛒 1 Sale</p>
            <p className='text-black dark:text-white'>📥 1 Download</p>
            <p className='text-black dark:text-white'>🔄 Last Update: Nov 25, 2023</p>
            <p className='text-black dark:text-white'>📅 Published: Mar 8, 2023</p>
          </div>
          
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <FaFacebook className="cursor-pointer text-blue-600" />
            <FaTwitter className="cursor-pointer text-blue-400" />
            <FaLinkedin className="cursor-pointer text-blue-700" />
            <FaLink className="cursor-pointer text-gray-400" />
          </div>
        </div>
        <div className="flex space-x-4">
            <Button className="bg-red-600">Add to Cart $199.00</Button>
            <Button className="bg-green-600">Live Preview</Button>
          </div>
      </div>
    </div>
  );
};

export default TemplatesDetailPage;
