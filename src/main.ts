import { app, BrowserWindow } from 'electron';
import { Sqlite3Client } from './Database/DatabaseConnector/Sqlite3Client';
import { IDatabaseClient } from './Database/DatabaseConnector/IDatabaseClient';

const pgClientConfig: IClientConfiguration = {
  user: "postgres",
  password: "postgres_pwd",
  host:"localhost",
  port: 5433,
  database: "jada",
  filePath: "./asset/dbUnicorn_database.sqlite"
};

let dbConnector: IDatabaseClient;

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js')
    }
  });
  win.webContents.openDevTools();
  
  //dbConnector = new PostgresqlClient();
  dbConnector = new Sqlite3Client();
  dbConnector.Connect(pgClientConfig);

  const result = await dbConnector.ExecuteQuery("select * from databaseConnectionSettings");
  console.log(result.fields);
  result.rows.forEach((element: any) => {
    console.log(element);
  });
  win.loadFile('index.html');
}

app.whenReady().then(async () => {
  await createWindow();

  app.on('activate', async () => {    
    if (BrowserWindow.getAllWindows().length === 0) await createWindow();
    
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
