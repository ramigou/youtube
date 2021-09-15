import React from "react";
import styles from "./video_item.module.css";

// API로 받아온 동영상의 제목을 브라우저에 출력
// props.video.snippet 중복되므로 deconstructing 해서 사용하는 방법도 있음
const VideoItem = ({ video: { snippet } }) => (
  <li className={styles.container}>
    <div className={styles.video}>
      <img
        className={styles.thumbnail}
        src={snippet.thumbnails.medium.url}
        alt={`${snippet.title}_thumbnail`}
      />
      <div className={styles.metadata}>
        <p className={styles.title}>{snippet.title}</p>
        <p className={styles.channel}>{snippet.channelTitle}</p>
      </div>
    </div>
  </li>
);

export default VideoItem;
