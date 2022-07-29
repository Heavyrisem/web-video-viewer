import { GetServerSideProps, NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import fs from "fs/promises";
import Link from "next/link";
import { sortByVideoName } from "../helper/sort";

interface WatchPageProps {
  path: string;
  videos: string[];
  vtts: string[];
}

const WatchPage: NextPage<WatchPageProps> = ({ path, videos, vtts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const increaseIndex = useCallback(() => {
    if (currentIndex + 1 >= videos.length) {
      alert("다음 영상이 없습니다.");
    } else {
      setCurrentIndex((currentIndex + 1) % videos.length);
    }
  }, [currentIndex, videos.length]);

  const decreaseIndex = useCallback(() => {
    if (currentIndex - 1 < 0) {
      alert("이전 영상이 없습니다.");
    } else {
      setCurrentIndex((currentIndex - 1 + videos.length) % videos.length);
    }
  }, [currentIndex, videos.length]);

  const endHandler = useCallback(() => {
    if (autoPlay) {
      increaseIndex();
    }
  }, [autoPlay, increaseIndex]);

  return (
    <div className="flex flex-col">
      <span className="text-center text-2xl">{videos[currentIndex]}</span>

      <video
        controls
        autoPlay={autoPlay}
        src={`${path}/${videos[currentIndex]}`}
        onEnded={endHandler}
        className="w-4/5 mx-auto"
      >
        <track
          default
          src={`${path}/${vtts[currentIndex]}`}
          kind="subtitles"
          srcLang="en"
          label="Korean"
        />
      </video>

      <div className="self-center">
        <input
          id="autoPlay"
          type="checkbox"
          defaultChecked={autoPlay}
          onClick={() => setAutoPlay(!autoPlay)}
        />
        <label htmlFor="autoPlay" className="mx-2">
          자동으로 다음 영상 재생
        </label>
      </div>
      <div className="self-center m-2">
        <button
          onClick={decreaseIndex}
          className="rounded-md border-gray-300 border-2 px-1 py-0.5 mx-2"
        >
          이전
        </button>
        <Link href="/">
          <button className="rounded-md border-gray-300 border-2 px-1 py-0.5 mx-2">
            홈
          </button>
        </Link>
        <button
          onClick={increaseIndex}
          className="rounded-md border-gray-300 border-2 px-1 py-0.5 mx-2"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<WatchPageProps> = async (
  context
) => {
  const { path } = context.query;

  if (typeof path !== "string") throw new Error("path is invalid");

  const datas = await fs.readdir(`public/${path}`);
  const videos = datas
    .filter((data) => data.endsWith(process.env.VIDEO_EXTENSION))
    .sort(sortByVideoName);
  const vtts = datas
    .filter((data) => data.endsWith(".vtt"))
    .sort(sortByVideoName);

  return {
    props: {
      path,
      videos,
      vtts,
    },
  };
};

export default WatchPage;
