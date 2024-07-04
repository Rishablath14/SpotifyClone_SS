import { useEffect, useState} from "react";
import { useSongContext } from "./SongContext";

const Song = (item) => {
  const { cur, setCur, music } = useSongContext();
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const load = async () => {
    setLoading(true);
    const audio = new Audio(item.item.url);
    audio.onloadedmetadata = () => {
      let min =
        Math.floor(audio.duration / 60) < 10
          ? `0${Math.floor(audio.duration / 60)}`
          : `${Math.floor(audio.duration / 60)}`;
      let sec =
        Math.floor(audio.duration % 60) < 10
          ? `0${Math.floor(audio.duration % 60)}`
          : `${Math.floor(audio.duration % 60)}`;
      setDuration(`${min}:${sec}`);
      setLoading(false);
    };
  };
  useEffect(() => {
    load();
  }, []);
  if (loading) {
    return (
      <li
        className={`flex items-center justify-between p-4 rounded-md animate-pulse cursor-pointer`}
      >
        <div className="flex gap-4">
          <div className="rounded-full w-12 h-12 bg-[#ffffff36]" />
          <div className="flex flex-col">
            <h3>.....</h3>
            <h4 className="text-xs text-white opacity-60">..............</h4>
          </div>
        </div>
        <div className="text-[#ffffff4a]">--:--</div>
      </li>
    );
  }
  const handleClick = () => {
    music.map((it, ind) => {
      if (it.id === item.item.id) {
        setCur(ind);
      }
    });
  };
  return (
    <li
      onClick={handleClick}
      className={`flex items-center cursor-pointer hover:scale-105 transition-all ease-in justify-between p-4 rounded-md ${
        item.item.id === music[cur].id ? "bg-[#ffffff17]" : "bg-none"
      }`}
    >
      <div className="flex gap-4">
        <img
          src={`https://cms.samespace.com/assets/${item.item.cover}`}
          alt="Cover image"
          className="rounded-full w-12 h-12"
        />
        <div className="flex flex-col">
          <h3>{item.item.name}</h3>
          <h4 className="text-xs text-white opacity-60">{item.item.artist}</h4>
        </div>
      </div>
      <div className="">{duration}</div>
    </li>
  );
};

export default Song;
