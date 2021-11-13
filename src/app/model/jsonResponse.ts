
export interface JsonResponse<T> {
    success: boolean;
    message: any[];
    data: T;
}
