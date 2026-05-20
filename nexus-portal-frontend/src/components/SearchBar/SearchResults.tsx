import SearchResult from './SearchResult';

type SearchResultsProps = {
    results: SearchResultsType,
    companySelected: (company: SearchResultType) => void
};

export type SearchResultsType = SearchResultType[];


// export type SearchResultsType = string[];
export type SearchResultType = {
    id: string;
    name: string;
};

export default function SearchResults({results, companySelected}: SearchResultsProps) {
    return (
        <ul className="mt-2 bg-app-gray-light max-w-100 rounded-xl max-h-80 overflow-y-auto">
            {results.map((result, index) => {
                    return (
                        <div key={result.id}>
                            <SearchResult result={result} companySelected={companySelected}/>
                            {index !== results.length - 1 && (
                                <hr className="border-app-gray2"></hr>
                            )}
                        </div>
                    )
                }
            )}
        </ul>
    )
        ;
};