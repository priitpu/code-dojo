import { CommentProps } from "./App";

export default function Comment({ data }: { data: CommentProps[] }) {
  return (
    <div className="comment-section">
      {data.map((comment: CommentProps) => (
        <div
          className={
            comment.replies && comment.replies.length ? "border" : "last-child"
          }
        >
          <div className="comment-wrapper">
            <div className="comment-header">
              <img className="circle" src={comment.img} alt="profile-pic" />
              <h3 className="title">{comment.author}</h3>
              <span className="title__info">10hr ago</span>
            </div>
            <p className="body">{comment.comment}</p>
            <div className="buttons">
              <button>REPLY</button>
              <button>SHARE</button>
            </div>
          </div>
          <div>
            {comment.replies && comment.replies.length && (
              <div className="children-container">
                <Comment data={comment.replies} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
