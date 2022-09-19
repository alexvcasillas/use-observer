import { useState, useRef, useEffect, useCallback } from 'react';

type ObserverType = {
  threshold: number;
  rootMargin?: string;
  once?: boolean;
};

export function useObserver({
  threshold,
  rootMargin = '0px',
  once = false,
}: ObserverType) {
  const [inView, setInView] = useState<boolean>();
  const ref = useRef<any>();
  const iObserverRef = useRef<IntersectionObserver>();

  const updateInView = useCallback(
    (val: boolean) => {
      if (inView && once) {
        return;
      }
      setInView(val);
    },
    [inView, once]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: rootMargin,
      threshold: threshold,
    };

    iObserverRef.current = new IntersectionObserver(entries => {
      updateInView(entries[0].isIntersecting);
    }, options);
  });

  useEffect(() => {
    if (ref.current) {
      iObserverRef?.current?.observe(ref.current);
    }

    const reference = ref.current;

    return () => {
      if (reference) {
        iObserverRef.current?.unobserve(reference);
        iObserverRef.current?.disconnect();
      }
    };
  });

  return { inView, ref };
}
