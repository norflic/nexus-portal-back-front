import {type ReactNode, useEffect, useRef} from "react";
import closeIcon from "../../img/croix.svg";

interface BasicPopupProps {
    title: string;
    isOpen: boolean;
    close: () => void;
    children: ReactNode;
    canKeyboardClose?: boolean;
    className?: string;
}

export default function BasicPopup({
                                       title,
                                       children,
                                       isOpen,
                                       close,
                                       canKeyboardClose = false,
                                       className = "",
                                   }: BasicPopupProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    const onKeyDown = (evt: React.KeyboardEvent) => {
        evt.stopPropagation();
        if (canKeyboardClose) {
            console.log(evt.code);
            const closeKeys = ["Space", "Enter", "Escape"];
            if (closeKeys.includes(evt.code)) close();
        }
    };

    const stopPropagation = (evt: React.MouseEvent) => {
        evt.stopPropagation();
    };

    const onBackgroundClick = (event: React.MouseEvent) => {
        stopPropagation(event);
        close();
    };

    useEffect(() => {
        if (ref.current) ref.current.focus();
    }, [ref]);

    return (
        <>
            {isOpen && (
                <div
                    className={`top-0 left-0 flex h-full w-full fixed bg-[rgba(0,0,0,0.5)] z-100`}
                    onKeyDown={onKeyDown}
                    onClick={onBackgroundClick}
                >
                    <div
                        onClick={stopPropagation}
                        ref={ref}
                        className={`m-auto rounded-lg max-h-[90vh] overflow-y-auto flex-col z-100 bg-white opacity-100 p-4 outline-none ${className}`}
                    >
                        <div className="flex flex-row justify-between items-center pb-8">
                            <h1 className="text-xl">{title}</h1>
                            <button
                                className="cursor-pointer"
                                onClick={onBackgroundClick}
                            >
                                <img src={closeIcon} alt="close" className="w-5 h-5"></img>
                            </button>
                        </div>
                        <div>{children}</div>
                    </div>
                </div>
            )}
        </>
    );
}
