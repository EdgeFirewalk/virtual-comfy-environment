import typography from '../Typography.module.css';

const RadioPage = () => {
  return (
    <>
      <h1 className={typography.title}>Radio</h1>
      <p className={typography.paragraph}>
        The radio is located in the{' '}
        <span className={typography.info}>bottom-left corner</span> of the app:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\RadioPage\images\radio.png"
      />
      <p className={typography.paragraph}>
        The text above the block is the name of the{' '}
        <span className={typography.info}>current selected station.</span>
      </p>
      <p className={typography.paragraph}>
        You can <span className={typography.info}>switch</span> between stations
        using <span className={typography.info}>arrow buttons</span>,{' '}
        <span className={typography.info}>play/pause</span> it and change{' '}
        <span className={typography.info}>the volume</span> of the radio.
      </p>
      <p className={typography.paragraph}>
        Click on the <span className={typography.info}>{'waves'}</span> button
        to access the list of{' '}
        <span className={typography.info}>available radio stations</span>:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\RadioPage\images\radio.png"
      />
    </>
  );
};

export default RadioPage;
