import { createClient } from '@supabase/supabase-js';
import type { Issue, Category, Status, IssueStats } from '../types/issue';

// Initialize Supabase client with error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please connect to Supabase using the "Connect to Supabase" button.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchIssues(category?: Category, status?: Status, searchQuery?: string): Promise<Issue[]> {
  let query = supabase.from('issues').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  if (status) {
    query = query.eq('status', status);
  }
  
  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching issues:', error);
    throw new Error('Failed to fetch issues');
  }
  
  return data as Issue[];
}

export async function createIssue(issue: Omit<Issue, 'id' | 'created_at'>): Promise<Issue> {
  const { data, error } = await supabase
    .from('issues')
    .insert([{ ...issue, status: 'Open' }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating issue:', error);
    throw new Error('Failed to create issue');
  }
  
  return data as Issue;
}

export async function updateIssueStatus(id: string, status: Status): Promise<Issue> {
  const { data, error } = await supabase
    .from('issues')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating issue status:', error);
    throw new Error('Failed to update issue status');
  }
  
  return data as Issue;
}

export async function fetchStats(): Promise<IssueStats> {
  const { data, error } = await supabase.from('issues').select('*');
  
  if (error) {
    console.error('Error fetching stats:', error);
    throw new Error('Failed to fetch stats');
  }

  const issues = data as Issue[];
  const stats: IssueStats = {
    totalIssues: issues.length,
    openIssues: issues.filter(issue => issue.status === 'Open').length,
    resolvedIssues: issues.filter(issue => issue.status === 'Resolved').length,
    categoryBreakdown: {
      Garbage: issues.filter(issue => issue.category === 'Garbage').length,
      Pothole: issues.filter(issue => issue.category === 'Pothole').length,
      Lighting: issues.filter(issue => issue.category === 'Lighting').length,
      Safety: issues.filter(issue => issue.category === 'Safety').length,
      Other: issues.filter(issue => issue.category === 'Other').length,
    }
  };
  
  return stats;
}

export async function aiSuggestCategory(text: string): Promise<Category> {
  // This would be connected to a real AI service in production
  // For now, we'll return a mock suggestion based on keywords
  const textLower = text.toLowerCase();
  
  if (textLower.includes('garbage') || textLower.includes('trash') || textLower.includes('waste')) {
    return 'Garbage';
  }
  if (textLower.includes('pothole') || textLower.includes('road') || textLower.includes('street damage')) {
    return 'Pothole';
  }
  if (textLower.includes('light') || textLower.includes('lamp') || textLower.includes('dark')) {
    return 'Lighting';
  }
  if (textLower.includes('danger') || textLower.includes('unsafe') || textLower.includes('security')) {
    return 'Safety';
  }
  
  return 'Other';
}