type SmallTitleType = { text: string };

export default function SmallTitle({ text }: SmallTitleType) {
  return <p className="font-semibold studentStatus mt-2">{text}</p>;
}
