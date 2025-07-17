import { QueryResult } from "../QueryModel/QueryResult";

type PromiseQueryResult = Promise<QueryResult>;

export interface IDatabaseClient {
    
    Connect(clientConfig: IClientConfiguration): Promise<void>;
    Dispose(): Promise<void>;

    ExecuteQuery(query: string): PromiseQueryResult;

    GetDatabaseList(): PromiseQueryResult;
    GetSchemaList(): PromiseQueryResult;
    GetTableList(): PromiseQueryResult;
}