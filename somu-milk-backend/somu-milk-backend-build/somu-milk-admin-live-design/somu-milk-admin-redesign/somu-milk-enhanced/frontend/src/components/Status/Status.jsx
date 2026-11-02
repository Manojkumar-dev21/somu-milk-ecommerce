import "./Status.css";

export function PageLoader({ message = "Loading..." }) {
  return (
    <div className="status-box" role="status" aria-live="polite">
      <div className="status-spinner" />
      <p>{message}</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status-box status-error" role="alert">
      <i className="bi bi-exclamation-triangle" />
      <p>{message || "Something went wrong."}</p>

      {onRetry && (
        <button type="button" className="status-retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
