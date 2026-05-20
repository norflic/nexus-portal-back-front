import type {ReactNode} from "react";

type CardProps = {
  children: ReactNode;
  className?: string | undefined;
  onClick?: (event: React.MouseEvent) => void;
};

export default function Card({
  children,
  className = "",
  onClick = () => {},
}: CardProps) {
    return (
        <div
            className={`border-2 p-4 shadow-lg rounded-2xl ${className}`}
            onClick={(event) => onClick(event)}
        >
            {children}
        </div>
    );
}
