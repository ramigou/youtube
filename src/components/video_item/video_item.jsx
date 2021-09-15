import React, { memo } from "react";
import styles from "./video_item.module.css";

// API로 받아온 동영상의 제목을 브라우저에 출력
// props.video.snippet 중복되므로 deconstructing 해서 사용하는 방법도 있음
// onVideoClick 함수의 인자로 video 사용하기 위해서 snippet으로 받아온 것 외에 따로 또 받아옴

// display가 변경되지 않으면 다시 렌더링될 이유가 없음 -> memo 사용하기
const VideoItem = memo(
  ({ video, video: { snippet }, onVideoClick, display }) => {
    const displayType = display === "list" ? styles.list : styles.grid;

    return (
      // 전달받은 display 타입에 따라 css를 적용하기 위함
      <li
        className={`${styles.container} ${displayType}`}
        onClick={() => onVideoClick(video)}
      >
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
  }
);

export default VideoItem;
