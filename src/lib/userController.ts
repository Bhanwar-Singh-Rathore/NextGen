// import { Clerk } from '@clerk/clerk-sdk-node'; // Adjust import if necessary
// import { db } from '@/lib/db'; // Import your database connection

// // Create an instance of Clerk
// const clerk = Clerk({ apiKey: 'your-clerk-api-key' });

// export const registerUser = async (clerkUserId: string) => {
//   // Fetch user details from Clerk
//   const clerkUser = await clerk.users.getUser(clerkUserId);

//   // Extract the primary email address
//   const primaryEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId);

//   // Create a new user in your database
//   const newUser = await db.user.create({
//     data: {
//       id: clerkUser.id,
//       name: clerkUser.firstName + ' ' + clerkUser.lastName || 'New User',
//       avatarUrl: clerkUser.profileImageUrl || '',
//       email: primaryEmail?.emailAddress || '', // Use the correct property
//       role: 'SUBACCOUNT_USER',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   });

//   return newUser;
// };

// pages/api/clerk-webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Clerk } from '@clerk/clerk-sdk-node';
import { db } from '@/lib/db'; // Adjust the import based on your project structure

const clerk = Clerk({ apiKey: process.env.CLERK_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const event = req.body;

  // Check if the event is a user.created event
  if (event.type === 'user.created') {
    const clerkUserId = event.data.id;

    try {
      // Fetch user details from Clerk
      const clerkUser = await clerk.users.getUser(clerkUserId);
      console.log("Clerk User:", clerkUser);

      // Extract the primary email address
      const primaryEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId);

      // Check if the user already exists in your database
      let user = await db.user.findUnique({
        where: {
          email: primaryEmail?.emailAddress,
        },
      });

      // If the user does not exist, create a new user
      if (!user) {
        user = await db.user.create({
          data: {
            id: clerkUser.id,
            name: clerkUser.firstName + ' ' + clerkUser.lastName || 'New User',
            avatarUrl: clerkUser.profileImageUrl || '',
            email: primaryEmail?.emailAddress || '',
            role: 'SUBACCOUNT_USER',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        console.log("New User Created:", user);
      }

      return res.status(200).send('User registered successfully');
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send('Failed to register user');
    }
  } else {
    return res.status(400).send('Event type not supported');
  }
}
