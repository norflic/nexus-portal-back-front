import pipelineBorderActive from "../../../img/pipeline-border-active.png";
import pipelineBorder from "../../../img/pipeline-border.png";

type PipelineStepProps = {
    index: number;
    label: string;
    active: boolean;
};

export default function PipelineStep({ index, label, active }: PipelineStepProps) {
    // I'm sorry to anyone who will have to maintain this ^^'
    const img = active ? pipelineBorderActive : pipelineBorder;

    return (
        <div className={`flex flex-row gap-4 w-fit max-w-70`}>
            <div className="w-fit">
                <div
                    className={`flex flex-col w-16 h-16 m-auto items-center align-middle`}
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <p className={`m-auto text-xl ${active ? "text-app-blue-light" : ""}`}>
                        {index}
                    </p>
                </div>
            </div>
            <div className="w-fit h-fit align-middle place-self-center">
                <p
                    className={`text-left text-wrap w-fit text-app-gray-dark font-semibold min-w-10`}
                >
                    {label}
                </p>
            </div>
        </div>
    );
}

