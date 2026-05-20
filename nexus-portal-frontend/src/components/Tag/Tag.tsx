import type { ReactNode } from "react";

type TagProps = {
    tagColor: "red" | "gray" | "green" | "blue";
    children: ReactNode;
};

export default function Tag({ tagColor = "gray", children }: TagProps) {
    let colorClassName;
    switch (tagColor) {
        case "red":
            colorClassName = "bg-red-300";
            break;
        case "blue":
            colorClassName = "bg-blue-200";
            break;
        case "green":
            colorClassName = "bg-green-300";
            break;
        default:
            colorClassName = "bg-gray-300";
            break;
    }

    return (
        <div className={`rounded-2xl p-1 pl-3 pr-3 text-xs ${colorClassName}`}>
            {children}
        </div>
    );
}
