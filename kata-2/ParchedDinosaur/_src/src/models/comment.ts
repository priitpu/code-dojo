export interface IComment {
  id: number,
  name: string;
  comment: string;
  replies: IComment[]; 
}