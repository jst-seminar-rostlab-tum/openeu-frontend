import React from 'react';

interface SampleComponentProps {
  title: string;
  description: string;
}

const SampleComponent: React.FC<SampleComponentProps> = ({
  title,
  description,
}) => {
  return (
    <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
        Learn More
      </button>
    </div>
  );
};

export default SampleComponent;
