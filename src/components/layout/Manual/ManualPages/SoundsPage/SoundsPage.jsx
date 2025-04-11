import typography from '../Typography.module.css';

const SoundsPage = () => {
  return (
    <>
      <h1 className={typography.title}>Sounds & Ambiance</h1>
      <p className={typography.paragraph}>
        The sounds are located in the{' '}
        <span className={typography.info}>top-right corner</span> of the app and
        are <span className={typography.info}>folded</span> by default:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\SoundsPage\images\sounds-fold.png"
      />
      <p className={typography.paragraph}>
        There is a set of{' '}
        <span className={typography.info}>default sounds</span>, such as rain,
        wind, birds, and others, that you can use to get started with the app.
      </p>
      <p className={typography.paragraph}>
        However, you can also add{' '}
        <span className={typography.info}>your own sounds</span>.
      </p>
      <p className={typography.paragraph}>
        When you <span className={typography.info}>hover over</span> the sounds
        section with your mouse cursor, it{' '}
        <span className={typography.info}>unfolds</span>:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\SoundsPage\images\sounds-unfold.png"
        style={{ width: '520px' }}
      />
      <p className={typography.paragraph}>
        Here, you can <span className={typography.warning}>delete</span>{' '}
        unnecessary sounds by clicking on the{' '}
        <span className={typography.info}>trash can icon</span>,{' '}
        <span className={typography.info}>rename</span> sounds,{' '}
        <span className={typography.info}>change links</span> to sounds,{' '}
        <span className={typography.info}>adjust volumes</span> of the sounds,
        and <span className={typography.info}>play</span> them by clicking on
        the sound name buttons.
      </p>
      <p className={typography.paragraph}>
        By adjusting the volumes of different sounds, you can customize the{' '}
        <span className={typography.info}>ambiance </span>
        of your workspace to your liking.
      </p>
      <p className={typography.paragraph}>
        To add <span className={typography.info}>your own sound</span>, click on
        the <span className={typography.info}>plus icon</span> at the
        bottom-right corner of the sounds section.
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\SoundsPage\images\new-sound.png"
        style={{ width: '520px' }}
      />
      <p className={typography.paragraph}>
        Enter the <span className={typography.info}>name</span> of the sound you
        want to add and paste a{' '}
        <span className={typography.info}>YouTube link</span> to it.
      </p>
      <p className={typography.paragraph}>
        If the YouTube link is{' '}
        <span className={typography.warning}>invalid</span> or{' '}
        <span className={typography.warning}>cannot be played</span> by the app
        for some reason, you will not be able to{' '}
        <span className={typography.info}>play</span> the sound. In this case,
        the link input field will remain{' '}
        <span className={typography.warning}>red</span>, and your cursor will
        turn into a <span className={typography.warning}>red circle</span>.
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\SoundsPage\images\invalid-link.png"
        style={{ width: '520px' }}
      />
    </>
  );
};

export default SoundsPage;
