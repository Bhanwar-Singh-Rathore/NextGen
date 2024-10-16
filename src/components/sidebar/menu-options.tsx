 'use client'

import {
  Agency,
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from '@prisma/client'
import React, { useEffect, useMemo, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from 'lucide-react'
import clsx from 'clsx'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { useModal } from '@/providers/modal-provider'
import CustomModal from '../global/custom-modal'
import SubAccountDetails from '../forms/subaccount-details'
import { Separator } from '../ui/separator'
import { icons } from '@/lib/constants'

type Props = {
  defaultOpen?: boolean
  subAccounts: SubAccount[]
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[]
  sidebarLogo: string
  details: any
  user: any
  id: string
}

const MenuOptions = ({
  details,
  id,
  sidebarLogo,
  sidebarOpt,
  subAccounts,
  user,
  defaultOpen,
}: Props) => {
  const { setOpen } = useModal()
  const [isMounted, setIsMounted] = useState(false)

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return

  return (
    <Sheet
      modal={false}
      {...openState}
    >
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:!hidden felx"
      >
        <Button
          variant="outline"
          size={'icon'}
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side={'left'}
        className={clsx(
          'bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6',
          {
            'hidden md:inline-block z-0 w-[300px]': defaultOpen,
            'inline-block md:hidden z-[100] w-full': !defaultOpen,
          }
        )}
      >
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image
              src={sidebarLogo}
              alt="Sidebar Logo"
              fill
              className="rounded-md object-contain"
            />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-full my-4 flex items-center justify-between py-8"
                variant="ghost"
              >
                <div className="flex items-center text-left gap-2">
                  <Compass />
                  <div className="flex flex-col">
                    {details.name}
                    <span className="text-muted-foreground">
                      {details.address}
                    </span>
                  </div>
                </div>
                <div>
                  <ChevronsUpDown
                    size={16}
                    className="text-muted-foreground"
                  />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-80 mt-4 z-[200]">
              <Command className="rounded-lg">
                <CommandInput placeholder="Search Accounts..." />
                <CommandList className="pb-16">
                  <CommandEmpty> No results found</CommandEmpty>
                  {(user?.role === 'AGENCY_OWNER' ||
                    user?.role === 'AGENCY_ADMIN') &&
                    user?.Agency && (
                      <CommandGroup heading="Agency">
                        <CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                          {defaultOpen ? (
                            <Link
                              href={`/agency/${user?.Agency?.id}`}
                              className="flex gap-4 w-full h-full"
                            >
                              <div className="relative w-16">
                                <Image
                                  src={user?.Agency?.agencyLogo}
                                  alt="Agency Logo"
                                  fill
                                  className="rounded-md object-contain"
                                />
                              </div>
                              <div className="flex flex-col flex-1">
                                {user?.Agency?.name}
                                <span className="text-muted-foreground">
                                  {user?.Agency?.address}
                                </span>
                              </div>
                            </Link>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={`/agency/${user?.Agency?.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={user?.Agency?.agencyLogo}
                                    alt="Agency Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  {user?.Agency?.name}
                                  <span className="text-muted-foreground">
                                    {user?.Agency?.address}
                                  </span>
                                </div>
                              </Link>
                            </SheetClose>
                          )}
                        </CommandItem>
                      </CommandGroup>
                    )}
                  <CommandGroup heading="Accounts">
                    {!!subAccounts
                      ? subAccounts.map((subaccount) => (
                          <CommandItem key={subaccount.id}>
                            {defaultOpen ? (
                              <Link
                                href={`/subaccount/${subaccount.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={subaccount.subAccountLogo}
                                    alt="subaccount Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  {subaccount.name}
                                  <span className="text-muted-foreground">
                                    {subaccount.address}
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/subaccount/${subaccount.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={subaccount.subAccountLogo}
                                      alt="subaccount Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {subaccount.name}
                                    <span className="text-muted-foreground">
                                      {subaccount.address}
                                    </span>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        ))
                      : 'No Accounts'}
                  </CommandGroup>
                </CommandList>
                {(user?.role === 'AGENCY_OWNER' ||
                  user?.role === 'AGENCY_ADMIN') && (
                  <SheetClose>
                    <Button
                      className="w-full flex gap-2"
                      onClick={() => {
                        setOpen(
                          <CustomModal
                            title="Create A Subaccount"
                            subheading="You can switch between your agency account and the subaccount from the sidebar"
                          >
                            <SubAccountDetails
                              agencyDetails={user?.Agency as Agency}
                              userId={user?.id as string}
                              userName={user?.name}
                            />
                          </CustomModal>
                        )
                      }}
                    >
                      <PlusCircleIcon size={15} />
                      Create Sub Account
                    </Button>
                  </SheetClose>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
          <Separator className="mb-4" />
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder="Search..." />
              <CommandList className="py-4 overflow-visible">
                <CommandEmpty>No Results Found</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  {sidebarOpt.map((sidebarOptions) => {
                    let val
                    const result = icons.find(
                      (icon) => icon.value === sidebarOptions.icon
                    )
                    if (result) {
                      val = <result.path />
                    }
                    return (
                      <CommandItem
                        key={sidebarOptions.id}
                        className="md:w-[320px] w-full"
                      >
                        <Link
                          href={sidebarOptions.link}
                          className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all  w-[320px]"
                        >
                          {val}
                          <span>{sidebarOptions.name}</span>
                        </Link>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MenuOptions


























// 'use client';

// import React from 'react';
// import { Button } from '../ui/button';
// import { Menu } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Dummy data for SubAccounts and Sidebar Options
// const dummySubAccounts = [
//   {
//     id: '1',
//     name: 'SubAccount 1',
//     address: '123 Main St',
//     subAccountLogo: 'https://via.placeholder.com/150',
//   },
//   {
//     id: '2',
//     name: 'SubAccount 2',
//     address: '456 Elm St',
//     subAccountLogo: 'https://via.placeholder.com/150',
//   },
// ];

// const dummySidebarOptions = [
//   {
//     id: '1',
//     name: 'Dashboard',
//     link: '/dashboard',
//   },
//   {
//     id: '2',
//     name: 'Settings',
//     link: '/settings',
//   },
// ];

// const MenuOptions = () => {
//   return (
//     <div className="sidebar">
//       <Button className="menu-button">
//         <Menu />
//       </Button>

//       <div className="sidebar-content">
//         <Image
//           src="https://via.placeholder.com/300x100"
//           alt="Sidebar Logo"
//           width={300}
//           height={100}
//         />

//         <h2>Subaccounts</h2>
//         {dummySubAccounts.map((subaccount) => (
//           <Link key={subaccount.id} href={`/subaccount/${subaccount.id}`}>
//             <div>
//               <Image
//                 src={subaccount.subAccountLogo}
//                 alt={subaccount.name}
//                 width={50}
//                 height={50}
//               />
//               <span>{subaccount.name}</span>
//               <span>{subaccount.address}</span>
//             </div>
//           </Link>
//         ))}

//         <h2>Menu Links</h2>
//         {dummySidebarOptions.map((option) => (
//           <Link key={option.id} href={option.link}>
//             <span>{option.name}</span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MenuOptions;





// 'use client'

// import React, { useEffect, useState } from 'react'
// import { Agency, SubAccount, AgencySidebarOption } from '@prisma/client'
// import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
// import { Button } from '../ui/button'
// import { ChevronsUpDown, Compass, Menu } from 'lucide-react'
// import { AspectRatio } from '../ui/aspect-ratio'
// import Image from 'next/image'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
// import Link from 'next/link'
// import { useModal } from '@/providers/modal-provider'
// import { Separator } from '../ui/separator'

// // Dummy Data
// const dummySubAccounts: SubAccount[] = [
//   { id: '1', name: 'Sub Account 1', address: '123 Main St', subAccountLogo: 'https://via.placeholder.com/50' },
//   { id: '2', name: 'Sub Account 2', address: '456 Elm St', subAccountLogo: 'https://via.placeholder.com/50' },
// ];

// const dummySidebarOptions: AgencySidebarOption[] = [
//   { id: '1', name: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
//   { id: '2', name: 'Settings', link: '/settings', icon: 'settingss' },

  
// ];

// const mockDetails = {
//   name: 'My Agency',
//   address: '789 Oak St',
// };

// const mockUser = {
//   role: 'AGENCY_OWNER',
//   Agency: {
//     id: 'agency1',
//     agencyLogo: 'https://via.placeholder.com/150',
//     name: 'My Agency',
//     address: '789 Oak St',
//   },
// };

// const MenuOptions = ({ sidebarLogo }: { sidebarLogo: string }) => {
//   const { setOpen } = useModal()
//   const [isMounted, setIsMounted] = useState(false)

//   useEffect(() => {
//     setIsMounted(true)
//   }, [])

//   if (!isMounted) return null

//   return (
//     <div className="flex ">
//       {/* Sidebar for larger screens */}
//       <div className="hidden md:block md:w-[300px] bg-background border-r">
//         <AspectRatio ratio={16 / 5}>
//           <Image
//             src={sidebarLogo}
//             alt="Sidebar Logo"
//             fill
//             className="rounded-md object-contain"
//           />
//         </AspectRatio>
//         <div className="p-6">
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button className="w-full flex items-center justify-between py-8" variant="ghost">
//                 <div className="flex items-center text-left gap-2">
//                   <Compass />
//                   <div className="flex flex-col">
//                     {mockDetails.name}
//                     <span className="text-muted-foreground">{mockDetails.address}</span>
//                   </div>
//                 </div>
//                 <ChevronsUpDown size={16} className="text-muted-foreground" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80 mt-4 z-[200]">
//               <Command className="rounded-lg">
//                 <CommandInput placeholder="Search Accounts..." />
//                 <CommandList className="pb-16">
//                   <CommandEmpty>No results found</CommandEmpty>
//                   {mockUser.role === 'AGENCY_OWNER' && (
//                     <CommandGroup heading="Agency">
//                       <CommandItem>
//                         <Link href={`/agency/${mockUser.Agency.id}`} className="flex gap-4 w-full h-full">
//                           <div className="relative w-16">
//                             <Image
//                               src={mockUser.Agency.agencyLogo}
//                               alt="Agency Logo"
//                               fill
//                               className="rounded-md object-contain"
//                             />
//                           </div>
//                           <div className="flex flex-col flex-1">
//                             {mockUser.Agency.name}
//                             <span className="text-muted-foreground">{mockUser.Agency.address}</span>
//                           </div>
//                         </Link>
//                       </CommandItem>
//                     </CommandGroup>
//                   )}
//                   <CommandGroup heading="Accounts">
//                     {dummySubAccounts.map((subaccount) => (
//                       <CommandItem key={subaccount.id}>
//                         <Link href={`/subaccount/${subaccount.id}`} className="flex gap-4 w-full h-full">
//                           <div className="relative w-16">
//                             <Image
//                               src={subaccount.subAccountLogo}
//                               alt="Subaccount Logo"
//                               fill
//                               className="rounded-md object-contain"
//                             />
//                           </div>
//                           <div className="flex flex-col flex-1">
//                             {subaccount.name}
//                             <span className="text-muted-foreground">{subaccount.address}</span>
//                           </div>
//                         </Link>
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </PopoverContent>
//           </Popover>
//           <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
//           <Separator className="mb-4" />
//           <nav className="relative">
//             <Command className="rounded-lg overflow-visible bg-transparent">
//               <CommandInput placeholder="Search..." />
//               <CommandList className="py-4 overflow-visible">
//                 <CommandEmpty>No Results Found</CommandEmpty>
//                 <CommandGroup className="overflow-visible">
//                   {dummySidebarOptions.map((sidebarOption) => (
//                     <CommandItem key={sidebarOption.id}>
//                       <Link href={sidebarOption.link} className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all">
//                         <span>{sidebarOption.name}</span>
//                       </Link>
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile trigger for sidebar */}
//       <Sheet modal={false}>
//         <SheetTrigger asChild className="md:hidden">
//           <Button variant="outline" size={'icon'}>
//             <Menu />
//           </Button>
//         </SheetTrigger>

//         <SheetContent className="fixed inset-0 z-50 w-3/4 bg-background border-r">
//           <div className="p-6">
//             <AspectRatio ratio={16 / 5}>
//               <Image
//                 src={sidebarLogo}
//                 alt="Sidebar Logo"
//                 fill
//                 className="rounded-md object-contain"
//               />
//             </AspectRatio>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button className="w-full flex items-center justify-between py-8" variant="ghost">
//                   <div className="flex items-center text-left gap-2">
//                     <Compass />
//                     <div className="flex flex-col">
//                       {mockDetails.name}
//                       <span className="text-muted-foreground">{mockDetails.address}</span>
//                     </div>
//                   </div>
//                   <ChevronsUpDown size={16} className="text-muted-foreground" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-80 mt-4 z-[200]">
//                 <Command className="rounded-lg">
//                   <CommandInput placeholder="Search Accounts..." />
//                   <CommandList className="pb-16">
//                     <CommandEmpty>No results found</CommandEmpty>
//                     {mockUser.role === 'AGENCY_OWNER' && (
//                       <CommandGroup heading="Agency">
//                         <CommandItem>
//                           <Link href={`/agency/${mockUser.Agency.id}`} className="flex gap-4 w-full h-full">
//                             <div className="relative w-16">
//                               <Image
//                                 src={mockUser.Agency.agencyLogo}
//                                 alt="Agency Logo"
//                                 fill
//                                 className="rounded-md object-contain"
//                               />
//                             </div>
//                             <div className="flex flex-col flex-1">
//                               {mockUser.Agency.name}
//                               <span className="text-muted-foreground">{mockUser.Agency.address}</span>
//                             </div>
//                           </Link>
//                         </CommandItem>
//                       </CommandGroup>
//                     )}
//                     <CommandGroup heading="Accounts">
//                       {dummySubAccounts.map((subaccount) => (
//                         <CommandItem key={subaccount.id}>
//                           <Link href={`/subaccount/${subaccount.id}`} className="flex gap-4 w-full h-full">
//                             <div className="relative w-16">
//                               <Image
//                                 src={subaccount.subAccountLogo}
//                                 alt="Subaccount Logo"
//                                 fill
//                                 className="rounded-md object-contain"
//                               />
//                             </div>
//                             <div className="flex flex-col flex-1">
//                               {subaccount.name}
//                               <span className="text-muted-foreground">{subaccount.address}</span>
//                             </div>
//                           </Link>
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//             <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
//             <Separator className="mb-4" />
//             <nav className="relative">
//               <Command className="rounded-lg overflow-visible bg-transparent">
//                 <CommandInput placeholder="Search..." />
//                 <CommandList className="py-4 overflow-visible">
//                   <CommandEmpty>No Results Found</CommandEmpty>
//                   <CommandGroup className="overflow-visible">
//                     {dummySidebarOptions.map((sidebarOption) => (
//                       <CommandItem key={sidebarOption.id}>
//                         <Link href={sidebarOption.link} className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all">
//                           <span>{sidebarOption.name}</span>
//                         </Link>
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </nav>
//           </div>
//           <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
//             <span className="sr-only">Close</span>
//           </SheetClose>
//         </SheetContent>
//       </Sheet>
//     </div>
//   )
// }

// export default MenuOptions
















// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Popover, PopoverTrigger, PopoverContent } from '@components/ui/popover';
// import { Button } from '@components/ui/button';
// import { Compass, ChevronsUpDown, Menu } from 'lucide-react';
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@components/ui/command';
// import { Separator } from '@components/ui/separator';
// import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@components/ui/sheet';

// Mock data
// const mockDetails = { name: 'My Agency', address: '789 Oak St' };
// const mockUser = { role: 'AGENCY_OWNER', Agency: { id: 1, name: 'Agency Name', address: '123 Street', agencyLogo: '/path/to/logo.png' } };
// const dummySubAccounts = [
//   { id: 1, name: 'Sub Account 1', address: 'Address 1', subAccountLogo: '/path/to/logo1.png' },
//   { id: 2, name: 'Sub Account 2', address: 'Address 2', subAccountLogo: '/path/to/logo2.png' },
// ];
// const dummySidebarOptions = [
//   { id: 1, name: 'Dashboard', link: '/dashboard' },
//   { id: 2, name: 'Settings', link: '/settings' },
// ];

// const MenuOptions = () => {
//   return (
//     <div className="flex h-screen"> {/* Ensuring the full screen height */}
      
//       {/* Sidebar for larger screens */}
//       <div className="hidden md:block md:w-[300px] bg-background border-r overflow-y-auto">
//         <div className="relative w-full h-[80px]">
//           <Image src="/path/to/sidebarLogo.png" alt="Sidebar Logo" fill className="rounded-md object-contain" />
//         </div>
//         <div className="p-6">
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button className="w-full flex items-center justify-between py-4" variant="ghost">
//                 <div className="flex items-center text-left gap-2">
//                   <Compass />
//                   <div className="flex flex-col">
//                     {mockDetails.name}
//                     <span className="text-muted-foreground">{mockDetails.address}</span>
//                   </div>
//                 </div>
//                 <ChevronsUpDown size={16} className="text-muted-foreground" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80 mt-4 z-[200]">
//               <Command className="rounded-lg">
//                 <CommandInput placeholder="Search Accounts..." />
//                 <CommandList className="pb-16">
//                   <CommandEmpty>No results found</CommandEmpty>
//                   {mockUser.role === 'AGENCY_OWNER' && (
//                     <CommandGroup heading="Agency">
//                       <CommandItem>
//                         <Link href={`/agency/${mockUser.Agency.id}`} className="flex gap-4 w-full h-full">
//                           <div className="relative w-16">
//                             <Image src={mockUser.Agency.agencyLogo} alt="Agency Logo" fill className="rounded-md object-contain" />
//                           </div>
//                           <div className="flex flex-col flex-1">
//                             {mockUser.Agency.name}
//                             <span className="text-muted-foreground">{mockUser.Agency.address}</span>
//                           </div>
//                         </Link>
//                       </CommandItem>
//                     </CommandGroup>
//                   )}
//                   <CommandGroup heading="Accounts">
//                     {dummySubAccounts.map((subaccount) => (
//                       <CommandItem key={subaccount.id}>
//                         <Link href={`/subaccount/${subaccount.id}`} className="flex gap-4 w-full h-full">
//                           <div className="relative w-16">
//                             <Image src={subaccount.subAccountLogo} alt="Subaccount Logo" fill className="rounded-md object-contain" />
//                           </div>
//                           <div className="flex flex-col flex-1">
//                             {subaccount.name}
//                             <span className="text-muted-foreground">{subaccount.address}</span>
//                           </div>
//                         </Link>
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </PopoverContent>
//           </Popover>
//           <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
//           <Separator className="mb-4" />
//           <nav className="relative">
//             <Command className="rounded-lg overflow-visible bg-transparent">
//               <CommandInput placeholder="Search..." />
//               <CommandList className="py-4 overflow-visible">
//                 <CommandEmpty>No Results Found</CommandEmpty>
//                 <CommandGroup className="overflow-visible">
//                   {dummySidebarOptions.map((sidebarOption) => (
//                     <CommandItem key={sidebarOption.id}>
//                       <Link href={sidebarOption.link} className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all">
//                         <span>{sidebarOption.name}</span>
//                       </Link>
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </nav>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 overflow-auto">
//         {/* Put your main content here */}
//         {/* Example content */}
//         <div className="p-6">
//           <h1>Main Content Area</h1>
//         </div>
//       </div>

//       {/* Mobile trigger for sidebar */}
//       <Sheet modal={false}>
//         <SheetTrigger asChild className="md:hidden">
//           <Button variant="outline" size="icon">
//             <Menu />
//           </Button>
//         </SheetTrigger>
//         <SheetContent className="fixed inset-0 z-50 w-3/4 bg-background border-r">
//           <div className="p-6">
//             <div className="relative w-full h-[80px]">
//               <Image src="/path/to/sidebarLogo.png" alt="Sidebar Logo" fill className="rounded-md object-contain" />
//             </div>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button className="w-full flex items-center justify-between py-4" variant="ghost">
//                   <div className="flex items-center text-left gap-2">
//                     <Compass />
//                     <div className="flex flex-col">
//                       {mockDetails.name}
//                       <span className="text-muted-foreground">{mockDetails.address}</span>
//                     </div>
//                   </div>
//                   <ChevronsUpDown size={16} className="text-muted-foreground" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-80 mt-4 z-[200]">
//                 <Command className="rounded-lg">
//                   <CommandInput placeholder="Search Accounts..." />
//                   <CommandList className="pb-16">
//                     <CommandEmpty>No results found</CommandEmpty>
//                     {mockUser.role === 'AGENCY_OWNER' && (
//                       <CommandGroup heading="Agency">
//                         <CommandItem>
//                           <Link href={`/agency/${mockUser.Agency.id}`} className="flex gap-4 w-full h-full">
//                             <div className="relative w-16">
//                               <Image src={mockUser.Agency.agencyLogo} alt="Agency Logo" fill className="rounded-md object-contain" />
//                             </div>
//                             <div className="flex flex-col flex-1">
//                               {mockUser.Agency.name}
//                               <span className="text-muted-foreground">{mockUser.Agency.address}</span>
//                             </div>
//                           </Link>
//                         </CommandItem>
//                       </CommandGroup>
//                     )}
//                     <CommandGroup heading="Accounts">
//                       {dummySubAccounts.map((subaccount) => (
//                         <CommandItem key={subaccount.id}>
//                           <Link href={`/subaccount/${subaccount.id}`} className="flex gap-4 w-full h-full">
//                             <div className="relative w-16">
//                               <Image src={subaccount.subAccountLogo} alt="Subaccount Logo" fill className="rounded-md object-contain" />
//                             </div>
//                             <div className="flex flex-col flex-1">
//                               {subaccount.name}
//                               <span className="text-muted-foreground">{subaccount.address}</span>
//                             </div>
//                           </Link>
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//             <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
//             <Separator className="mb-4" />
//             <nav className="relative">
//               <Command className="rounded-lg overflow-visible bg-transparent">
//                 <CommandInput placeholder="Search..." />
//                 <CommandList className="py-4 overflow-visible">
//                   <CommandEmpty>No Results Found</CommandEmpty>
//                   <CommandGroup className="overflow-visible">
//                     {dummySidebarOptions.map((sidebarOption) => (
//                       <CommandItem key={sidebarOption.id}>
//                         <Link href={sidebarOption.link} className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all">
//                           <span>{sidebarOption.name}</span>
//                         </Link>
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </nav>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default MenuOptions;


// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Popover, PopoverTrigger, PopoverContent } from '@components/ui/popover';
// import { Button } from '@components/ui/button';
// import { Compass, ChevronsUpDown, Menu } from 'lucide-react';
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@components/ui/command';
// import { Separator } from '@components/ui/separator';
// import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@components/ui/sheet';

// Mock data
// const mockDetails = { name: 'My Agency', address: '789 Oak St' };
// const mockUser = { role: 'AGENCY_OWNER', Agency: { id: 1, name: 'Agency Name', address: '123 Street', agencyLogo: '/path/to/logo.png' } };
// const dummySubAccounts = [
//   { id: 1, name: 'Sub Account 1', address: 'Address 1', subAccountLogo: '/path/to/logo1.png' },
//   { id: 2, name: 'Sub Account 2', address: 'Address 2', subAccountLogo: '/path/to/logo2.png' },
// ];
// const dummySidebarOptions = [
//   { id: 1, name: 'Dashboard', link: '/dashboard' },
//   { id: 2, name: 'Settings', link: '/settings' },
// ];

// const MenuOptions = () => {
//   return (
//     <div className="flex">
//       {/* Sidebar for larger screens */}
//       <div className="hidden md:block md:w-[300px] bg-background border-r">
//         <div className="relative w-full h-[80px]">
//           <Image src="/path/to/sidebarLogo.png" alt="Sidebar Logo" fill className="rounded-md object-contain" />
//         </div>
//         <div className="p-6">
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button className="w-full flex items-center justify-between py-4" variant="ghost">
//                 <div className="flex items-center text-left gap-2">
//                   <Compass />
//                   <div className="flex flex-col">
//                     {mockDetails.name}
//                     <span className="text-muted-foreground">{mockDetails.address}</span>
//                   </div>
//                 </div>
//                 <ChevronsUpDown size={16} className="text-muted-foreground" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80 mt-4 z-[200]">
//               <Command className="rounded-lg">
//                 <CommandInput placeholder="Search Accounts..." />
//                 <CommandList className="pb-16">
//                   <CommandEmpty>No results found</CommandEmpty>
//                   {mockUser.role === 'AGENCY_OWNER' && (
//                     <CommandGroup heading="Agency">
//                       <CommandItem>
//                         <Link href={`/agency/${mockUser.Agency.id}`} className="flex gap-4 w-full h-full">
//                           <div className="relative w-16">
//                             <Image src={mockUser.Agency.agencyLogo} alt="Agency Logo" fill className="rounded-md object-contain" />
//                           </div>
//                           <div className="flex flex-col flex-1">
//                             {mockUser.Agency.name}
//                             <span className="text-muted-foreground">{mockUser.Agency.address}</span>
//                           </div>
//                         </Link>
//                       </CommandItem>
//                     </CommandGroup>
//                   )}
//                   <CommandGroup heading="Accounts">
//                     {dummySubAccounts.map((subaccount) => (
//                       <CommandItem key={subaccount.id}>
//                         <Link href={`/subaccount/${subaccount.id}`} className="flex gap-4 w-full h-full">
//                           <div className="relative w-16">
//                             <Image src={subaccount.subAccountLogo} alt="Subaccount Logo" fill className="rounded-md object-contain" />
//                           </div>
//                           <div className="flex flex-col flex-1">
//                             {subaccount.name}
//                             <span className="text-muted-foreground">{subaccount.address}</span>
//                           </div>
//                         </Link>
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </PopoverContent>
//           </Popover>
//           <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
//           <Separator className="mb-4" />
//           <nav className="relative">
//             <Command className="rounded-lg overflow-visible bg-transparent">
//               <CommandInput placeholder="Search..." />
//               <CommandList className="py-4 overflow-visible">
//                 <CommandEmpty>No Results Found</CommandEmpty>
//                 <CommandGroup className="overflow-visible">
//                   {dummySidebarOptions.map((sidebarOption) => (
//                     <CommandItem key={sidebarOption.id}>
//                       <Link href={sidebarOption.link} className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all">
//                         <span>{sidebarOption.name}</span>
//                       </Link>
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile trigger for sidebar */}
//       <Sheet modal={false}>
//         <SheetTrigger asChild className="md:hidden">
//           <Button variant="outline" size="icon">
//             <Menu />
//           </Button>
//         </SheetTrigger>
//         <SheetContent className="fixed inset-0 z-50 w-3/4 bg-background border-r">
//           <div className="p-6">
//             <div className="relative w-full h-[80px]">
//               <Image src="/path/to/sidebarLogo.png" alt="Sidebar Logo" fill className="rounded-md object-contain" />
//             </div>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button className="w-full flex items-center justify-between py-4" variant="ghost">
//                   <div className="flex items-center text-left gap-2">
//                     <Compass />
//                     <div className="flex flex-col">
//                       {mockDetails.name}
//                       <span className="text-muted-foreground">{mockDetails.address}</span>
//                     </div>
//                   </div>
//                   <ChevronsUpDown size={16} className="text-muted-foreground" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-80 mt-4 z-[200]">
//                 <Command className="rounded-lg">
//                   <CommandInput placeholder="Search Accounts..." />
//                   <CommandList className="pb-16">
//                     <CommandEmpty>No results found</CommandEmpty>
//                     {mockUser.role === 'AGENCY_OWNER' && (
//                       <CommandGroup heading="Agency">
//                         <CommandItem>
//                           <Link href={`/agency/${mockUser.Agency.id}`} className="flex gap-4 w-full h-full">
//                             <div className="relative w-16">
//                               <Image src={mockUser.Agency.agencyLogo} alt="Agency Logo" fill className="rounded-md object-contain" />
//                             </div>
//                             <div className="flex flex-col flex-1">
//                               {mockUser.Agency.name}
//                               <span className="text-muted-foreground">{mockUser.Agency.address}</span>
//                             </div>
//                           </Link>
//                         </CommandItem>
//                       </CommandGroup>
//                     )}
//                     <CommandGroup heading="Accounts">
//                       {dummySubAccounts.map((subaccount) => (
//                         <CommandItem key={subaccount.id}>
//                           <Link href={`/subaccount/${subaccount.id}`} className="flex gap-4 w-full h-full">
//                             <div className="relative w-16">
//                               <Image src={subaccount.subAccountLogo} alt="Subaccount Logo" fill className="rounded-md object-contain" />
//                             </div>
//                             <div className="flex flex-col flex-1">
//                               {subaccount.name}
//                               <span className="text-muted-foreground">{subaccount.address}</span>
//                             </div>
//                           </Link>
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//             <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
//             <Separator className="mb-4" />
//             <nav className="relative">
//               <Command className="rounded-lg overflow-visible bg-transparent">
//                 <CommandInput placeholder="Search..." />
//                 <CommandList className="py-4 overflow-visible">
//                   <CommandEmpty>No Results Found</CommandEmpty>
//                   <CommandGroup className="overflow-visible">
//                     {dummySidebarOptions.map((sidebarOption) => (
//                       <CommandItem key={sidebarOption.id}>
//                         <Link href={sidebarOption.link} className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all">
//                           <span>{sidebarOption.name}</span>
//                         </Link>
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </nav>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default MenuOptions;

// 'use client'

// import {
//   Agency,
//   AgencySidebarOption,
//   SubAccount,
//   SubAccountSidebarOption,
// } from '@prisma/client'
// import React, { useEffect, useMemo, useState } from 'react'
// import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
// import { Button } from '../ui/button'
// import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from 'lucide-react'
// import clsx from 'clsx'
// import { AspectRatio } from '../ui/aspect-ratio'
// import Image from 'next/image'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from '../ui/command'
// import Link from 'next/link'
// import { twMerge } from 'tailwind-merge'
// import { useModal } from '@/providers/modal-provider'
// import CustomModal from '../global/custom-modal'
// import SubAccountDetails from '../forms/subaccount-details'
// import { Separator } from '../ui/separator'
// import { icons } from '@/lib/constants'

// type Props = {
//   defaultOpen?: boolean
//   subAccounts: SubAccount[]
//   sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[]
//   sidebarLogo: string
//   details: any
//   user: any
//   id: string
// }

// const MenuOptions = ({
//   details,
//   id,
//   sidebarLogo,
//   sidebarOpt,
//   subAccounts,
//   user,
//   defaultOpen,
// }: Props) => {
//   const { setOpen } = useModal()
//   const [isMounted, setIsMounted] = useState(false)

//   const openState = useMemo(
//     () => (defaultOpen ? { open: true } : {}),
//     [defaultOpen]
//   )

//   useEffect(() => {
//     setIsMounted(true)
//   }, [])

//   if (!isMounted) return null

//   return (
//     <Sheet
//       modal={false}
//       {...openState}
//     >
//       <SheetTrigger
//         asChild
//         className="absolute left-4 top-4 z-[100] md:!hidden felx"
//       >
//         <Button
//           variant="outline"
//           size={'icon'}
//         >
//           <Menu />
//         </Button>
//       </SheetTrigger>

//       <SheetContent
//         showX={!defaultOpen}
//         side={'left'}
//         className={clsx(
//           'bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6',
//           {
//             'hidden md:inline-block z-0 w-[300px]': defaultOpen,
//             'inline-block md:hidden z-[100] w-full': !defaultOpen,
//           }
//         )}
//       >
//         <div>
//           <AspectRatio ratio={16 / 5}>
//             <Image
//               src={sidebarLogo || "/dummy-sidebar-logo.png"}
//               alt="Sidebar Logo"
//               fill
//               className="rounded-md object-contain"
//             />
//           </AspectRatio>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 className="w-full my-4 flex items-center justify-between py-8"
//                 variant="ghost"
//               >
//                 <div className="flex items-center text-left gap-2">
//                   <Compass />
//                   <div className="flex flex-col">
//                     {details.name || "Dummy Agency Name"}
//                     <span className="text-muted-foreground">
//                       {details.address || "123 Dummy St, City, Country"}
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <ChevronsUpDown
//                     size={16}
//                     className="text-muted-foreground"
//                   />
//                 </div>
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80 h-80 mt-4 z-[200]">
//               <Command className="rounded-lg">
//                 <CommandInput placeholder="Search Accounts..." />
//                 <CommandList className="pb-16">
//                   <CommandEmpty> No results found</CommandEmpty>
//                   {(user?.role === 'AGENCY_OWNER' ||
//                     user?.role === 'AGENCY_ADMIN') && user?.Agency && (
//                     <CommandGroup heading="Agency">
//                       <CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
//                         {defaultOpen ? (
//                           <Link
//                             href={`/agency/${user?.Agency?.id || 'dummy-agency-id'}`}
//                             className="flex gap-4 w-full h-full"
//                           >
//                             <div className="relative w-16">
//                               <Image
//                                 src={user?.Agency?.agencyLogo || "/dummy-agency-logo.png"}
//                                 alt="Agency Logo"
//                                 fill
//                                 className="rounded-md object-contain"
//                               />
//                             </div>
//                             <div className="flex flex-col flex-1">
//                               {user?.Agency?.name || "Dummy Agency"}
//                               <span className="text-muted-foreground">
//                                 {user?.Agency?.address || "123 Agency Ave, City, Country"}
//                               </span>
//                             </div>
//                           </Link>
//                         ) : (
//                           <SheetClose asChild>
//                             <Link
//                               href={`/agency/${user?.Agency?.id || 'dummy-agency-id'}`}
//                               className="flex gap-4 w-full h-full"
//                             >
//                               <div className="relative w-16">
//                                 <Image
//                                   src={user?.Agency?.agencyLogo || "/dummy-agency-logo.png"}
//                                   alt="Agency Logo"
//                                   fill
//                                   className="rounded-md object-contain"
//                                 />
//                               </div>
//                               <div className="flex flex-col flex-1">
//                                 {user?.Agency?.name || "Dummy Agency"}
//                                 <span className="text-muted-foreground">
//                                   {user?.Agency?.address || "123 Agency Ave, City, Country"}
//                                 </span>
//                               </div>
//                             </Link>
//                           </SheetClose>
//                         )}
//                       </CommandItem>
//                     </CommandGroup>
//                   )}
//                   <CommandGroup heading="Accounts">
//                     {!!subAccounts
//                       ? subAccounts.map((subaccount, index) => (
//                           <CommandItem key={subaccount.id || `dummy-subaccount-${index}`}>
//                             {defaultOpen ? (
//                               <Link
//                                 href={`/subaccount/${subaccount.id || 'dummy-subaccount-id'}`}
//                                 className="flex gap-4 w-full h-full"
//                               >
//                                 <div className="relative w-16">
//                                   <Image
//                                     src={subaccount.subAccountLogo || "/dummy-subaccount-logo.png"}
//                                     alt="Subaccount Logo"
//                                     fill
//                                     className="rounded-md object-contain"
//                                   />
//                                 </div>
//                                 <div className="flex flex-col flex-1">
//                                   {subaccount.name || "Dummy Subaccount"}
//                                   <span className="text-muted-foreground">
//                                     {subaccount.address || "456 Subaccount Rd, City, Country"}
//                                   </span>
//                                 </div>
//                               </Link>
//                             ) : (
//                               <SheetClose asChild>
//                                 <Link
//                                   href={`/subaccount/${subaccount.id || 'dummy-subaccount-id'}`}
//                                   className="flex gap-4 w-full h-full"
//                                 >
//                                   <div className="relative w-16">
//                                     <Image
//                                       src={subaccount.subAccountLogo || "/dummy-subaccount-logo.png"}
//                                       alt="Subaccount Logo"
//                                       fill
//                                       className="rounded-md object-contain"
//                                     />
//                                   </div>
//                                   <div className="flex flex-col flex-1">
//                                     {subaccount.name || "Dummy Subaccount"}
//                                     <span className="text-muted-foreground">
//                                       {subaccount.address || "456 Subaccount Rd, City, Country"}
//                                     </span>
//                                   </div>
//                                 </Link>
//                               </SheetClose>
//                             )}
//                           </CommandItem>
//                         ))
//                       : 'No Accounts'}
//                   </CommandGroup>
//                 </CommandList>
//                 {(user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') && (
//                   <SheetClose>
//                     <Button
//                       className="w-full flex gap-2"
//                       onClick={() => {
//                         setOpen(
//                           <CustomModal
//                             title="Create A Subaccount"
//                             subheading="You can switch between your agency account and the subaccount from the sidebar"
//                           >
//                             <SubAccountDetails
//                               agencyDetails={user?.Agency as Agency}
//                               userId={user?.id as string}
//                               userName={user?.name || "Dummy User"}
//                             />
//                           </CustomModal>
//                         )
//                       }}
//                     >
//                       <PlusCircleIcon size={15} />
//                       Create Sub Account
//                     </Button>
//                   </SheetClose>
//                 )}
//               </Command>
//             </PopoverContent>
//           </Popover>
//           <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
//           <Separator className="mb-4" />
//           <nav className="relative">
//             <Command className="rounded-lg overflow-visible bg-transparent">
//               <CommandInput placeholder="Search..." />
//               <CommandList className="py-4 overflow-visible">
//                 <CommandEmpty>No Results Found</CommandEmpty>
//                 <CommandGroup className="overflow-visible">
//                   {sidebarOpt.map((sidebarOptions) => {
//                     let val
//                     const result = icons.find(
//                       (icon) => icon.value === sidebarOptions.icon
//                     )
//                     if (result) {
//                       val = <result.path />
//                     }
//                     return (
//                       <CommandItem
//                         key={sidebarOptions.id || `dummy-sidebar-option-${sidebarOptions.name}`}
//                         className="md:w-[320px] w-full"
//                       >
//                         <Link
//                           href={sidebarOptions.link || "/dummy-link"}
//                           className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
//                         >
//                           {val}
//                           <span>{sidebarOptions.name || "Dummy Link Name"}</span>
//                         </Link>
//                       </CommandItem>
//                     )
//                   })}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </nav>
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }

// export default MenuOptions
