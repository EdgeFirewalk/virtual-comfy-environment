import styles from '../InputField.module.css';

const TextInput = ({ className, ...props }) => {
  return (
    <input
      className={`${styles.inputField} ${className}`}
      type="text"
      {...props}
    />
  );
};

export default TextInput;
