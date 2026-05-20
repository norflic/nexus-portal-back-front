type ThinBorderProps = {
    children?: React.ReactNode;
    className?: string;
};

export default function ThinBorder({ children, className }: ThinBorderProps) {
    return (
        <div
            className={`border rounded-xl border-gray-300 flex p-2 my-2 ${className} `}
        >
            {children}
        </div>
    );
}
