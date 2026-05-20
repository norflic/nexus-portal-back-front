type SectionType = {
  children?: React.ReactNode;
  className?: string | undefined;
  onClick?: (event: React.MouseEvent) => void;
};

export default function Section({
  children,
  className = "",
  onClick = () => {},
}: SectionType) {
  return (
    <div
      className={`bg-white shadow-xl rounded-xl flex flex-col mx-5 my-8 p-5 ${className} `}
      onClick={(event) => onClick(event)}
    >
      {children}
    </div>
  );
}
