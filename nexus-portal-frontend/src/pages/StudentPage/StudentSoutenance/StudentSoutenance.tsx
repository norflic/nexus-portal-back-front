import BasicButton from "../../../components/Buttons/BasicButton";
import Section from "../../../components/Section/Section";
import SmallTitle from "../../../components/SmallTitle/SmallTitle";
import SoutenanceStatus from "./SoutenanceStatus";
import ThinBorder from "../../../components/ThinBorder/ThinBorder";
import StudentPageTitle from "../../../components/StudentPageTitle/StudentPageTitle";
import whiteDownload from "../../../img/white_download.svg";
import whiteEye from "../../../img/white_eye.svg";
import whiteCalendar from "../../../img/white_calendar.svg";
import whiteSave from "../../../img/white_save.svg";
import redPdf from "../../../img/red_pdf.svg";
import blueStudentCap from "../../../img/blue_student_cap.svg";
import type React from "react";
import { useState } from "react";
import NexusDropbox from "../../../components/NexusDropbox/NexusDropbox";

export default function SoutenanceCard() {
  const [_file, setFile] = useState<Array<File> | null>(null);

    function onDocumentDownloadClick(_event: React.MouseEvent) {
    }

    function onDocumentPreviewClick(_event: React.MouseEvent) {
    }

    function onGlobalPlanningClick(_event: React.MouseEvent) {
    }

    function onNotesSaveClick(_event: React.MouseEvent) {
    }

    function onTuteurSubmitClick(_event: React.MouseEvent) {
    }

    function onTeacherSubmitClick(_event: React.MouseEvent) {
    }

    return (
        <Section className="flex flex-col">
            <StudentPageTitle text="Soutenance de stage" svg={blueStudentCap}/>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col grow mx-4">
                    <p className="nexusGray mt-2 mb-5">Disponibilités</p>
                    <ThinBorder className="flex-col">
                        <SmallTitle text="Tuteur académique:"/>
                        <input
                            type="date"
                            className="font-semibold nexusGray mt-2 border rounded-xl p-1 border-gray-300"
                            name="AvailabilityDate"
                        />
                        <input
                            type="time"
                            className="font-semibold nexusGray mt-2 border rounded-xl p-1 border-gray-300"
                            name="AvailabilityTime"
                        />
                        <BasicButton
                            children={<>Enregistrer</>}
                            onClickFunction={(event: React.MouseEvent) =>
                                onTuteurSubmitClick(event)
                            }
                            className="flex flex-row items-center justify-center my-2"
                        />
                    </ThinBorder>
                    <ThinBorder className="flex-col">
                        <SmallTitle text="Enseignant référent:"/>
                        <input
                            type="date"
                            className="font-semibold nexusGray mt-2 border rounded-xl p-1 border-gray-300"
                            name="AvailabilityDate"
                        />
                        <input
                            type="time"
                            className="font-semibold nexusGray mt-2 border rounded-xl p-1 border-gray-300"
                            name="AvailabilityTime"
                        />
                        <BasicButton
                            children={<>Enregistrer</>}
                            onClickFunction={(event: React.MouseEvent) =>
                                onTeacherSubmitClick(event)
                            }
                            className="flex flex-row items-center justify-center my-2"
                        />
                    </ThinBorder>
                </div>
                <div className="flex flex-col grow mx-10">
                    <p className="nexusGray mt-2 mb-5">
                        Dépôt du rapport de Stage
                    </p>
                    <ThinBorder className="flex-col">
                        <div className="flex flex-row items-center">
                            <img src={redPdf} className="w-7 h-7 mr-2"/>
                            <div>
                                <p className="font-bold">Nom du fichier</p>
                                <p>Détails du fichier</p>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <BasicButton
                                children={
                                    <>
                                        <img
                                            src={whiteDownload}
                                            className="w-5 h-5 mr-2"
                                        />
                                        Télécharger
                                    </>
                                }
                                onClickFunction={(event: React.MouseEvent) =>
                                    onDocumentDownloadClick(event)
                                }
                                className="flex flex-row items-center justify-center my-2 mr-5 grow"
                            />
                            <BasicButton
                                children={
                                    <>
                                        <img
                                            src={whiteEye}
                                            className="w-5 h-5 mr-2"
                                        />
                                        Prévisualiser
                                    </>
                                }
                                onClickFunction={(event: React.MouseEvent) =>
                                    onDocumentPreviewClick(event)
                                }
                                className="flex flex-row items-center justify-center my-2"
                            />
                        </div>
                    </ThinBorder>
                    <NexusDropbox setFile={setFile}/>
                    <p className="font-semibold mt-2">Historique des dépôts</p>
                    <ul className="listVisits"></ul>
                </div>
                <div className="flex flex-col grow mx-4">
                    <p className="nexusGray mt-2 mb-5">
                        Informations complémentaires
                    </p>
                    <ThinBorder className="flex-col">
                        <p>Date prévue de soutenance</p>
                        <input
                            type="date"
                            disabled
                            className="border border-gray-300 rounded-xl pl-4 py-1 my-2"
                        />
                        <SoutenanceStatus type="not confirmed"/>
                    </ThinBorder>
                    <BasicButton
                        children={
                            <>
                                <img
                                    src={whiteCalendar}
                                    className="w-5 h-5 mr-2"
                                />
                                Voir planning global
                            </>
                        }
                        onClickFunction={(event: React.MouseEvent) =>
                            onGlobalPlanningClick(event)
                        }
                        className="flex flex-row items-center justify-center my-2"
                    />
                    <div className="flex flex-col grow">
                        <p className="font-semibold mt-2">Notes internes</p>
                        <textarea
                            className="font-semibold nexusGray mt-2 border rounded-xl p-1 border-gray-300"
                            name="VisitSummary"
                            required
                            placeholder="Notes..."
                            rows={4}
                        />
                    </div>
                    <BasicButton
                        children={
                            <>
                                <img src={whiteSave} className="w-5 h-5 mr-2"/>
                                Enregistrer
                            </>
                        }
                        onClickFunction={(event: React.MouseEvent) =>
                            onNotesSaveClick(event)
                        }
                        className="flex flex-row items-center justify-center my-2"
                    />
                </div>
            </div>
        </Section>
    );
}
