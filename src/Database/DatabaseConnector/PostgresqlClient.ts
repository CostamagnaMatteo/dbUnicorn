import { Client, ClientConfig } from 'pg'
import { ClientConnectionOpenError } from '../Execption/ClientConnector';
import { IDatabaseClient } from './IDatabaseClient';
import { QueryResult } from '../QueryModel/QueryResult';

export class PostgresqlClient implements IDatabaseClient {
    GetDatabaseList(): Promise<QueryResult> {
        throw new Error('Method not implemented.');
    }
    GetSchemaList(): Promise<QueryResult> {
        throw new Error('Method not implemented.');
    }
    GetTableList(): Promise<QueryResult> {
        throw new Error('Method not implemented.');
    }
    ExecuteQuery(query: string): Promise<QueryResult> {
        throw new Error('Method not implemented.');
    }

    private _client: Client | null = null;

    async Connect(clientConfig: IClientConfiguration): Promise<void> {

        if(this._client != null) throw new ClientConnectionOpenError()

        
        this._client = new Client(clientConfig as ClientConfig)

        //TODO: Handle error while try connecting to the server
        await this._client.connect()
    }
}