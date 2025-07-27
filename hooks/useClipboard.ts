
import { useState, useCallback } from 'react';

export const useClipboard = (timeout = 2000): [boolean, (text: string) => void] => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), timeout);
      });
    }
  }, [timeout]);

  return [isCopied, copy];
};
