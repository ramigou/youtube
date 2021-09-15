import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import SearcHeader from "./components/search_header/search_header";
import VideoList from "./components/video_list/video_list";

function App() {
  const apikey = process.env.REACT_APP_Youtube_API_KEY;
  const [videos, setVideos] = useState([]);

  // 검색 API 호출
  const search = (query) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${query}&type=video&key=${apikey}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        result.items.map((item) => ({ ...item, id: item.id.videoId }))
      )
      .then((items) => setVideos(items))
      .catch((error) => console.log("error", error));
  };

  // 빈 배열을 전달면 처음 mount 될 때만 호출 됨
  useEffect(() => {
    // request할 때 전달하는 옵션
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    // 작업하기 편하도록 json 형태로 변환하기
    // API로 받아온 데이터 중 items에 담긴 데이터들을 setVideos로 업데이트
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=30&key=${apikey}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className={styles.app}>
      <SearcHeader onSearch={search} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
