import BasicPopup from "./BasicPopup.tsx";
import PreferencesForm from "../Forms/PreferencesForm.tsx";
import type {PreferencesFormValues} from "../Forms/PreferenceFormValues.ts";

interface TutorPopupProps {
    isOpen: boolean
    title: string;
    onSubmit: (formvalue: PreferencesFormValues) => void;
    close: () => void;
}

/*
utilisation :
    const [isOpen, setIsOpen] = useState(true);

    <PreferencePopup
        isOpen={isOpen}
        title="Préférences"
        close={() => {
            setIsOpen(false)
        }}
        onSubmit={(formValue) => {
            console.log(formValue)
        }}
    >
    </PreferencePopup>
 */
export default function PreferencePopup({isOpen, title, close, onSubmit}: TutorPopupProps) {
    return (
        <BasicPopup title={title} isOpen={isOpen} close={close}>
            <PreferencesForm onSubmit={onSubmit}/>
        </BasicPopup>
    );
}