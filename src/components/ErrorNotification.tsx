import { ErrorMessage } from '../utils/ErrorMessage';
import { useTodoError } from '../hooks/useTodoError';

export const ErrorNotification = () => {
  const {message, setErrorMessage} = useTodoError()

  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50">
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={() => setErrorMessage(ErrorMessage.DEFAULT_ERROR)}
          className="ml-4 text-red-500 hover:text-red-700 font-bold text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};
