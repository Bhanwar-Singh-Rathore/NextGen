// 'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import * as z from 'zod'
// import { v4 } from 'uuid'

// import { Button } from '@/components/ui/button'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { useRouter } from 'next/navigation'

// import { Input } from '@/components/ui/input'
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from '@/components/ui/card'

// import FileUpload from '../global/file-upload'
// import { Agency, SubAccount } from '@prisma/client'
// import { useToast } from '../ui/use-toast'
// import { saveActivityLogsNotification, upsertSubAccount } from '@/lib/queries'
// import { useEffect } from 'react'
// import Loading from '../global/loading'
// import { useModal } from '@/providers/modal-provider'

// const formSchema = z.object({
//   name: z.string(),
//   companyEmail: z.string(),
//   companyPhone: z.string().min(1),
//   address: z.string(),
//   city: z.string(),
//   subAccountLogo: z.string(),
//   zipCode: z.string(),
//   state: z.string(),
//   country: z.string(),
// })

// //CHALLENGE Give access for Subaccount Guest they should see a different view maybe a form that allows them to create tickets

// //CHALLENGE layout.tsx oonly runs once as a result if you remove permissions for someone and they keep navigating the layout.tsx wont fire again. solution- save the data inside metadata for current user.

// interface SubAccountDetailsProps {
//   //To add the sub account to the agency
//   agencyDetails: Agency
//   details?: Partial<SubAccount>
//   userId: string
//   userName: string
// }

// const SubAccountDetails: React.FC<SubAccountDetailsProps> = ({
//   details,
//   agencyDetails,
//   userId,
//   userName,
// }) => {
//   const { toast } = useToast()
//   const { setClose } = useModal()
//   const router = useRouter()
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: details?.name,
//       companyEmail: details?.companyEmail,
//       companyPhone: details?.companyPhone,
//       address: details?.address,
//       city: details?.city,
//       zipCode: details?.zipCode,
//       state: details?.state,
//       country: details?.country,
//       subAccountLogo: details?.subAccountLogo,
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       const response = await upsertSubAccount({
//         id: details?.id ? details.id : v4(),
//         address: values.address,
//         subAccountLogo: values.subAccountLogo,
//         city: values.city,
//         companyPhone: values.companyPhone,
//         country: values.country,
//         name: values.name,
//         state: values.state,
//         zipCode: values.zipCode,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         companyEmail: values.companyEmail,
//         agencyId: agencyDetails.id,
//         connectAccountId: '',
//         goal: 5000,
//       })
//       if (!response) throw new Error('No response from server')
//       await saveActivityLogsNotification({
//         agencyId: response.agencyId,
//         description: `${userName} | updated sub account | ${response.name}`,
//         subaccountId: response.id,
//       })

//       toast({
//         title: 'Subaccount details saved',
//         description: 'Successfully saved your subaccount details.',
//       })

//       setClose()
//       router.refresh()
//     } catch (error) {
//       toast({
//         variant: 'destructive',
//         title: 'Oppse!',
//         description: 'Could not save sub account details.',
//       })
//     }
//   }

//   useEffect(() => {
//     if (details) {
//       form.reset(details)
//     }
//   }, [details])

//   const isLoading = form.formState.isSubmitting
//   //CHALLENGE Create this form.
//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>Sub Account Information</CardTitle>
//         <CardDescription>Please enter business details</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4"
//           >
//             <FormField
//               disabled={isLoading}
//               control={form.control}
//               name="subAccountLogo"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Account Logo</FormLabel>
//                   <FormControl>
//                     <FileUpload
//                       apiEndpoint="subaccountLogo"
//                       value={field.value}
//                       onChange={field.onChange}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex md:flex-row gap-4">
//               <FormField
//                 disabled={isLoading}
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormLabel>Account Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         required
//                         placeholder="Your agency name"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 disabled={isLoading}
//                 control={form.control}
//                 name="companyEmail"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormLabel>Acount Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Email"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="flex md:flex-row gap-4">
//               <FormField
//                 disabled={isLoading}
//                 control={form.control}
//                 name="companyPhone"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormLabel>Acount Phone Number</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Phone"
//                         required
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               disabled={isLoading}
//               control={form.control}
//               name="address"
//               render={({ field }) => (
//                 <FormItem className="flex-1">
//                   <FormLabel>Address</FormLabel>
//                   <FormControl>
//                     <Input
//                       required
//                       placeholder="123 st..."
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex md:flex-row gap-4">
//               <FormField
//                 disabled={isLoading}
//                 control={form.control}
//                 name="city"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormLabel>City</FormLabel>
//                     <FormControl>
//                       <Input
//                         required
//                         placeholder="City"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 disabled={isLoading}
//                 control={form.control}
//                 name="state"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormLabel>State</FormLabel>
//                     <FormControl>
//                       <Input
//                         required
//                         placeholder="State"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 disabled={isLoading}
//                 control={form.control}
//                 name="zipCode"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormLabel>Zipcpde</FormLabel>
//                     <FormControl>
//                       <Input
//                         required
//                         placeholder="Zipcode"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <FormField
//               disabled={isLoading}
//               control={form.control}
//               name="country"
//               render={({ field }) => (
//                 <FormItem className="flex-1">
//                   <FormLabel>Country</FormLabel>
//                   <FormControl>
//                     <Input
//                       required
//                       placeholder="Country"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               disabled={isLoading}
//             >
//               {isLoading ? <Loading /> : 'Save Account Information'}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   )
// }

// export default SubAccountDetails
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { v4 } from 'uuid'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

import FileUpload from '../global/file-upload'
import { User } from '@prisma/client'
import { useToast } from '../ui/use-toast'
import {  upsertUser } from '@/lib/queries'
import { useEffect } from 'react'
import Loading from '../global/loading'
import { useModal } from '@/providers/modal-provider'

// Update the schema according to the User model
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  avatarUrl: z.string().optional(),
})

interface UserDetailsProps {
  details?: Partial<User>
}

const UserDetails: React.FC<UserDetailsProps> = ({ details }) => {
  const { toast } = useToast()
  const { setClose } = useModal()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name,
      email: details?.email,
      phone: details?.phone,
      address: details?.address,
      city: details?.city,
      zipCode: details?.zipCode,
      state: details?.state,
      country: details?.country,
      avatarUrl: details?.avatarUrl,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Form submitted:', values); // Log submitted values for debugging

      const response = await upsertUser({
        id: details?.id ? details.id : v4(),
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        zipCode: values.zipCode,
        state: values.state,
        country: values.country,
        avatarUrl: values.avatarUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (!response) throw new Error('No response from server');
      
      // await saveActivityLogsNotification({
      //   userId: response.id,
      //   description: `${response.name} | created/updated user`,
      // });

      toast({
        title: 'User details saved',
        description: 'Successfully saved your user details.',
      });

      setClose();
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error); // Log error for debugging
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'Could not save user details.',
      });
    }
  }

  useEffect(() => {
    if (details) {
      form.reset(details);
    }
  }, [details]);

  const isLoading = form.formState.isSubmitting;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>Please enter your personal details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={isLoading}
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="avatar"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex md:flex-row gap-4">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input required placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input required placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex md:flex-row gap-4">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input required placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              disabled={isLoading}
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input required placeholder="123 St..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex md:flex-row gap-4">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input required placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input required placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input required placeholder="Zipcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input required placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loading /> : 'Save User Information'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default UserDetails;
