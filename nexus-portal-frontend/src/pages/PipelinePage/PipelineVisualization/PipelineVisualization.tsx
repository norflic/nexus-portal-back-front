import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router";
import type { AppRouterContext } from "../../../App";
import PipelineArrow from "./PipelineArrow";
import PipelineStep from "./PipelineStep";

type PipelineVisualizationProps = {
    steps: string[];
    currentStep: number;
};

export default function PipelineVisualization({ steps, currentStep }: PipelineVisualizationProps) {
    const currentStepRef = useRef<HTMLDivElement | null>(null);
    const appRouterContext = useOutletContext() as AppRouterContext;
    useEffect(() => {
        const width = window.innerWidth;
        if (currentStepRef.current && (width > 1400 || !appRouterContext.isPageLarge)) {
            currentStepRef.current.scrollIntoView({
                behavior: "smooth",
                inline: "center",
            });
        }
    }, [currentStepRef]);

    return (
        <div className="flex flex-col w-min-fit h-max align-middle">
            {steps.map((step, index) => (
                <div
                    className="flex flex-col w-fit"
                    key={step}
                    ref={currentStep == index ? currentStepRef : undefined}
                >
                    <PipelineStep label={step} index={index + 1} active={index <= currentStep} />
                    {index < steps.length - 1 && (
                        <div className="max-h-16 flex py-auto w-fit">
                            <PipelineArrow className="align-middle" active={index < currentStep} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

