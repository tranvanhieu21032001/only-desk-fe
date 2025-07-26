import { useCallback, useEffect, useRef, useState } from 'react';

interface UseNotificationReturn {
  notifyNewMessage: () => void;
}

export function useNotification(): UseNotificationReturn {
  const isTabInactive = () => document.hidden;

  const [isBlinking, setIsBlinking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isUnlockedRef = useRef(false);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/notify.mp3');
    audioRef.current.volume = 1.0;

    // Listen for user interaction to "unlock" audio
    const unlockAudio = () => {
      audioRef.current
        ?.play()
        .then(() => {
          audioRef.current?.pause();
          audioRef.current!.currentTime = 0;
          isUnlockedRef.current = true;
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);
        })
        .catch((e) => {
          console.log('Cannot play audio: ', e);
        });
    };

    //TODO: must research to support when refresh page without click to unlock audio
    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);

    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const playSound = useCallback(() => {
    if (audioRef.current && isUnlockedRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => {
        console.warn('Cannot play sound:', e);
      });
    }
  }, []);

  useTitleBlink('🔔 New Message!', isBlinking);

  const notifyNewMessage = () => {
    if (isTabInactive()) {
      playSound();
      setIsBlinking(true);
    }
  };

  // ✅ reset title when tab is active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsBlinking(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return {
    notifyNewMessage,
  };
}

const useTitleBlink = (message: string, isActive: boolean) => {
  const originalTitle = useRef(document.title);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      let visible = true;

      intervalRef.current = setInterval(() => {
        document.title = visible ? message : ' ';
        visible = !visible;
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.title = originalTitle.current;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        document.title = originalTitle.current;
      }
    };
  }, [isActive, message]);
};
