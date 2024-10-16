'use server'

import { clerkClient, currentUser } from '@clerk/nextjs/server'

import { db } from './db'
import { redirect } from 'next/navigation'
import {
  // Agency,
  Lane,
  // Plan,
  Prisma,
  // Role,
  // SubAccount,
  // Tag,
  // Ticket,
  User,
} from '@prisma/client'
import { v4 } from 'uuid'
import {
  CreateFunnelFormSchema,
  CreateMediaType,
  UpsertFunnelPage,
} from './types'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export const getAuthUserDetails = async () => {
  const user = await currentUser()
  if (!user) {
    return
  }

  const userData = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    include: {
      Agency: {
        include: {
          SidebarOption: true,
          SubAccount: {
            include: {
              SidebarOption: true,
            },
          },
        },
      },
      Permissions: true,
    },
  })

  return userData
}






// async function getAgencyIdByUserEmail(email:string) {
//   try {
//     const user = await db.user.findUnique({
//       where: {
//         email: email,
//       },
//       select: {
//         agencyId: true,
//       },
//     });

//     // Return the agencyId or null if not found
//     return user ? user.agencyId : null;
//   } catch (error) {
//     console.error('Error fetching agency ID:', error);
//     throw new Error('Could not retrieve agency ID');
//   }
// }

// export default getAgencyIdByUserEmail;



// export const saveActivityLogsNotification = async ({
//   agencyId,
//   description,
//   subaccountId,
// }: {
//   agencyId?: string
//   description: string
//   subaccountId?: string
// }) => {
//   const authUser = await currentUser()
//   let userData
//   if (!authUser) {
//     const response = await db.user.findFirst({
//       where: {
//         Agency: {
//           SubAccount: {
//             some: { id: subaccountId },
//           },
//         },
//       },
//     })
//     if (response) {
//       userData = response
//     }
//   } else {
//     userData = await db.user.findUnique({
//       where: { email: authUser?.emailAddresses[0].emailAddress },
//     })
//   }

//   if (!userData) {
//     console.log('Could not find a user')
//     return
//   }

//   let foundAgencyId = agencyId
//   if (!foundAgencyId) {
//     if (!subaccountId) {
//       throw new Error(
//         'You need to provide atleast an agency Id or subaccount Id'
//       )
//     }
//     const response = await db.subAccount.findUnique({
//       where: { id: subaccountId },
//     })
//     if (response) foundAgencyId = response.agencyId
//   }
//   if (subaccountId) {
//     await db.notification.create({
//       data: {
//         notification: `${userData.name} | ${description}`,
//         User: {
//           connect: {
//             id: userData.id,
//           },
//         },
//         Agency: {
//           connect: {
//             id: foundAgencyId,
//           },
//         },
//         SubAccount: {
//           connect: { id: subaccountId },
//         },
//       },
//     })
//   } else {
//     await db.notification.create({
//       data: {
//         notification: `${userData.name} | ${description}`,
//         User: {
//           connect: {
//             id: userData.id,
//           },
//         },
//         Agency: {
//           connect: {
//             id: foundAgencyId,
//           },
//         },
//       },
//     })
//   }
// }

// export const createTeamUser = async (agencyId: string, user: User) => {
//   if (user.role === 'AGENCY_OWNER') return null
//   const response = await db.user.create({ data: { ...user } })
//   return response
// }

// export const verifyAndAcceptInvitation = async () => {
//   const user = await currentUser()
//   if (!user) return redirect('/sign-in')
//   const invitationExists = await db.invitation.findUnique({
//     where: {
//       email: user.emailAddresses[0].emailAddress,
//       status: 'PENDING',
//     },
//   })

//   if (invitationExists) {
//     const userDetails = await createTeamUser(invitationExists.agencyId, {
//       email: invitationExists.email,
//       agencyId: invitationExists.agencyId,
//       avatarUrl: user.imageUrl,
//       id: user.id,
//       name: `${user.firstName} ${user.lastName}`,
//       role: invitationExists.role,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     })
//     await saveActivityLogsNotification({
//       agencyId: invitationExists?.agencyId,
//       description: `Joined`,
//       subaccountId: undefined,
//     })

//     if (userDetails) {
//       await clerkClient.users.updateUserMetadata(user.id, {
//         privateMetadata: {
//           role: userDetails.role || 'SUBACCOUNT_USER',
//         },
//       })

//       await db.invitation.delete({
//         where: { email: userDetails.email },
//       })

//       return userDetails.agencyId
//     } else return null
//   } else {
//     const agency = await db.user.findUnique({
//       where: {
//         email: user.emailAddresses[0].emailAddress,
//       },
//     })
//     return agency ? agency.agencyId : null
//   }
// }

// export const updateAgencyDetails = async (
//   agencyId: string,
//   agencyDetails: Partial<Agency>
// ) => {
//   const response = await db.agency.update({
//     where: { id: agencyId },
//     data: { ...agencyDetails },
//   })
//   return response
// }

// export const deleteAgency = async (agencyId: string) => {
//   const response = await db.agency.delete({ where: { id: agencyId } })
//   return response
// }

// export const initUser = async (newUser: Partial<User>) => {
//   const user = await currentUser()
//   if (!user) return

//   const userData = await db.user.upsert({
//     where: {
//       email: user.emailAddresses[0].emailAddress,
//     },
//     update: newUser,
//     create: {
//       id: user.id,
//       avatarUrl: user.imageUrl,
//       email: user.emailAddresses[0].emailAddress,
//       name: `${user.firstName} ${user.lastName}`,
//       role: newUser.role || 'SUBACCOUNT_USER',
//     },
//   })

//   await clerkClient.users.updateUserMetadata(user.id, {
//     privateMetadata: {
//       role: newUser.role || 'SUBACCOUNT_USER',
//     },
//   })

//   return userData
// }

// export const upsertAgency = async (agency: Agency, price?: Plan) => {
//   if (!agency.companyEmail) return null
//   try {
//     const agencyDetails = await db.agency.upsert({
//       where: {
//         id: agency.id,
//       },
//       update: agency,
//       create: {
//         users: {
//           connect: { email: agency.companyEmail },
//         },
//         ...agency,
//         SidebarOption: {
//           create: [
//             {
//               name: 'Dashboard',
//               icon: 'category',
//               link: `/agency/${agency.id}`,
//             },
//             {
//               name: 'Launchpad',
//               icon: 'clipboardIcon',
//               link: `/agency/${agency.id}/launchpad`,
//             },
//             {
//               name: 'Billing',
//               icon: 'payment',
//               link: `/agency/${agency.id}/billing`,
//             },
//             {
//               name: 'Settings',
//               icon: 'settings',
//               link: `/agency/${agency.id}/settings`,
//             },
//             {
//               name: 'Sub Accounts',
//               icon: 'person',
//               link: `/agency/${agency.id}/all-subaccounts`,
//             },
//             {
//               name: 'Team',
//               icon: 'shield',
//               link: `/agency/${agency.id}/team`,
//             },
//           ],
//         },
//       },
//     })
//     return agencyDetails
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getNotificationAndUser = async (agencyId: string) => {
//   try {
//     const response = await db.notification.findMany({
//       where: { agencyId },
//       include: { User: true },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     })
//     return response
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const upsertSubAccount = async (subAccount: SubAccount) => {
//   if (!subAccount.companyEmail) return null
//   const agencyOwner = await db.user.findFirst({
//     where: {
//       Agency: {
//         id: subAccount.agencyId,
//       },
//       role: 'AGENCY_OWNER',
//     },
//   })
//   if (!agencyOwner) return console.log('🔴Erorr could not create subaccount')
//   const permissionId = v4()
//   const response = await db.subAccount.upsert({
//     where: { id: subAccount.id },
//     update: subAccount,
//     create: {
//       ...subAccount,
//       Permissions: {
//         create: {
//           access: true,
//           email: agencyOwner.email,
//           id: permissionId,
//         },
//         connect: {
//           subAccountId: subAccount.id,
//           id: permissionId,
//         },
//       },
//       Pipeline: {
//         create: { name: 'Lead Cycle' },
//       },
//       SidebarOption: {
//         create: [
//           {
//             name: 'Launchpad',
//             icon: 'clipboardIcon',
//             link: `/subaccount/${subAccount.id}/launchpad`,
//           },
//           {
//             name: 'Settings',
//             icon: 'settings',
//             link: `/subaccount/${subAccount.id}/settings`,
//           },
//           {
//             name: 'Funnels',
//             icon: 'pipelines',
//             link: `/subaccount/${subAccount.id}/funnels`,
//           },
//           {
//             name: 'Media',
//             icon: 'database',
//             link: `/subaccount/${subAccount.id}/media`,
//           },
//           {
//             name: 'Automations',
//             icon: 'chip',
//             link: `/subaccount/${subAccount.id}/automations`,
//           },
//           {
//             name: 'Pipelines',
//             icon: 'flag',
//             link: `/subaccount/${subAccount.id}/pipelines`,
//           },
//           {
//             name: 'Contacts',
//             icon: 'person',
//             link: `/subaccount/${subAccount.id}/contacts`,
//           },
//           {
//             name: 'Dashboard',
//             icon: 'category',
//             link: `/subaccount/${subAccount.id}`,
//           },
//         ],
//       },
//     },
//   })
//   return response
// }

interface User {
  id?: string;
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  avatarUrl?: string;
  // Add any additional fields if necessary
}

export const upsertUser = async (user: User) => {
  if (!user.email) return null;

  const response = await db.user.upsert({
    where: { id: user.id || '' }, // Use an empty string for new user creation
    update: {
      name: user.name,
      email: user.email,
      address: user.address,
      city: user.city,
      zipCode: user.zipCode,
      state: user.state,
      country: user.country,
      avatarUrl: user.avatarUrl,
      updatedAt: new Date(), // Ensure this is updated on every upsert
    },
    create: {
      id: user.id || v4(), // Generate a new ID if not provided
      name: user.name,
      email: user.email,
      address: user.address,
      city: user.city,
      zipCode: user.zipCode,
      state: user.state,
      country: user.country,
      avatarUrl: user.avatarUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return response;
};




// export const updateUser = async (user: Partial<User>) => {
//   const response = await db.user.update({
//     where: { email: user.email },
//     data: { ...user },
//   })

//   await clerkClient.users.updateUserMetadata(response.id, {
//     privateMetadata: {
//       role: user.role || 'SUBACCOUNT_USER',
//     },
//   })

//   return response
// }

// export const changeUserPermissions = async (
//   permissionId: string | undefined,
//   userEmail: string,
//   subAccountId: string,
//   permission: boolean
// ) => {
//   try {
//     const response = await db.permissions.upsert({
//       where: { id: permissionId },
//       update: { access: permission },
//       create: {
//         access: permission,
//         email: userEmail,
//         subAccountId: subAccountId,
//       },
//     })
//     return response
//   } catch (error) {
//     console.log('🔴Could not change persmission', error)
//   }
// }

// export const getSubaccountDetails = async (subaccountId: string) => {
//   const response = await db.subAccount.findUnique({
//     where: {
//       id: subaccountId,
//     },
//   })
//   return response
// }

// export const deleteSubAccount = async (subaccountId: string) => {
//   const response = await db.subAccount.delete({
//     where: {
//       id: subaccountId,
//     },
//   })
//   return response
// }

export const deleteUser = async (userId: string) => {
  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      role: undefined,
    },
  })
  const deletedUser = await db.user.delete({ where: { id: userId } })

  return deletedUser
}

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  })

  return user
}

// export const sendInvitation = async (
//   role: Role,
//   email: string,
//   agencyId: string
// ) => {
//   const resposne = await db.invitation.create({
//     data: { email, agencyId, role },
//   })

//   try {
//     const invitation = await clerkClient.invitations.createInvitation({
//       emailAddress: email,
//       redirectUrl: process.env.NEXT_PUBLIC_URL,
//       publicMetadata: {
//         throughInvitation: true,
//         role,
//       },
//     })
//   } catch (error) {
//     console.log(error)
//     throw error
//   }

//   return resposne
// }

// export const getMedia = async (subaccountId: string) => {
//   const mediafiles = await db.subAccount.findUnique({
//     where: {
//       id: subaccountId,
//     },
//     include: { Media: true },
//   })
//   return mediafiles
// }

// export const createMedia = async (
//   subaccountId: string,
//   mediaFile: CreateMediaType
// ) => {
//   const response = await db.media.create({
//     data: {
//       link: mediaFile.link,
//       name: mediaFile.name,
//       subAccountId: subaccountId,
//     },
//   })

//   return response
// }

// export const deleteMedia = async (mediaId: string) => {
//   const response = await db.media.delete({
//     where: {
//       id: mediaId,
//     },
//   })
//   return response
// }


// Fetch media files for a user
// export const getMedia = async (userId: string) => {
//   const mediafiles = await db.user.findUnique({
//     where: {
//       id: userId,
//     },
//     include: { Media: true }, // Fetch associated media files
//   })
//   return mediafiles
// }
// Fetch media files for a user
// export const getMedia = async (userId: string) => {
//   // Ensure userId is defined
//   if (!userId) {
//     throw new Error('User ID is undefined or invalid');
//   }

//   const mediaFiles = await db.user.findUnique({
//     where: {
//       id: userId, // Use the userId for fetching user-specific media files
//     },
//     include: {
//       Media: true, // Include the related media files
//     },
//   });

//   return mediaFiles; // Return the media files or null if not found
// };

// export const getMedia = async (subaccountId: string) => {
//   // Ensure subaccountId is defined
//   if (!subaccountId) {
//     throw new Error('Subaccount ID is undefined or invalid');
//   }

//   const mediaFiles = await db.user.findUnique({
//     where: {
//       id: subaccountId, // Use the subaccountId for fetching user-specific media files
//     },
//     include: {
//       Media: true, // Include the related media files
//     },
//   });

//   return mediaFiles;
// };





export const getMedia = async (subaccountId: string) => {
  // if (!subaccountId) {
  //   throw new Error('Subaccount ID is undefined or invalid');
  // }
  const mediafiles = await db.user.findUnique({
    where: {
      id: "95e18b04-a4df-4a69-ae8b-aeba1c552243",
    },
    include: { Media: true },
  })
  return mediafiles
}


















// Create media file for a user
export const createMedia = async (userId: string, mediaFile: CreateMediaType) => {
  const response = await db.media.create({
    data: {
      link: mediaFile.link,
      name: mediaFile.name,
      userId: '95e18b04-a4df-4a69-ae8b-aeba1c552243', // Associate media with the user
    },
  })
  return response
}

// Delete media by ID
export const deleteMedia = async (mediaId: string) => {
  const response = await db.media.delete({
    where: {
      id: mediaId,
    },
  })
  return response
}


export const getPipelineDetails = async (pipelineId: string) => {
  const response = await db.pipeline.findUnique({
    where: {
      id: pipelineId,
    },
  })
  return response
}

// export const getLanesWithTicketAndTags = async (pipelineId: string) => {
//   const response = await db.lane.findMany({
//     where: {
//       pipelineId,
//     },
//     orderBy: { order: 'asc' },
//     include: {
//       Tickets: {
//         orderBy: {
//           order: 'asc',
//         },
//         include: {
//           Tags: true,
//           Assigned: true,
//           Customer: true,
//         },
//       },
//     },
//   })
//   return response
// }

// export const upsertFunnel = async (
//   subaccountId: string,
//   funnel: z.infer<typeof CreateFunnelFormSchema> & { liveProducts: string },
//   funnelId: string
// ) => {
//   const response = await db.funnel.upsert({
//     where: { id: funnelId },
//     update: funnel,
//     create: {
//       ...funnel,
//       id: funnelId || v4(),
//       subAccountId: subaccountId,
//     },
//   })

//   return response
// }

// export const upsertPipeline = async (
//   pipeline: Prisma.PipelineUncheckedCreateWithoutLaneInput
// ) => {
//   const response = await db.pipeline.upsert({
//     where: { id: pipeline.id || v4() },
//     update: pipeline,
//     create: pipeline,
//   })

//   return response
// }

// export const deletePipeline = async (pipelineId: string) => {
//   const response = await db.pipeline.delete({
//     where: { id: pipelineId },
//   })
//   return response
// }


// Upsert funnel for a user
// export const upsertFunnel = async (
//   userId: string, // Changed subaccountId to userId
//   funnel: z.infer<typeof CreateFunnelFormSchema> & { liveProducts: string },
//   funnelId: string
// ) => {
//   const response = await db.funnel.upsert({
//     where: { id: funnelId },
//     update: funnel,
//     create: {
//       ...funnel,
//       id: funnelId || v4(),
//       userId: userId, // Associate funnel with the user
//     },
//   })

//   return response
// }


// export const upsertFunnel = async (userId: string, funnelData: any, funnelId: string) => {
//   try {
//     console.log('Upserting funnel with data:', { userId, funnelData, funnelId }); // Debugging: Log inputs
//     const response = await db.funnel.upsert({
//       where: { id: funnelId },
//       update: funnelData,
//       create: {
//         ...funnelData,
//         userId: userId,
//         id: funnelId,
//       },
//     });
//     console.log('Upsert successful:', response); // Debugging: Log response
//     return response;
//   } catch (error) {
//     console.error('Error in upsertFunnel:', error); // Debugging: Log error
//     throw error;
//   }
// };

interface FunnelData {
  title: string;
  description?: string;
  // Other properties can be defined here
}

// export const upsertFunnel = async (userId: string, funnelData: FunnelData, funnelId: string): Promise<Funnel> => {
//   if (!userId || !funnelId || !funnelData) {
//     throw new Error('Invalid input parameters');
//   }

//   try {
//     console.log('Upserting funnel with data:', { userId, funnelData, funnelId }); // Debugging: Log inputs
//     const response = await db.funnel.upsert({
//       where: { id: funnelId },
//       update: funnelData,
//       create: {
//         ...funnelData,
//         userId: userId,
//         id: funnelId,
//       },
//     });
//     console.log('Upsert successful:', response); // Debugging: Log response
//     return response;
//   } catch (error) {
//     console.error('Error in upsertFunnel:', error); // Debugging: Log error
//     throw new Error(`Failed to upsert funnel: ${error.message}`);
//   }
// };



// Upsert pipeline

export const upsertFunnel = async (userId: string, funnelData: FunnelData, funnelId: string): Promise<Funnel> => {
  // if (!userId || !funnelId || !funnelData) {
  //   throw new Error('Invalid input parameters');
  // }

  try {
    console.log('Upserting funnel with data:', { userId, funnelData, funnelId }); // Debugging: Log inputs
    const response = await db.funnel.upsert({
      where: { id: funnelId },
      update: funnelData,
      create: {
        ...funnelData,
        userId: userId, // Make sure this matches the correct field in your Prisma schema
        id: funnelId,
      },
    });
    console.log('Upsert successful:', response); // Debugging: Log response
    return response;
  } catch (error) {
    console.error('Error in upsertFunnel:', error); // Debugging: Log error
    throw new Error(`Failed to upsert funnel: ${error.message}`);
  }
};



export const upsertPipeline = async (
  pipeline: Prisma.PipelineUncheckedCreateWithoutLaneInput
) => {
  const response = await db.pipeline.upsert({
    where: { id: pipeline.id || v4() },
    update: pipeline,
    create: pipeline,
  })

  return response
}

// Delete pipeline by ID
export const deletePipeline = async (pipelineId: string) => {
  const response = await db.pipeline.delete({
    where: { id: pipelineId },
  })
  return response
}


export const updateLanesOrder = async (lanes: Lane[]) => {
  try {
    const updateTrans = lanes.map((lane) =>
      db.lane.update({
        where: {
          id: lane.id,
        },
        data: {
          order: lane.order,
        },
      })
    )

    await db.$transaction(updateTrans)
    console.log('🟢 Done reordered 🟢')
  } catch (error) {
    console.log(error, 'ERROR UPDATE LANES ORDER')
  }
}

// export const updateTicketsOrder = async (tickets: Ticket[]) => {
//   try {
//     const updateTrans = tickets.map((ticket) =>
//       db.ticket.update({
//         where: {
//           id: ticket.id,
//         },
//         data: {
//           order: ticket.order,
//           laneId: ticket.laneId,
//         },
//       })
//     )

//     await db.$transaction(updateTrans)
//     console.log('🟢 Done reordered 🟢')
//   } catch (error) {
//     console.log(error, '🔴 ERROR UPDATE TICKET ORDER')
//   }
// }

export const upsertLane = async (lane: Prisma.LaneUncheckedCreateInput) => {
  let order: number

  if (!lane.order) {
    const lanes = await db.lane.findMany({
      where: {
        pipelineId: lane.pipelineId,
      },
    })

    order = lanes.length
  } else {
    order = lane.order
  }

  const response = await db.lane.upsert({
    where: { id: lane.id || v4() },
    update: lane,
    create: { ...lane, order },
  })

  return response
}

export const deleteLane = async (laneId: string) => {
  const resposne = await db.lane.delete({ where: { id: laneId } })
  return resposne
}

// export const getTicketsWithTags = async (pipelineId: string) => {
//   const response = await db.ticket.findMany({
//     where: {
//       Lane: {
//         pipelineId,
//       },
//     },
//     include: { Tags: true, Assigned: true, Customer: true },
//   })
//   return response
// }

// export const _getTicketsWithAllRelations = async (laneId: string) => {
//   const response = await db.ticket.findMany({
//     where: { laneId: laneId },
//     include: {
//       Assigned: true,
//       Customer: true,
//       Lane: true,
//       Tags: true,
//     },
//   })
//   return response
// }

// export const getSubAccountTeamMembers = async (subaccountId: string) => {
//   const subaccountUsersWithAccess = await db.user.findMany({
//     where: {
//       Agency: {
//         SubAccount: {
//           some: {
//             id: subaccountId,
//           },
//         },
//       },
//       role: 'SUBACCOUNT_USER',
//       Permissions: {
//         some: {
//           subAccountId: subaccountId,
//           access: true,
//         },
//       },
//     },
//   })
//   return subaccountUsersWithAccess
// }

export const searchContacts = async (searchTerms: string) => {
  const response = await db.contact.findMany({
    where: {
      name: {
        contains: searchTerms,
      },
    },
  })
  return response
}

// export const upsertTicket = async (
//   ticket: Prisma.TicketUncheckedCreateInput,
//   tags: Tag[]
// ) => {
//   let order: number
//   if (!ticket.order) {
//     const tickets = await db.ticket.findMany({
//       where: { laneId: ticket.laneId },
//     })
//     order = tickets.length
//   } else {
//     order = ticket.order
//   }

//   const response = await db.ticket.upsert({
//     where: {
//       id: ticket.id || v4(),
//     },
//     update: { ...ticket, Tags: { set: tags } },
//     create: { ...ticket, Tags: { connect: tags }, order },
//     include: {
//       Assigned: true,
//       Customer: true,
//       Tags: true,
//       Lane: true,
//     },
//   })

//   return response
// }

// export const deleteTicket = async (ticketId: string) => {
//   const response = await db.ticket.delete({
//     where: {
//       id: ticketId,
//     },
//   })

//   return response
// }

// export const upsertTag = async (
//   subaccountId: string,
//   tag: Prisma.TagUncheckedCreateInput
// ) => {
//   const response = await db.tag.upsert({
//     where: { id: tag.id || v4(), subAccountId: subaccountId },
//     update: tag,
//     create: { ...tag, subAccountId: subaccountId },
//   })

//   return response
// }

// export const getTagsForSubaccount = async (subaccountId: string) => {
//   const response = await db.subAccount.findUnique({
//     where: { id: subaccountId },
//     select: { Tags: true },
//   })
//   return response
// }

// export const deleteTag = async (tagId: string) => {
//   const response = await db.tag.delete({ where: { id: tagId } })
//   return response
// }

export const upsertContact = async (
  contact: Prisma.ContactUncheckedCreateInput
) => {
  const response = await db.contact.upsert({
    where: { id: contact.id || v4() },
    update: contact,
    create: contact,
  })
  return response
}

// export const getFunnels = async (subacountId: string) => {
//   const funnels = await db.funnel.findMany({
//     where: { subAccountId: subacountId },
//     include: { FunnelPages: true },
//   })

//   return funnels
// }

// export const getFunnel = async (funnelId: string) => {
//   const funnel = await db.funnel.findUnique({
//     where: { id: funnelId },
//     include: {
//       FunnelPages: {
//         orderBy: {
//           order: 'asc',
//         },
//       },
//     },
//   })

//   return funnel
// }

// export const updateFunnelProducts = async (
//   products: string,
//   funnelId: string
// ) => {
//   const data = await db.funnel.update({
//     where: { id: funnelId },
//     data: { liveProducts: products },
//   })
//   return data
// }

// export const upsertFunnelPage = async (
//   subaccountId: string,
//   funnelPage: UpsertFunnelPage,
//   funnelId: string
// ) => {
//   if (!subaccountId || !funnelId) return
//   const response = await db.funnelPage.upsert({
//     where: { id: funnelPage.id || '' },
//     update: { ...funnelPage },
//     create: {
//       ...funnelPage,
//       content: funnelPage.content
//         ? funnelPage.content
//         : JSON.stringify([
//             {
//               content: [],
//               id: '__body',
//               name: 'Body',
//               styles: { backgroundColor: 'white' },
//               type: '__body',
//             },
//           ]),
//       funnelId,
//     },
//   })

//   revalidatePath(`/subaccount/${subaccountId}/funnels/${funnelId}`, 'page')
//   return response
// }

// export const deleteFunnelePage = async (funnelPageId: string) => {
//   const response = await db.funnelPage.delete({ where: { id: funnelPageId } })

//   return response
// }

// export const getFunnelPageDetails = async (funnelPageId: string) => {
//   const response = await db.funnelPage.findUnique({
//     where: {
//       id: funnelPageId,
//     },
//   })

//   return response
// }

// export const getDomainContent = async (subDomainName: string) => {
//   const response = await db.funnel.findUnique({
//     where: {
//       subDomainName,
//     },
//     include: { FunnelPages: true },
//   })
//   return response
// }

// export const getPipelines = async (subaccountId: string) => {
//   const response = await db.pipeline.findMany({
//     where: { subAccountId: subaccountId },
//     include: {
//       Lane: {
//         include: { Tickets: true },
//       },
//     },
//   })
//   return response
// }

// // Fetch funnels for a user
// export const getFunnels = async (userId: string) => {
//   const funnels = await db.funnel.findMany({
//     where: { userId: userId }, // Updated to userId
//     include: { FunnelPages: true },
//   })

//   return funnels
// }

// // Fetch a specific funnel by ID
// export const getFunnel = async (funnelId: string) => {
//   const funnel = await db.funnel.findUnique({
//     where: { id: funnelId },
//     include: {
//       FunnelPages: {
//         orderBy: {
//           order: 'asc',
//         },
//       },
//     },
//   })

//   return funnel
// }

// // Update live products for a funnel
// export const updateFunnelProducts = async (
//   products: string,
//   funnelId: string
// ) => {
//   const data = await db.funnel.update({
//     where: { id: funnelId },
//     data: { liveProducts: products },
//   })
//   return data
// }

// // Upsert a funnel page for a user
// // export const upsertFunnelPage = async (
// //   userId: string, // Changed subaccountId to userId
// //   funnelPage: UpsertFunnelPage,
// //   funnelId: string
// // ) => {
// //   if (!userId || !funnelId) return
// //   const response = await db.funnelPage.upsert({
// //     where: { id: funnelPage.id || '' },
// //     update: { ...funnelPage },
// //     create: {
// //       ...funnelPage,
// //       content: funnelPage.content
// //         ? funnelPage.content
// //         : JSON.stringify([{
// //             content: [],
// //             id: '__body',
// //             name: 'Body',
// //             styles: { backgroundColor: 'white' },
// //             type: '__body',
// //           }]),
// //       funnelId,
// //     },
// //   })

// //   revalidatePath(`/subaccount/${userId}/funnels/${funnelId}`, 'page') // Updated the path to reflect userId
// //   return response
// //   // revalidatePath(`/subaccount/${subaccountId}/funnels/${funnelId}`, 'page')
// // }

// // Upsert a funnel page for a user
// // Upsert a funnel page for a user
// export const upsertFunnelPage = async (
//   userId: string, 
//   funnelPage: UpsertFunnelPage,
//   funnelId: string
// ) => {
//   if (!userId || !funnelId || !funnelPage.id) {
//     console.error('Invalid userId, funnelId, or funnelPage.id');
//     return null; // Ensure a response is returned if invalid
//   }

//   try {
//     const response = await db.funnelPage.upsert({
//       where: { id: funnelPage.id },
//       update: { ...funnelPage },
//       create: {
//         ...funnelPage,
//         content: funnelPage.content
//           ? funnelPage.content
//           : JSON.stringify([{
//               content: [],
//               id: '__body',
//               name: 'Body',
//               styles: { backgroundColor: 'white' },
//               type: '__body',
//             }]),
//         funnelId,
//       },
//     });

//     console.log('Funnel page upserted successfully:', response);
//     return response; // Ensure to return the response
//   } catch (error) {
//     console.error('Error upserting funnel page:', error);
//     throw error; // Throw error for handling in the calling function
//   }
// };


// // Delete a funnel page by ID
// export const deleteFunnelePage = async (funnelPageId: string) => {
//   const response = await db.funnelPage.delete({
//     where: { id: funnelPageId },
//   })

//   return response
// }







export const getFunnels = async (userId: string) => {
  const funnels = await db.funnel.findMany({
    where: { userId: userId },
    include: { FunnelPages: true },
  });

  return funnels;
}


export const getFunnel = async (funnelId: string) => {
  const funnel = await db.funnel.findUnique({
    where: { id: funnelId },
    include: {
      FunnelPages: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  return funnel;
}


export const updateFunnelProducts = async (
  products: string,
  funnelId: string
) => {
  const data = await db.funnel.update({
    where: { id: funnelId },
    data: { liveProducts: products },
  });
  return data;
}


// export const upsertFunnelPage = async (
//   userId: string, 
//   funnelPage: UpsertFunnelPage,
//   funnelId: string
// ) => {
//   if (!userId || !funnelId || !funnelPage.id) {
//     console.error('Invalid userId, funnelId, or funnelPage.id');
//     return null; // Ensure a response is returned if invalid
//   }

//   try {
//     const response = await db.funnelPage.upsert({
//       where: { id: funnelPage.id },
//       update: { ...funnelPage },
//       create: {
//         ...funnelPage,
//         content: funnelPage.content
//           ? funnelPage.content
//           : JSON.stringify([{
//               content: [],
//               id: '__body',
//               name: 'Body',
//               styles: { backgroundColor: 'white' },
//               type: '__body',
//             }]),
//         funnelId,
//       },
//     });

//     console.log('Funnel page upserted successfully:', response);
//     return response; // Ensure to return the response
//   } catch (error) {
//     console.error('Error upserting funnel page:', error);
//     throw error; // Throw error for handling in the calling function
//   }
// };

// import { db } from '@/lib/db';

// export const upsertFunnelPage = async (
//   userId: string, 
//   funnelPage: UpsertFunnelPage,
//   funnelId: string
// ) => {
//   // Check for valid parameters
//   if (!userId || !funnelId || !funnelPage.id) {
//     console.error('Invalid userId, funnelId, or funnelPage.id');
//     return null; // Return null when invalid input is passed
//   }

//   try {
//     // Upsert the funnel page
//     const response = await db.funnelPage.upsert({
//       where: { id: funnelPage.id }, // Use the funnelPage.id as the unique identifier
//       update: { ...funnelPage },    // Update the existing funnelPage
//       create: {
//         ...funnelPage,              // Create a new funnelPage if it doesn't exist
//         content: funnelPage.content
//           ? funnelPage.content      // Use provided content if available
//           : JSON.stringify([
//               {
//                 content: [],
//                 id: '__body',
//                 name: 'Body',
//                 styles: { backgroundColor: 'white' },
//                 type: '__body',
//               }
//             ]),                      // Otherwise, default content structure
//         funnelId,                    // Associate the funnelPage with the funnelId
//         userId,                      // Associate the funnelPage with the userId
//       },
//     });

//     console.log('Funnel page upserted successfully:', response);
//     return response; // Return the upserted funnelPage data

//   } catch (error) {
//     // Detailed error logging for debugging
//     console.error('Error upserting funnel page:', error.message, error.stack);
//     throw error; // Re-throw the error for higher-level handling
//   }
// };
export const upsertFunnelPage = async (
  subaccountId: string,  // Change userId to subaccountId
  funnelPage: UpsertFunnelPage, 
  funnelId: string
) => {
  // Validate parameters
  // if (!subaccountId || !funnelId || !funnelPage?.id) {
  //   console.error('Invalid parameters:', { subaccountId, funnelId, funnelPage });
  //   return null; // Return early if invalid input is passed
  // }

  try {
    const response = await db.funnelPage.upsert({
     
      where: { id: funnelPage.id },
      update: { ...funnelPage },
      create: {
        ...funnelPage,
        content: funnelPage.content
          ? funnelPage.content
          : JSON.stringify([{ content: [], id: '__body', name: 'Body', styles: {}, type: '__body' }]),
        funnelId,
        subaccountId, // Add the subaccountId dynamically
      },
    });
    console.log('Invalid parameters:', { subaccountId, funnelId, funnelPage })
    console.log('Funnel page upserted successfully:', response);
    return response;
  } catch (error) {
    console.error('Error upserting funnel page:', error.message, error.stack);
    throw error;
  }
};



export const deleteFunnelePage = async (funnelPageId: string) => {
  const response = await db.funnelPage.delete({
    where: { id: funnelPageId },
  });

  return response;
}











































// Get details of a funnel page
export const getFunnelPageDetails = async (funnelPageId: string) => {
  const response = await db.funnelPage.findUnique({
    where: { id: funnelPageId },
  })

  return response
}

// Get domain content by subDomain name
export const getDomainContent = async (subDomainName: string) => {
  const response = await db.funnel.findUnique({
    where: { subDomainName },
    include: { FunnelPages: true },
  })
  return response
}

// Fetch pipelines for a user
export const getPipelines = async (userId: string) => {
  const response = await db.pipeline.findMany({
    where: { userId: userId }, // Updated to userId
    // include: {
    //   // Lane: {
    //   //   include: { Tickets: true },
    //   // },
    // },
  })
  return response
}
