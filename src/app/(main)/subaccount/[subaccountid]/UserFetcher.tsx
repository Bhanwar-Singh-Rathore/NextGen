// src/app/(main)/subaccount/[subaccountid]/UserFetcher.tsx

import { fetchCurrentUserId } from '@/lib/user'; // Adjust the import path
import { Suspense } from 'react';

const UserFetcher = async ({ children }) => {
  const userId = await fetchCurrentUserId(); // Fetch the user ID

  return (
    <>
      {children(userId)} {/* Pass the user ID to the child components */}
    </>
  );
};

export default UserFetcher;
