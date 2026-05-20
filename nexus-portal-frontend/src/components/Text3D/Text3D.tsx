import "./Text3D.css";

type Text3DProps = {
    text: string;
    color?: string;
    layerCount?: number;
};

export default function Text3D({
    text,
    color = "#000000",
    layerCount = 10,
}: Text3DProps) {
    return (
        <div className="scene">
            <div
                className="text-3d select-none"
                style={
                    {
                        "--layer-count": layerCount,
                        "--c": color,
                    } as React.CSSProperties
                }
            >
                <div aria-hidden={true} className="layers">
                    {[...Array(layerCount).keys()].map((value) => (
                        <div
                            key={value}
                            className="layer select-none"
                            style={
                                {
                                    "--i": value,
                                } as React.CSSProperties
                            }
                        >
                            {text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
