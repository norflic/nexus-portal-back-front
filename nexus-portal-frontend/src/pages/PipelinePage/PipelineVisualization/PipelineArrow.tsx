type PipelineArrowProps = {
    active: boolean;
    className?: string;
};

export default function PipelineArrow({
                                          active,
                                          className = "",
                                      }: PipelineArrowProps) {
    const color = active ? "var(--color-app-blue-light)" : "#444444";

    return (
        <svg
            fill={color}
            width="64px"
            height="64px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            color={color}
            transform="rotate(90)"
        >
            <g className="SVGRepo_bgCarrier" stroke-width="0" />

            <g
                className="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                color={color}
            />

            <g className="SVGRepo_iconCarrier">
                <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
            </g>
        </svg>
    );
}
