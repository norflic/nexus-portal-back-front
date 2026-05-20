import Page from "../Page.tsx";
import MyCalendar from "./MyCalendar";
import 'react-calendar/dist/Calendar.css';
import React, {useState} from "react";
import type {DefenseCascade} from "../../models/Defense.ts";
import DefenseList from "./DefenseList.tsx";
import DetailedDefenseCard from "./DetailedDefenseCard.tsx";
import BasicButton from "../../components/Buttons/BasicButton.tsx";
import AjoutDefensePopup from "../../components/Popups/AjoutDefensePopup.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchEndpoint} from "../../utils/endpoint.ts";
import type {CompanyType} from "../../models/Company.ts";
import type {User} from "../../models/User.ts";
import type {AddDefenseFormValues} from "../../components/Forms/AddDefenseFormValues.ts";

export default function DefenseManager() {
    const [defenses, setDefenses] = useState<DefenseCascade[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedDefense, setSelectedDefense] = useState<DefenseCascade | null>(null);
    const [isCreationPopupOpen, setIsCreationPopupOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const {data: companies = []} = useQuery({
        queryKey: ["companies"],
        queryFn: () => fetchEndpoint<CompanyType[]>("GET", "companies"),
    });

    const {data: users = []} = useQuery({
        queryKey: ["users"],
        queryFn: () => fetchEndpoint<User[]>("GET", "users"),
    });

    const createDefenseMutation = useMutation({
        mutationFn: (data: AddDefenseFormValues) =>
            fetchEndpoint<DefenseCascade, { data: AddDefenseFormValues }>("POST", "defense", {
                body: {data},
            }),
        onSuccess: async () => {
            setIsCreationPopupOpen(false);
            await queryClient.invalidateQueries({queryKey: ["defenses"]});
        },
    });

    const onSubmitDefense = (data: AddDefenseFormValues) => {
        createDefenseMutation.mutate(data);
    };

    return (
        <Page name={"Gestion de soutenances"}>
            <div className="flex flex-row bg-app-gray-background p-8 w-full h-full">
                <div className="flex flex-col  gap-4">
                    <MyCalendar
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setDefenses={setDefenses}
                    />
                    <DetailedDefenseCard selectedDefense={selectedDefense}/>
                </div>
                <div className="">
                    <div className="flex justify-end">
                        <BasicButton
                            children={<>Creer une soutenance</>}
                            onClickFunction={(_event: React.MouseEvent) =>
                                setIsCreationPopupOpen(true)
                            }
                            className="justify-center m-2 ml-auto"
                        />
                    </div>

                    <AjoutDefensePopup
                        isOpen={isCreationPopupOpen}
                        title={"Creation d'une soutenance"}
                        close={() => setIsCreationPopupOpen(false)}
                        onSubmit={onSubmitDefense}
                        companies={companies}
                        users={users}
                        isSubmitting={createDefenseMutation.isPending}
                    />

                    <DefenseList
                        defenses={defenses}
                        selectedDefense={selectedDefense}
                        setSelectedDefense={setSelectedDefense}/>
                </div>
            </div>
        </Page>
    );
}
