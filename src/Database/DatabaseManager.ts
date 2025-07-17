import { IDatabaseClient } from "./DatabaseConnector/IDatabaseClient";

export class DatabaseManager {

    private _savedDatabase: {[key: number]: any};
    private _openDatabase: { [key: number]: IDatabaseClient };

    OpenDatabaseConnection(connectionId: number): void {

    }
    /*
    DisposeAllDatabase(): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve(Promise.all(Object.entries(this._openDatabase).forEach( entry => entry[1].Dispose())));
        })   
    }
    */
}