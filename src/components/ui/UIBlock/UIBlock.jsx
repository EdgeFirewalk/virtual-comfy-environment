import styles from './UIBlock.module.css';

const UIBlock = ({ className, children }) => {
  return <div className={`${styles.UIBlock} ${className}`}>{children}</div>;
};

export default UIBlock;
