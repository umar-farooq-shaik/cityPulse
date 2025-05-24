/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/
export const fetchIssues = async (category, status, searchQuery) => {
     let query = supabase.from('issues').select('*');
   
     if (category) query = query.eq('category', category);
     if (status) query = query.eq('status', status);
     if (searchQuery) query = query.ilike('title', `%${searchQuery}%`);
   
     const { data, error } = await query;
   
     if (error) {
       throw error;
     }
   
     return data;
   };
   