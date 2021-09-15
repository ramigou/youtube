// network 통신하는 부분을 별도의 컴포넌트로 생성
class Youtube {
  constructor(key) {
    this.key = key;
    // request할 때 전달하는 옵션
    this.getRequestOptions = {
      method: "GET",
      redirect: "follow"
    };
  }

  // promise 형태임

  // 인기 동영상 리스트 API
  async mostPopular() {
    // 작업하기 편하도록 json 형태로 변환하기
    // API로 받아온 데이터 중 items에 담긴 데이터들을 setVideos로 업데이트
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=30&key=${this.key}`,
      this.getRequestOptions
    );
    const result_1 = await response.json();
    return result_1.items;
  }

  // 검색 API
  async search(query) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${query}&type=video&key=${this.key}`,
      this.getRequestOptions
    );
    const result_1 = await response.json();
    return result_1.items.map((item) => ({ ...item, id: item.id.videoId }));
  }
}

export default Youtube;
