import styles from '../InputField.module.css';

const NumberInput = ({ className, ...props }) => {
  return (
    <input
      className={`${styles.inputField} ${className}`}
      type="number"
      {...props}
    />
  );
};

export default NumberInput;
