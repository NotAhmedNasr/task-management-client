'use client';

import { AlertMessageAction } from '@/lib/types/alertMessage';

interface Props {
  title: string;
  message: string;
  note?: string;
  icon?: React.ReactNode;
  action?: AlertMessageAction;
}

const AlertMessage: React.FC<Props> = ({
  message,
  title,
  note,
  icon,
  action,
}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div>
          <div className="flex items-center mb-4">
            <div className="text-4xl mr-4">{icon}</div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          </div>
          <p className="text-lg text-gray-700 mb-4">{message}</p>
          {note && <p className="text-sm text-gray-600">{note}</p>}
          {action && (
            <button
              onClick={action?.handler}
              className="bg-blue-500 ml-auto block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              {action?.name}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertMessage;
