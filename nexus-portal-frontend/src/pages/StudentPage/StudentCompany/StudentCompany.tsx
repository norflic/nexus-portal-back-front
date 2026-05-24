import BasicButton from "../../../components/Buttons/BasicButton";
import Section from "../../../components/Section/Section";
import SmallTitle from "../../../components/SmallTitle/SmallTitle";
import StudentPageTitle from "../../../components/StudentPageTitle/StudentPageTitle";
import bluePinpoint from "../../../img/blue_pinpoint.svg";
import grayBuilding from "../../../img/gray_building.svg";
import blueExport from "../../../img/blue_export.svg";
import blueCalendar from "../../../img/blue_calendar.svg";
import whiteSave from "../../../img/white_save.svg";
import whiteHistory from "../../../img/white_history.svg";
import {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import type {LatLngTuple} from "leaflet";

export default function StudentCompany() {
    const [_visitDate, setVisitDate] = useState<Date | null>();
    const [_visitNotes, setVisitNotes] = useState<string | null>();
    const [companyLocation] = useState<LatLngTuple>([
    45.7882651090896, 4.876165416235645,
  ]);

  function onVisitDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setVisitDate(event.currentTarget.valueAsDate);
  }

  function onVisitNotesChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setVisitNotes(event.currentTarget.value);
  }

  function onVisitSaveClick(event: React.MouseEvent) {
    return event; //TODO
  }

  function onVisitHistoryClick(event: React.MouseEvent) {
    return event; //TODO
  }

  return (
    <div className="flex flex-row">
      <Section className="flex flex-col grow">
        <StudentPageTitle
          text="Localisation de l'entreprise"
          svg={bluePinpoint}
        />
        <MapContainer
          center={companyLocation}
          zoom={13}
          scrollWheelZoom={false}
          className="z-9 h-60"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={companyLocation}>
            <Popup>Cool popup</Popup>
          </Marker>
        </MapContainer>
        <StudentPageTitle
          text="Placeholder nom de l'entreprise"
          svg={grayBuilding}
        />
        <p className="text-gray-700 my-1">PlaceHolder adresse 1</p>
        <p className="text-gray-700 my-1">PlaceHolder adresse 2</p>
        <a
          href="https://www.google.com/maps"
          className="border rounded-xl border-blue-700 text-blue-700 p-2 flex justify-center"
        >
          <img src={blueExport} className="w-5 h-5 mr-2" />
          Ouvrir dans Google Maps
        </a>
      </Section>
      <Section className="flex flex-col grow">
        <StudentPageTitle text="Visite en entreprise" svg={blueCalendar} />
        <div className="flex flex-col grow">
          <SmallTitle text="Date de visite prévue" />
          <input
            type="date"
            className="font-semibold nexusGray mt-2 border rounded-xl p-1 border-gray-300"
            name="VisitDate"
            required
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onVisitDateChange(event)
            }
          />
          <SmallTitle text="Compte rendu de visite" />
          <textarea
            className="font-semibold nexusGray mt-2 border rounded-xl p-1 border-gray-300"
            name="VisitSummary"
            required
            placeholder="Notes..."
            rows={4}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              onVisitNotesChange(event)
            }
          />
          <div className="flex">
            <BasicButton
              children={
                <>
                  <img src={whiteSave} className="w-5 h-5 mr-2" />
                  Enregistrer
                </>
              }
              onClickFunction={(event: React.MouseEvent) =>
                onVisitSaveClick(event)
              }
              className="flex flex-row items-center justify-center my-2 mr-5 grow"
            />
            <BasicButton
              children={
                <>
                  <img src={whiteHistory} className="w-5 h-5 mr-2" />
                  Historique
                </>
              }
              onClickFunction={(event: React.MouseEvent) =>
                onVisitHistoryClick(event)
              }
              className="flex flex-row items-center justify-center w-50 my-2"
            />
          </div>
          <p className="font-semibold mt-2">Visites précédentes</p>
          <ul className="listVisits"></ul>
        </div>
      </Section>
    </div>
  );
}
