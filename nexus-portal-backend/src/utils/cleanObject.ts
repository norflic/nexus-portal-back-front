// key?: T | undefined => key?: T
export type FilterUndefinedFromUnion<T> = T extends {}
    ? {
          [K in keyof T]: Exclude<T[K], undefined>;
      }
    : Exclude<T, undefined>;

// Same as FilterUndefinedFromUnion but recursively
export type DeepFilterUndefinedFromUnion<T> = T extends {}
    ? {
          [K in keyof T]: T[K] extends {}
              ? DeepFilterUndefinedFromUnion<T[K]>
              : FilterUndefinedFromUnion<T[K]>;
      }
    : Exclude<T, undefined>;

export const cleanObject = <T extends {}>(object: T): FilterUndefinedFromUnion<T> => {
    return Object.fromEntries(
        Object.entries(object).filter(([_, v]) => v !== undefined),
    ) as FilterUndefinedFromUnion<T>;
};

export const deepCleanObject = <T extends {}>(object: T): DeepFilterUndefinedFromUnion<T> => {
    const recursiveClean = (v: any) => {
        if (v == undefined) return false;

        if (typeof v == "object") {
            Object.entries(v).filter(([_, childV]) => recursiveClean(childV));
        }

        return true;
    };

    return Object.fromEntries(
        Object.entries(object).filter(([_, v]) => recursiveClean(v)),
    ) as DeepFilterUndefinedFromUnion<T>;
};

