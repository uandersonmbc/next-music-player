import { MusicPlayerProps } from './types';

import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';

import { IoMdPlay } from "react-icons/io";

function MusicPlayer({ songs }: MusicPlayerProps) {
  const currentTime: any = useRef();
  const audio: any = useRef(null);
  const [musicTime, setMusicTime] = useState(0);

  useEffect(() => {
    audio.current = new Audio();

    audio.current.addEventListener('pause', () => {
      currentTime.current && clearInterval(currentTime.current);
      console.log('pause');
    });

    audio.current.addEventListener('play', () => {
      currentTime.current = setInterval(() => {
        console.log('intervalo', audio.current.currentTime);
        setMusicTime(audio.current.currentTime)
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
      currentTime.current && clearInterval(currentTime.current);
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
    if(audio.current){
      audio.play();
    }
  }

  function pause() {
    if(audio.current){
      audio.pause();
    }
  }

  function changeRange(e: any) {
    if(currentTime.current){
      clearInterval(currentTime.current)
    }

    setMusicTime(e.target.value);
  }

  return (
    <div className={styles.musicPlayer}>
      <div className={styles.musicActions}>
        <button className={styles.buttonSort} onClick={() => add(songs[0])}><IoMdPlay/></button>
        <button className={styles.buttonPrev} onClick={() => add(songs[1])}><IoMdPlay/></button>
        <button className={styles.buttonPlay} onClick={() => add(songs[2])}><IoMdPlay/></button>
        <button className={styles.buttonNext} onClick={() => add(songs[3])}><IoMdPlay /></button>
        <button className={styles.buttonRepeat}><IoMdPlay/></button>
      </div>
      <div className={styles.musicProgress}>
        <span>3:09</span>
        <input 
          className={styles.progressBar}
          type='range'
          min={1}
          max={audio.current?.duration||100}
          value={musicTime}
          onChange={(e) => changeRange(e)}
          onTransitionEnd={() => console.log('finished')}
          // onMouseOver={() => changeRange()}
        />
        <span>3:47</span>
      </div>
    </div>
  );
}

export default MusicPlayer;
