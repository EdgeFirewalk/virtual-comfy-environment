import styles from './AppSizeWarning.module.css';

const AppSizeWarning = () => {
  return (
    <div className={styles.warning}>
      <p className={styles.title}>SORRY, THIS SCREEN SIZE IS NOT SUPPORTED</p>
      <p className={styles.text}>Try using desktop version of the site</p>
    </div>
  );
};

export default AppSizeWarning;
