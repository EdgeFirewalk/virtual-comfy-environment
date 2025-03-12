import styles from './AboutPage.module.css';
import typography from '../Typography.module.css';

const AboutPage = () => {
  return (
    <>
      <div className={styles.upperTexts}>
        <h3>Welcome to</h3>
        <h3>your own</h3>
        <h2>Virtual Comfortable Environment</h2>
        <p className={styles.description}>an application made with ❤️ by:</p>
      </div>
      <div className={styles.authors}>
        <div className={styles.author}>
          <img
            className={styles.authorImg}
            src="https://avatars.githubusercontent.com/u/64972579?v=4"
            alt="Igor Lubenskiy"
          />
          <h4 className={styles.authorName}>Igor Lubenskiy</h4>
          <div className={styles.media}>
            <a href="https://github.com/EdgeFirewalk" target="_blank">
              <img
                className={styles.linkImg}
                src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                alt="GitHub"
              />
            </a>
          </div>
        </div>
        <div className={styles.author}>
          <img
            className={styles.authorImg}
            src="https://avatars.githubusercontent.com/u/125197669?v=4"
            alt="Anna Tupota"
          />
          <h4 className={styles.authorName}>Anna Tupota</h4>
          <div className={styles.media}>
            <a href="https://github.com/AnnaTupota" target="_blank">
              <img
                className={styles.linkImg}
                src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                alt="GitHub"
              />
            </a>
          </div>
        </div>
      </div>
      <p className={typography.paragraph}>
        A place where you can study, work, workout, cook, chill, fall asleep, or
        do anything else that you want to feel relaxed and focused while doing.
      </p>
      <h3 className={typography.heading}>
        The app has all the necessary tools for you to focus and keep track of
        time:
      </h3>
      <div className={typography.list}>
        <p className={typography.paragraph}>🌄 Environmental Sounds</p>
        <p className={typography.paragraph}>🎵 Background Music</p>
        <p className={typography.paragraph}>⏳ Pomodoro Timer</p>
      </div>
      <p className={typography.paragraph}>
        📖 You can read about all of the features and how to use them in our
        comprehensive manual inside the app.
      </p>
      <h3 className={typography.heading}>
        ⚙️ The tools are fully customizable.
      </h3>
      <p className={typography.paragraph}>
        You can add any sounds you want, play any music you like, and set up the
        timer however you prefer.
      </p>
      <h3 className={typography.heading}>
        😊 Create your own environment and make yourself comfortable.
      </h3>
    </>
  );
};

export default AboutPage;
