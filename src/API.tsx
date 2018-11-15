import { Configuration, DefaultApi, ErrorMessage, FetchAPI, Middleware } from './gen/api';

class ErrorMiddleware implements Middleware {
    async post(fetch: FetchAPI, url: string, init: RequestInit, response: Response) {
        if (response.status === 500) {
            throw {
                errorMessage: "Server error",
                reason: "Server error",
                status: 500,
                userErrorMessage: "Server error"
            } as ErrorMessage;
        } else if (response.status < 200 || response.status >= 300) {
            let error = {
                errorMessage: "Couldn't parse error",
                reason: "Unknown",
                status: 400,
                userErrorMessage: "An unkown error occured"
            } as ErrorMessage;
            try {
                // TypeScript can only check at compile time, which it doesn't do for thrown exceptions,
                // so we've got to do some manual checking here... It's ugly as hell, but what can you do?
                const parsedError = await response.json() as any as ErrorMessage;
                if ('status' in parsedError && 'reason' in parsedError) {
                    error = parsedError;
                }
            } catch {
                console.error("failed to parse error")
            }
            console.log("error: ", error)
            throw error;
        } else {
            return response
        }
    }
}

export const api = new DefaultApi(new Configuration({ basePath: 'http://127.0.0.1:8080/v0.1', middleware: [new ErrorMiddleware()] }));