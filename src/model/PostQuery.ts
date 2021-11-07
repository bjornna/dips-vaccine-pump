import {PartitionBy} from "./PartitionBy";
import {TagScope} from "./TagScope";
import {QueryParameters} from "./QueryParameters";

export interface PostQuery {
    aql: string;
    offset?: number;
    fetch?: number;
    queryParameters?: QueryParameters;
    compositionUids?: string[];
    ehrIds?: string[];
    tagScope?: TagScope;
    partitionBy?: PartitionBy;
    correlationId?: string;
}
