export interface ResultInterface<T> {
    timestamp: string;
    code: number;
    message: string;
    data: T;
    error?: string | object;
}
