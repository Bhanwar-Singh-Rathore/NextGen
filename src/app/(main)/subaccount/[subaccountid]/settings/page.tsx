'use cli'

import SubAccountDetails from '@/components/forms/subaccount-details'
import UserDetails from '@/components/forms/user-details'
import BlurPage from '@/components/global/blur-page'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

type Props = {
  params: { subaccountId: string }
}

const SubaccountSettingPage = async ({ params }: Props) => {
  const authUser = await currentUser()
  if (!authUser) return
  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  })
  if (!userDetails) return

  const subAccount = await db.user.findUnique({
    where: { id: params.subaccountId,
      email: authUser.emailAddresses[0].emailAddress,
     },
  })
  if (!subAccount) return

  // const agencyDetails = await db.agency.findUnique({
  //   where: { id: subAccount.agencyId },
  //   include: { SubAccount: true },
  // })

  // if (!agencyDetails) return
  // const subAccounts = agencyDetails.SubAccount

  return (
    <BlurPage>
      <div className="flex lg:!flex-row flex-col gap-4">
        {/* <SubAccountDetails
          agencyDetails={agencyDetails}
          details={subAccount}
          subaccountId={userDetails.id}
          userName={userDetails.name}
        /> */}
        <UserDetails
          type="subaccount"
          id={params.subaccountId}
          // subAccounts={subAccounts}
          userData={userDetails}
        />
      </div>
    </BlurPage>
  )
}

export default SubaccountSettingPage


// import UserDetails from '@/components/forms/user-details'
// import BlurPage from '@/components/global/blur-page'
// import { db } from '@/lib/db'
// import { currentUser } from '@clerk/nextjs/server'
// import React from 'react'

// type Props = {
//   params: { subaccountId: string }
// }

// const UserSettingPage = async ({ params }: Props) => {
//   const authUser = await currentUser()
//   if (!authUser) return

//   // Fetch the user details based on the current authenticated user's email
//   const userDetails = await db.user.findUnique({
//     where: {
//       email: authUser.emailAddresses[0].emailAddress,
//     },
//   })
//   if (!userDetails) return

//   // Fetch another user based on the subaccountId from params (previously subaccount)
//   const targetUser = await db.user.findUnique({
//     where: { id: params.subaccountId },
//   })
//   if (!targetUser) return

//   // Fetch related pipelines for the user
//   const pipelines = await db.pipeline.findMany({
//     where: { userId: targetUser.id },
//   })

//   return (
//     <BlurPage>
//       <div className="flex lg:!flex-row flex-col gap-4">
//         {/* UserDetails component for rendering user and pipeline details */}
//         <UserDetails
//           type="user"
//           id={params.subaccountId}
//           pipelines={pipelines}
//           userData={userDetails}
//         />
//       </div>
//     </BlurPage>
//   )
// }

// export default UserSettingPage
