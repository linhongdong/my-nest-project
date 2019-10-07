export interface ResultInterface<T> {
    timestamp: string;
    statusCode: number;
    message: string;
    data: T;
    error?: string | object;
}
