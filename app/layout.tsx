'use client'
import React, { ReactNode } from 'react';
import './globals.css';
import { AppContextProvider } from '@/lib/contexts';
import NavigationHeader from '@/components/Navigationheader';
import NavigationTrending from '@/components/Navigation';
import SideBar from '@/components/SideBar2';
import Table from '@/components/Table';
import TopBar from '@/components/Topbarelements';
import { Metadata } from 'next';

interface LayoutProps {
  metadata: Metadata;
  children: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ metadata, children }) => {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavigationHeader />
            <NavigationTrending />

            <div style={{ display: 'flex', alignItems: 'flex-start', flex: '1', marginTop: '1px' }}> {/* Adjust marginTop */}
              <SideBar style={{ width: '200px', background: '#f0f0f0', padding: '20px' }} />
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', paddingLeft: '10px', paddingTop:'10px', paddingBottom: '20px' }}>
                <TopBar />
                <div style={{ flex: '1', overflow: 'scrool', paddingTop: '5px', paddingLeft: '0px'}}>
                  {/* <Table /> */}
                  {children}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #ddd', padding: '20px' }}>
              {/* Additional content */}
            </div>
          </div>
        </AppContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;




// pages/index.tsx
// import './globals.css';
// import React from 'react';
// import RootLayout from '@/components/RootLayout';
// import Table from '@/components/Table2';

// const HomePage: React.FC = () => {
//   return (
//     <RootLayout />
//   );
// };

// export default HomePage;
