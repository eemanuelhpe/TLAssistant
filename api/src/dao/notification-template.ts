export interface NotificationTemplate {
    identifier:string;
    baseUrl: string;
    sharedSpaceId: number;
    workspaceId: number;
    entity: string;
    query: string;
    title: string;
    fields: any;
    style?: "table";
    sqlTransformer?:string;
    sqlCondition?:string;
    type:string;
}