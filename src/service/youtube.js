import axios from "axios";

// network 통신하는 부분을 별도의 컴포넌트로 생성
class Youtube {
  constructor(httpClient) {
    // 어떻게 통신하는지 알 수 없게 하려면
    this.youtube = httpClient;
    // this.youtube = axios.create({
    //   baseURL: "https://www.googleapis.com/youtube/v3",
    //   params: { key }
    // });
  }

  // promise 형태임

  // 인기 동영상 리스트 API
  async mostPopular() {
    const response = await this.youtube.get("videos", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 30
      }
    });
    return response.data.items;
  }

  // 검색 API
  async search(query) {
    const response = await this.youtube.get("search", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 30,
        q: query,
        type: "video"
      }
    });

    return response.data.items.map((item) => ({
      ...item,
      id: item.id.videoId
    }));
  }
}

export default Youtube;
