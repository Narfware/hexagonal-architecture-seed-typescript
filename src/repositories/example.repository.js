// eslint-disable-next-line no-unused-vars
const Example = require('../entities/example.js')

class ExampleRepository {
  /**
   *
   * @param {Example} example
   * @return {Promise<Example>} example
   */
  async save (example) {
    return Promise.reject(new Error('Method save not implemented'))
  }

  /**
   * @return {Promise<Example[]>}
   */
  async getAll () {
    return Promise.reject(new Error('Method getAll not implemented'))
  }

  /**
   * @param {Example} example
   * @return {Promise<Example>}
   */
  async update (example) {
    return Promise.reject(new Error('Method update not implemented'))
  }
}

module.exports = ExampleRepository
