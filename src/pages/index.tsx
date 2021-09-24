import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';

import MusicPlayer from 'components/MusicPlayer';

const songs = [
  'http://streaming.tdiradio.com:8000/house.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
];

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <MusicPlayer songs={songs} />
    </div>
  );
};

export default Home;
