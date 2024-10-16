// import { NextApiRequest, NextApiResponse } from 'next';
// import { db } from '../../db'; // Adjust the import based on your setup

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).end(); // Method Not Allowed
//   }

//   const { body } = req;
//   const eventType = req.headers['clerk-signature'] ? 'user.created' : '';

//   if (eventType === 'user.created') {
//     const { id, emailAddresses, firstName, lastName, imageUrl } = body.data;

//     try {
//       // Create the user in your database
//       const user = await db.user.create({
//         data: {
//           id,
//           email: emailAddresses[0].emailAddress,
//           name: `${firstName} ${lastName}`,
//           avatarUrl: imageUrl,
//           // Add any other fields you want to store
//         },
//       });

//       console.log('User created in database:', user);
//       return res.status(200).json({ success: true });
//     } catch (error) {
//       console.error('Error creating user in database:', error);
//       return res.status(500).json({ success: false, error: error.message });
//     }
//   }

//   return res.status(400).json({ success: false, error: 'Invalid event type' });
// }
