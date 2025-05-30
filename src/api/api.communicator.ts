import { PageRoutes } from "../utils/utils";

/**
 * Request types.
 */
export enum RequestMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
    Patch = 'PATCH'
}

/**
 * CRUD api operations
 */
export enum ApiOperation {
    Create = 'create',
    List = 'list',
    Open = 'open',
    Delete = 'delete',
    Update = 'update'
}

/**
 * Api endpoint interface.
 */
export interface Endpoint {
    url: string;
    requestMethod: RequestMethod;
}

/**
 * Token details for JWT generation.
 */
export interface TokenPair {
    token: string;
    refresh_token: string;
}

/**
 * Api request.
 */
export interface ApiRequest {
    endpoint: Endpoint;
    headers?: { name: string; value: string }[];
    body?: string | FormData;
    jwt?: TokenPair;
}

/**
 * Api communicator wrapper class
 * @template T type of object to return
 * @param { ApiRequest } request request endpoint, body and headers
 * @returns { T } object as a result of api request
 */
export const apiCommunicator = async <T>(request: ApiRequest): Promise<T> => {
    // generates storefront api url
    const generateStorefrontApiUrl = async (): Promise<string> => {
        return request.jwt ?
            `${PageRoutes.domain()}/${request.endpoint.url}`
            : `${PageRoutes.domain()}/${request.endpoint.url}?token=${request.jwt.token}&refresh_token=${request.jwt?.refresh_token}`;
    };

    const apiUrl: string = await generateStorefrontApiUrl();
    const headers = new Headers();
    for ( const header of request.headers || [] ) {
        headers.set( header.name, header.value );
    }

    const response = request.endpoint.requestMethod === RequestMethod.Get ? await fetch( apiUrl ) : await fetch( apiUrl, {
        method: request.endpoint.requestMethod, headers: headers, body: request.body
    } );
    const responseBody = await response.text();

    if ( !response.ok ) {
        const error = `Error requesting ${request.endpoint.url}. 
            Status: ${response.status}. Body: ${responseBody}`;
        throw new Error( error );
    }
    const contentType: string | null = response.headers.get( 'content-type' );
    return contentType && contentType.indexOf( 'application/json' ) !== -1 ? (JSON.parse( responseBody ) as T) : (responseBody as T);
};
