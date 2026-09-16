import type { ReactNode } from "react";
import type { RequestState } from "../types";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";

interface AsyncBoundaryProps<T> {
  state: RequestState<T>;
  children: (data: T) => ReactNode;
  loadingMessage?: string;
  onRetry?: () => void;
}

export function AsyncBoundary<T>({ state, children, loadingMessage, onRetry }: AsyncBoundaryProps<T>) {
  switch (state.status) {
    case "idle":
      return null;
    case "loading":
      return <Loader message={loadingMessage} />;
    case "error":
      return <ErrorMessage message={state.error} onRetry={onRetry} />;
    case "success":
      return <>{children(state.data)}</>;
  }
}