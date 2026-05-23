import {useState} from "react";
import Bookmark from "../../../components/Bookmark/Bookmark";
import Card from "../../../components/Card/Card";
import type {OfferWithTags} from "../../../models/Offer";
import OfferTagList from "../OfferTagList/OfferTagList";

type OfferCardProps = {
    // TODO CHANGE TYPE
    offer: OfferWithTags;
    isSelected: boolean;
    onClick?: (event: React.MouseEvent) => void;
};

export default function OfferCard({ offer, isSelected, onClick = () => {} }: OfferCardProps) {
    const selectedBorderClass = isSelected ? "border-blue-900" : "border-gray-300";

    const sinceDate = (dateString: string | Date): string => {
        const date = new Date(dateString);
        const difference = Date.now() - date.getTime();

        const MS_IN_YEAR = 31536000000;
        if (difference >= MS_IN_YEAR) {
            return "plus d'un ans";
        }

        const MS_IN_MONTH = 2592000000;
        if (difference >= MS_IN_MONTH) {
            const monthCount = Math.round(difference / MS_IN_MONTH);
            return `${monthCount} mois`;
        }

        const MS_IN_DAY = 86400000;
        if (difference >= MS_IN_DAY) {
            const dayCount = Math.round(difference / MS_IN_DAY);
            return `${dayCount} jour${dayCount > 1 ? "s" : ""}`;
        }

        const MS_IN_AN_HOUR = 3600000;
        if (difference >= MS_IN_AN_HOUR) {
            const hourCount = Math.round(difference / MS_IN_AN_HOUR);
            return `${hourCount} heure${hourCount > 1 ? "s" : ""}`;
        }

        const MS_IN_A_MINUTE = 60000;
        if (difference >= MS_IN_A_MINUTE) {
            const minuteCount = Math.round(difference / MS_IN_A_MINUTE);
            return `${minuteCount} minute${minuteCount > 1 ? "s" : ""}`;
        }

        return "moins d'une minute";
    };

    const [isSaved, setIsSaved] = useState(false);

    const onBookmarkClick = () => {
        setIsSaved(!isSaved);
    };

    // TODO: devra se baser sur un status qui est lié à l'utilisateur
    // Fonctionnalité à implémenter: offer.status n'existe pas encore
    // const shadow = "";
    // const offerText = "";
    // const offerColor = "";
    // switch (offer.status) {
    //     case "refused":
    //         offerText = "Refusé";
    //         shadow = "shadow-red-100";
    //         offerColor = "text-red-500";
    //         break;
    //     case "waiting":
    //         offerText = "En attente...";
    //         shadow = "shadow-yellow-100";
    //         offerColor = "text-yellow-500";
    //         break;
    //     case "interview":
    //         offerText = "Entretien prévu !";
    //         shadow = "shadow-blue-100";
    //         offerColor = "text-blue-500";
    //         break;
    //     case "accepted":
    //         offerText = "Accepté !";
    //         shadow = "shadow-green-100";
    //         offerColor = "text-green-500";
    //         break;
    // }

    return (
        <Card
            className={`2xl:w-120 xl:w-96 lg:w-72 w-120 min-h-44 ml-16 scale-down-on-click border-2 ${selectedBorderClass}`}
            onClick={onClick}
        >
            <div className="flex flex-row grow">
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-xl">{offer.title}</h3>
                        <Bookmark
                            className="w-6 h-6 ml-auto mr-1 justify-self-end"
                            isSaved={isSaved}
                            onClick={onBookmarkClick}
                        />
                    </div>
                    <OfferTagList offer={offer} sizeCap={3} shouldOpen={false} />
                    <p className="text-sm">{`${offer.company_name} - ${offer.address}`}</p>
                    <div className="flex w-full flex-row justify-between">
                        <p className="text-sm text-gray-400">{`${offer.salary}€ - ${
                            offer.week_amount
                        } semaine${offer.week_amount > 1 ? "s" : ""} | il y a ${sinceDate(offer.date_posted)}`}</p>
                        {/* Status display coming soon: {offer.status && <p className={`self-end ${offerColor}`}>{offerText}</p>} */}
                    </div>
                </div>
            </div>
        </Card>
    );
}

