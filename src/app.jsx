import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import SearcHeader from "./components/search_header/search_header";
import VideoDetail from "./components/video_detail/video_detail";
import VideoList from "./components/video_list/video_list";

// App 컴포넌트에서 network 객체를 생성하면 계속 새로 생성되므로 index.js에서 props로 넘겨줌
function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  const search = (query) => {
    setSelectedVideo(null);
    youtube
      .search(query) //
      .then((videos) => {
        setVideos(videos);
        setSelectedVideo(null);
      });
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
      {/* 상세 페이지는 왼쪽, 리스트는 오른쪽에 위치하기 위한 UI */}
      <section className={styles.content}>
        {/* 선택된 비디오가 있다면 리스트 오른쪽에 아니면 그대로 */}
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        {/* 컴포넌트에 직접 class를 지정할 수 없으므로 부모 태그로 감싸야함 */}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? "list" : "grid"}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
