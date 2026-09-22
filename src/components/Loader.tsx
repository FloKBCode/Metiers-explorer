interface LoaderProps {
  message?: string;
}

export function Loader({ message = "Chargement..." }: LoaderProps) {
  return (
    <div role="status" aria-live="polite" className="loader">
      <span className="loader__spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}