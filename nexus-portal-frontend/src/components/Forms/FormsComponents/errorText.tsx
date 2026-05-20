interface errorTextProps {
    children: string;
}

export default function ErrorText({children}: errorTextProps) {
    return (
        <span className="text-red-500 text-sm">
            {children}
        </span>
    )
}