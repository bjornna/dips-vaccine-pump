import {Tag} from "./Tag";
import {TagScope} from "./TagScope";
import {PostQuery} from "./PostQuery";


export class QueryBuilder {
    private query: PostQuery;
    private tagScope: TagScope | null;
    constructor(aql: string) {
        this.query = {
            aql,
        };
        this.tagScope = null;
    }
    public addTag(tag: string, value: string) {
        const t: Tag = {
            tag,
            values: [value]
        };
        if (this.tagScope == null) {
            this.tagScope = {
                tags: [t]
            };
        } else {
            this.tagScope.tags.push(t);
        }
    }
    public build(): PostQuery {
        if (this.tagScope != null) {
            this.query.tagScope = this.tagScope;
        }
        return this.query;
    }
}
