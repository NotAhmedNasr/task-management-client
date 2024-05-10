'use client';

import SideMenu from '@/components/sideMenu';
import ContentSection from './contentSection';
import { useState } from 'react';
import PersonalInfo from './personalInfo';
import LoginHistory from './loginHistory';

export interface AccountSection {
  id: string;
  label: string;
  component: React.ReactNode;
}

const MainSection = () => {
  const sections: AccountSection[] = [
    {
      id: '1',
      label: 'Personal Information',
      component: <PersonalInfo />,
    },
    {
      id: '2',
      label: 'Login History',
      component: <LoginHistory />,
    },
  ];

  const [selectedSectionId, setSelectedSectionId] = useState(sections[0].id);

  return (
    <section className="flex flex-col lg:flex-row gap-5 lg:gap-20 align-middle md:p-10">
      <SideMenu
        sections={sections}
        selectedSectionId={selectedSectionId}
        onSelectSection={(sectionId: string) => {
          setSelectedSectionId(sectionId);
        }}
      />
      <ContentSection>
        {
          sections.find((section) => section.id === selectedSectionId)
            ?.component
        }
      </ContentSection>
    </section>
  );
};

export default MainSection;
