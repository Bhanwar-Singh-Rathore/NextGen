// 'use client'
// import { NotificationWithUser } from '@/lib/types'
// import { UserButton } from '@clerk/nextjs'
// import React, { useState } from 'react'
// import { twMerge } from 'tailwind-merge'
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '../ui/sheet'
// import { Bell } from 'lucide-react'
// import { Role } from '@prisma/client'
// import { Card } from '../ui/card'
// import { Switch } from '../ui/switch'
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
// import { ModeToggle } from './mode-toggle'

// type Props = {
//   notifications: NotificationWithUser | []
//   role?: Role
//   className?: string
//   subAccountId?: string
// }

// const InfoBar = ({ notifications, subAccountId, className, role }: Props) => {
//   const [allNotifications, setAllNotifications] = useState(notifications)
//   const [showAll, setShowAll] = useState(true)

//   const handleClick = () => {
//     if (!showAll) {
//       setAllNotifications(notifications)
//     } else {
//       if (notifications?.length !== 0) {
//         setAllNotifications(
//           notifications?.filter((item) => item.subAccountId === subAccountId) ??
//             []
//         )
//       }
//     }
//     setShowAll((prev) => !prev)
//   }

//   return (
//     <>
//       <div
//         className={twMerge(
//           'fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px] ',
//           className
//         )}
//       >
//         <div className="flex items-center gap-2 ml-auto">
//           <UserButton afterSignOutUrl="/" />
//           <Sheet>
//             <SheetTrigger>
//               <div className="rounded-full w-9 h-9 bg-primary flex items-center justify-center text-white">
//                 <Bell size={17} />
//               </div>
//             </SheetTrigger>
//             <SheetContent className="mt-4 mr-4 pr-4 overflow-scroll">
//               <SheetHeader className="text-left">
//                 <SheetTitle>Notifications</SheetTitle>
//                 <SheetDescription>
//                   {(role === 'AGENCY_ADMIN' || role === 'AGENCY_OWNER') && (
//                     <Card className="flex items-center justify-between p-4">
//                       Current Subaccount
//                       <Switch onCheckedChange={handleClick} />
//                     </Card>
//                   )}
//                 </SheetDescription>
//               </SheetHeader>
//               {allNotifications?.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className="flex flex-col gap-y-2 mb-2 overflow-x-scroll text-ellipsis"
//                 >
//                   <div className="flex gap-2">
//                     <Avatar>
//                       <AvatarImage
//                         src={notification.User.avatarUrl}
//                         alt="Profile Picture"
//                       />
//                       <AvatarFallback className="bg-primary">
//                         {notification.User.name.slice(0, 2).toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex flex-col">
//                       <p>
//                         <span className="font-bold">
//                           {notification.notification.split('|')[0]}
//                         </span>
//                         <span className="text-muted-foreground">
//                           {notification.notification.split('|')[1]}
//                         </span>
//                         <span className="font-bold">
//                           {notification.notification.split('|')[2]}
//                         </span>
//                       </p>
//                       <small className="text-xs text-muted-foreground">
//                         {new Date(notification.createdAt).toLocaleDateString()}
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {allNotifications?.length === 0 && (
//                 <div
//                   className="flex items-center justify-center text-muted-foreground"
//                   mb-4
//                 >
//                   You have no notifications
//                 </div>
//               )}
//             </SheetContent>
//           </Sheet>
//           <ModeToggle />
//         </div>
//       </div>
//     </>
//   )
// }

// export default InfoBar



'use client'

import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Bell } from 'lucide-react'
import { Card } from '../ui/card'
import { Switch } from '../ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ModeToggle } from './mode-toggle'
import { UserButton } from '@clerk/nextjs'

// Dummy data for notifications and user
const dummyNotifications = [
  {
    id: '1',
    notification: 'New message|You have a new message from|John',
    createdAt: new Date(),
    subAccountId: 'sub123',
    User: {
      id: 'user1',
      name: 'John Doe',
      avatarUrl: 'https://via.placeholder.com/50',
    },
  },
  {
    id: '2',
    notification: 'Account update|Your account settings have been updated by|Admin',
    createdAt: new Date(),
    subAccountId: 'sub456',
    User: {
      id: 'user2',
      name: 'Admin',
      avatarUrl: 'https://via.placeholder.com/50',
    },
  },
  {
    id: '3',
    notification: 'Reminder|Meeting scheduled with|Alice',
    createdAt: new Date(),
    subAccountId: 'sub123',
    User: {
      id: 'user3',
      name: 'Alice Brown',
      avatarUrl: 'https://via.placeholder.com/50',
    },
  },
]

type Props = {
  notifications?: typeof dummyNotifications | []
  role?: string // Removed Role from Prisma, using string
  className?: string
  subAccountId?: string
}

const InfoBar = ({ notifications = dummyNotifications, subAccountId = 'sub123', className, role = 'AGENCY_OWNER' }: Props) => {
  const [allNotifications, setAllNotifications] = useState(notifications)
  const [showAll, setShowAll] = useState(true)

  const handleClick = () => {
    if (!showAll) {
      setAllNotifications(notifications)
    } else {
      if (notifications.length !== 0) {
        setAllNotifications(
          notifications.filter((item) => item.subAccountId === subAccountId) ?? []
        )
      }
    }
    setShowAll((prev) => !prev)
  }

  return (
    <div
      className={twMerge(
        'fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px] ',
        className
      )}
    >
      <div className="flex items-center gap-2 ml-auto">
        <UserButton afterSignOutUrl="/" />
        <Sheet>
          <SheetTrigger>
            <div className="rounded-full w-9 h-9 bg-primary flex items-center justify-center text-white">
              <Bell size={17} />
            </div>
          </SheetTrigger>
          <SheetContent className="mt-4 mr-4 pr-4 overflow-scroll">
            <SheetHeader className="text-left">
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>
                {(role === 'AGENCY_ADMIN' || role === 'AGENCY_OWNER') && (
                  <Card className="flex items-center justify-between p-4">
                    Current Subaccount
                    <Switch onCheckedChange={handleClick} />
                  </Card>
                )}
              </SheetDescription>
            </SheetHeader>
            {allNotifications.length > 0 ? (
              allNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex flex-col gap-y-2 mb-2 overflow-x-scroll text-ellipsis"
                >
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage
                        src={notification.User.avatarUrl}
                        alt="Profile Picture"
                      />
                      <AvatarFallback className="bg-primary">
                        {notification.User.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p>
                        <span className="font-bold">
                          {notification.notification.split('|')[0]}
                        </span>{' '}
                        <span className="text-muted-foreground">
                          {notification.notification.split('|')[1]}
                        </span>{' '}
                        <span className="font-bold">
                          {notification.notification.split('|')[2]}
                        </span>
                      </p>
                      <small className="text-xs text-muted-foreground">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="flex items-center justify-center text-muted-foreground"
                mb-4
              >
                You have no notifications
              </div>
            )}
          </SheetContent>
        </Sheet>
        <ModeToggle />
      </div>
    </div>
  )
}

export default InfoBar
