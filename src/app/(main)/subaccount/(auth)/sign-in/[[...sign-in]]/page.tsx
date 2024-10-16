import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return <SignIn />
}

export default Page


// import { SignIn, useSignIn } from '@clerk/nextjs';
// import { db } from '../../../../../../lib/db'; // Adjust the import based on your setup
// import React from 'react';

// const Page = () => {
//   const { signIn, isSignInPending, signInError } = useSignIn();

//   const handleSignIn = async (formData) => {
//     try {
//       const signInResponse = await signIn.create({
//         identifier: formData.email, // or formData.username depending on your setup
//         password: formData.password,
//       });

//       // Only proceed if sign-in was successful
//       if (signInResponse.user) {
//         // Check if user already exists in your database
//         const user = await db.user.findUnique({
//           where: { email: signInResponse.user.emailAddresses[0].emailAddress },
//         });

//         if (!user) {
//           // If the user does not exist, create a new entry in your database
//           await db.user.create({
//             data: {
//               id: signInResponse.user.id, // Clerk user ID
//               email: signInResponse.user.emailAddresses[0].emailAddress,
//               name: `${signInResponse.user.firstName} ${signInResponse.user.lastName}`,
//               avatarUrl: signInResponse.user.imageUrl,
//               // Add any other fields you want to store
//             },
//           });
//           console.log('User created in database:', user);
//         }

//         // Redirect or perform any other actions after successful sign-in
//       }
//     } catch (error) {
//       console.error('Sign-in error:', error);
//       // Handle sign-in error
//     }
//   };

//   return (
//     <div>
//       <SignIn
//         onSubmit={(formData) => handleSignIn(formData)} // Pass the form data to your handler
//       />
//       {signInError && <p>{signInError.message}</p>}
//       {isSignInPending && <p>Signing in...</p>}
//     </div>
//   );
// };

// export default Page;
