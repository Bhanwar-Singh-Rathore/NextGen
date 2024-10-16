// import { getFunnels } from '@/lib/queries'
// import React from 'react'
// import FunnelsDataTable from './data-table'
// import { Plus } from 'lucide-react'
// import { columns } from './columns'
// import FunnelForm from '@/components/forms/funnel-form'
// import BlurPage from '@/components/global/blur-page'

// const Funnels = async ({ params }: { params: { subaccountId: string } }) => {
//   const funnels = await getFunnels(params.subaccountId)
//   if (!funnels) return null

//   return (
//     <BlurPage>
//       <FunnelsDataTable
//         actionButtonText={
//           <>
//             <Plus size={15} />
//             Create Funnel
//           </>
//         }
//         modalChildren={
//           <FunnelForm subAccountId={params.subaccountId}></FunnelForm>
//         }
//         filterValue="name"
//         columns={columns}
//         data={funnels}
//       />
//     </BlurPage>
//   )
// }

// export default Funnels
import { getFunnels } from '@/lib/queries';
import React from 'react';
import FunnelsDataTable from './data-table';
import { Plus } from 'lucide-react';
import { columns } from './columns';
import FunnelForm from '@/components/forms/funnel-form';
import BlurPage from '@/components/global/blur-page';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server'; // Import currentUser from Clerk

const Funnels = async ({ params }: { params: { subaccountId: string } }) => {
  console.log('Params:', params); // Debugging: Check the params

  // Get the current authenticated user
  const authUser = await currentUser();
  if (!authUser) return <div>Please log in to view your funnels.</div>; // Handle case when user is not authenticated

  // Fetch the user details based on the current authenticated user's email
  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });
  if (!userDetails) return <div>No user found.</div>; // Handle case when user is not found

  // Fetch funnels using the user's ID
  const funnels = await getFunnels(userDetails.id); // Use userDetails.id instead of user.id

  if (!funnels) return <div>No funnels found.</div>; // Handle case when no funnels are found

  return (
    <BlurPage>
      <FunnelsDataTable
        actionButtonText={
          <>
            <Plus size={15} />
            Create Funnel
          </>
        }
        modalChildren={
          <FunnelForm userId={userDetails.id} subAccountId={params.subaccountId} /> // Pass userId and subaccountId
        }
        filterValue="name"
        columns={columns}
        data={funnels}
      />
    </BlurPage>
  );
};

export default Funnels;
