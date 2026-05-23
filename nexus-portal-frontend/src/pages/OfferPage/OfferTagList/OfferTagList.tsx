import { useState } from "react";
import BasicPopup from "../../../components/Popups/BasicPopup";
import Tag from "../../../components/Tag/Tag";
import type { OfferWithTags } from "../../../models/Offer";

type OfferTagListProps = {
    offer: OfferWithTags;
    className?: string;
    sizeCap?: number;
    shouldOpen: boolean;
};

type _TagListProps = Omit<OfferTagListProps, "shouldOpen"> & {
    open?: () => void;
};

export default function OfferTagList({
    offer,
    className = "",
    sizeCap = -1,
    shouldOpen,
}: OfferTagListProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <_TagList
                offer={offer}
                className={className}
                sizeCap={sizeCap}
                open={shouldOpen ? () => setIsOpen(true) : undefined}
            />
            {sizeCap != -1 && isOpen && (
                <BasicPopup
                    title={`Tags de l'offre`}
                    canKeyboardClose={false}
                    isOpen={isOpen}
                    close={() => {
                        setIsOpen(false);
                    }}
                >
                    <_TagList offer={offer} sizeCap={-1} />
                </BasicPopup>
            )}
        </div>
    );
}

const _TagList = ({ offer, className = "", sizeCap = -1, open }: _TagListProps) => {
    return (
        <div className={`flex flex-row flex-wrap gap-2 pl-2 ${className}`}>
            {offer.tags
                .filter((_, i) => i < sizeCap || sizeCap == -1)
                .map((tag) => (
                    <Tag key={tag.id} tagColor={"gray"}>
                        {tag.name}
                    </Tag>
                ))}
            {open
                ? sizeCap != -1 &&
                  offer.tags.length > sizeCap && (
                      <button
                          className={
                              "self-end w-6 h-6 text-center bg-app-blue rounded text-white border-black border"
                          }
                          onClick={(event: React.MouseEvent) => {
                              event.stopPropagation();
                              if (open) open();
                          }}
                      >
                          +
                      </button>
                  )
                : sizeCap < offer.tags.length && sizeCap != -1 && <Tag tagColor={"gray"}>...</Tag>}
        </div>
    );
};

