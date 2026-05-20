import type {ReactNode} from "react";

interface BasicButtonProps {
    children: ReactNode;
    onClickFunction: (event: React.MouseEvent) => void;
    className?: string;
}

export default function BasicButton({
    children,
    onClickFunction,
    className,
}: BasicButtonProps) {
    const _onClick = (event: React.MouseEvent) => {
        event.preventDefault();
        onClickFunction(event);
    };

    return (
        <button
            className={`bg-app-blue-dark px-4 py-2 rounded-lg border-blue-600 text-white hover:bg-app-blue hover:cursor-pointer ${className}`}
            onClick={_onClick}
        >
            {children}
        </button>
    );
}
