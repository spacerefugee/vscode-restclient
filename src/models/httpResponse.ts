import { Timings } from '@szmarczak/http-timer';
import { getContentType } from '../utils/misc';
import { ResponseHeaders } from './base';
import { HttpRequest } from "./httpRequest";
import { IncomingMessage } from 'http';
import { MimeUtility } from '../utils/mimeUtility';

export class HttpResponse {
    public constructor(
        public statusCode: number,
        public statusMessage: string,
        public httpVersion: string,
        public headers: ResponseHeaders,
        public body: string,
        public bodySizeInBytes: number,
        public headersSizeInBytes: number,
        public bodyBuffer: Buffer,
        public timingPhases: Timings['phases'],
        public request: HttpRequest,
        public rawResponse: IncomingMessage) {
    }

    public get contentType(): string | undefined {
        return getContentType(this.headers);
    }
    public get essence(): string | undefined {
        if (this.contentType) {
            return MimeUtility.parse(this.contentType).essence;
        }
    }
}