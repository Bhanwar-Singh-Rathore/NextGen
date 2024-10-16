// src/lib/user.ts
import { db } from './db'; // Adjust the path based on your project structure
import { currentUser } from '@clerk/nextjs/server';

export const fetchUserId = async () => {
  const authUser = await currentUser();
  
  if (!authUser) {
    return null; // Or handle the error as needed
  }

  const user = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });

  return user ? user.id : null;
};
