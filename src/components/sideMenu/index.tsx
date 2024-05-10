'use client';

interface SideMenuProps {
  label?: string;
  sections: { id: string; label: string }[];
  selectedSectionId: string;
  onSelectSection: (sectionId: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  label,
  sections,
  selectedSectionId,
  onSelectSection,
}) => {
  const handleSectionClick = (sectionId: string) => {
    onSelectSection(sectionId);
  };

  return (
    <div className="bg-gray-800 text-white w-48">
      <div className="py-4">
        <h3 className="text-lg font-semibold px-4 mb-4">{label}</h3>
        <ul>
          {sections.map((section) => (
            <li
              key={section.id}
              className={`px-4 py-2 cursor-pointer transition duration-300  ${
                selectedSectionId === section.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleSectionClick(section.id)}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
