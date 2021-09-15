import React, { useEffect, useState } from "react";
import "./app.css";
import VideoList from "./components/video_list/video_list";

function App() {
  const [videos, setVideos] = useState([]);

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
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=30&key=AIzaSyB36WvTN65B_vZZ_MriotBteRulJOpRn9Y",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log("error", error));
  }, []);
  return <VideoList videos={videos} />;
}

export default App;
