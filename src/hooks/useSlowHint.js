import { useEffect, useState } from "react";

export default function useSlowHint(loading, delay = 4000) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!loading) {
      setSlow(false);
      return;
    }
    const timer = setTimeout(() => setSlow(true), delay);
    return () => clearTimeout(timer);
  }, [loading, delay]);

  return slow;
}
