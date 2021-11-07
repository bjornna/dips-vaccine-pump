import {Column} from "./Column";

export interface ResultSet {
    _type: string;
    meta: Record<string, string>;
    name: string | null;
    totalResults: number;
    columns: Column[];
    rows: any[][];
}
