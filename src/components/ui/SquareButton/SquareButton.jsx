import styles from './SquareButton.module.css';

const SquareButton = ({ className, icon, text, ...props }) => {
  if (icon && text) {
    return (
      <p className={styles.errorText}>
        SquareButton cannot have both icon AND text
      </p>
    );
  }

  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {icon}
      <p className={styles.text}>{text}</p>
    </button>
  );
};

export default SquareButton;
