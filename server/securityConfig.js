import helmet from 'helmet';

export const securityConfig = {
  contentSecurityPolicy: helmet.contentSecurityPolicy(),
  xssFilter: helmet.xssFilter(),
  noSniff: helmet.noSniff(),
  dnsPrefetchControl: helmet.dnsPrefetchControl(),
  crossOriginResourcePolicy: helmet.crossOriginResourcePolicy(),
  permittedCrossDomainPolicies: helmet.permittedCrossDomainPolicies(),
  hidePoweredBy: helmet.hidePoweredBy(),
  referrerPolicy: helmet.referrerPolicy({ policy: 'no-referrer' }),
  hsts: helmet.hsts({
    maxAge: 15552000, // 6 months in seconds
    includeSubDomains: true,
    preload: true
  }),
  expectCt: helmet.expectCt({
    enforce: true,
    maxAge: 30 // 30 days
  })
};
