import * as sqlite3 from 'sqlite3';
import { ClientConnectionOpenError } from '../Execption/ClientConnector';
import { QueryResult } from '../QueryModel/QueryResult';
import {IDatabaseClient} from './IDatabaseClient';

export class Sqlite3Client implements IDatabaseClient {
    Dispose(): Promise<void> {
        if(this._client == null) throw Error();

        return new Promise((resolve, reject) => {
            this._client!.close( err => {
                if(err) reject(err);
                else resolve();
            })
        })
        
    }
    GetDatabaseList(): Promise<QueryResult> {
        return new Promise((resolve, _) => {
            resolve({
                fields: [],
                rows: []
            });
        })
    }
    GetSchemaList(): Promise<QueryResult> {
        return new Promise((resolve, _) => {
            resolve({
                fields: [],
                rows: []
            });
        })
    }
    GetTableList(): Promise<QueryResult> {
        return this.ExecuteQuery("select * from sqlite_sequence")
    }
    ExecuteQuery(query: string): Promise<QueryResult> {
        return new Promise((resolve, reject) => {
            this._client?.all(query, (error, res) => {
                if(error) reject(error);
                else resolve({
                    fields: (res.length > 0 ? Object.keys(res[0] as {}) : [] ),
                    rows: res
                });
            });
        })
        
    }

    private _client :sqlite3.Database | null = null;
    Connect(clientConfig: IClientConfiguration): Promise<void> {

        if(this._client != null) throw new ClientConnectionOpenError();
        //TODO: Handle error while try connecting to the server
        this._client = new sqlite3.Database(clientConfig.filePath ?? "", err => {console.error(err)});
        
        return new Promise(()=>{});   
    }

}