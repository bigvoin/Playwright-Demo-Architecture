/**
 * Utility functions for the application returning page routes and domains.
 */
export const PageRoutes = {
    domain: function () {
        return process.env.APP_URL ?? 'https://blankfactor.com/';
    },
};