// import React from 'react'
// import { Funnel, User } from '@prisma/client' // Changed SubAccount to User
// import { db } from '@/lib/db'
// import { getConnectAccountProducts } from '@/lib/stripe/stripe-actions'

// import FunnelForm from '@/components/forms/funnel-form'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import FunnelProductsTable from './funnel-products-table'

// interface FunnelSettingsProps {
//   userId: string // Changed subaccountId to userId
//   defaultData: Funnel
// }

// // Make sure this component handles async correctly.
// const FunnelSettings: React.FC<FunnelSettingsProps> = async ({
//   userId, // Changed subaccountId to userId
//   defaultData,
// }) => {
//   // Fetch user details from the database
//   const userDetails = await db.user.findUnique({
//     where: {
//       id: userId, // Changed subaccountId to userId
//     },
//   })

//   // Handle cases where user does not exist or connectAccountId is not present
//   if (!userDetails || !userDetails.connectAccountId) {
//     return (
//       <div className="flex flex-col items-center">
//         <h2 className="text-lg font-bold">Stripe Account Not Connected</h2>
//         <p className="text-sm">
//           Connect your Stripe account to sell products.
//         </p>
//       </div>
//     )
//   }

//   // Fetch products from Stripe using the user's connect account ID
//   const products = await getConnectAccountProducts(userDetails.connectAccountId)

//   return (
//     <div className="flex gap-4 flex-col xl:flex-row">
//       <Card className="flex-1 flex-shrink">
//         <CardHeader>
//           <CardTitle>Funnel Products</CardTitle>
//           <CardDescription>
//             Select the products and services you wish to sell on this funnel.
//             You can sell one-time and recurring products too.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {userDetails.connectAccountId ? (
//             <FunnelProductsTable
//               defaultData={defaultData}
//               products={products}
//             />
//           ) : (
//             <p>Connect your Stripe account to sell products.</p>
//           )}
//         </CardContent>
//       </Card>

//       <FunnelForm
//         userId={userId} // Pass userId to FunnelForm
//         defaultData={defaultData}
//       />
//     </div>
//   )
// }

// export default FunnelSettings


import React from 'react'

function funnelsettings() {
  return (
    <div>funnel-settings</div>
  )
}

export default funnelsettings
