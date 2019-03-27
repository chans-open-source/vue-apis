/**
 * Augment the typings of Vue.js
 */

declare module "vue/types/vue" {
  interface Vue {
    $apis: object;
  }
}
