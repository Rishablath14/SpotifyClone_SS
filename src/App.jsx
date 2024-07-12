import { useState } from "react";
import Song from "./components/Song";
import { useSongContext } from "./components/SongContext";

const App = () => {
  const {
    music,
    filtered,
    setFilter,
    topTrack,
    setTopTrack,
    background,
    filter,
    cur,
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
    musicLoading,
  } = useSongContext();
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevIsOpen) => !prevIsOpen);
  };
  return (
    <div
      className="flex flex-col items-center justify-center lg:items-start lg:justify-start lg:flex-row w-full h-screen p-6 text-white gap-[5%] transition-all duration-500"
      style={{ background: `linear-gradient(to right, ${background}, #000)` }}
    >
      <div className="w-full lg:w-[15%] flex flex-row lg:h-full lg:flex-col items-center lg:items-start justify-between">
        <img src="Logo.png" alt="Logo" className="lg:w-32" />
        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#151515]">
          <img
            src="https://s3-alpha-sig.figma.com/img/4b1c/9272/23674d7d0fc7e5938c32787f13738353?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RqvfSkNMAUvpOHQbUq35JEnz8j6cGzlfUES85bE-uF9tSxVWv0fNCqsWX-FIf6W2uTLrBBV8dW~cMsrGYaNyfEghjO6Dow0IdSF8GVfrBMgikyZ~fME-Tdlb58iGQ41t1iETZTm9U1sq85rdr5-VnZDR4hOvozse0Zb-WNlTZzVZxhoi9HJ6fCMjgegMRRFkjbWS~3K~u5UssEV4DymlM9GKSz8Xiov-Xsw1xTTvbtWNTqhrDo7VhMic3ZMAPexHEJvDFSIVWbbOLpuRp1WRGRD2TJXV5v7-EqUR3xfhtr91P~oSRET0gkKW7W-Rs68CGCttHJ-hYqmnDPsfzNScYg__"
            alt="Profile Photo"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="lg:hidden block">
          <button className="text-2xl font-bold" onClick={toggleMenu}>
            &#9776;
          </button>
          <div
            className={`w-full transition-all ${
              open ? "translate-x-0" : "translate-x-[100%]"
            } z-50 lg:hidden fixed flex flex-col gap-6 -mt-16 p-5 pt-8 h-full right-0 bg-[#000000f0]`}
          >
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <button
                  className={`text-2xl font-semibold ${
                    topTrack ? "opacity-50" : "opacity-100"
                  }`}
                  onClick={() => setTopTrack(false)}
                >
                  For You
                </button>
                <button
                  className={`text-2xl font-semibold ${
                    !topTrack ? "opacity-50" : "opacity-100"
                  }`}
                  onClick={() => setTopTrack(true)}
                >
                  Top Tracks
                </button>
              </div>
              <div className="text-2xl font-bold" onClick={toggleMenu}>
                X
              </div>
            </div>
            <div className="w-full flex justify-between rounded-[8px] items-center bg-[#ffffff1e] p-[8px_16px]">
              <input
                type="text"
                id="search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search Song, Artist"
                className="w-full text-white bg-transparent active:outline-none focus:outline-none"
              />
              <label
                htmlFor="search"
                className="scale-[2] rotate-[110deg] opacity-40"
              >
                &#9740;
              </label>
            </div>
            <ul
              className="songlist flex flex-col h-full overflow-scroll"
              onClick={toggleMenu}
            >
              {music && (
                <>
                  {topTrack
                    ? filtered
                        .filter((item) => item.top_track === true)
                        .map((item, i) => <Song item={item} key={i} />)
                    : filtered.map((item, i) => <Song item={item} key={i} />)}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-full hidden lg:flex lg:w-[25%] flex-col gap-6 mt-2">
        <div className="flex gap-8">
          <button
            className={`text-2xl font-semibold ${
              topTrack ? "opacity-50" : "opacity-100"
            }`}
            onClick={() => setTopTrack(false)}
          >
            For You
          </button>
          <button
            className={`text-2xl font-semibold ${
              !topTrack ? "opacity-50" : "opacity-100"
            }`}
            onClick={() => setTopTrack(true)}
          >
            Top Tracks
          </button>
        </div>
        <div className="w-full flex justify-between rounded-[8px] items-center bg-[#ffffff1e] p-[8px_16px]">
          <input
            type="text"
            id="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search Song, Artist"
            className="w-full text-white bg-transparent active:outline-none focus:outline-none"
          />
          <label
            htmlFor="search"
            className="scale-[2] rotate-[110deg] opacity-40"
          >
            &#9740;
          </label>
        </div>
        <ul className="songlist flex flex-col h-full overflow-scroll">
          {music && (
            <>
              {topTrack
                ? filtered
                    .filter((item) => item.top_track === true)
                    .map((item, i) => <Song item={item} key={i} />)
                : filtered.map((item, i) => <Song item={item} key={i} />)}
            </>
          )}
        </ul>
      </div>
      {musicLoading ? (
        <div className="w-full h-full lg:w-[50%] flex flex-col justify-center items-center animate-pulse">
          <div className="flex flex-col gap-6 w-[80%]">
            <div>
              <h1>-----------</h1>
              <span>-------</span>
            </div>
            <div
              className="bg-[#ffffff4e] w-full h-[480px] max-h-[300px] lg:max-h-[400px] xl:max-h-[480px]"
            />
            <div className="relative">
              <div
                className="absolute bg-zinc-50 h-2 top-1 rounded-md z-10"
                style={{ width: `${(curPlay * 100) / duration}%` }}
              ></div>
              <div className="absolute bg-gray-600 h-2 top-1 w-full rounded-md z-0"></div>
              <input
                type="range"
                value={curPlay}
                onChange={(e) => handleChange(e)}
                min={0}
                max={duration}
                className="cursor-pointer absolute z-20 opacity-0 inputSlider w-full"
              />
              <audio
                onTimeUpdate={handleUpdate}
                onLoadedMetadata={handleMeta}
                ref={audioRef}
              ></audio>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-[#ffffff23] rounded-full w-12 h-12 items-center text-center flex justify-center">
                <img src="dots.png" alt="Dots" />
              </button>
              <div className="flex items-center gap-4">
                <h4 onClick={playPrev}>
                  <img src="prev.png" alt="Prev" />
                </h4>
                <h4 onClick={playpa}>
                  <img
                    src={`${playing ? "pause.png" : "play.png"}`}
                    alt="Play/Pause"
                  />
                </h4>
                <h4 onClick={playNext}>
                  <img src="for.png" alt="Forward" />
                </h4>
              </div>
              <button
                className="bg-[#ffffff23] rounded-full w-12 h-12 items-center text-center flex justify-center"
                onClick={mute}
              >
                <img
                  className={`${muted ? "mix-blend-overlay" : ""}`}
                  src="vol.png"
                  alt="Mute/Unmute"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full lg:w-[50%] flex flex-col justify-center items-center">
          <div className="flex flex-col gap-6 w-[80%]">
            <div>
              <h1>{music[cur].name}</h1>
              <span>{music[cur].artist}</span>
            </div>
            <img
              src={`https://cms.samespace.com/assets/${music[cur].cover}`}
              alt="Main Cover"
              className="w-[100%] h-[100%] max-h-[300px] lg:max-h-[400px] xl:max-h-[480px]"
            />
            <div className="relative">
              <div
                className="absolute bg-zinc-50 h-2 top-1 rounded-md z-10"
                style={{ width: `${(curPlay * 100) / duration}%` }}
              ></div>
              <div className="absolute bg-gray-600 h-2 top-1 w-full rounded-md z-0"></div>
              <input
                type="range"
                value={curPlay}
                onChange={(e) => handleChange(e)}
                min={0}
                max={duration}
                className="cursor-pointer absolute z-20 opacity-0 inputSlider w-full"
              />
              <audio
                onTimeUpdate={handleUpdate}
                onLoadedMetadata={handleMeta}
                ref={audioRef}
              ></audio>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-[#ffffff23] rounded-full w-12 h-12 items-center text-center flex justify-center cursor-default">
                <img src="dots.png" alt="Dots" />
              </button>
              <div className="flex items-center gap-4">
                <h4 className="cursor-pointer" onClick={playPrev}>
                  <img src="prev.png" alt="Prev" />
                </h4>
                <h4 className="cursor-pointer" onClick={playpa}>
                  <img
                    src={`${playing ? "pause.png" : "play.png"}`}
                    alt="Play/Pause"
                  />
                </h4>
                <h4 className="cursor-pointer" onClick={playNext}>
                  <img src="for.png" alt="Forward" />
                </h4>
              </div>
              <button
                className="bg-[#ffffff23] rounded-full w-12 h-12 items-center text-center flex justify-center"
                onClick={mute}
              >
                <img
                  className={`${muted ? "mix-blend-overlay" : ""}`}
                  src="vol.png"
                  alt="Mute/Unmute"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
