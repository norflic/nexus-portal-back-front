import greenCheckmark from "../../../img/green_checkmark.svg";
import redCross from "../../../img/red_cross.svg";

type SoutenanceStatusProps = {
  type: "confirmed" | "not confirmed";
};

export default function SoutenanceStatus({ type }: SoutenanceStatusProps) {
  switch (type) {
    case "confirmed":
      return (
        <div className="flex flex-row items-center">
          <img src={greenCheckmark} className="w-4 h-4 mr-1" />
          <p className="text-green-700">Confirmée</p>
        </div>
      );
      break;
    case "not confirmed":
      return (
        <div className="flex flex-row items-center">
          <img src={redCross} className="w-4 h-4 mr-1" />
          <p className="text-red-500">Non confirmée</p>
        </div>
      );
      break;
  }
}
