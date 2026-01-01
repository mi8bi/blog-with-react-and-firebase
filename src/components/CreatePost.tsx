const CreatePost = () => {
  return (
    <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
      <div className="">
        <h1 className="">記事を投稿する</h1>
        <div className="">
          <div className="">タイトル</div>
          <input className="" type="text" placeholder="タイトルを記入" />
        </div>
        <div className="">
          <div className="">投稿</div>
          <textarea className="" placeholder="投稿内容を記入" />
        </div>
        <div className="">
          <button className="" type="button">
            投稿する
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
