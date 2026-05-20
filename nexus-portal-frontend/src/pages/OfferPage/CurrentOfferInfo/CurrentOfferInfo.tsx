import { useCallback, useState } from "react";
import { useOutletContext } from "react-router";
import type { AppRouterContext } from "../../../App";
import Bookmark from "../../../components/Bookmark/Bookmark";
import BasicButton from "../../../components/Buttons/BasicButton";
import Card from "../../../components/Card/Card";
import BasicPopup from "../../../components/Popups/BasicPopup";
import type { OfferWithTags } from "../../../models/Offer";
import OfferTagList from "../OfferTagList/OfferTagList";

type CurrentOfferCommonProps = {
    offer: OfferWithTags;
    className?: string;
};

type CurrentOfferInfoProps = CurrentOfferCommonProps & {
    setSelectedOffer: (offer: number | undefined) => void;
};

type _CurrentOfferInfoProps = CurrentOfferCommonProps & { hasTitle: boolean };

function _CurrentOfferInfo({ offer, hasTitle, className = "" }: _CurrentOfferInfoProps) {
    const [isSaved, setIsSaved] = useState(false);

    if (!offer) return <p>Error</p>;

    console.log(offer);

    const openLink = useCallback(() => {
        const a = document.createElement("a");
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.href = offer.offer_link;

        a.click();
    }, [offer]);

    return (
        <>
            <div className={`flex flex-row ${className}`}>
                {hasTitle ? (
                    <h2 className="max-w-2/3 text-balance text-3xl">{offer.title}</h2>
                ) : (
                    <OfferTagList offer={offer} sizeCap={3} shouldOpen={true} />
                )}
                <Bookmark
                    isSaved={isSaved}
                    onClick={() => setIsSaved(!isSaved)}
                    className="ml-auto space-x-8"
                />
            </div>
            {hasTitle && <OfferTagList offer={offer} sizeCap={3} shouldOpen={true} />}
            <p className="text-lg border-b-2 w-fit px-1">
                {offer.company_name} - {offer.address}
            </p>
            <BasicButton className="border-black border mr-auto p-1" onClickFunction={openLink}>
                Postuler
            </BasicButton>
            <p>{offer.description}</p>
        </>
    );
}

export default function CurrentOfferInfo({
    offer,
    className = "",
    setSelectedOffer,
}: CurrentOfferInfoProps) {
    const appContext = useOutletContext() as AppRouterContext;
    const [isOpen, setIsOpen] = useState(true);

    const localClassName = "flex flex-col gap-4 max-h-[85dvh] box-border";

    return appContext.isPageLarge ? (
        <Card
            className={`ml-auto mr-20 sticky top-30 border-gray-300 w-1/2 min-w-1/2 current-offer-appear box-border ${className} ${localClassName}`}
            onClick={(event) => event.stopPropagation()}
        >
            <_CurrentOfferInfo offer={offer} className={`${className}`} hasTitle={true} />
        </Card>
    ) : (
        isOpen && (
            <BasicPopup
                title={offer.title}
                isOpen={isOpen}
                close={() => {
                    setIsOpen(false);
                    setSelectedOffer(undefined);
                }}
                className="max-w-4/5 min-h-1/3"
            >
                <div className={`${localClassName}`}>
                    <_CurrentOfferInfo offer={offer} className={className} hasTitle={false} />
                </div>
            </BasicPopup>
        )
    );
}

