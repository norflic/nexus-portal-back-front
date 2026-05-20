export type DotData = {
    date: Date;
    nbDots: number;
}

type DotProps = {
    dotData: DotData,
    dotClassName?: string | undefined;
};

export default function Dots({dotData, dotClassName = ""}: DotProps) {
    return (
        <div className="flex gap-0.5 items-center">
            {Array.from({length: dotData.nbDots}).map((_, i) => (
                <div key={i} className={`w-2 h-2  rounded-full ${dotClassName}`}></div>
            ))}
        </div>
    );
}
