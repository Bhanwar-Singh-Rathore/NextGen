import BlurPage from '@/components/global/blur-page'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import format from 'date-fns/format'
import React from 'react'
import CraeteContactButton from './_components/create-contact-btn'

// type Props = {
//   params: { subaccountId: string }
// }

const ContactPage = async ({ params }: Props) => {
  // Dummy Data for contacts
  const dummyContacts = [
    {
      id: 'contact-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: new Date(2023, 6, 15),
      Ticket: [{ value: '100' }, { value: '50' }], // Represents active status
    },
    {
      id: 'contact-2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      createdAt: new Date(2023, 7, 20),
      Ticket: [], // Represents inactive status
    },
    {
      id: 'contact-3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      createdAt: new Date(2023, 8, 10),
      Ticket: [{ value: '300' }], // Represents active status
    },
  ]

  const formatTotal = (tickets: { value: string }[]) => {
    if (!tickets || !tickets.length) return '$0.00'
    const amt = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
    })

    const laneAmt = tickets.reduce(
      (sum, ticket) => sum + (Number(ticket?.value) || 0),
      0
    )

    return amt.format(laneAmt)
  }

  return (
    <div className="h-screen p-4">
      <h1 className="text-4xl p-4">Contacts</h1>
      <CraeteContactButton subaccountId={params.subaccountId} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[300px]">Email</TableHead>
            <TableHead className="w-[200px]">Active</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Total Value</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="font-medium truncate">
          {dummyContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage alt={contact.name} />
                  <AvatarFallback className="bg-primary text-white">
                    {contact.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>
                {formatTotal(contact.Ticket) === '$0.00' ? (
                  <Badge variant={'destructive'}>Inactive</Badge>
                ) : (
                  <Badge className="bg-emerald-700">Active</Badge>
                )}
              </TableCell>
              <TableCell>{format(contact.createdAt, 'MM/dd/yyyy')}</TableCell>
              <TableCell className="text-right">
                {formatTotal(contact.Ticket)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ContactPage

// import React from 'react'

// function page() {
//   return (
//     <div>page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, corrupti. Quasi sint corrupti, quibusdam explicabo dolorem placeat dolores autem! Architecto, expedita magnam? Voluptas error iusto repellat a! Amet ducimus laboriosam facilis voluptatum maiores, minus quo hic tempore necessitatibus dolorem nemo veniam corrupti, quasi atque sapiente magni odit fugiat odio delectus vero reiciendis pariatur beatae sed tenetur. Distinctio unde voluptas ad a. Eligendi nam inventore quo aliquid ad, dolorem quas, quis minima modi pariatur voluptatum explicabo! Voluptate quia modi cumque atque veniam doloribus nam doloremque nesciunt adipisci nisi, ad animi ullam, incidunt maxime obcaecati aliquid fuga! Vitae architecto cum possimus, eum voluptatibus amet. Officiis nobis eius, iste quidem saepe possimus praesentium facilis eos odio, veritatis est, necessitatibus mollitia atque quibusdam harum amet ut omnis veniam accusamus velit reiciendis officia ex? Amet fugiat rem dicta voluptatem, aliquid consequatur nemo, officia provident aliquam unde id ullam odit cupiditate nobis nesciunt corporis dolor cum, soluta excepturi harum? Voluptates sint fuga molestias animi fugit accusantium perspiciatis dolore distinctio nobis illum expedita, dolorum voluptate delectus, ratione beatae repudiandae iste consequuntur! Aliquam quam ex inventore laborum exercitationem reiciendis quidem beatae itaque natus. Nobis voluptatem dicta doloremque nihil error, minus rerum ab ipsa esse vel vitae incidunt reprehenderit accusantium ad id placeat perferendis. Facere accusamus cupiditate deserunt velit? Nesciunt excepturi voluptatum sunt inventore delectus necessitatibus, alias quaerat sed consequatur perspiciatis iusto cupiditate hic sit suscipit quos distinctio nihil earum unde! Eveniet, ullam? Repudiandae nihil veniam molestiae natus quo iste at quos nulla voluptate quas, doloremque iusto aliquid earum aperiam dignissimos ab? Suscipit debitis dolorum unde labore pariatur id voluptatibus expedita sapiente! Accusamus, quas eaque dicta eligendi maiores tenetur nihil facilis ab, totam qui sequi itaque cumque eius consectetur est et, magni placeat nulla perferendis. Animi consequatur quo alias culpa nostrum provident? Sit nisi distinctio voluptas atque sapiente pariatur amet id asperiores? Sint molestiae, autem consequatur voluptatum voluptate odit expedita quam, dolor unde quidem fuga aspernatur quaerat inventore quisquam magnam suscipit recusandae aliquam sapiente ipsum neque ad aut pariatur! Molestiae impedit quis, eos ipsa ducimus officiis enim nam porro, eaque aut labore id at perferendis a natus nobis soluta in possimus. Modi obcaecati quae minus exercitationem nobis assumenda soluta at. Vero nisi maxime esse, ad dolore similique? Earum assumenda debitis alias. Cupiditate fugit quam, itaque quaerat accusantium est nam adipisci officia ipsa blanditiis tenetur. Dolorum magni deserunt fuga in et expedita illo, molestiae ad sed. Cum accusamus, sit cumque facilis blanditiis autem perferendis reiciendis quaerat odio quas quasi ipsum ipsa quod dicta voluptate omnis! Suscipit officia id ipsam sit ad itaque perferendis voluptatem! Repellat hic sapiente, eos ut odit veritatis? Ut veritatis corporis labore officiis nisi blanditiis expedita autem quos dolor suscipit omnis sit delectus veniam, et laboriosam tenetur sint ea ipsam. Et magni tempora ut omnis ipsum, delectus porro pariatur veritatis iste quaerat cupiditate eos impedit odio molestias explicabo excepturi in, harum rerum? Doloremque, commodi nam? Obcaecati cupiditate nobis voluptatibus, eius ex, corrupti vel maxime id sequi blanditiis eligendi voluptas labore ducimus quasi ad facere doloribus, harum corporis. </div>
//   )
// }

// export default page