

// import { currentUser } from '@clerk/nextjs/server'
// import { redirect } from 'next/navigation';
// import React from 'react';

// const Page = async () => {
//   // Get the currently authenticated user
//   const authUser = await currentUser();

//   // If there's no authenticated user, redirect to the sign-in page
//   if (!authUser) {
//     return redirect('/sign-in');
//   }

//   // If the user is logged in, redirect to the subaccount with the agencyId
//   // const agencyId = await verifyAndAcceptInvitation();
//   if (authUser.id) {
//     return redirect(`/subaccount/${authUser.id}`);
//   }

//   // Return some fallback content if no redirection occurs
//   return (
//     <div className="flex justify-center items-center mt-4">
//       <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
//         <h1 className="text-4xl">Welcome</h1>
//         <p>No agency found.</p>
//       </div>
//     </div>
//   );
// };

// export default Page;

// import { currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { db } from '../../../lib/db'; // Import your database connection
// import SubaccountDetails from '../../../components/forms/subaccount-details'; // Your form component to create a user

// const Page = async () => {
//   // Get the currently authenticated user
//   const authUser = await currentUser();

//   // If there's no authenticated user, redirect to the sign-in page
//   if (!authUser) {
//     return redirect('/sign-in');
//   }

//   // Check if the user exists in the database
//   const user = await db.user.findUnique({
//     where: { email: authUser.emailAddresses[0].emailAddress }, // Ensure you're using the correct field
//   });

//   // If the user exists, redirect to the subaccount page
//   if (user) {
//     return redirect(`/subaccount/${user.id}`);
//   }

//   // If the user does not exist, render the create user form
//   return (
//     <div className="flex justify-center items-center mt-4">
//       <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
//         <h1 className="text-4xl">Welcome</h1>
//         <p>No user found. Please create your account:</p>
//         <SubaccountDetails email={authUser.emailAddresses[0].emailAddress} /> {/* Pass the email to pre-fill the form */}
//       </div>
//     </div>
//   );
// };

// export default Page;


import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getMedia } from '@/lib/queries';
import { db } from '../../../lib/db'; 
import SubaccountDetails from '../../../components/forms/subaccount-details'; 

const Page = async () => {
  const authUser = await currentUser();

  if (!authUser) {
    return redirect('/sign-in');
  }

  const user = await db.user.findUnique({
    where: { email: authUser.emailAddresses[0].emailAddress },
  });
  // const id=db.user.id

  // if (user) {
  //   return redirect(`/subaccount/${user.id}`);
  // }
  if (user && user.id) {
    redirect(`/subaccount/${user.id}`);
  } 
//   const mediaFiles = user ? await getMedia(user.id) : null; // Check if user is not null

// if (!mediaFiles) {
//   // Handle the case where there are no media files or user is null
//   console.log("No media files available or user is not logged in.");
// }

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl">Welcome</h1>
        <p>No user found. Please create your account:</p>
        <SubaccountDetails email={authUser.emailAddresses[0].emailAddress} />
      </div>
    </div>
  );
};

export default Page;
