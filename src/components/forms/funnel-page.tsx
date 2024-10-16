// 'use client'
// import React, { useEffect } from 'react'
// import { z } from 'zod'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '../ui/card'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../ui/form'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import Loading from '../global/loading'
// import { useToast } from '../ui/use-toast'
// import { FunnelPage } from '@prisma/client'
// import { FunnelPageSchema } from '@/lib/types'
// import {
//   deleteFunnelPage,
//   getFunnels,
//   upsertFunnelPage,
// } from '@/lib/queries'
// import { useRouter } from 'next/navigation'
// import { v4 } from 'uuid'
// import { CopyPlusIcon, Trash } from 'lucide-react'
// import { db } from '@/lib/db'

// interface CreateFunnelPageProps {
//   defaultData?: FunnelPage
//   funnelId: string
//   order: number
//   userId: string
// }

// const CreateFunnelPage: React.FC<CreateFunnelPageProps> = ({
//   defaultData,
//   funnelId,
//   order,
//   userId,
// }) => {
//   const { toast } = useToast()
//   const router = useRouter()

//   const form = useForm<z.infer<typeof FunnelPageSchema>>({
//     resolver: zodResolver(FunnelPageSchema),
//     mode: 'onChange',
//     defaultValues: {
//       name: defaultData?.name || '',
//       pathName: defaultData?.pathName || '',
//     },
//   })

//   useEffect(() => {
//     if (defaultData) {
//       form.reset({
//         name: defaultData.name,
//         pathName: defaultData.pathName,
//       })
//     }
//   }, [defaultData, form])

//   // const onSubmit = async (values: z.infer<typeof FunnelPageSchema>) => {
//   //   if (order !== 0 && !values.pathName) {
//   //     return form.setError('pathName', {
//   //       message: "Pages other than the first page in the funnel require a path name, e.g., 'secondstep'.",
//   //     })
//   //   }

//   //   try {
//   //     const response = await upsertFunnelPage(
//   //       userId,
//   //       {
//   //         ...values,
//   //         id: defaultData?.id || v4(),
//   //         order: defaultData?.order || order,
//   //         visits: defaultData?.visits || 0,  // Ensure this is set appropriately
//   //         content: defaultData?.content || '', // Default to empty string if not provided
//   //       },
//   //       funnelId
//   //     )

//   //     if (response) {
//   //       toast({
//   //         title: 'Success',
//   //         description: 'Saved Funnel Page Details',
//   //       })
//   //       router.refresh()
//   //     } else {
//   //       throw new Error("Failed to save the funnel page.")
//   //     }
//   //   } catch (error) {
//   //     console.error('Error in onSubmit:', error)
//   //     toast({
//   //       variant: 'destructive',
//   //       title: 'Oops!',
//   //       description: error.message || 'Could not save Funnel Page Details',
//   //     })
//   //   }
//   // }

//   const onSubmit = async (values: z.infer<typeof FunnelPageSchema>) => {
//     console.log('Submitting values:', values);
//     console.log('Current order:', order);
//     console.log('Default data:', defaultData);
  
//     if (order !== 0 && !values.pathName) {
//       return form.setError('pathName', {
//         message: "Pages other than the first page in the funnel require a path name, e.g., 'secondstep'.",
//       });
//     }
  
//     try {
//       const response = await db.funnelPage.upsert({
//         where: {
//           id: defaultData?.id || v4(), // Your existing logic for checking ID
//         },
//         update: {
//           name: values.name,
//           pathName: values.pathName,
//           order: defaultData?.order || order,
//           visits: defaultData?.visits || 0,
//           content: defaultData?.content || '',
//           funnelId, // Ensure funnelId is defined
//           userId,   // Ensure userId is passed properly
//         },
//         create: {
//           name: values.name,
//           pathName: values.pathName,
//           order: defaultData?.order || order,
//           visits: defaultData?.visits || 0,
//           content: defaultData?.content || '',
//           funnelId, // Ensuring that funnelId is set correctly
//           userId,   // Ensuring userId is set correctly
//           Funnel: {
//             connect: { id: funnelId }, // Correct relation handling
//           },
//         },
//       });
      
  
//       console.log('Response from upsertFunnelPage:', response);
  
//       if (response) {
//         toast({
//           title: 'Success',
//           description: 'Saved Funnel Page Details',
//         });
//         router.refresh();
//       } else {
//         throw new Error("Failed to save the funnel page.");
//       }
//     } catch (error) {
//       console.error('Error in onSubmit:', error);
//       toast({
//         variant: 'destructive',
//         title: 'Oops!',
//         description: error.message || 'Could not save Funnel Page Details',
//       });
//     }
//   };
  
  
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Funnel Page</CardTitle>
//         <CardDescription>
//           Funnel pages are created in order. You can move them around to change their order.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="flex flex-col gap-6"
//           >
//             <FormField
//               disabled={form.formState.isSubmitting}
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem className="flex-1">
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Name"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               disabled={form.formState.isSubmitting || order === 0}
//               control={form.control}
//               name="pathName"
//               render={({ field }) => (
//                 <FormItem className="flex-1">
//                   <FormLabel>Path Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Path for the page"
//                       {...field}
//                       value={field.value?.toLowerCase()}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-2">
//               <Button
//                 className="w-22 self-end"
//                 disabled={form.formState.isSubmitting}
//                 type="submit"
//               >
//                 {form.formState.isSubmitting ? <Loading /> : 'Save Page'}
//               </Button>

//               {defaultData?.id && (
//                 <Button
//                   variant={'outline'}
//                   className="w-22 self-end border-destructive text-destructive hover:bg-destructive"
//                   disabled={form.formState.isSubmitting}
//                   type="button"
//                   onClick={async () => {
//                     await deleteFunnelPage(defaultData.id)
//                     router.refresh()
//                   }}
//                 >
//                   {form.formState.isSubmitting ? <Loading /> : <Trash />}
//                 </Button>
//               )}
//               {defaultData?.id && (
//                 <Button
//                   variant={'outline'}
//                   size={'icon'}
//                   disabled={form.formState.isSubmitting}
//                   type="button"
//                   onClick={async () => {
//                     const response = await getFunnels(userId)
//                     const lastFunnelPageCount = response.find(
//                       (funnel) => funnel.id === funnelId
//                     )?.FunnelPages.length || 0

//                     await upsertFunnelPage(
//                       userId,
//                       {
//                         ...defaultData,
//                         id: v4(),
//                         order: lastFunnelPageCount, // Set order based on the count of pages
//                         visits: 0,
//                         name: `${defaultData.name} Copy`,
//                         pathName: `${defaultData.pathName}-copy`, // Ensuring path name is unique
//                         content: defaultData.content,
//                       },
//                       funnelId
//                     )
//                     toast({
//                       title: 'Success',
//                       description: 'Saved Funnel Page Copy Details',
//                     })
//                     router.refresh()
//                   }}
//                 >
//                   {form.formState.isSubmitting ? <Loading /> : <CopyPlusIcon />}
//                 </Button>
//               )}
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   )
// }

// export default CreateFunnelPage


'use client'
import React, { useEffect } from 'react'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Loading from '../global/loading'
import { useToast } from '../ui/use-toast'
import { FunnelPage } from '@prisma/client'
import { FunnelPageSchema } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { v4 } from 'uuid'
import { CopyPlusIcon, Trash } from 'lucide-react'
import { deleteFunnelPage, getFunnels, upsertFunnelPage } from '@/lib/queries'

interface CreateFunnelPageProps {
  defaultData?: FunnelPage
  funnelId: string
  order: number
  userId: string
}

const CreateFunnelPage: React.FC<CreateFunnelPageProps> = ({
  defaultData,
  funnelId,
  order,
  userId,
}) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof FunnelPageSchema>>({
    resolver: zodResolver(FunnelPageSchema),
    mode: 'onChange',
    defaultValues: {
      name: defaultData?.name || '',
      pathName: defaultData?.pathName || '',
    },
  })

  useEffect(() => {
    if (defaultData) {
      form.reset({
        name: defaultData.name,
        pathName: defaultData.pathName,
      })
    }
  }, [defaultData, form])

  const onSubmit = async (values: z.infer<typeof FunnelPageSchema>) => {
    console.log('Submitting values:', values)
    console.log('Current order:', order)
    console.log('Default data:', defaultData)
  
    // If order is not 0, pathName must be provided
    if (order !== 0 && !values.pathName) {
      return form.setError('pathName', {
        message: "Pages other than the first page in the funnel require a path name, e.g., 'secondstep'.",
      })
    }
  
    try {
      const response = await fetch('/api/funnel-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          funnelId,
          values,
          defaultData,
          order,
          userId,
        }),
      })
  
      // Wait for the response to be parsed as JSON
      const result = await response.json()
  
      if (response.ok && result && result.id) {
        // Ensure that we only show success if we get a valid result from the API
        toast({
          title: 'Success',
          description: 'Saved Funnel Page Details',
        })
        router.refresh() // Reload the page to reflect changes
      } else {
        throw new Error('Failed to save the funnel page. Invalid response.')
      }
    } catch (error) {
      console.error('Error in onSubmit:', error)
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: error.message || 'Could not save Funnel Page Details',
      })
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel Page</CardTitle>
        <CardDescription>
          Funnel pages are created in order. You can move them around to change their order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={form.formState.isSubmitting || order === 0}
              control={form.control}
              name="pathName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Path Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Path for the page"
                      {...field}
                      value={field.value?.toLowerCase()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button
                className="w-22 self-end"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting ? <Loading /> : 'Save Page'}
              </Button>

              {defaultData?.id && (
                <Button
                  variant={'outline'}
                  className="w-22 self-end border-destructive text-destructive hover:bg-destructive"
                  disabled={form.formState.isSubmitting}
                  type="button"
                  onClick={async () => {
                    await deleteFunnelPage(defaultData.id)
                    router.refresh()
                  }}
                >
                  {form.formState.isSubmitting ? <Loading /> : <Trash />}
                </Button>
              )}
              {defaultData?.id && (
                <Button
                  variant={'outline'}
                  size={'icon'}
                  disabled={form.formState.isSubmitting}
                  type="button"
                  onClick={async () => {
                    const response = await getFunnels(userId)
                    const lastFunnelPageCount = response.find(
                      (funnel) => funnel.id === funnelId
                    )?.FunnelPages.length || 0

                    await upsertFunnelPage(
                      userId,
                      {
                        ...defaultData,
                        id: v4(),
                        order: lastFunnelPageCount, // Set order based on the count of pages
                        visits: 0,
                        name: `${defaultData.name} Copy`,
                        pathName: `${defaultData.pathName}-copy`, // Ensuring path name is unique
                        content: defaultData.content,
                      },
                      funnelId
                    )
                    toast({
                      title: 'Success',
                      description: 'Saved Funnel Page Copy Details',
                    })
                    router.refresh()
                  }}
                >
                  {form.formState.isSubmitting ? <Loading /> : <CopyPlusIcon />}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateFunnelPage
