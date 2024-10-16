// 'use client'
// import { Badge } from '@/components/ui/badge'
// import { FunnelsForSubAccount } from '@/lib/types'
// import { ColumnDef } from '@tanstack/react-table'
// import { ExternalLink } from 'lucide-react'
// import Link from 'next/link'

// export const columns: ColumnDef<FunnelsForSubAccount>[] = [
//   {
//     accessorKey: 'name',
//     header: 'Name',
//     cell: ({ row }) => {
//       return (
//         <Link
//           className="flex gap-2 items-center"
//           href={`/subaccount/${row.original.subAccountId}/funnels/${row.original.id}`}
//         >
//           {row.getValue('name')}
//           <ExternalLink size={15} />
//         </Link>
//       )
//     },
//   },
//   {
//     accessorKey: 'updatedAt',
//     header: 'Last Updated',
//     cell: ({ row }) => {
//       const date = ` ${row.original.updatedAt.toDateString()} ${row.original.updatedAt.toLocaleTimeString()} `
//       return <span className="text-muted-foreground">{date}</span>
//     },
//   },
//   {
//     accessorKey: 'published',
//     header: 'Status',
//     cell: ({ row }) => {
//       const status = row.original.published
//       return status ? (
//         <Badge variant={'default'}>Live - {row.original.subDomainName}</Badge>
//       ) : (
//         <Badge variant={'secondary'}>Draft</Badge>
//       )
//     },
//   },
// ]


'use client';
import { Badge } from '@/components/ui/badge';
import { FunnelsForSubAccount } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
export const columns: ColumnDef<FunnelsForSubAccount>[] = [
  // const authUser = await currentUser();
  // if (!authUser) return <div>Please log in to view your funnels.</div>; // Handle case when user is not authenticated

  // // Fetch the user details based on the current authenticated user's email
  // const userDetails = await db.user.findUnique({
  //   where: {
  //     email: authUser.emailAddresses[0].emailAddress,
  //   },
  // });
  // if (!userDetails) return <div>No user found.</div>; // H
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <Link
          className="flex gap-2 items-center"
          // href={`/funnels/${row.original.id}`} 
          href={`/subaccount/${row.original.userId}/funnels/${row.original.id}`}t
        >
          {row.getValue('name')}
          <ExternalLink size={15} />
        </Link>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => {
      const date = ` ${row.original.updatedAt.toDateString()} ${row.original.updatedAt.toLocaleTimeString()} `;
      return <span className="text-muted-foreground">{date}</span>;
    },
  },
  {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.published;
      return status ? (
        <Badge variant={'default'}>Live - {row.original.subDomainName}</Badge>
      ) : (
        <Badge variant={'secondary'}>Draft</Badge>
      );
    },
  },
];
