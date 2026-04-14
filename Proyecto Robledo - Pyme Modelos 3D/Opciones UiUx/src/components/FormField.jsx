import React from 'react';
import PropTypes from 'prop-types';
import '../styles/FormField.css';

/**
 * COMPONENTE REUTILIZABLE - FormField
 * Input control genérico para forms
 * Optimizado con memoización
 */
const FormField = React.memo(({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  options = [],
  isDarkMode = false
}) => {
  const className = `form-field ${isDarkMode ? 'dark' : 'light'} ${error ? 'error' : ''}`;

  if (type === 'select') {
    return (
      <div className={className}>
        {label && (
          <label htmlFor={name}>
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="">Seleccionar...</option>
          {options.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className={className}>
        {label && (
          <label htmlFor={name}>
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows="4"
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

FormField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'number', 'password', 'select', 'textarea']),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string
  })),
  isDarkMode: PropTypes.bool
};

FormField.displayName = 'FormField';

export default FormField;
