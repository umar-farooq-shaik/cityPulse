/*
  # Create issues table
  
  1. New Tables
    - `issues`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `category` (text, required)
      - `location` (text, required)
      - `status` (text, required)
      - `created_at` (timestamptz, default: now())
  2. Security
    - Enable RLS on `issues` table
    - Add policy for public read access
    - Add policy for anonymous insert
*/

CREATE TABLE IF NOT EXISTS issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  status text NOT NULL DEFAULT 'Open',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE issues ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read issues
CREATE POLICY "Anyone can read issues"
  ON issues
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert issues
CREATE POLICY "Anyone can insert issues"
  ON issues
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to update issues
CREATE POLICY "Anyone can update issues"
  ON issues
  FOR UPDATE
  TO public
  USING (true);