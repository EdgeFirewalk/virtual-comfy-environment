import typography from '../Typography.module.css';

const RadioPage = () => {
  return (
    <>
      <h1 className={typography.title}>Radio</h1>
      <p className={typography.paragraph}>
        The radio player is located in the{' '}
        <span className={typography.info}>bottom-left corner</span> of the app:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\RadioPage\images\radio.png"
      />
      <p className={typography.paragraph}>
        The <span className={typography.info}>text</span> above the player shows
        the name of the{' '}
        <span className={typography.info}>currently selected station</span>.
      </p>
      <p className={typography.paragraph}>
        You can <span className={typography.info}>switch</span> between stations
        using the <span className={typography.info}>arrow buttons</span>,{' '}
        <span className={typography.info}>play/pause</span> the station, and
        adjust <span className={typography.info}>the volume</span>.
      </p>
      <p className={typography.paragraph}>
        Click the <span className={typography.info}>waves icon</span> to view
        the{' '}
        <span className={typography.info}>
          list of available radio stations
        </span>
        :
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\RadioPage\images\default-stations.png"
        style={{ width: '520px' }}
      />
      <p className={typography.paragraph}>
        The app includes several{' '}
        <span className={typography.info}>default stations</span> that you can
        use to get started with the app.
      </p>
      <p className={typography.paragraph}>
        You can also add{' '}
        <span className={typography.info}>your own radio stations</span>.
      </p>
      <p className={typography.paragraph}>
        To add a new station, click the{' '}
        <span className={typography.info}>'Add New Radio Station'</span> button:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\RadioPage\images\new-station.png"
      />
      <p className={typography.paragraph}>
        Enter a <span className={typography.info}>YouTube URL</span> for the
        station and its <span className={typography.info}>name</span>.
      </p>
      <p className={typography.paragraph}>
        If there's an <span className={typography.warning}>error</span>, the
        corresponding field will turn{' '}
        <span className={typography.warning}>red</span> and display an{' '}
        <span className={typography.warning}>error message</span>:
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\RadioPage\images\wrong-input.png"
      />
      <p className={typography.paragraph}>
        In this case, you <span className={typography.warning}>won't</span> be
        able to add the station. If all information is{' '}
        <span className={typography.info}>correct</span>, the new station will
        be added to the <span className={typography.info}>end of the list</span>
        .
      </p>
      <p className={typography.paragraph}>
        You can <span className={typography.info}>edit</span> existing stations
        by clicking the <span className={typography.info}>pencil icon</span> in
        the <span className={typography.info}>top-right corner</span> of the
        station card.
      </p>
      <img
        className={typography.img}
        src="src\components\layout\Manual\ManualPages\RadioPage\images\station.png"
      />
      <p className={typography.paragraph}>
        To <span className={typography.warning}>delete</span> a station, click
        the <span className={typography.warning}>cross icon</span> in the{' '}
        <span className={typography.info}>top-right corner</span> of the station
        card.
      </p>
    </>
  );
};

export default RadioPage;
