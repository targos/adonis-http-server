/**
 * @adonisjs/http-server
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare module '@ioc:Adonis/Core/AsyncHttpContext' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

  /**
   * Async Http context available during the lifecycle of HTTP requests
   */
  export interface AsyncHttpContextContract {
    /**
     * Returns the current HTTP context or null if called outside of a request
     */
    getContext(): HttpContextContract | null

    /**
     * Returns the current HTTP context or throws if called outside of a request
     */
    getContextOrFail(): HttpContextContract
  }

  const AsyncHttpContext: AsyncHttpContextContract
  export default AsyncHttpContext
}
