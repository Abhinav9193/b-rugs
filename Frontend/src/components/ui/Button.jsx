import './ui.css';

export function Button({ children, variant = 'primary', type = 'button', onClick, disabled, className = '', ariaLabel, ...props }) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="btn__text">{children}</span>
      <span className="btn__arrow" aria-hidden="true">→</span>
    </button>
  );
}
