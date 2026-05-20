import type {ReactNode} from "react";
import Card from "../../components/Card/Card.tsx";

type BaseDefenseCardProps = {
    children: ReactNode;
    className?: string | undefined;
    onClick?: (event: React.MouseEvent) => void;
};
export default function BaseDefenseCard({
                                            children,
                                            className = "",
                                            onClick = () => {
                                            },
                                        }: BaseDefenseCardProps) {
    return (
        <Card
            className={`scale-down-on-click border-2 bg-white scale-down-on-click shadow-md shadow-app-gray2 h-fit ${className}`}
            onClick={(event) => onClick(event)}
        >
            {children}
        </Card>
    );
}
