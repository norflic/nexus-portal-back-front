import BasicPopup from "./BasicPopup";
import type {User} from "../../models/User.ts";

interface ContactPopupProps {
    isOpen: boolean;
    close: () => void;
    user: User | null;
}

export default function ContactPopup({
                                         isOpen,
                                         close,
                                         user,
                                     }: ContactPopupProps) {
    return (
        <BasicPopup
            title="Informations de contact"
            isOpen={isOpen}
            close={close}
            className="w-96"
        >
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                    <label className="font-semibold text-gray-700">
                        Email :
                    </label>
                    <div className="flex items-center rounded-lg">
                        <a
                            href={`mailto:${user?.email}`}
                            className="text-blue-600 hover:underline break-all"
                        >
                            {user?.email}
                        </a>
                    </div>

                    <label className="font-semibold text-gray-700">
                        Tél :
                    </label>
                    <div className="flex items-center rounded-lg">
                        <a
                            href={`tel:${user?.tel}`}
                            className="text-blue-600 hover:underline"
                        >
                            {user?.tel}
                        </a>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={close}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </BasicPopup>
    );
}






