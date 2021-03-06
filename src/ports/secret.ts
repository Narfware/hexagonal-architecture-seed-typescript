// PORTS => THE PORTS ARE INTERFACES IMPLEMENTED BY THE ADAPTERS
// These interfaces is all of the business logic know, business logic dont know the implementation.
// The implementation must return the data defined here.
export interface ISecret {
  getSecret(bucketName: string | undefined, fileName: string | undefined): Promise<Record<string, string> | undefined>
}
