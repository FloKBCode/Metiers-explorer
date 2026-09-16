import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../api/client";
import type { RequestState } from "../types";

export function useFetch<T>(path: string | null): RequestState<T> {
  const [state, setState] = useState<RequestState<T>>({ status: "idle" });
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!path) {
      setState({ status: "idle" });
      return;
    }

    const currentRequestId = ++requestIdRef.current;
    setState({ status: "loading" });

    apiFetch<T>(path)
      .then((data) => {
        if (currentRequestId === requestIdRef.current) {
          setState({ status: "success", data });
        }
      })
      .catch((err: Error) => {
        if (currentRequestId === requestIdRef.current) {
          setState({ status: "error", error: err.message });
        }
      });
  }, [path]);

  return state;
}