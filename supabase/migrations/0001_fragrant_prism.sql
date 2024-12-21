/*
  # Initial Portfolio Schema Setup

  1. New Tables
    - `images`
      - `id` (uuid, primary key)
      - `url` (text): The URL of the stored image
      - `position` (integer): For maintaining grid order
      - `created_at` (timestamp)
      - `user_id` (uuid): References auth.users
    - `users` table is handled by Supabase Auth

  2. Security
    - Enable RLS on `images` table
    - Add policies for authenticated users to manage their images
*/

CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own images
CREATE POLICY "Users can read own images"
  ON images
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own images
CREATE POLICY "Users can insert own images"
  ON images
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own images
CREATE POLICY "Users can update own images"
  ON images
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own images
CREATE POLICY "Users can delete own images"
  ON images
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);