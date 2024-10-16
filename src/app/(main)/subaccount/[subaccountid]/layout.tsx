// src/app/(main)/subaccount/[subaccountid]/layout.tsx
import { fetchUserId } from '@/lib/user'; // Server function
import InfoBar from '@/components/global/infobar';
import MenuOptions from '../../../../components/sidebar/menu-options';

const AppLayout = async ({ children }) => {
  const dbUserId = await fetchUserId(); // Fetch the user ID from the server function

  const currentUrl = dbUserId ? `http://localhost:3000/subaccount/${dbUserId}` : '';
  const dummySubAccounts = [
    {
      id: 'dummy-subaccount-1',
      name: 'Dummy Subaccount 1',
      subAccountLogo: '/dummy-subaccount-logo-1.png',
      address: '123 Subaccount St, City, Country',
    },
    {
      id: 'dummy-subaccount-2',
      name: 'Dummy Subaccount 2',
      subAccountLogo: '/dummy-subaccount-logo-2.png',
      address: '456 Subaccount Rd, City, Country',
    },
  ];

  const dummyDetails = {
    name: 'Bhanwar Singh',
    address: '123 Dummy St, City, Country',
  };
  const dummyUser = {
    id: 'dummy-user-id',
    name: 'Dummy User',
    role: 'AGENCY_OWNER',
    Agency: {
      id: 'dummy-agency-id',
      name: 'Dummy Agency',
      agencyLogo: '/dummy-agency-logo.png',
      address: '123 Agency Ave, City, Country',
    },
  };
  const dummySidebarOptions = [
    {
      id: 'dashboard-option',
      name: 'Dashboard',
      link: `${currentUrl}`,
      icon: 'dashboard',
    },
    {
      id: 'funnels-option',
      name: 'Funnels',
      link: `${currentUrl}/funnels`,
      icon: 'funnels',
    },
    {
      id: 'media-option',
      name: 'Media',
      link: `${currentUrl}/media`,
      icon: 'media',
    },
    {
      id: 'contact-option',
      name: 'Contacts',
      link: `${currentUrl}/contacts`,
      icon: 'contacts',
    },
    {
      id: 'pipelines-option',
      name: 'pipelines',
      link: `${currentUrl}/pipelines`,
      icon: 'trigger',
    },
    {
      id: 'lunchpad-option',
      name: 'launchpad',
      link: `${currentUrl}/launchpad`,
      icon: 'automation',
    },
    {
      id: 'serrings-option',
      name: 'settings',
      link: `${currentUrl}/settings`,
      icon: 'pipeline',
    },
   
  ];

  return (
    <div className="h-screen overflow-hidden">
      {dbUserId && (
        <MenuOptions
        defaultOpen={true}
        subAccounts={dummySubAccounts}
        sidebarOpt={dummySidebarOptions}
        sidebarLogo="/dummy-sidebar-logo.png"
        details={dummyDetails}
        user={dummyUser}
        id={dbUserId} // Pass the dbUserId to MenuOptions
        />
      )}
      <div className="md:pl-[300px]">
        <InfoBar />
        <div className="relative">{children}</div> {/* Render children here */}
      </div>
    </div>
  );
};

export default AppLayout;
