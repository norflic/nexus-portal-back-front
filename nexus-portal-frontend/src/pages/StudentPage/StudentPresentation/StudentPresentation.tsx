import BasicButton from "../../../components/Buttons/BasicButton";
import Section from "../../../components/Section/Section";
import StudentStatusDetail from "./StudentStatusDetail";
import ContactPopup from "../../../components/Popups/ContactPopup";
import whitePhone from "../../../img/white_phone.svg";
import whiteBuilding from "../../../img/white_building.svg";
import {useContext, useState} from "react";
import {NexusContext} from "../../../NexusContextProvider";

export default function StudentPresentation() {
  const user = useContext(NexusContext).user;
    const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  function onContactClick(event: React.MouseEvent) {
      event.preventDefault();
      setIsContactPopupOpen(true);
  }
  function onContractClick(event: React.MouseEvent) {
    return event; //TODO
  }

  return (
      <>
          <Section className="studentPresentation">
              <div className="flex flex-row">
                  <img
                      className="rounded-full w-25 h-25"
                      src="../src/img/jadouze.jpeg"
                      alt="photo de profil"
                  />
                  <div className="flex flex-col ml-5">
                      <h2 className="font-bold text-xl studentName">namePlaceHolder</h2>
                      <p className="font-semibold nexusGray mt-2">
                          class parcours - Status (placeholder)
                      </p>
                      <div className="flex mt-2">
                          <StudentStatusDetail type="ongoing"/>
                          <p className="font-light text-sm ml-5 pt-3 text-gray-600">
                              Placeholder dates de l'alternance
                          </p>
                      </div>
                  </div>
                  <div className="ml-auto flex">
                      <BasicButton
                          children={
                              <>
                                  <img src={whitePhone} className="w-5 h-5 mr-2"/>
                                  Contact
                              </>
                          }
                          onClickFunction={(event: React.MouseEvent) => onContactClick(event)}
                          className="flex flex-row items-center h-10 mr-5"
                      />
                      <BasicButton
                          children="Voir Contrat"
                          onClickFunction={(event: React.MouseEvent) =>
                              onContractClick(event)
                          }
                          className="h-10"
                      />
                  </div>
              </div>
              <div className="bg-gray-50 rounded-xl mt-10 mb-5 flex flex-row">
                  <div className="m-5 flex flex-col justify-center">
                      <div className="bg-blue-700 rounded-xl p-3">
                          <img src={whiteBuilding} className="w-7 h-7"/>
                      </div>
                  </div>
                  <div className="flex flex-col m-2">
                      <p className="font-bold my-1">Placeholder nom de l'entreprise</p>
                      <p className="text-gray-700 my-1">Placeholder nom du poste</p>
                      <p className="font-light text-gray-600 my-1">
                          Placeholder nom de la mission
                      </p>
                  </div>
              </div>
          </Section>
          <ContactPopup
              isOpen={isContactPopupOpen}
              close={() => setIsContactPopupOpen(false)}
              user={user}
          />
      </>
  );
}
