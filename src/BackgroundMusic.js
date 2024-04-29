import React, { useRef, useEffect } from 'react';
import backgroundMusic from './contents/happy_cat.mp3';

function BackgroundMusic() {
  const audioRef = useRef(null);

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // 사용자의 첫 번째 상호작용을 감지하고 음악을 재생
  useEffect(() => {
    window.addEventListener('click', handlePlayMusic);
    return () => {
      window.removeEventListener('click', handlePlayMusic);
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src={backgroundMusic} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
}

export default BackgroundMusic;