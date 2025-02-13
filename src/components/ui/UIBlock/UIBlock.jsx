import styles from './UIBlock.module.css';

const UIBlock = ({ className, children, ...props }) => {
  return (
    <div className={`${styles.UIBlock} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default UIBlock;
