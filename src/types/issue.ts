export type Category = 'Garbage' | 'Pothole' | 'Lighting' | 'Safety' | 'Other';
export type Status = 'Open' | 'Resolved';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: Category;
  location: string;
  status: Status;
  created_at: string; // ISO date string
}

export interface IssueStats {
  totalIssues: number;
  openIssues: number;
  resolvedIssues: number;
  categoryBreakdown: Record<Category, number>;
}