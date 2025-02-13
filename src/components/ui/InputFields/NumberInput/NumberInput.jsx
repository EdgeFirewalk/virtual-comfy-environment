import styles from '../InputField.module.css';

const NumberInput = ({ className, isValid, ...props }) => {
  return (
    <input
      className={`${styles.inputField} ${isValid === false ? styles.invalid : ''} ${className}`}
      type="number"
      {...props}
    />
  );
};

export default NumberInput;
