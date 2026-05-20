import Page from "../Page.tsx";
import Card from "../../components/Card/Card.tsx";
import AddCompanyForm from "../../components/Forms/AddCompanyForm.tsx";
import type {AddCompanyFormValues} from "../../components/Forms/AddCompanyFormValues.ts";
import {useMutation} from "@tanstack/react-query";
import {fetchEndpoint} from "../../utils/endpoint.ts";
import type {CompanyType} from "../../models/Company.ts";


export default function NewCompanyPage() {
    const createCompanyMutation = useMutation({
        mutationFn: async (data: AddCompanyFormValues) => {
            console.log("mutation payload:", data);

            const payload = await fetchEndpoint<CompanyType, { data: AddCompanyFormValues }>(
                "POST",
                "company",
                {
                    body: {data},
                },
            );
            console.log("mutation response:", payload);
            return payload;
        },
        onSuccess: (payload) => {
            console.log("company created:", payload);
        },
        onError: (error) => {
            console.log("mutation error:", error);
        },
    });

    function onClick() {

    }

    function onSubmit(data: AddCompanyFormValues) {
        console.log("submitting : ", data);
        createCompanyMutation.mutate(data);
    }

    return (
        <Page name={"Créer une entreprise"}>
            <Card
                className={`flex flex-col flex-wrap mr-16 ml-16 mt-8 border-2 border-gray-300`}
                onClick={onClick}>
                <AddCompanyForm
                    onSubmit={onSubmit}>
                </AddCompanyForm>
            </Card>
        </Page>
    )
}
