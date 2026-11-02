import { useCallback, useEffect, useState } from "react";

/*
  Runs an async function (like loading products) and tells the page:
    data     - the result
    loading  - true while waiting
    error    - friendly error message, or ""
    reload() - try again

  Usage:  const { data, loading, error, reload } = useAsync(getProducts, []);
*/
export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setState((previous) => ({ ...previous, loading: true, error: "" }));

    asyncFn()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: "" });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err?.message || "Something went wrong. Please try again.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const reload = useCallback(() => setTick((value) => value + 1), []);

  return { ...state, reload };
}
