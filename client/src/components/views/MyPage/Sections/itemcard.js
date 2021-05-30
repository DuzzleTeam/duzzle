function ItemCard({ key, Image, title, field, likeCount, commentCount }) {
  return (
    <div>
      <img className="itemImg" src={Image} alt="itemImg"></img>
      <img
        className="delete"
        src="/images/myPage/post_delete.png"
        alt="delete"
      ></img>
    </div>
  );
}
