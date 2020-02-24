export interface NotificationEntry {
    email: string;
    baseUrl: string;
    sharedSpaceId: number;
    workspaceId: number;
    entity: string;
    query: string;
    title: string;
    fields: any;
    time?: string;
    style?: "table";
    rank?: number;
}


