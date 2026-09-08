import "./ui.css";

export function Textarea({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  required,
  rows = 5,
  ...props
}) {
  return (
    <div className={`form-field ${error ? "form-field--error" : ""}`}>
      <label htmlFor={id} className="form-field__label">
        {label}
        {required && (
          <span className="form-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-field__textarea"
        required={required}
        rows={rows}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="form-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
