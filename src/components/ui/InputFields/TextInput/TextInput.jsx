import styles from '../InputField.module.css';

const TextInput = ({ className, isValid, ...props }) => {
  return (
    <input
      className={`${styles.inputField} ${isValid === false ? styles.invalid : ''} ${className}`}
      type="text"
      {...props}
    />
  );
};

export default TextInput;
