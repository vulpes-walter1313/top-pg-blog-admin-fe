/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as PostsIndexImport } from './routes/posts.index'
import { Route as PostsCreateImport } from './routes/posts.create'
import { Route as PostsPostSlugImport } from './routes/posts.$postSlug'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PostsIndexRoute = PostsIndexImport.update({
  id: '/posts/',
  path: '/posts/',
  getParentRoute: () => rootRoute,
} as any)

const PostsCreateRoute = PostsCreateImport.update({
  id: '/posts/create',
  path: '/posts/create',
  getParentRoute: () => rootRoute,
} as any)

const PostsPostSlugRoute = PostsPostSlugImport.update({
  id: '/posts/$postSlug',
  path: '/posts/$postSlug',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/posts/$postSlug': {
      id: '/posts/$postSlug'
      path: '/posts/$postSlug'
      fullPath: '/posts/$postSlug'
      preLoaderRoute: typeof PostsPostSlugImport
      parentRoute: typeof rootRoute
    }
    '/posts/create': {
      id: '/posts/create'
      path: '/posts/create'
      fullPath: '/posts/create'
      preLoaderRoute: typeof PostsCreateImport
      parentRoute: typeof rootRoute
    }
    '/posts/': {
      id: '/posts/'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof PostsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutLazyRoute
  '/posts/$postSlug': typeof PostsPostSlugRoute
  '/posts/create': typeof PostsCreateRoute
  '/posts': typeof PostsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutLazyRoute
  '/posts/$postSlug': typeof PostsPostSlugRoute
  '/posts/create': typeof PostsCreateRoute
  '/posts': typeof PostsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutLazyRoute
  '/posts/$postSlug': typeof PostsPostSlugRoute
  '/posts/create': typeof PostsCreateRoute
  '/posts/': typeof PostsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/posts/$postSlug' | '/posts/create' | '/posts'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/posts/$postSlug' | '/posts/create' | '/posts'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/posts/$postSlug'
    | '/posts/create'
    | '/posts/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutLazyRoute: typeof AboutLazyRoute
  PostsPostSlugRoute: typeof PostsPostSlugRoute
  PostsCreateRoute: typeof PostsCreateRoute
  PostsIndexRoute: typeof PostsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutLazyRoute: AboutLazyRoute,
  PostsPostSlugRoute: PostsPostSlugRoute,
  PostsCreateRoute: PostsCreateRoute,
  PostsIndexRoute: PostsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/posts/$postSlug",
        "/posts/create",
        "/posts/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/posts/$postSlug": {
      "filePath": "posts.$postSlug.tsx"
    },
    "/posts/create": {
      "filePath": "posts.create.tsx"
    },
    "/posts/": {
      "filePath": "posts.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
