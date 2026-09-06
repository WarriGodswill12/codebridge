/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as adminSetup from "../adminSetup.js";
import type * as auth from "../auth.js";
import type * as authHelpers from "../authHelpers.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as leads from "../leads.js";
import type * as posts from "../posts.js";
import type * as pricing from "../pricing.js";
import type * as projects from "../projects.js";
import type * as seed from "../seed.js";
import type * as services from "../services.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  adminSetup: typeof adminSetup;
  auth: typeof auth;
  authHelpers: typeof authHelpers;
  files: typeof files;
  http: typeof http;
  leads: typeof leads;
  posts: typeof posts;
  pricing: typeof pricing;
  projects: typeof projects;
  seed: typeof seed;
  services: typeof services;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
