export const environment = {
  production: true,
  // config: {
  //   // ConfigApiDotnet: "http://localhost:8989/api",
  //   ConfigApiDotnet: "http://172.16.201.112:8080/api",
  //   ConfigApiSoap: "http://172.16.201.112:8080/system_soap_api/v1.0",
  //   ConfigApiPython: "http://172.16.201.112:8080/textanalytic",
  //   ConfigImageProfile: "http://172.16.201.112:8080/textanalytic/image/",
  //   ConfigApiContent: "http://172.16.201.112:8080/content",
  //   ConfigApiInvestigate: "https://line-1.betimes.biz",
  //   Urlkeycloak:"http://172.16.201.113:8080",
  //   Urlredirect:"http://172.16.201.112"
  //   // Urlredirect:"http://localhost:4200"
  // }

  config: {
    ConfigAapiJava: 'http://172.16.201.103:8080/v1.0',
    ConfigAapiUpload: 'http://172.16.201.103:8080',
    ConfigDomainName: 'http://172.16.201.103',
    ConfigApiDotnet: 'http://172.16.201.103:2053/api',
    ConfigApiTextAnalytics: 'http://172.16.201.103:9444',
    ConfigApiInvestigate: 'http://172.16.201.102',
  },
};
