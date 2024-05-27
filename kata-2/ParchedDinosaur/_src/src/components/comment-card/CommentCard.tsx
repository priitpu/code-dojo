import { IComment } from '../../models/comment';
import './comment-card.scss';

export default function CommentCard({ name, comment, replies }: IComment) {
  return (
    <div className="comment-card">
      <div className="comment-card__avatar">
      <img  src='https://www.experienceferrari.com/wp-content/uploads/2024/02/Ferrari-Logo.png'></img>
      </div>
      <div className="comment-card__body">
        <div>
          <strong>{name}</strong> <span className='text--muted text--sm'>10hr ago</span>
        </div>
        <div>{comment}</div>
        <div className="comment-card__actions">
          <button>Reply</button>
          <button>Share</button>
        </div>
      </div>
      <div className="comment-card__replies">
        {replies.map((reply) => (
          <CommentCard {...reply} key={reply.id} />
        ))}
      </div>
    </div>
  );
}
