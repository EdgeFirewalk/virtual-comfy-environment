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
        </a>{' '}
        (you can click on the link).
      </p>
      <p className={typography.paragraph}>
        The Pomodoro timer is located in the{' '}
        <span className={typography.info}>top-left corner</span> of the app.
      </p>
      <p className={typography.paragraph}>
        Our timer is <span className={typography.info}>folded</span> by default:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\PomodoroPage\images\fold-pomodoro.png"
      />
      <p className={typography.paragraph}>
        At the moment, you can only see the time remaining until the end of the
        current <span className={typography.info}>timer stage</span>.
      </p>
      <p className={typography.paragraph}>
        When you expand the timer, you will see its{' '}
        <span className={typography.info}>main view</span>:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\PomodoroPage\images\timer-unfold.png"
      />
      <p className={typography.paragraph}>
        There are three <span className={typography.info}>timer stages</span>:
      </p>
      <div className={typography.list}>
        <p className={typography.paragraph}>
          - <span className={typography.info}>Pomodoro</span> — the stage in
          which you work on a specific task.
        </p>
        <p className={typography.paragraph}>
          - <span className={typography.info}>Short Break</span> — the stage
          that occurs after each Pomodoro.
        </p>
        <p className={typography.paragraph}>
          - <span className={typography.info}>Long Break</span> — the stage that
          occurs after a certain number of Pomodoros.
        </p>
      </div>
      <p className={typography.paragraph}>
        You can <span className={typography.info}>start</span> and{' '}
        <span className={typography.info}>pause</span> the timer by clicking on
        the <span className={typography.info}>big blue button</span>.
      </p>
      <p className={typography.paragraph}>
        If you want to <span className={typography.info}>restart</span> the
        stage, you need to switch to another timer stage and then switch back to
        the desired stage.
      </p>
      <p className={typography.paragraph}>
        In the bottom-left corner, you can see the{' '}
        <span className={typography.info}>number of Pomodoros</span> completed
        during the current session.
      </p>
      <p className={typography.paragraph}>
        The <span className={typography.info}>session</span> starts when you
        launch the app (or refresh the page). This means that the number of
        Pomodoros will reset to zero the next time you start the app or refresh
        the page.
      </p>
      <p className={typography.paragraph}>
        The current <span className={typography.info}>timer stage</span> will
        also reset to 'Pomodoro' when you refresh the page.
      </p>
      <p className={typography.paragraph}>
        You can access the{' '}
        <span className={typography.info}>settings menu</span> by clicking the
        button in the top-right corner of the{' '}
        <span className={typography.info}>main view</span>:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\PomodoroPage\images\timer-settings.png"
      />
      <p className={typography.paragraph}>
        In the settings, you can configure the{' '}
        <span className={typography.info}>duration</span> of each timer stage,
        the
        <span className={typography.info}> number</span> of Pomodoros before a
        long break, and enable or disable the
        <span className={typography.info}> autostart feature</span> for
        Pomodoros and breaks.
      </p>
      <p className={typography.paragraph}>
        If you disable the <span className={typography.info}>autostart</span>{' '}
        feature for any stage, you will need to{' '}
        <span className={typography.info}>manually</span> start the timer by
        clicking the <span className={typography.info}>big blue button</span> in
        the <span className={typography.info}>main view</span> when the previous
        stage ends.
      </p>
    </>
  );
};

export default PomodoroPage;
