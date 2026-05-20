import BasicPopup from "./BasicPopup.tsx";
import AddDefenseForm from "../Forms/AddDefenseForm.tsx";
import type {AddDefenseFormValues} from "../Forms/AddDefenseFormValues.ts";
import type {CompanyType} from "../../models/Company.ts";
import type {User} from "../../models/User.ts";

interface AjoutDefensePopupProps {
    isOpen: boolean;
    title: string;
    close: () => void;
    onSubmit: (formValue: AddDefenseFormValues) => void;
    companies: CompanyType[];
    users: User[];
    isSubmitting?: boolean;
}

export default function AjoutDefensePopup({
                                              isOpen,
                                              title,
                                              close,
                                              onSubmit,
                                              companies,
                                              users,
                                              isSubmitting = false,
                                          }: AjoutDefensePopupProps) {
    return (
        <BasicPopup title={title} isOpen={isOpen} close={close} className="w-[720px]">
            <AddDefenseForm
                onSubmit={onSubmit}
                companies={companies}
                users={users}
                isSubmitting={isSubmitting}
            />
        </BasicPopup>
    );
}

