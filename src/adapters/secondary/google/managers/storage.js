// eslint-disable-next-line no-unused-vars
const GoogleStorage = require('../third-party-services/storage')

class GoogleCloudStorageManager {
  /**
   *
   * @param {GoogleStorage} storage
   */
  constructor() {
    this.storage = new GoogleStorage()
  }

  /**
   * Upload fileBuffer
   * @param {strin} filePath
   * @param {string} fileName
   * @param {string} mimeType
   * @param {Buffer} fileBuffer
   * @param {string} bucketName
   * @return {Promise<void>}
   */
  async uploadFile(fileName, mimeType, fileBuffer, bucketName) {
    if (!(await this.#verifyBucketExists(bucketName))) await this.storage.createBucket(bucketName)
    await this.storage.uploadFile(fileName, mimeType, fileBuffer, bucketName)
  }

  /**
   *
   * @param {string} bucketName
   * @param {string} fileName
   * @param {string} serviceName
   * @return {Promise<void>}
   */
  async uploadObject(bucketName, fileName, serviceName) {
    if (!(await this.#verifyBucketExists(bucketName))) await this.storage.createBucket(bucketName)
    await this.storage.uploadObject(bucketName, fileName, serviceName)
  }

  /**
   *
   * @param {string} bucketName
   * @return {Promise<boolean>}
   */
  async #verifyBucketExists(bucketName) {
    const buckets = await this.storage.getBuckets()
    return buckets.map(({ name }) => name).includes(bucketName)
  }
}

module.exports = GoogleCloudStorageManager
