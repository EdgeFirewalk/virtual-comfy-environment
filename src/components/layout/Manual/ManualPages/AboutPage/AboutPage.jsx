import styles from './AboutPage.module.css';

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
            <a href="https://github.com/EdgeFirewalk">
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
            <a href="https://github.com/AnnaTupota">
              <img
                className={styles.linkImg}
                src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                alt="GitHub"
              />
            </a>
          </div>
        </div>
      </div>
      <p>
        A place where you can study, work, workout, cook, chill, fall asleep, or
        do anything else that you want to feel relaxed and focused while doing.
      </p>
      <h3>
        The app has all the necessary tools for you to focus and keep track of
        time:
      </h3>
      <p>🌄 Environmental Sounds</p>
      <p>🎵 Background Music</p>
      <p>⏳ Pomodoro Timer</p>
      <p>
        📖 You can read about all of the features and how to use them in our
        comprehensive manual inside the app.
      </p>
    </>
  );
};

export default AboutPage;
