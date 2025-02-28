import styles from './AppSizeWarning.module.css';

const AppSizeWarning = () => {
  return (
    <div className={styles.warning}>
      <p className={`${styles.title} ${styles.portrait}`}>
        PORTRAIT ORIENTATION IS NOT SUPPORTED
      </p>
      <p className={`${styles.text} ${styles.portrait}`}>
        Try switching to landscape orientation
      </p>

      <p className={`${styles.title} ${styles.size}`}>
        SORRY, THIS SCREEN SIZE IS NOT SUPPORTED
      </p>
      <p className={`${styles.text} ${styles.size}`}>
        Try using desktop version of the site
      </p>
    </div>
  );
};

export default AppSizeWarning;
