import { comments } from './comments';
import CommentCard from './components/comment-card/CommentCard';

function App() {
  return (
    <>
      <div>
        {comments.map((c) => (
          <CommentCard {...c} key={c.id} />
        ))}
      </div>
    </>
  );
}

export default App;
