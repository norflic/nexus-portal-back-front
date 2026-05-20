import type {SearchResultType} from "./SearchResults.tsx";

type SearchResultProps = {
    result: SearchResultType;
    companySelected: (company: SearchResultType) => void;
    className?: string;
};

export default function SearchResult({result, companySelected, className = ""}: SearchResultProps) {
    return (
        <>
            <li
                className={`rounded-xl hover:bg-app-gray2 pl-2 ${className}`}
                onClick={() => {
                    companySelected(result)
                }}
            >{result.name}
            </li>
        </>

    );
};