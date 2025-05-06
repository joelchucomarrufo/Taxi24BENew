export class BaseResponse<T> {
    status: 'success' | 'error';
    message: string;
    data: T | null;

    constructor(params: {
        status: 'success' | 'error';
        message: string;
        data?: T | null;
    }) {
        this.status = params.status;
        this.message = params.message;
        this.data = params.data ?? null;
    }
}