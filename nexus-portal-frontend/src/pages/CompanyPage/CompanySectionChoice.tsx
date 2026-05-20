import {type CompanySection, isCompanySection} from "./companySectionType.ts";

type CompanySectionChoiceProps = {
    titlesList: string[];
    bottomStyle?: string;
    selectedSection: CompanySection;
    setSelectedSection: React.Dispatch<React.SetStateAction<CompanySection>>;
};

export default function CompanySectionChoice({
                                                 titlesList,
                                                 bottomStyle,
                                                 selectedSection,
                                                 setSelectedSection
                                             }: CompanySectionChoiceProps) {

    function onSectionClick(title: string) {
        if (isCompanySection(title)) {
            setSelectedSection(title);
        } else {
            console.error(`le titre donné (${title}) ne correspond pas au type selectedSection`);

        }
    }

    return (
        <div
            className={`flex flex-row text-center items-center bg-app-gray-light ${bottomStyle} `}>
            {titlesList.map((title) => {
                const isSelected = title === selectedSection;
                return (
                    <button
                        className={`items-center justify-center  pl-2 pr-2 pt-2 pb-2 text-app-gray-text hover:cursor-pointer rounded-b-xl ${bottomStyle} 
                                                ${isSelected
                            ? "bg-app-gray2"
                            : "bg-app-gray-light"}
                        `}
                        onClick={() => onSectionClick(title)}
                        key={title}>{title}
                    </button>
                )
            })}
        </div>
    );
}
