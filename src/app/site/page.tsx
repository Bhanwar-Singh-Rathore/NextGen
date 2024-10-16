// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { pricingCards } from "@/lib/constants";
// // import { stripe } from '@/lib/stripe'
// import clsx from "clsx";
// import { Check } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default async function Home() {
//   // const prices = await stripe.prices.list({
//   //   product: process.env.NEXT_PLURA_PRODUCT_ID,
//   //   active: true,
//   // })
//   const PriceList = () => {
//     const prices = [
//       { name: 'Ultahost', price: '₹276.46/mo' },
//       { name: 'DreamHost', price: '₹415.95/mo' },
//       { name: 'HostGator', price: '₹1,004.16/mo' },
//       { name: 'Bluehost', price: '₹923.49/mo' },
//       { name: 'SiteGround', price: '₹1,679.77/mo' },
//     ];
//   }
//   return (
//     <>
//       <section className="h-full w-full md:pt-12 mt-[-70px] relative flex items-center justify-center flex-row ">
//         {/* grid */}

//         {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" /> */}
//         {/* <div className=" flex flex-row justify-center  " /> */}

//         <div className="w-2/4">
//           <p>UP TO 20X FASTER, CHEAP WEB HOSTING</p>
//           <p className="font-bold text-4xl mt-2 mb-4">
//             Powerful, Best Shared Hosting
//           </p>
//           <p className="mt-2 mb-4 w-2/4">
//             Extremely fast, secure and user-friendly website hosting for your
//             successful online projects, get up to a 20x faster page load times,
//             With unlimited bandwidth and a free cPanel license.
//           </p>

//           <Button className="h-12 w-48 text-2xl rounded-2xl bg-blue-500 ">
//             Get start
//           </Button>
//           <Button className="h-12 w-48 text-2xl rounded-2xl bg-blue-500 mr-2 ml-4  ">
//             Documentation
//           </Button>
//         </div>
//         <div>




//         <Card className={clsx("w-[400px] flex flex-col justify-between rounded-2xl")}>
//         <CardHeader
//   style={{ background: 'linear-gradient(130deg, #0092f9 0%, #7628d3 100%)' }}
//   className="rounded-t-2xl"
// >
//               <CardTitle className="text-white">
//               Basic Shared Hosting
//               </CardTitle>
//               <p>Easy, fast, and flexible compute built for a range of needs along with user-friendly hosting.</p>
//               <CardDescription>Basic features.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <span className="text-4xl font-bold">$0</span>
//               <span>/ month</span>
//             </CardContent>
//             <div className="bg-white shadow-lg p-6 rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Basic Shared Hosting</h2>
//       <p className="text-sm text-gray-500 mb-2">
//         Free DDOS Protection & Unlimited Bandwidth
//       </p>
//       <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-t-lg text-white">
//         {prices.map((provider, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center border-b border-gray-200 py-2"
//           >
//             <span>{provider.name}</span>
//             <span>{provider.price}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//           </Card>





//         </div>

//         <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
//           {/* <h1 className="text-9xl font-bold text-center md:text-[300px]">
//             Plura
//           </h1> */}
//         </div>
//         <div className="flex justify-center items-center relative md:mt-[-70px]">
//           {/* <Image
//             src={'/assets/preview.png'}
//             alt="banner image"
//             height={1200}
//             width={1200}
//             className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
//           /> */}
//           <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
//         </div>
//       </section>









//       <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
//         <h2 className="text-4xl text-center"> Choose what fits you right</h2>
//         <p className="text-muted-foreground text-center">
//           Our straightforward pricing plans are tailored to meet your needs. If
//           {" you're"} not <br />
//           ready to commit you can get started for free.
//         </p>
//         <div className="flex justify-center gap-4 flex-wrap mt-6">
//           {[
//             {
//               nickname: "Unlimited Saas",
//               unit_amount: 2000,
//               recurring: { interval: "month" },
//               id: "plan_1",
//             },
//             {
//               nickname: "Starter",
//               unit_amount: 0,
//               recurring: { interval: "month" },
//               id: "plan_2",
//             },
//           ].map((card) => (
//             //WIP: Wire up free product from stripe
//             <Card
//               key={card.nickname}
//               className={clsx("w-[300px] flex flex-col justify-between", {
//                 "border-2 border-primary": card.nickname === "Unlimited Saas",
//               })}
//             >
//               <CardHeader>
//                 <CardTitle
//                   className={clsx("", {
//                     "text-muted-foreground": card.nickname !== "Unlimited Saas",
//                   })}
//                 >
//                   {card.nickname}
//                 </CardTitle>
//                 <CardDescription>
//                   {
//                     [
//                       {
//                         title: "Unlimited Saas",
//                         description: "All features unlocked.",
//                         features: ["Unlimited projects", "Priority support"],
//                       },
//                       {
//                         title: "Starter",
//                         description: "Basic features.",
//                         features: ["1 project", "Community support"],
//                       },
//                     ].find((c) => c.title === card.nickname)?.description
//                   }
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <span className="text-4xl font-bold">
//                   {card.unit_amount && card.unit_amount / 100}
//                 </span>
//                 <span className="text-muted-foreground">
//                   <span>/ {card.recurring?.interval}</span>
//                 </span>
//               </CardContent>
//               <CardFooter className="flex flex-col items-start gap-4">
//                 <div>
//                   {[
//                     {
//                       title: "Unlimited Saas",
//                       features: ["Unlimited projects", "Priority support"],
//                     },
//                     {
//                       title: "Starter",
//                       features: ["1 project", "Community support"],
//                     },
//                   ]
//                     .find((c) => c.title === card.nickname)
//                     ?.features.map((feature) => (
//                       <div key={feature} className="flex gap-2">
//                         <Check />
//                         <p>{feature}</p>
//                       </div>
//                     ))}
//                 </div>
//                 <Link
//                   href={`/agency?plan=${card.id}`}
//                   className={clsx(
//                     "w-full text-center bg-primary p-2 rounded-md",
//                     {
//                       "!bg-muted-foreground":
//                         card.nickname !== "Unlimited Saas",
//                     }
//                   )}
//                 >
//                   Get Started
//                 </Link>
//               </CardFooter>
//             </Card>
//           ))}

//           <Card className={clsx("w-[300px] flex flex-col justify-between")}>
//             <CardHeader>
//               <CardTitle className={clsx({ "text-muted-foreground": true })}>
//                 Starter
//               </CardTitle>
//               <CardDescription>Basic features.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <span className="text-4xl font-bold">$0</span>
//               <span>/ month</span>
//             </CardContent>
//             <CardFooter className="flex flex-col items-start gap-4">
//               <div>
//                 {["1 project", "Community support"].map((feature) => (
//                   <div key={feature} className="flex gap-2">
//                     <Check />
//                     <p>{feature}</p>
//                   </div>
//                 ))}
//               </div>
//               <Link
//                 href="/agency"
//                 className={clsx(
//                   "w-full text-center bg-primary p-2 rounded-md",
//                   { "!bg-muted-foreground": true }
//                 )}
//               >
//                 Get Started
//               </Link>
//             </CardFooter>
//           </Card>
//         </div>
//       </section>
//     </>
//   );
// }

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import photo from '../../../public/home_img.jpg'
import DoublePendulum from "@/components/global/DoublePendulum";

// PriceList Component (now separated)
const PriceList = () => {
  const prices = [
    { name: 'Ultahost', price: '₹276.46/mo' },
    { name: 'DreamHost', price: '₹415.95/mo' },
    { name: 'HostGator', price: '₹1,004.16/mo' },
    { name: 'Bluehost', price: '₹923.49/mo' },
    { name: 'SiteGround', price: '₹1,679.77/mo' },
  ];

  return (
    <div className="">
     
      <div className="">
        {prices.map((provider, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b ml-4 border-gray-200 py-4"
          >
            <span>{provider.name}</span>
            <span>{provider.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};












const users = [
  {
    id: 1,
    name: "User 1",
    photo: "/path/to/photo1.jpg", // Replace with your image path or use a placeholder
    rating: 5,
  },
  {
    id: 2,
    name: "User 2",
    photo: "/path/to/photo2.jpg", // Replace with your image path or use a placeholder
    rating: 4,
  },
  {
    id: 3,
    name: "User 3",
    photo: "/path/to/photo3.jpg", // Replace with your image path or use a placeholder
    rating: 4,
  },
  {
    id: 4,
    name: "User 4",
    photo: "/path/to/photo4.jpg", // Replace with your image path or use a placeholder
    rating: 5,
  },
  {
    id: 5,
    name: "User 5",
    photo: "/path/to/photo5.jpg", // Replace with your image path or use a placeholder
    rating: 5,
  },
];


const UserRatings = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">People Rated Ultahost</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center text-center">
            <Image
              src={user.photo}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full border-2 border-blue-500" // Add some style to the images
            />
            <p className="mt-2 font-semibold">{user.name}</p>
            <p className="text-yellow-500">{'★'.repeat(user.rating)}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 font-bold text-lg">Total Ultahost Rating: 4.9</p>
      <p className="text-yellow-500">{'★'.repeat(5)}</p>
    </div>
  );
};












export default function Home() {
  return (
    <>
     <section className="h-full w-full md:pt-12 mt-[24] flex flex-col sm:flex-row items-center justify-evenly">
  <div className="w-full sm:w-3/4 md:w-2/4 px-4 sm:px-0 ml-10" >
    <p className="text-lg sm:text-xl">UP TO 20X FASTER, CHEAP WEB HOSTING</p>
    <p className="font-bold text-3xl sm:text-4xl mt-2 mb-4">
      Powerful, Best Shared Hosting
    </p>
    <p className="mt-2 mb-4 sm:w-full md:w-3/4">
      Extremely fast, secure and user-friendly website hosting for your
      successful online projects. Get up to 20x faster page load times, with unlimited bandwidth and a free cPanel license.
    </p>

    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
     <div> <Button className="h-12 w-full sm:w-48 text-xl sm:text-2xl rounded-2xl bg-blue-500">
        Get Started
      </Button>
      <Button className="h-12 w-full sm:w-48 text-xl sm:text-2xl rounded-2xl bg-blue-500 sm:ml-4">
        Documentation
      </Button>
      <UserRatings/></div>
    </div>
  </div>
  {/* <div className="mr-92">

  <DoublePendulum/>
  </div> */}
  {/* Hosting Price Card */}
  <div className=" flex mr-10 ">
    <div>
  <Card className="w-full sm:w-[400px] flex flex-col justify-between rounded-2xl mt-10 sm:mt-0">
    <CardHeader
      style={{ background: 'linear-gradient(130deg, #0092f9 0%, #7628d3 100%)' }}
      className="rounded-t-2xl"
    >
      <CardTitle className="text-white">Basic Shared Hosting</CardTitle>
      <p className="text-white">
        Easy, fast, and flexible compute built for a range of needs along
        with user-friendly hosting.
      </p>
      <CardDescription className="text-white">
        Basic features.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <PriceList />
    </CardContent>
  </Card>
  </div>
  <div>
  {/* <Image
              src={photo}
              alt={"home"}
              width={400}
              height={100}
              className="rounded-r-sm  mt-40 " // Add some style to the images
            /> */}
           
  </div>
  </div>
</section>


      {/* Pricing Section */}
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        <h2 className="text-4xl text-center">Choose what fits you right</h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If
          you're not ready to commit, you can get started for free.
        </p>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {[{
              nickname: "Unlimited Saas",
              unit_amount: 2000,
              recurring: { interval: "month" },
              id: "plan_1",
            },
            {
              nickname: "Starter",
              unit_amount: 0,
              recurring: { interval: "month" },
              id: "plan_2",
            },
          ].map((card) => (
            <Card
              key={card.nickname}
              className={clsx("w-[300px] flex flex-col justify-between", {
                "border-2 border-primary": card.nickname === "Unlimited Saas",
              })}
            >
              <CardHeader>
                <CardTitle className={clsx({
                  "text-muted-foreground": card.nickname !== "Unlimited Saas",
                })}>
                  {card.nickname}
                </CardTitle>
                <CardDescription>
                  {
                    [
                      {
                        title: "Unlimited Saas",
                        description: "All features unlocked.",
                        features: ["Unlimited projects", "Priority support"],
                      },
                      {
                        title: "Starter",
                        description: "Basic features.",
                        features: ["1 project", "Community support"],
                      },
                    ].find((c) => c.title === card.nickname)?.description
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">
                  {card.unit_amount && card.unit_amount / 100}
                </span>
                <span className="text-muted-foreground">
                  <span>/ {card.recurring?.interval}</span>
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {[
                    {
                      title: "Unlimited Saas",
                      features: ["Unlimited projects", "Priority support"],
                    },
                    {
                      title: "Starter",
                      features: ["1 project", "Community support"],
                    },
                  ]
                    .find((c) => c.title === card.nickname)
                    ?.features.map((feature) => (
                      <div key={feature} className="flex gap-2">
                        <Check />
                        <p>{feature}</p>
                      </div>
                    ))}
                </div>
                <Link
                  href={`/agency?plan=${card.id}`}
                  className={clsx(
                    "w-full text-center bg-primary p-2 rounded-md",
                    { "!bg-muted-foreground": card.nickname !== "Unlimited Saas" }
                  )}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
