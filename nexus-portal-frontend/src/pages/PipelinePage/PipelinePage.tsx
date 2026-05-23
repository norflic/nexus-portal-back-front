import Page from "../Page";
import PipelineVisualization from "./PipelineVisualization/PipelineVisualization";
import {useState} from "react";
import BasicButton from "../../components/Buttons/BasicButton";
import MissionSheetPage from "./Steps/Common/MissionSheetPage";
import SearchStatePage from "./Steps/Common/SearchStatePage";
import GroupAffectationPage from "./Steps/Apprenticeship/GroupAffectationPage";
import SignConventionPage from "./Steps/Apprenticeship/SignConventionPage";
import FinishedPage from "./Steps/Apprenticeship/FinishedPage";
import AffectTutorPage from "./Steps/Apprenticeship/AffectTutorPage";

type PipelinePageProps = {};

export default function PipelinePage({}: PipelinePageProps) {
    const [currentStep, setCurrentStep] = useState(0);

    // const internSteps = [
    //     {name: "Affectation du tuteur enseignant", comp: <div></div>},
    //     {name: "Validation MonStage", comp: <div></div>},
    //     {name: "Contrat Validé !", comp: <div></div>},
    // ];

    const apprenticeSteps = [
        {name: "Affectation au groupe", comp: <GroupAffectationPage/>},
        {name: "Signer la convention", comp: <SignConventionPage/>},
        {name: "Affectation du tuteur enseignant", comp: <AffectTutorPage/>},
        {name: "Terminé !", comp: <FinishedPage/>},
    ];

    const steps = [
        {name: "Rechercher l'entreprise", comp: <SearchStatePage/>},
        {name: "Signer la fiche mission", comp: <MissionSheetPage/>},
    ].concat(apprenticeSteps);

    return (
        <Page name="Pipeline">
            <div className="p-5 flex flex-col min-h-[90dvh]">
                <div className="flex flex-1 flex-row gap-2 w-full m-0 box-border">
                    <PipelineVisualization
                        steps={steps.map((s) => s.name)}
                        currentStep={currentStep}
                    />
                    {steps[currentStep].comp}
                </div>
                <BasicButton
                    className={`self-end m-10 text-xl align-bottom`}
                    onClickFunction={() => {
                        console.log(currentStep);
                        if (currentStep + 1 < steps.length)
                            setCurrentStep(currentStep + 1);
                    }}
                >
                    {currentStep >= steps.length - 1 ? "Terminé" : "Suivant"}
                </BasicButton>
            </div>
        </Page>
    );
}
