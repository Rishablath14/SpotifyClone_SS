/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";

const songContext = createContext(null);
const SongContext = ({ children }) => {
  const audioRef = useRef(null);
  const [music, setMusics] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [topTrack, setTopTrack] = useState(false);
  const [background, setBackground] = useState(null);
  const [filter, setFilter] = useState("");
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [musicLoading, setMusicLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [curPlay, setCurPlay] = useState(0);
  const [muted, setMuted] = useState(false);
  const playNext = () => {
    console.log(cur);
    setCur((cur + 1) % music.length);
  };
  const playPrev = () => {
    console.log(cur);
    setCur(Math.abs(cur - 1) % music.length);
  };
  const playpa = () => {
    if (playing) {
      if (audioRef.current) {
        audioRef.current.pause();
        setPlaying(false);
      }
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const mute = () => {
    if (audioRef.current.muted) {
      audioRef.current.muted = false;
      setMuted(false);
    } else {
      audioRef.current.muted = true;
      setMuted(true);
    }
  };
  useEffect(() => {
    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (music) {
        const lowerSearchTerm = filter.toLowerCase();
        const filtered = topTrack
          ? music.filter((song) => {
              const lowerName = song.name.toLowerCase();
              const lowerArtist = song.artist.toLowerCase();
              return (
                (song.top_track && lowerName.includes(lowerSearchTerm)) ||
                lowerArtist.includes(lowerSearchTerm)
              );
            })
          : music.filter((song) => {
              const lowerName = song.name.toLowerCase();
              const lowerArtist = song.artist.toLowerCase();
              return (
                lowerName.includes(lowerSearchTerm) ||
                lowerArtist.includes(lowerSearchTerm)
              );
            });
        setFiltered(filtered);
      }
    }, 400);
  }, [filter]);
  useEffect(() => {
    const data = async () => {
      const res = await fetch("https://cms.samespace.com/items/songs");
      const dat = await res.json();
      setMusics(dat.data);
      setFiltered(dat.data);
      setBackground(dat.data[cur].accent);
      if (audioRef.current) {
        audioRef.current.src = dat.data[0].url;
      }
      setMusicLoading(false);
    };
    data();
  }, []);


  const loadNew = async ()=>{
    setMusicLoading(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = music[cur].url;
      await audioRef.current.load();
      setBackground(music[cur].accent);
      setCurPlay(0);
      if (muted) {
        audioRef.current.muted = true;
      }
      if (playing) {
        audioRef.current.play();
      }
      setMusicLoading(false);
    }
  }
  useEffect(() => {
    loadNew();
  }, [cur]);

  const handleUpdate = () => {
    setCurPlay(audioRef.current.currentTime);
  };
  const handleChange = (e) => {
    audioRef.current.currentTime = e.target.value;
  };
  const handleMeta = () => {
    setDuration(audioRef.current.duration);
  };
  return (
    <songContext.Provider
      value={{
        music,
        filtered,
        setFilter,
        topTrack,
        setTopTrack,
        background,
        filter,
        cur,
        setCur,
        playing,
        duration,
        curPlay,
        handleUpdate,
        handleMeta,
        playNext,
        playPrev,
        playpa,
        mute,
        muted,
        audioRef,
        handleChange,
        musicLoading
      }}
    >
      {children}
    </songContext.Provider>
  );
};

export default SongContext;

export const useSongContext = () => useContext(songContext);
