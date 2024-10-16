// src/pages/api/getUserId.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabaseUserId } from '../../../lib/user'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const userId = await getDatabaseUserId(email);
      if (userId) {
        res.status(200).json({ id: userId });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
