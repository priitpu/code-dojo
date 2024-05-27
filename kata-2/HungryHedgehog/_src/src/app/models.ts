export interface ThreadComment {
  id: string;
  parentId?: string;
  user: string;
  content: string;
  replies?: ThreadComment[];
}