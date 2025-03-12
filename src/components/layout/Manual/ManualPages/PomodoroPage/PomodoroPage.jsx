import styles from './PomodoroPage.module.css';
import typography from '../Typography.module.css';

const PomodoroPage = () => {
  return (
    <>
      <h1 className={typography.title}>Pomodoro Timer</h1>
      <p className={typography.paragraph}>
        If you are not familiar with the Pomodoro technique for time management,
        you can read about it{' '}
        <a
          className={typography.link}
          href="https://www.todoist.com/productivity-methods/pomodoro-technique"
          target="_blank"
        >
          here
        </a>
        .
      </p>
      <p className={typography.paragraph}>Our timer is fold by default:</p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\PomodoroPage\images\fold-pomodoro.png"
      />
      <p className={typography.paragraph}>
        At the moment, you can only see the time remaining until the end of the
        current timer stage.
      </p>
      <p className={typography.paragraph}>
        When you expand the timer, you will see its main view:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\PomodoroPage\images\timer-unfold.png"
      />
      <p className={typography.paragraph}>There are three timer stages:</p>
      <div className={typography.list}>
        <p className={typography.paragraph}>- Pomodoro — </p>
        <p className={typography.paragraph}>- Short Break — </p>
        <p className={typography.paragraph}>- Long Break — </p>
      </div>
      <p className={typography.paragraph}>
        You can <span>start</span> and <span>pause</span> the timer by clicking on that big blue button.
      </p>
      <p className={typography.paragraph}>
        If you want to restart the stage, you have to switch to another timer stage and switch back to the desired stage of the timer.
      </p>
      <p className={typography.paragraph}>
        At the bottom left
      </p>
    </>
  );
};

export default PomodoroPage;
