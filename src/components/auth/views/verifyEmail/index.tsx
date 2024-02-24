'use client';
import { FaRegCheckCircle } from 'react-icons/fa';

const VerifyEmail = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full flex items-center">
        <div>
          <div className="flex items-center mb-4">
            <FaRegCheckCircle className="text-green-500 text-4xl mr-4" />
            <h1 className="text-2xl font-bold text-gray-800">
              Registration Successful
            </h1>
          </div>
          <p className="text-lg text-gray-700 mb-4">
            Your registration was successful, but we are waiting for you to
            verify your email address.
          </p>
          <p className="text-sm text-gray-600">
            Please check your inbox and follow the instructions in the email to
            complete the verification process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
