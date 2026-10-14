/**
 * Сгенерировано из docs/swagger.yaml — не править вручную.
 * Обновление: bun run api:types [путь/до/swagger.yaml]
 */

export interface paths {
    "/admin/users/{id}/access": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get user access rights
         * @description Retrieves the access rights for a specific user. Requires admin access.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description User ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.UserAccessResponse"];
                    };
                };
                /** @description Invalid user ID */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Forbidden - admin access required */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description User not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        /**
         * Update user access rights
         * @description Adds an access flag to the user's access rights. Requires admin access.
         */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description User ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Access flag to add */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.UpdateUserAccessRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.UserAccessResponse"];
                    };
                };
                /** @description Invalid user ID or request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Forbidden - admin access required */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description User not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/users/{id}/ban": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Ban a user
         * @description Bans a user with an optional reason. Requires admin access.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description User ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Ban request with reason */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.BanUserRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: string;
                        };
                    };
                };
                /** @description Invalid user ID or request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Forbidden - admin access required */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description User not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/users/{id}/unban": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Unban a user
         * @description Removes a ban from a user. Requires admin access.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description User ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: string;
                        };
                    };
                };
                /** @description Invalid user ID */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Forbidden - admin access required */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description User not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/discord": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Discord OAuth authentication
         * @description Handles Discord OAuth flow - redirects to Discord if no code, otherwise processes the OAuth callback
         */
        get: {
            parameters: {
                query?: {
                    /** @description OAuth authorization code */
                    code?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Redirect to home page or Discord OAuth */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": string;
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * User login
         * @description Authenticates a user with login and password
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Login credentials */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.LoginRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.CurrentUserResponse"];
                    };
                };
                /** @description Invalid request body */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Invalid credentials */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * User logout
         * @description Logs out the current user by removing authentication cookies and session
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Successfully logged out */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: string;
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/logout-others": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Log out all other devices
         * @description Revokes every session of the current user except the current one
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: string;
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Refresh the session
         * @description Issues a new access token cookie from the refresh cookie (and rotates the refresh cookie when due). 401 means the session is gone for good and the user must log in again; any other error is transient and must NOT log the user out.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.RefreshResponse"];
                    };
                };
                /** @description Session expired or revoked */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Temporary failure, retry later */
                503: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Register a new user
         * @description Creates a new user account with login and password
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Registration credentials */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.RegisterRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.CurrentUserResponse"];
                    };
                };
                /** @description Invalid request body */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description User already exists */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/edits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List edits
         * @description Retrieves a list of edits with optional filtering by status, dictionary, type, and word ID
         */
        get: {
            parameters: {
                query?: {
                    /** @description Limit (number of results) */
                    n?: number;
                    /** @description Offset (pagination) */
                    o?: number;
                    /** @description Status filter (new, accepted, declined) */
                    s?: string;
                    /** @description Dictionary filter */
                    d?: string;
                    /** @description Edit type filter (create, edit, remove) */
                    t?: string;
                    /** @description Word ID filter */
                    wid?: string;
                    /** @description Start date filter (YYYY-MM-DD) */
                    from?: string;
                    /** @description End date filter (YYYY-MM-DD) */
                    to?: string;
                    /** @description User ID filter (UUID) */
                    userId?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.EditResponse"][];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/edits/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get edit by ID
         * @description Retrieves detailed information about a specific edit
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Edit ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.EditResponse"];
                    };
                };
                /** @description Invalid edit ID */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Edit not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        /**
         * Update an edit
         * @description Updates the content of a pending edit (author or editors with proper access only)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Edit ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Updated edit content */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.EditorRequest"];
                };
            };
            responses: {
                /** @description Successfully updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: string;
                        };
                    };
                };
                /** @description Invalid request or edit ID */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Access denied */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Edit not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Edit is not pending */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/edits/{id}/approve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Approve an edit
         * @description Approves a pending edit and applies it to the dictionary (requires edit access)
         */
        post: {
            parameters: {
                query?: {
                    /** @description Mark as unreviewed after approval */
                    isUnreviewed?: boolean;
                };
                header?: never;
                path: {
                    /** @description Edit ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Successfully approved */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: string;
                        };
                    };
                };
                /** @description Invalid edit ID */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Access denied */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Edit not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Edit is not pending */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/edits/{id}/decline": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Decline an edit
         * @description Declines a pending edit (author or editors with proper access only)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Edit ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Successfully declined */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: string;
                        };
                    };
                };
                /** @description Invalid edit ID */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Access denied */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Edit not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Edit is not pending */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/edits/{id}/txt": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get edit as text representation
         * @description Retrieves the edit content in text format for editing
         */
        get: {
            parameters: {
                query?: {
                    /** @description Text type */
                    type?: string;
                };
                header?: never;
                path: {
                    /** @description Edit ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.EditorRequest"];
                    };
                };
                /** @description Invalid edit ID */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Edit not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jp/check-duplicates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Check for duplicate entries
         * @description Checks if similar entries exist in the dictionary
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Entry to check */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.EditorRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.EntryJp"][];
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jp/entries": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create new entry
         * @description Creates a new Japanese-Russian dictionary entry (requires login)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Entry content */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.EditorRequest"];
                };
            };
            responses: {
                /** @description Entry edit ID */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.UuidResponse"];
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jp/entries/{wid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get entry by word ID
         * @description Retrieves a Japanese-Russian dictionary entry by its word ID (WID)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Word ID (WID) */
                    wid: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.EntryJp"];
                    };
                };
                /** @description Entry not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        /**
         * Edit entry
         * @description Creates an edit proposal for an existing entry (requires login)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Word ID (WID) */
                    wid: string;
                };
                cookie?: never;
            };
            /** @description Updated entry content */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.EditorRequest"];
                };
            };
            responses: {
                /** @description Entry edit ID */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.UuidResponse"];
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Entry not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Entry is deleted */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        /**
         * Delete entry
         * @description Creates a deletion proposal for an existing entry (requires login)
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Word ID (WID) */
                    wid: string;
                };
                cookie?: never;
            };
            /** @description Deletion comment */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.EditorRequest"];
                };
            };
            responses: {
                /** @description Entry edit ID */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.UuidResponse"];
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Entry not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Entry is deleted */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jp/entries/{wid}/llm": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get LLM response for entry
         * @description Retrieve the stored LLM processing result for a dictionary entry
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Word ID */
                    wid: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.LLMStoredResponse"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal Server Error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        /**
         * Process entry with LLM
         * @description Request LLM processing for a dictionary entry using satellite data
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.LLMStoredResponse"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal Server Error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jp/entries/{wid}/satellites": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get satellite entries
         * @description Retrieves satellite dictionary entries for a given word ID
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Word ID (WID) */
                    wid: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.SatelliteEntry"][];
                    };
                };
                /** @description Entry not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jp/entries/{wid}/txt": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get entry as text for editing
         * @description Retrieves a Japanese-Russian dictionary entry in text format for editing
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Word ID (WID) */
                    wid: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.EditorRequest"];
                    };
                };
                /** @description Entry not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jp/legacy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add legacy entry
         * @description Imports an entry from legacy format (admin only)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Legacy format entry */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["old.LegacyEntry"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": string;
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jp/txt-to-entry": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Render entry from text
         * @description Converts text format entry to JSON format for preview (utility endpoint)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Text format entry */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.EditorRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.EntryJp"];
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/kanji/components": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List kanji components
         * @description Returns the curated list of kanji components with their stroke counts
         */
        get: {
            parameters: {
                query?: {
                    /** @description Minimum stroke count filter */
                    min_strokes?: number;
                    /** @description Maximum stroke count filter */
                    max_strokes?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.KanjiComponent"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/kanji/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Search kanji by components
         * @description Returns kanji that contain all of the specified components, grouped by stroke count
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Components to search for */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.KanjiSearchRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.KanjiSearchResponse"];
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ocr/books": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List OCR books
         * @description Retrieves a list of all available OCR books (requires OCR access)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["entities.OCRBook"][];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Forbidden - requires OCR access */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ocr/pages/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get OCR page by ID
         * @description Retrieves a specific OCR page with book information (requires OCR access)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Page ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["entities.OCRPageWithBook"];
                    };
                };
                /** @description Invalid page ID */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Forbidden - requires OCR access */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Page not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        /**
         * Update OCR page
         * @description Updates the content of an OCR page (requires OCR access)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Page ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Updated page data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["entities.OCRPage"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["entities.OCRPageWithBook"];
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Forbidden - requires OCR access */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Page not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ocr/pages/{id}/next": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get next OCR page
         * @description Retrieves the next OCR page based on navigation type (requires OCR access)
         */
        get: {
            parameters: {
                query: {
                    /** @description Book ID */
                    bookId: number;
                    /** @description Current page index */
                    innerIndex: number;
                    /** @description Navigation type (0=next, 1=prev, etc.) */
                    type: number;
                };
                header?: never;
                path: {
                    /** @description Current page ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Returns next page ID */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: string;
                        };
                    };
                };
                /** @description Invalid parameters */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Forbidden - requires OCR access */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Page not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ocr/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Search OCR pages
         * @description Searches OCR pages by query text (public with optional auth)
         */
        get: {
            parameters: {
                query: {
                    /** @description Search query */
                    q: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["entities.OCRPageWithBook"][];
                    };
                };
                /** @description Invalid query */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ocr/search-wid": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Search OCR pages by word ID
         * @description Searches OCR pages containing a specific dictionary entry (public with optional auth)
         */
        get: {
            parameters: {
                query: {
                    /** @description Word ID (WID) */
                    wid: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["entities.OCRPageWithBook"][];
                    };
                };
                /** @description Invalid word ID */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Entry not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Search dictionaries
         * @description Searches the jp dictionary (filters, sorts, keyset pagination, sentence tokens) or the ocr/sat/kanji dictionaries
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Search request */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.SearchRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.SearchResponse"];
                    };
                };
                /** @description Invalid request or cursor */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/random": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Random entries
         * @description Returns 25 random jp entries for the query and filters
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Random request */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.RandomRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.RandomResponse"];
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List tags
         * @description Retrieves a list of available tags, optionally filtered by query
         */
        get: {
            parameters: {
                query?: {
                    /** @description Search query for filtering tags */
                    q?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.Tag"][];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        /**
         * Create tag
         * @description Creates a new tag for dictionary entries (admin only)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Tag data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.FullTag"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.FullTag"];
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tags/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update tag
         * @description Updates an existing tag (admin only)
         */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Tag ID */
                    id: number;
                };
                cookie?: never;
            };
            /** @description Updated tag data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["dto.FullTag"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.FullTag"];
                    };
                };
                /** @description Invalid request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Tag not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/heatmap": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get user activity heatmap
         * @description Retrieves a user's contribution activity heatmap data
         */
        get: {
            parameters: {
                query?: {
                    /** @description Start date filter (YYYY-MM-DD) */
                    from?: string;
                    /** @description End date filter (YYYY-MM-DD) */
                    to?: string;
                };
                header?: never;
                path: {
                    /** @description User ID (UUID) */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["entities.UserHeatmap"][];
                    };
                };
                /** @description Invalid user ID */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description User not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get current user profile
         * @description Retrieves the authenticated user's profile with full details including access and settings
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.CurrentUserResponse"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description User not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/me/sessions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List active sessions of the current user */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.SessionResponse"][];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/me/sessions/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Revoke one session of the current user */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Session id */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: string;
                        };
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/profile/{username}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get user profile by username
         * @description Retrieves a user's public profile including statistics
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Username */
                    username: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.UserProfile"];
                    };
                };
                /** @description User not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/weekly-stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get weekly statistics
         * @description Retrieves weekly contribution statistics for all users and site-wide totals
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dto.WeeklyStats"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["utils.ApiError"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        "dto.BanUserRequest": {
            reason?: string;
        };
        "dto.Content": {
            c?: components["schemas"]["entities.Content"][];
            p?: string;
            t?: string;
            v?: string;
        };
        "dto.CurrentUserResponse": {
            access?: number;
            avatar?: string;
            banned?: boolean;
            createdAt?: string;
            id?: string;
            isAdmin?: boolean;
            isBot?: boolean;
            lastOnline?: string;
            login?: string;
            settings?: string;
            /** @description Stats */
            stats?: components["schemas"]["dto.StatsUserResponse"];
            username?: string;
        };
        "dto.DefLangIncludeExclude": {
            exclude?: ("ru" | "en" | "jp")[];
            include?: ("ru" | "en" | "jp")[];
        };
        "dto.DictCount": {
            /** @description > 100 */
            capped?: boolean;
            count?: number;
            /** @enum {string} */
            dict?: "jp" | "ocr" | "sat" | "kanji";
        };
        "dto.EditDiff": {
            c?: string;
            d?: boolean;
        };
        "dto.EditResponse": {
            approver?: components["schemas"]["dto.UserShortResponse"];
            author?: components["schemas"]["dto.UserShortResponse"];
            comment?: string;
            createdAt?: string;
            dictionary?: components["schemas"]["entities.DictionaryType"];
            diffDst?: components["schemas"]["dto.EditDiff"][];
            diffRawDst?: components["schemas"]["dto.EditDiff"][];
            diffRawSrc?: components["schemas"]["dto.EditDiff"][];
            diffSrc?: components["schemas"]["dto.EditDiff"][];
            id?: string;
            status?: components["schemas"]["entities.EditStatus"];
            title?: string;
            type?: components["schemas"]["entities.EditType"];
            updatedAt?: string;
            wid?: string;
        };
        "dto.EditorRequest": {
            body?: string;
            comment?: string;
            reading?: string;
            spelling?: string;
            status?: components["schemas"]["entities.Status"];
        };
        "dto.EntryJp": {
            externalEntry?: string;
            frequency?: number;
            furigana?: components["schemas"]["dto.Furigana"][];
            hideRare?: boolean;
            meanings?: components["schemas"]["dto.Meaning"][];
            preferFurigana?: boolean;
            status?: components["schemas"]["entities.Status"];
            tags?: components["schemas"]["dto.Tag"][];
            title?: string;
            wid?: string;
            words?: components["schemas"]["dto.Word"][];
        };
        "dto.Example": {
            sentence?: components["schemas"]["dto.Content"][];
            translation?: components["schemas"]["dto.Content"][];
        };
        "dto.ExternalReference": {
            target?: string;
            value?: string;
        };
        "dto.FullTag": {
            category?: string;
            count?: number;
            eng?: string;
            engShort?: string;
            id?: number;
            priority?: number;
            rus?: string;
            rusShort?: string;
            type?: number;
        };
        "dto.Furigana": {
            freq?: number;
            isMarked?: boolean;
            pairs?: components["schemas"]["jp.FuriganaPair"][];
            tags?: components["schemas"]["dto.Tag"][];
            transcription?: components["schemas"]["dto.Transcription"];
        };
        "dto.IntIncludeExclude": {
            /** @description without this */
            exclude?: number[];
            /** @description only with this (AND) */
            include?: number[];
        };
        "dto.InternalReference": {
            preview?: components["schemas"]["dto.Content"][];
            referenceType?: number;
            target?: string;
            value?: string;
        };
        "dto.Interpretation": {
            /**
             * @description jp|ru|en — which language was actually searched
             * @enum {string}
             */
            lang?: "jp" | "ru" | "en";
            /** @description normalized query (kana after transcription, token form, etc.) */
            query?: string;
            /** @description romaji/kiriji were converted to kana */
            transcribed?: boolean;
        };
        "dto.KanjiComponent": {
            component?: string;
            strokes?: number;
        };
        "dto.KanjiSearchRequest": {
            components: string[];
            limit?: number;
        };
        "dto.KanjiSearchResponse": {
            components?: string[];
            result?: {
                [key: string]: string[];
            };
        };
        "dto.LLMConflict": {
            issue?: string;
            recommendation?: string;
            sources?: string[];
        };
        "dto.LLMEntry": {
            conflicts?: components["schemas"]["dto.LLMConflict"][];
            model?: string;
            pos_hint?: string;
            values?: components["schemas"]["dto.LLMValue"][];
            word?: string;
        };
        "dto.LLMExample": {
            ja?: string;
            ru?: string;
            source_id?: number;
        };
        "dto.LLMSource": {
            fragment?: string;
            source_id?: number;
        };
        "dto.LLMStoredResponse": {
            body?: components["schemas"]["dto.LLMEntry"];
            created_at?: string;
            id?: string;
            model?: string;
            msg?: string;
            requested_by?: string;
            status?: components["schemas"]["entities.LLMStatus"];
            updated_at?: string;
            wid?: string;
        };
        "dto.LLMValue": {
            canonical_translation?: string;
            collocations?: string[];
            confidence?: number;
            domain_register?: string;
            examples?: components["schemas"]["dto.LLMExample"][];
            gloss?: string;
            grammatical_notes?: string;
            japanese_forms?: string[];
            raw_evidence?: string;
            sources?: components["schemas"]["dto.LLMSource"][];
        };
        "dto.LoanSource": {
            lang?: string;
            word?: string;
        };
        "dto.LoginRequest": {
            login: string;
            password: string;
        };
        "dto.MarkIncludeExclude": {
            exclude?: ("unreviewed" | "unconfirmed" | "archaic" | "dialect" | "proper")[];
            include?: ("unreviewed" | "unconfirmed" | "archaic" | "dialect" | "proper")[];
        };
        "dto.Meaning": {
            note?: components["schemas"]["dto.Content"][];
            senses?: components["schemas"]["dto.Sense"][];
            tags?: components["schemas"]["dto.Tag"][];
        };
        "dto.Pitch": {
            audio?: string;
            /** @description PitchMap []PitchPair `json:"pitchMap"` */
            diagram?: components["schemas"]["jp.PitchPair"][];
            pitchNum?: string;
        };
        "dto.RandomRequest": {
            filters?: components["schemas"]["dto.SearchFilters"];
            query?: string;
        };
        "dto.RandomResponse": {
            /** @description 25 entries, no pagination */
            items?: components["schemas"]["dto.EntryJp"][];
        };
        "dto.Reading": {
            isMarked?: boolean;
            pitch?: components["schemas"]["dto.Pitch"][];
            tags?: components["schemas"]["dto.Tag"][];
            transcription?: components["schemas"]["dto.Transcription"];
            value?: string;
        };
        "dto.RefreshResponse": {
            access_expires_at?: string;
            user?: components["schemas"]["dto.CurrentUserResponse"];
        };
        "dto.RegisterRequest": {
            login: string;
            password: string;
        };
        "dto.SatEntry": {
            body?: string;
            id?: string;
            title?: string;
        };
        "dto.SatelliteBody": {
            lines?: number;
            text?: string;
        };
        "dto.SatelliteEntry": {
            body?: components["schemas"]["dto.SatelliteBody"][];
            id?: string;
            priority?: number;
            title?: string;
        };
        "dto.SearchFilters": {
            /** @description ru|en|jp */
            defLang?: components["schemas"]["dto.DefLangIncludeExclude"];
            desc?: boolean;
            /** @description force searching ru/en translations */
            inTranslations?: boolean;
            /** @description nil → true */
            includeUnranked?: boolean;
            lenMax?: number;
            /** @description by the length column */
            lenMin?: number;
            /** @description unreviewed|unconfirmed|archaic|dialect|proper */
            marks?: components["schemas"]["dto.MarkIncludeExclude"];
            /**
             * @description exact by default; * and ? in the query = wildcard pattern
             * @enum {string}
             */
            match?: "exact" | "start" | "contains";
            rankMax?: number;
            rankMin?: number;
            /** @enum {string} */
            sort?: "freq" | "length" | "edited" | "gojuon" | "iroha" | "kiriji" | "romaji";
            /** @description any tags, incl. jlpt-n5..n1 and parts of speech */
            tags?: components["schemas"]["dto.IntIncludeExclude"];
        };
        "dto.SearchRequest": {
            /** @description opaque key of the next page */
            cursor?: string;
            /**
             * @description jp by default
             * @enum {string}
             */
            dict?: "jp" | "ocr" | "sat" | "kanji";
            /** @description dict=jp only, ignored with Token */
            filters?: components["schemas"]["dto.SearchFilters"];
            query?: string;
            /** @description selected token index (sentence mode), nil = whole query */
            token?: number;
        };
        "dto.SearchResponse": {
            /** @description token currently shown (nil = whole query) */
            activeToken?: number;
            /** @enum {string} */
            dict?: "jp" | "ocr" | "sat" | "kanji";
            /** @description counters for the dict switcher */
            dicts?: components["schemas"]["dto.DictCount"][];
            eraConversions?: components["schemas"]["jp.EraConversion"][];
            interpretation?: components["schemas"]["dto.Interpretation"];
            items?: components["schemas"]["dto.EntryJp"][];
            kanjiItems?: components["schemas"]["entities.StoreKanjiItem"][];
            /**
             * @description query | token — what the result set is built from
             * @enum {string}
             */
            mode?: "query" | "token";
            nextCursor?: string;
            ocrItems?: components["schemas"]["entities.OCRPageWithBook"][];
            satItems?: components["schemas"]["dto.SatEntry"][];
            /** @description fallback when Items < 10 (Mode=query only) */
            similar?: components["schemas"]["dto.SimilarBlock"];
            timings?: components["schemas"]["dto.Timings"];
            /** @description fields below are only filled on the first page (cursor == "") */
            tokens?: components["schemas"]["dto.SearchToken"][];
            unitConversions?: components["schemas"]["jp.UnitConversion"][];
        };
        "dto.SearchToken": {
            /** @description dictionary form from the tokenizer */
            base?: string;
            /** @description at least one entry matches the token forms (cheap EXISTS) */
            found?: boolean;
            furigana?: components["schemas"]["jp.FuriganaPair"][];
            /** @description false for punctuation/symbols — front renders them non-clickable */
            searchable?: boolean;
            surface?: string;
        };
        "dto.Sense": {
            content?: components["schemas"]["dto.Content"][];
            dialectTags?: components["schemas"]["dto.Tag"][];
            examples?: components["schemas"]["dto.Example"][];
            extRefs?: components["schemas"]["dto.ExternalReference"][];
            fieldTags?: components["schemas"]["dto.Tag"][];
            intRefs?: components["schemas"]["dto.InternalReference"][];
            isRare?: boolean;
            ix?: string;
            lemmaContent?: components["schemas"]["dto.Content"][];
            loanSources?: components["schemas"]["dto.LoanSource"][];
            metaTags?: components["schemas"]["dto.Tag"][];
            subSenses?: components["schemas"]["dto.Sense"][];
        };
        "dto.SessionResponse": {
            created_at?: string;
            current?: boolean;
            expires_at?: string;
            id?: string;
            ip?: string;
            last_used_at?: string;
            user_agent?: string;
        };
        "dto.SimilarBlock": {
            items?: components["schemas"]["dto.EntryJp"][];
            /**
             * @description contains | fuzzy
             * @enum {string}
             */
            kind?: "contains" | "fuzzy";
        };
        "dto.Spelling": {
            isMarked?: boolean;
            tags?: components["schemas"]["dto.Tag"][];
            value?: string;
        };
        "dto.StatsSiteResponse": {
            jpn?: number;
            jpnPrev?: number;
            jpnRev?: number;
            jpnRevPrev?: number;
            kanji?: number;
            kanjiPrev?: number;
            kanjiRev?: number;
            kanjiRevPrev?: number;
            rus?: number;
            rusPrev?: number;
            rusRev?: number;
            rusRevPrev?: number;
        };
        "dto.StatsUserResponse": {
            autoEdit?: number;
            autoNew?: number;
            edits?: number;
            jpnEdit?: number;
            jpnNew?: number;
            kanjiEdit?: number;
            kanjiNew?: number;
            rating?: number;
            reviews?: number;
            rusEdit?: number;
            rusNew?: number;
        };
        "dto.StatsWithUserResponse": {
            stats?: components["schemas"]["dto.StatsUserResponse"];
            user?: components["schemas"]["dto.UserShortResponse"];
        };
        "dto.Tag": {
            eng?: string;
            engShort?: string;
            rus?: string;
            rusShort?: string;
            type?: number;
        };
        "dto.Timings": {
            details?: string[];
            search?: string;
            tokenization?: string;
            total?: string;
        };
        "dto.Transcription": {
            kana?: string;
            rus?: string;
        };
        "dto.UpdateUserAccessRequest": {
            access?: number;
        };
        "dto.UserAccessResponse": {
            access?: number;
            isAdmin?: boolean;
            userId?: string;
            username?: string;
        };
        "dto.UserProfile": {
            avatar?: string;
            banned?: boolean;
            createdAt?: string;
            id?: string;
            isAdmin?: boolean;
            isBot?: boolean;
            lastOnline?: string;
            login?: string;
            /** @description Stats */
            stats?: components["schemas"]["dto.StatsUserResponse"];
            username?: string;
        };
        "dto.UserShortResponse": {
            avatar?: string;
            id?: string;
            username?: string;
        };
        "dto.WeeklyStats": {
            site?: components["schemas"]["dto.StatsSiteResponse"];
            stats?: components["schemas"]["dto.StatsWithUserResponse"][];
        };
        "dto.Word": {
            readings?: components["schemas"]["dto.Reading"][];
            spellings?: components["schemas"]["dto.Spelling"][];
        };
        "entities.Content": {
            c?: components["schemas"]["entities.Content"][];
            p?: string;
            t?: string;
            v?: string;
        };
        /** @enum {integer} */
        "entities.DictionaryType": 0 | 1 | 2 | 3 | 4 | 5;
        /** @enum {integer} */
        "entities.EditStatus": 0 | 1 | 2 | 3 | 4 | 5;
        /** @enum {integer} */
        "entities.EditType": 0 | 1 | 2 | 3 | 4 | 5;
        /** @enum {integer} */
        "entities.LLMStatus": 0 | 1 | 2 | 3;
        "entities.OCRBook": {
            completedPages?: number;
            description?: string;
            id?: number;
            prefix?: string;
            title?: string;
            totalPages?: number;
        };
        "entities.OCRPage": {
            bookId?: number;
            file?: string;
            id?: string;
            innerIndex?: number;
            meaningEn?: string;
            meaningRu?: string;
            rawLine?: string;
            reading?: string;
            status?: components["schemas"]["entities.PageStatus"];
            word?: string;
        };
        "entities.OCRPageWithBook": {
            bookId?: number;
            description?: components["schemas"]["entities.Content"][];
            file?: string;
            id?: string;
            innerIndex?: number;
            meaningEn?: string;
            meaningRu?: string;
            prefix?: string;
            rawLine?: string;
            reading?: string;
            status?: components["schemas"]["entities.PageStatus"];
            title?: string;
            word?: string;
        };
        /** @enum {integer} */
        "entities.PageStatus": 0 | 1 | 2 | 3;
        "entities.Status": {
            isArchaic?: boolean;
            isDeleted?: boolean;
            isDialect?: boolean;
            isProper?: boolean;
            isUnconfirmed?: boolean;
            isUnreviewed?: boolean;
        };
        "entities.StoreKanjiItem": {
            components?: string[];
            kanji?: string;
            strokes?: number;
        };
        "entities.UserHeatmap": {
            date?: string;
            value?: number;
        };
        "jp.EraConversion": {
            eraReading?: string;
            gregorianYear?: number;
            srcEra?: string;
            srcYear?: number;
        };
        "jp.FuriganaPair": {
            kana?: string;
            word?: string;
        };
        "jp.PitchPair": {
            m?: string;
            n?: boolean;
            s?: number;
            sl?: boolean;
            sp?: boolean;
        };
        "jp.UnitConversion": {
            metricUnit?: string;
            resValue?: number;
            srcValue?: number;
            unit?: string;
            unitReading?: string;
        };
        "old.DictEntry": {
            externalEntry?: string;
            meanings?: components["schemas"]["old.Meaning"][];
            tags?: string[];
            words?: components["schemas"]["old.Word"][];
        };
        "old.Example": {
            translation?: string;
            value?: string;
        };
        "old.LangMeaning": {
            lang?: string;
            note?: string;
            senses?: components["schemas"]["old.Sense"][];
        };
        "old.LegacyEntry": {
            entry?: components["schemas"]["old.DictEntry"];
            externalEntry?: string;
            id?: number;
            isArchaic?: boolean;
            isReviewed?: boolean;
            isUnconfirmed?: boolean;
            needUpdate?: boolean;
            wid?: string;
        };
        "old.LoanSource": {
            lang?: string;
            word?: string;
        };
        "old.Meaning": {
            langMeanings?: components["schemas"]["old.LangMeaning"][];
            pos?: string[];
        };
        "old.PitchAccent": Record<string, never>;
        "old.Reading": {
            pitch?: string;
            pitchedReading?: components["schemas"]["old.PitchAccent"];
            tag?: components["schemas"]["old.Tag"];
            value?: string;
        };
        "old.Reference": {
            referenceType?: number;
            target?: string;
            value?: string;
        };
        "old.Sense": {
            examples?: components["schemas"]["old.Example"][];
            isRare?: boolean;
            loanSources?: components["schemas"]["old.LoanSource"][];
            references?: components["schemas"]["old.Reference"][];
            tags?: components["schemas"]["old.Tag"][];
            value?: string;
        };
        "old.Tag": {
            type?: string;
            values?: string[];
        };
        "old.Word": {
            readings?: components["schemas"]["old.Reading"][];
            writings?: components["schemas"]["old.Writing"][];
        };
        "old.Writing": {
            tag?: components["schemas"]["old.Tag"];
            value?: string;
        };
        "utils.ApiError": {
            /** @description optional structured details (e.g. validation) */
            details?: unknown;
            /** @description human readable message */
            message?: string;
        };
        "utils.UuidResponse": {
            id?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
