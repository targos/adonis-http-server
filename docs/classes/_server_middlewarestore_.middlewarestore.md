**[@poppinss/http-server](../README.md)**

[Globals](../README.md) › ["Server/MiddlewareStore"](../modules/_server_middlewarestore_.md) › [MiddlewareStore](_server_middlewarestore_.middlewarestore.md)

# Class: MiddlewareStore <**Context**>

Middleware store register and keep all the application middleware at one
place. Also middleware are resolved during the registration and any
part of the application can read them without extra overhead.

The middleware store transparently relies on `Ioc.use` and `Ioc.make`
globals. If you are not using the IoC container, then simply register
all middleware as plain functions and not `ioc namespaces`.

**`example`** 
```ts
const store = new MiddlewareStore()

store.register([
  'App/Middleware/Auth'
])

store.registerNamed({
  auth: 'App/Middleware/Auth'
})

store.get()
```

## Type parameters

▪ **Context**: *any*

## Hierarchy

* **MiddlewareStore**

## Implements

* [MiddlewareStoreContract](../interfaces/_contracts_.middlewarestorecontract.md)‹Context›

## Index

### Methods

* [get](_server_middlewarestore_.middlewarestore.md#get)
* [getNamed](_server_middlewarestore_.middlewarestore.md#getnamed)
* [preCompileMiddleware](_server_middlewarestore_.middlewarestore.md#precompilemiddleware)
* [register](_server_middlewarestore_.middlewarestore.md#register)
* [registerNamed](_server_middlewarestore_.middlewarestore.md#registernamed)

## Methods

###  get

▸ **get**(): *[ResolvedMiddlewareNode](../modules/_contracts_.md#resolvedmiddlewarenode)‹Context›[]*

*Implementation of [MiddlewareStoreContract](../interfaces/_contracts_.middlewarestorecontract.md)*

Return all middleware registered using [MiddlewareStore.register](_server_middlewarestore_.middlewarestore.md#register)
method

**Returns:** *[ResolvedMiddlewareNode](../modules/_contracts_.md#resolvedmiddlewarenode)‹Context›[]*

___

###  getNamed

▸ **getNamed**(`name`: string): *null | [ResolvedMiddlewareNode](../modules/_contracts_.md#resolvedmiddlewarenode)‹Context›*

*Implementation of [MiddlewareStoreContract](../interfaces/_contracts_.middlewarestorecontract.md)*

Returns a single middleware by it's name registered
using [MiddlewareStore.registerNamed](_server_middlewarestore_.middlewarestore.md#registernamed) method.

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *null | [ResolvedMiddlewareNode](../modules/_contracts_.md#resolvedmiddlewarenode)‹Context›*

___

###  preCompileMiddleware

▸ **preCompileMiddleware**(`route`: [RouteNode](../modules/_contracts_.md#routenode)‹Context›): *void*

*Implementation of [MiddlewareStoreContract](../interfaces/_contracts_.middlewarestorecontract.md)*

A helper method to pre-compile route middleware using the middleware
store. Resolved middleware will be attached to `route.meta`
property, which can be read later by the middleware
processing layer.

**Parameters:**

Name | Type |
------ | ------ |
`route` | [RouteNode](../modules/_contracts_.md#routenode)‹Context› |

**Returns:** *void*

___

###  register

▸ **register**(`middleware`: [MiddlewareNode](../modules/_contracts_.md#middlewarenode)‹Context›[]): *this*

*Implementation of [MiddlewareStoreContract](../interfaces/_contracts_.middlewarestorecontract.md)*

Register an array of global middleware. These middleware are read
by HTTP server and executed on every request

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [MiddlewareNode](../modules/_contracts_.md#middlewarenode)‹Context›[] |

**Returns:** *this*

___

###  registerNamed

▸ **registerNamed**(`middleware`: object): *this*

Register named middleware that can be referenced later on routes

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | object |

**Returns:** *this*