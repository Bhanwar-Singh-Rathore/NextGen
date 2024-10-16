// import BlurPage from '@/components/global/blur-page'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { getFunnel } from '@/lib/queries'
// import Link from 'next/link'
// import { redirect } from 'next/navigation'
// import React from 'react'
// import FunnelSettings from './_components/funnel-settings'
// import FunnelSteps from './_components/funnel-steps'

// type Props = {
//   params: { funnelId: string; subaccountId: string }
// }

// const FunnelPage = async ({ params }: Props) => {
//   const funnelPages = await getFunnel(params.funnelId)
//   if (!funnelPages)
//     return redirect(`/subaccount/${params.subaccountId}/funnels`)

//   return (
//     <BlurPage>
//       <Link
//         href={`/subaccount/${params.subaccountId}/funnels`}
//         className="flex justify-between gap-4 mb-4 text-muted-foreground"
//       >
//         Back
//       </Link>
//       <h1 className="text-3xl mb-8">{funnelPages.name}</h1>
//       <Tabs
//         defaultValue="steps"
//         className="w-full"
//       >
//         <TabsList className="grid  grid-cols-2 w-[50%] bg-transparent ">
//           <TabsTrigger value="steps">Steps</TabsTrigger>
//           <TabsTrigger value="settings">Settings</TabsTrigger>
//         </TabsList>
//         <TabsContent value="steps">
//           <FunnelSteps
//             funnel={funnelPages}
//             subaccountId={params.subaccountId}
//             pages={funnelPages.FunnelPages}
//             funnelId={params.funnelId}
//           />
//         </TabsContent>
//         <TabsContent value="settings">
//           <FunnelSettings
//             subaccountId={params.subaccountId}
//             defaultData={funnelPages}
//           />
//         </TabsContent>
//       </Tabs>
//     </BlurPage>
//   )
// }

// export default FunnelPage



// import BlurPage from '@/components/global/blur-page'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { getFunnel } from '@/lib/queries'
// import Link from 'next/link'
// import { redirect } from 'next/navigation'
// import React from 'react'
// import FunnelSettings from './_components/funnel-settings'
// import FunnelSteps from './_components/funnel-steps'

// // type Props = {
// //   params: { funnelId: string; userId: string }
// // }
// type Props = {
//   params: { funnelId: string; userId: string }
// }
// const FunnelPage = async ({ params }: Props) => {
//   const funnelPages = await getFunnel(params.funnelId)
//   if (!funnelPages)
//     return redirect(`/subaccount/${params.userId}/funnels`)

//   return (
//     <BlurPage>
//       <Link
//         href={`/subaccount/${params.userId}/funnels`}
//         className="flex justify-between gap-4 mb-4 text-muted-foreground"
//       >
//         Back
//       </Link>
//       <h1 className="text-3xl mb-8">{funnelPages.name}</h1>
//       <Tabs
//         defaultValue="steps"
//         className="w-full"
//       >
//         <TabsList className="grid  grid-cols-2 w-[50%] bg-transparent ">
//           <TabsTrigger value="steps">Steps</TabsTrigger>
//           <TabsTrigger value="settings">Settings</TabsTrigger>
//         </TabsList>
//         <TabsContent value="steps">
//           {/* <FunnelSteps
//             funnel={funnelPages}
//             userId={params.userId}
//             pages={funnelPages.FunnelPages}
//             funnelId={params.funnelId}
//           /> */}
//           <FunnelSteps
//   funnel={funnelPages}
//   userId={params.userId}
//   pages={funnelPages.FunnelPages}
//   funnelId={params.funnelId}
// />
//         </TabsContent>
//         <TabsContent value="settings">
//           <FunnelSettings
//             userId={params.userId}
//             defaultData={funnelPages}
//           />
//         </TabsContent>
//       </Tabs>
//     </BlurPage>
//   )
// }

// export default FunnelPage

// import BlurPage from '@/components/global/blur-page'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { getFunnel } from '@/lib/queries'
// import Link from 'next/link'
// import { redirect } from 'next/navigation'
// import React from 'react'
// import FunnelSettings from './_components/funnel-settings'
// import FunnelSteps from './_components/funnel-steps'
// import { db } from '@/lib/db';  // Assuming db is imported from your lib

// type Props = {
//   params: { funnelId: string; userId: string }
// }

// const FunnelPage = async ({ params }: Props) => {
//   // Check the incoming params for debugging
//   console.log('Incoming params:', params);

//   // Fetch funnel data from the database
//   const funnelPages = await getFunnel(params.funnelId)
//   console.log('Funnel Pages:', funnelPages);  // Debugging log

//   // If no funnel data is found, redirect the user back
//   if (!funnelPages) {
//     console.error('No funnel pages found. Redirecting to funnels...');
//     return redirect(`/subaccount/${params.userId}/funnels`);
//   }

//   // Ensure userId is defined
//   if (!params.userId) {
//     console.error('User ID is undefined');  // Log error
//     return redirect('/error');  // Replace with your actual error handling or page
//   }
//   console.log('User ID:', params.userId);  // Debugging log

//   // Fetch the userId directly from the db database
//   const user = await db.user.findUnique({
//     where: { id: params.userId },
//   });
//   console.log('Fetched User:', user);  // Debugging log

//   // Handle case where user is not found
//   if (!user) {
//     console.error('User not found for ID:', params.userId);  // Log error
//     return redirect('/error');  // Replace with your actual error handling or page
//   }

//   const userIdFromDb = user.id  // Get userId from the database

//   return (
//     <BlurPage>
//       <Link
//         href={`/subaccount/${userIdFromDb}/funnels`}
//         className="flex justify-between gap-4 mb-4 text-muted-foreground"
//       >
//         Back
//       </Link>
//       <h1 className="text-3xl mb-8">{funnelPages.name}</h1>
//       <Tabs defaultValue="steps" className="w-full">
//         <TabsList className="grid grid-cols-2 w-[50%] bg-transparent">
//           <TabsTrigger value="steps">Steps</TabsTrigger>
//           <TabsTrigger value="settings">Settings</TabsTrigger>
//         </TabsList>
//         <TabsContent value="steps">
//           <FunnelSteps
//             funnel={funnelPages}
//             userId={userIdFromDb}  // Correctly passing userId
//             pages={funnelPages.FunnelPages}
//             funnelId={params.funnelId}
//           />
//         </TabsContent>
//         <TabsContent value="settings">
//           <FunnelSettings
//             userId={userIdFromDb}  // Correctly passing userId
//             defaultData={funnelPages}
//           />
//         </TabsContent>
//       </Tabs>
//     </BlurPage>
//   )
// }

// export default FunnelPage


import BlurPage from '@/components/global/blur-page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getFunnel } from '@/lib/queries'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import FunnelSettings from './_components/funnel-settings'
import FunnelSteps from './_components/funnel-steps'
import {db} from '@/lib/db'  // Assuming db is imported from your lib

type Props = {
  params: { funnelId: string; subaccountid: string } // Ensure correct structure
}

const FunnelPage = async ({ params }: Props) => {
  console.log('Incoming params:', params);

  const funnelPages = await getFunnel(params.funnelId)
  console.log('Funnel Pages:', funnelPages); 

  if (!funnelPages) {
    console.error('No funnel pages found. Redirecting to funnels...');
    return redirect(`/subaccount/${params.subaccountid}/funnels`);
  }

  if (!params.subaccountid) {
    console.error('User ID is undefined');  
    return redirect('/error');
  }
  console.log('Subaccount ID:', params.subaccountid); 

  const user = await db.user.findUnique({
    where: { id: params.subaccountid }, // Check if this is the correct ID to use
  });
  console.log('Fetched User:', user); 

  if (!user) {
    console.error('User not found for ID:', params.subaccountid); 
    return redirect('/error');
  }

  const userIdFromDb = user.id; 

  return (
    <BlurPage>
      <Link
        href={`/subaccount/${userIdFromDb}/funnels`}
        className="flex justify-between gap-4 mb-4 text-muted-foreground"
      >
        Back
      </Link>
      <h1 className="text-3xl mb-8">{funnelPages.name}</h1>
      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid grid-cols-2 w-[50%] bg-transparent">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="steps">
          <FunnelSteps
            funnel={funnelPages}
            userId={userIdFromDb}
            pages={funnelPages.FunnelPages}
            funnelId={params.funnelId}
          />
        </TabsContent>
        <TabsContent value="settings">
          <FunnelSettings
            userId={userIdFromDb} 
            defaultData={funnelPages}
          />
        </TabsContent>
      </Tabs>
    </BlurPage>
  )
}

export default FunnelPage;
