import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API Routes

// Get all issues
app.get('/api/issues', async (req, res) => {
  try {
    const { category, status, search } = req.query;
    
    let query = supabase.from('issues').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (status) {
      query = query.eq('status', status);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

// Create new issue
app.post('/api/issues', async (req, res) => {
  try {
    const { title, description, category, location } = req.body;
    
    // Validate required fields
    if (!title || !description || !category || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const issue = {
      id: uuidv4(),
      title,
      description,
      category,
      location,
      status: 'Open',
      createdAt: new Date().toISOString(),
    };
    
    const { data, error } = await supabase.from('issues').insert([issue]).select();
    
    if (error) throw error;
    
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ error: 'Failed to create issue' });
  }
});

// Update issue status
app.patch('/api/issues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    const { data, error } = await supabase
      .from('issues')
      .update({ status })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    
    res.json(data[0]);
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({ error: 'Failed to update issue' });
  }
});

// Get stats
app.get('/api/stats', async (req, res) => {
  try {
    const { data, error } = await supabase.from('issues').select('*');
    
    if (error) throw error;
    
    const issues = data;
    const stats = {
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
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// AI suggestion endpoint (stub)
app.post('/api/ai-suggest', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    // Simple keyword matching for demo purposes
    const textLower = text.toLowerCase();
    let category = 'Other';
    
    if (textLower.includes('garbage') || textLower.includes('trash') || textLower.includes('waste')) {
      category = 'Garbage';
    } else if (textLower.includes('pothole') || textLower.includes('road') || textLower.includes('street damage')) {
      category = 'Pothole';
    } else if (textLower.includes('light') || textLower.includes('lamp') || textLower.includes('dark')) {
      category = 'Lighting';
    } else if (textLower.includes('danger') || textLower.includes('unsafe') || textLower.includes('security')) {
      category = 'Safety';
    }
    
    res.json({ category });
  } catch (error) {
    console.error('Error in AI suggestion:', error);
    res.status(500).json({ error: 'Failed to process AI suggestion' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});