interface IClientConfiguration {
    user: string | null;
    password: string | null;
    
    filePath: string | null;
    host: string | null;
    port: number | null;
    database: string | null;
}