import { useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";
import { ErrorMessage } from "../utils/ErrorMessage";

export const useTodoError = () => {
  const message = useTodoStore((s) => s.errorMessage);
  const setErrorMessage = useTodoStore((s) => s.setErrorMessage);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage(ErrorMessage.DEFAULT_ERROR);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, setErrorMessage]);

  return {message, setErrorMessage}
};
