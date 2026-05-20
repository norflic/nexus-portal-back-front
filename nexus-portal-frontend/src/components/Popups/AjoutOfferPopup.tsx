import BasicPopup from "./BasicPopup.tsx";
import AddOfferForm from "../Forms/AddOfferForm.tsx";
import type {AddOfferFormValues} from "../Forms/AddOfferFormValues.ts";

interface AjoutEmployePopupProps {
    isOpen: boolean
    title: string;
    onSubmit: (formvalue: AddOfferFormValues) => void;
    close: () => void;
}

export default function AjoutOfferPopup({isOpen, title, close, onSubmit}: AjoutEmployePopupProps) {
    return (
        <BasicPopup title={title} isOpen={isOpen} close={close}>
            <AddOfferForm onSubmit={onSubmit}/>
        </BasicPopup>
    );
}