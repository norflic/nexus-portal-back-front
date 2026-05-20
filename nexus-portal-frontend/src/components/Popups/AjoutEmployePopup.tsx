import BasicPopup from "./BasicPopup.tsx";
import AddEmployeeForm from "../Forms/AddEmployeeForm.tsx";
import type {AddEmployeeFormValues} from "../Forms/AddEmployeeFormValues.ts";

interface AjoutEmployePopupProps {
    isOpen: boolean
    title: string;
    onSubmit: (formvalue: AddEmployeeFormValues) => void;
    close: () => void;
}

export default function AjoutEmployePopup({isOpen, title, close, onSubmit}: AjoutEmployePopupProps) {
    return (
        <BasicPopup title={title} isOpen={isOpen} close={close}>
            <AddEmployeeForm onSubmit={onSubmit}/>
        </BasicPopup>
    );
}