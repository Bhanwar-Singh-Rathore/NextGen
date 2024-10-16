// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { EditorBtns } from "@/lib/constants";
// import React from "react";
// import TextPlaceholder from "./text-placeholder";
// import ContainerPlaceholder from "./container-placeholder";
// import VideoPlaceholder from "./video-placeholder";
// import TwoColumnsPlaceholder from "./two-columns-placeholder";
// import LinkPlaceholder from "./link-placeholder";
// import ContactFormComponentPlaceholder from "./contact-form-placeholder";
// import CheckoutPlaceholder from "./checkout-placeholder";

// type Props = {};

// const ComponentsTab = (props: Props) => {
//   const elements: {
//     Component: React.ReactNode;
//     label: string;
//     id: EditorBtns;
//     group: "layout" | "elements";
//   }[] = [
//     {
//       Component: <TextPlaceholder />,
//       label: "Text",
//       id: "text",
//       group: "elements",
//     },
//     {
//       Component: <ContainerPlaceholder />,
//       label: "Container",
//       id: "container",
//       group: "layout",
//     },
//     {
//       Component: <TwoColumnsPlaceholder />,
//       label: "2 Columns",
//       id: "2Col",
//       group: "layout",
//     },
//     {
//       Component: <VideoPlaceholder />,
//       label: "Video",
//       id: "video",
//       group: "elements",
//     },
//     {
//       Component: <ContactFormComponentPlaceholder />,
//       label: "Contact",
//       id: "contactForm",
//       group: "elements",
//     },
//     {
//       Component: <CheckoutPlaceholder />,
//       label: "Checkout",
//       id: "paymentForm",
//       group: "elements",
//     },
//     {
//       Component: <LinkPlaceholder />,
//       label: "Link",
//       id: "link",
//       group: "elements",
//     },
//   ];

//   return (
//     <Accordion
//       type="multiple"
//       className="w-full"
//       defaultValue={["Layout", "Elements","Navigation"]}
//     >
//       <AccordionItem value="Layout" className="px-6 py-0 border-y-[1px]">
//         <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
//         <AccordionContent className="flex flex-wrap gap-2 ">
//           {elements
//             .filter((element) => element.group === "layout")
//             .map((element) => (
//               <div
//                 key={element.id}
//                 className="flex-col items-center justify-center flex"
//               >
//                 {element.Component}
//                 <span className="text-muted-foreground">{element.label}</span>
//               </div>
//             ))}
//         </AccordionContent>
//       </AccordionItem>
//       <AccordionItem value="Elements" className="px-6 py-0 ">
//         <AccordionTrigger className="!no-underline">
//           Navigation
//         </AccordionTrigger>
//         <AccordionContent className="flex flex-wrap gap-2 ">
//           {elements
//             .filter((element) => element.group === "elements")
//             .map((element) => (
//               <div
//                 key={element.id}
//                 className="flex-col items-center justify-center flex"
//               >
//                 {element.Component}
//                 <span className="text-muted-foreground">{element.label}</span>
//               </div>
//             ))}
//         </AccordionContent>
//       </AccordionItem>
//       <AccordionItem value="Elements" className="px-6 py-0 ">
//         <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
//         <AccordionContent className="flex flex-wrap gap-2 ">
//           {elements
//             .filter((element) => element.group === "elements")
//             .map((element) => (
//               <div
//                 key={element.id}
//                 className="flex-col items-center justify-center flex"
//               >
//                 {element.Component}
//                 <span className="text-muted-foreground">{element.label}</span>
//               </div>
//             ))}
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>
//   );
// };

// export default ComponentsTab;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorBtns } from "@/lib/constants";
import React from "react";
import TextPlaceholder from "./text-placeholder";
import ContainerPlaceholder from "./container-placeholder";
import VideoPlaceholder from "./video-placeholder";
import TwoColumnsPlaceholder from "./two-columns-placeholder";
import LinkPlaceholder from "./link-placeholder";
import ContactFormComponentPlaceholder from "./contact-form-placeholder";
import CheckoutPlaceholder from "./checkout-placeholder";
import NavigationPlaceholder from "../../../funnel-editor/funnel-editor-components/navigation-placeholder";
//import FooterPlaceholder from "./footer-placeholder"; // Added footer component

type Props = {};

const ComponentsTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode;
    label: string;
    id: EditorBtns;
    group: "layout" | "elements" | "navigation" | "footer"; // Added new groups
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: "Text",
      id: "text",
      group: "elements",
    },
    {
      Component: <ContainerPlaceholder />,
      label: "Container",
      id: "container",
      group: "layout",
    },
    {
      Component: <TwoColumnsPlaceholder />,
      label: "2 Columns",
      id: "2Col",
      group: "layout",
    },
    {
      Component: <VideoPlaceholder />,
      label: "Video",
      id: "video",
      group: "elements",
    },
    {
      Component: <ContactFormComponentPlaceholder />,
      label: "Contact",
      id: "contactForm",
      group: "elements",
    },
    {
      Component: <CheckoutPlaceholder />,
      label: "Checkout",
      id: "paymentForm",
      group: "elements",
    },
    {
      Component: <LinkPlaceholder />,
      label: "Link",
      id: "link",
      group: "elements",
    },
    {
      Component: <NavigationPlaceholder />, // Added navigation component
      label: "Navigation",
      id: "navigation",
      group: "navigation",
    },
    // {
    //   Component: <FooterPlaceholder />, // Added footer component
    //   label: "Footer",
    //   id: "footer",
    //   group: "footer",
    // },
  ];

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements", "Navigation", "Footer"]} // Added Footer
    >
      <AccordionItem value="Layout" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {elements
            .filter((element) => element.group === "layout")
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {elements
            .filter((element) => element.group === "elements")
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Navigation" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Navigation</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {elements
            .filter((element) => element.group === "navigation")
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Footer" className="px-6 py-0"> {/* Added footer */}
        <AccordionTrigger className="!no-underline">Footer</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {elements
            .filter((element) => element.group === "footer")
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ComponentsTab;
