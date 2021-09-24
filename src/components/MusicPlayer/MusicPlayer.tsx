import { MusicPlayerProps } from './types';

import styles from './styles.module.scss';
import { useEffect, useRef } from 'react';


function MusicPlayer({ songs }: MusicPlayerProps) {
  const currentTime: any = useRef();
  const audio: any = useRef(null);

  useEffect(() => {
    audio.current = new Audio();

    audio.current.addEventListener('pause', () => {
      currentTime.current && clearInterval(currentTime.current);
      console.log('pause');
    });

    audio.current.addEventListener('play', () => {
      currentTime.current = setInterval(() => {
        console.log('intervalo', audio.current.currentTime);
      }, 1000);
      console.log('play');
    });

    audio.current.addEventListener('loadeddata', () => {
      console.log('carregado');
    });

    audio.current.addEventListener('ended', () => {
      console.log('terminou');
    });

    audio.current.addEventListener('error', () => {
      console.log('erro');
    });

    return () => {
      clearInterval(currentTime.current);
      audio.current.removeEventListener('pause', () => {});
      audio.current.removeEventListener('play', () => {});
      audio.current.removeEventListener('loadeddata', () => {});
    };

  }, []);
  
  function add(music: string) {
    audio.current.src = music;
    audio.current.play();
  }

  function play() {
    audio.play();
  }

  function pause() {
    audio.pause();
  }

  return (
    <div className={styles.musicPlayer}>
      <div>
        <button onClick={() => add(songs[0])}>1</button>
        <button onClick={() => add(songs[1])}>2</button>
        <button onClick={() => add(songs[2])}>3</button>
        <button onClick={() => add(songs[3])}>4</button>
        <button onClick={() => add(songs[4])}>5</button>
      </div>
      <div>
        <span>3:09</span>
        <input type='range' min={1} max={100} value={60.9} onChange={() => {}} />
        <span>3:47</span>
      </div>
    </div>
  );
}

export default MusicPlayer;
