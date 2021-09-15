import React from "react";

// API로 받아온 동영상의 제목을 브라우저에 출력
const VideoItem = (props) => <h1>{props.video.snippet.title}</h1>;

export default VideoItem;
