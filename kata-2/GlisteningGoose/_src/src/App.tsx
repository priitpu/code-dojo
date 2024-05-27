import "./App.css";
import Comment from "./Comment";
import { data } from "./assets/mock-data";

export interface CommentProps {
  author: string;
  img: string;
  comment: string;
  replies?: CommentProps[] | null;
}

export default function App() {
  return (
    <div className="wrapper">
      <Comment data={data} />
    </div>
  );
}
