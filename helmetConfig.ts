import helmet from "helmet";

export const helmetConfig = helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", 'trusted-cdn.com'],
                styleSrc: ["'self'", 'cdn.jsdelivr.net'],
                fontSrc: ["'self'", 'fonts.gstatic.com'],
                imgSrc: ["'self'", 'data:'],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
                blockAllMixedContent: [],
            },
        },
        frameguard: {
            action: 'deny',
        },
        hidePoweredBy: true,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        ieNoOpen: true,
        noSniff: true,
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        xssFilter: true
    }
)