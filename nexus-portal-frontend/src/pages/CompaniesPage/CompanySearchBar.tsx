import { useEffect, useState, type SetStateAction } from "react";
import SearchResults, {
    type SearchResultsType,
    type SearchResultType,
} from "../../components/SearchBar/SearchResults.tsx";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/endpoint.ts";

type CompanySearchBarProps = {
    companySelected: (company: SearchResultType) => void;
    className?: string;
    setSearchValue: React.Dispatch<SetStateAction<string>>;
};

function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [delay, value]);

    return debouncedValue;
}

export default function CompanySearchBar({ companySelected, className }: CompanySearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    const { data: searchResults } = useQuery({
        queryKey: [QUERY_KEYS.COMPANY_SEARCH, debouncedSearchTerm],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/companies/search/?name=${encodeURIComponent(debouncedSearchTerm)}`,
            );
            const payload = (await response.json()) as {
                data?: Array<{ id: string | number; name: string }>;
                error?: string;
            };

            if (!response.ok || payload.error) {
                throw new Error(payload.error ?? "Erreur lors de la recherche d'entreprises");
            }

            return ProcessSearchResults(payload.data ?? []);
        },
        enabled: debouncedSearchTerm.trim().length > 0,
        retry: false,
    });

    function ProcessSearchResults(result: Array<{ id: string | number; name: string }>) {
        const processedResults: SearchResultType[] = [];
        for (const item of result) {
            const id = item.id.toString();
            processedResults.push({ id: id, name: item.name }); // Extraire uniquement le nom de l'entreprise
        }
        return processedResults;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={`${className}`}>
            <label htmlFor="search_bar">recherche d'entreprise : </label>
            <input
                className={`border rounded-full pl-2 border-[#CACACA]`}
                type="text"
                name="search_bar"
                placeholder="goulou goulou"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <SearchResults
                results={searchResults ?? []}
                companySelected={companySelected}
            ></SearchResults>
        </div>
    );
}

