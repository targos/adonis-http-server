/*
* @poppinss/http-server
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/// <reference path="../../adonis-typings/index.ts" />

import { useReturnValue } from './useReturnValue'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ErrorHandlerNode } from '@ioc:Adonis/Core/Server'

/**
 * Final handler executes the route handler based on it's resolved
 * type and the response body on various conditions (check method body)
 * for same.
 */
export async function finalErrorHandler (
  errorHandler: ErrorHandlerNode | {
    type: 'iocObject',
    value: any,
    method: string,
  },
  error: any,
  ctx: HttpContextContract,
) {
  /**
   * When error handler is a plain javascript function, we will
   * execute it as it is.
   */
  if (typeof (errorHandler) === 'function') {
    const returnValue = await errorHandler(error, ctx)
    if (useReturnValue(returnValue, ctx)) {
      ctx.response.send(returnValue)
    }
    return
  }

  /**
   * Otherwise resolve the IoC container binding and call `handle` method
   * on it. The `handle` must always exist.
   */
  const errorHandlerInstance = global[Symbol.for('ioc.make')](errorHandler.value)
  const returnValue = await global[Symbol.for('ioc.call')](errorHandlerInstance, 'handle', [error, ctx])
  if (useReturnValue(returnValue, ctx)) {
    ctx.response.safeStatus(error.status || 500)
    ctx.response.send(returnValue)
  }

  /**
   * Optionally invoke the report method, when it exists. This method must not
   * attempt to make an HTTP response
   */
  if (typeof (errorHandlerInstance.report) === 'function') {
    await global[Symbol.for('ioc.call')](errorHandlerInstance, 'report', [error, ctx])
  }
}