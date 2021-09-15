import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import SearcHeader from "./components/search_header/search_header";
import VideoList from "./components/video_list/video_list";

// App 컴포넌트에서 network 객체를 생성하면 계속 새로 생성되므로 index.js에서 props로 넘겨줌
function App({ youtube }) {
  const [videos, setVideos] = useState([]);

  const search = (query) => {
    youtube
      .search(query) //
      .then((videos) => setVideos(videos));
  };

  // 빈 배열을 전달면 처음 mount 될 때만 호출 됨
  useEffect(() => {
    youtube
      .mostPopular() //
      .then((videos) => setVideos(videos));
  }, []);

  return (
    <div className={styles.app}>
      <SearcHeader onSearch={search} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
