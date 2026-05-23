import type { OfferWithTags } from "../../../models/Offer";
import OfferCard from "../OfferCard/OfferCard";

type OfferListProps = {
    // TODO CHANGE TYPE
    offers: OfferWithTags[];
    selectedOffer: number | undefined;
    setSelectedOffer: (offer: number | undefined) => void;
    className?: string;
};

export default function OfferList({
    offers,
    selectedOffer,
    setSelectedOffer,
    className = "",
}: OfferListProps) {
    /**
     * Select or deselect based on if it's selected
     */
    const onClickOnCard = (
        event: React.MouseEvent,
        id: number,
        selectedOffer: number | undefined,
    ) => {
        event.stopPropagation();
        setSelectedOffer(id != selectedOffer ? id : undefined);
    };

    return (
        <div
            className={`flex flex-col items-stretch flex-wrap flex-1 gap-8 m-8 min-h-[80dvh] ${className}`}
        >
            {offers.length != 0 ? (
                offers.map((offer) => (
                    <OfferCard
                        offer={offer}
                        key={offer.id}
                        isSelected={selectedOffer == offer.id}
                        onClick={(event) => onClickOnCard(event, offer.id, selectedOffer)}
                    />
                ))
            ) : (
                <span className="p-2 text-xl">Aucune offre trouvée</span>
            )}
        </div>
    );
}

