// pages/about.js
import Navigation from '@/components/site/navigation';
import Image from 'next/image';
import React from 'react';

export default function About() {
  return (<>
    <Navigation/>
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <section className="max-w-6xl w-full mx-auto px-6 py-12 flex flex-col lg:flex-row items-center">
        {/* Left Content - Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Helping businesses deliver 
            <span className="text-green-600"> exceptional</span> buyer experiences.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Vidyard is the leading video messaging and asynchronous communications platform 
            for go-to-market teams. Millions of sales professionals and more than 250,000 
            go-to-market teams use Vidyard’s AI-powered video messaging, video hosting, 
            and digital sales rooms to connect with more prospects and generate more revenue.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300">
            Sign Up for Free
          </button>
        </div>

        {/* Right Content - Image Section */}
        <div className="lg:w-1/2 mt-8 lg:mt-0 relative flex justify-center">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src="/about.png" // Make sure the image path is correct in your project
              alt="About Us Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
