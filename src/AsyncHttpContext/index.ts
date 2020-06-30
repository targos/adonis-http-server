/**
 * @adonisjs/http-server
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/// <reference path="../../adonis-typings/index.ts" />

import { AsyncLocalStorage } from 'async_hooks'
import { AsyncHttpContextContract } from '@ioc:Adonis/Core/AsyncHttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const adonisLocalStorage = new AsyncLocalStorage<InternalAsyncHttpContext>()

export class InternalAsyncHttpContext {
  constructor (private $ctx: HttpContextContract) {}

  public getContext () {
    return this.$ctx
  }

  public run (callback: () => any) {
    return adonisLocalStorage.run(this, callback)
  }
}

class AsyncHttpContext implements AsyncHttpContextContract {
  public getContext () {
    const store = adonisLocalStorage.getStore()
    if (store) {
      return store.getContext()
    }
    return null
  }

  public getContextOrFail () {
    const store = adonisLocalStorage.getStore()
    if (store) {
      return store.getContext()
    }
    throw new Error('TODO')
  }
}

export const asyncHttpContext = new AsyncHttpContext()
