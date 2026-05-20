import greenCheckmark from "../../../img/green_checkmark.svg";
import blueHourglass from "../../../img/blue_hourglass.svg";
import yellowMGlass from "../../../img/yellow_mglass.svg";
import redCross from "../../../img/red_cross.svg";

type StudentStatusDetailValues = {
  text: string;
  color: string;
  svg: string;
};

type StudentStatusDetailProps = {
  type: "ongoing" | "pending" | "looking" | "none";
};

export default function StudentStatusDetail({
  type,
}: StudentStatusDetailProps) {
  const getValues = (): StudentStatusDetailValues => {
    switch (type) {
      case "ongoing":
        return {
          text: "En cours",
          svg: greenCheckmark,
          color: "text-green-900 bg-green-100",
        };
      case "pending":
        return {
          text: "En attente",
          svg: blueHourglass,
          color: "text-blue-900 bg-blue-100",
        };
      case "looking":
        return {
          text: "Recherche",
          svg: yellowMGlass,
          color: "text-yellow-900 bg-yellow-100",
        };
      case "none":
        return {
          text: "Inactif",
          svg: redCross,
          color: "text-red-900 bg-red-100",
        };
    }
  };

  const values = getValues();
  if (!values) return <></>;

  return (
    <div
      className={`${values.color} flex rounded-full w-25 h-10 items-center justify-evenly select-none`}
    >
      <img src={values.svg} className="w-5 h-5" />
      <p className="text-sm font-semibold">{values.text}</p>
    </div>
  );
}
