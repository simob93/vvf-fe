export interface VVFAction {
    type: string;
    payload?: any;
    message?: string[]
}

export interface AppFetchState {
    isFetching?: boolean,
    success: boolean,
    message: string[],
    data: any,
    msg?: any[],
    error: boolean,
    errorMsg: string[],
    total?:number
}

export interface messageState {
    success: boolean,
    message: string[]
}

export interface LoaderState {
    show: boolean;
}

export interface MessageState {
    success: boolean;
    message: string[] | string;
    showDialog: boolean;   
}
