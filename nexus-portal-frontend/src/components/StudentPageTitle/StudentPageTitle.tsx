type StudentPageTitleType = {
  text: string;
  svg: string;
};

export default function StudentPageTitle({ text, svg }: StudentPageTitleType) {
  return (
    <div className="flex flex-row my-3">
      <img src={svg} className="w-5 h-5 mr-2" />
      <p className="font-bold">{text}</p>
    </div>
  );
}
