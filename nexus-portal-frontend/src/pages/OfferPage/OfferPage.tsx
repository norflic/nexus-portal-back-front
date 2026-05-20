import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { OfferWithTags } from "../../models/Offer";
import { fetchEndpoint, QUERY_KEYS } from "../../utils/endpoint";
import Page from "../Page";
import CurrentOfferInfo from "./CurrentOfferInfo/CurrentOfferInfo";
import OfferList from "./OfferList/OfferList";
import "./OfferPage.css";

type OfferPageProps = {};

export default function OfferPage({}: OfferPageProps) {
    // TODO CHANGE TYPE

    const [selectedOffer, setSelectedOffer] = useState<number | undefined>(undefined);

    const onClickOutside = () => {
        setSelectedOffer(undefined);
    };

    const {
        data: offers,
        isError,
        error,
        isLoading,
    } = useQuery({
        queryKey: [QUERY_KEYS.OFFERS],
        queryFn: () => fetchEndpoint<OfferWithTags[]>("GET", "offers"),
    });

    if (isLoading) return <span>Chargement...</span>;

    if (isError) return <span>{error.message}</span>;

    return (
        offers && (
            <Page name={"Offres"}>
                <div className="flex flex-row box-border" onClick={onClickOutside}>
                    <OfferList
                        offers={offers}
                        selectedOffer={selectedOffer}
                        setSelectedOffer={setSelectedOffer}
                        className="mr-10"
                    />
                    {selectedOffer != undefined && (
                        <CurrentOfferInfo
                            offer={offers.find((offer) => offer.id == selectedOffer)!}
                            setSelectedOffer={(offer: number | undefined) =>
                                setSelectedOffer(offer)
                            }
                        />
                    )}
                </div>
            </Page>
        )
    );
}

