export interface IApiResponse {
    data: any;
    error: string | undefined;
    errorCode: number;
}
export const ApiResponse = {
    OK(data: any): IApiResponse {
        return  {
            data,
            error: undefined,
            errorCode: 0,
        };
    },
    ERROR(error: string, errorCode: number): IApiResponse {
        return {
            data: undefined,
            error,
            errorCode,
        };
    }
}