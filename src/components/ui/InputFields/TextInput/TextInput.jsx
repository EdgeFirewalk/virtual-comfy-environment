import styles from '../InputField.module.css';

const TextInput = ({ className, isValid, ...props }) => {
  return (
    <input
      className={`${styles.inputField} ${!isValid && styles.invalid} ${className}`}
      type="text"
      {...props}
    />
  );
};

export default TextInput;
