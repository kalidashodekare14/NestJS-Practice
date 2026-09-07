
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log('🔥 HttpExceptionFilter is running');

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const exceptionResponse = exception.getResponse();

        response
            .status(status)
            .json({
                success: false,
                statusCode: status,
                message:
                    typeof exceptionResponse === 'string'
                        ? exceptionResponse
                        : (exceptionResponse as any).message,
                path: request.url,
                timestamp: new Date().toISOString(),
            });
    }
}
