import { useEffect, useState } from 'react';

export function useRotatingText(items, intervalMs = 9000, fadeMs = 500) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (items.length <= 1) return undefined;

    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setVisible(true);
      }, fadeMs);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [items.length, intervalMs, fadeMs]);

  return { index, visible };
}
