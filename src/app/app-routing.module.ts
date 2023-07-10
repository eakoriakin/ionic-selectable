import { Routes } from '@angular/router';

export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: 'home',
  loadChildren: () => import('./pages/home/home.module'),
}, {
  path: 'labels',
  loadChildren: () => import('./pages/labels/labels.module')
}, {
  path: 'basic',
  loadChildren: () => import('./pages/basic/basic.module')
}, {
  path: 'inside-modal',
  loadChildren: () => import('./pages/inside-modal/inside-modal.module')
}, {
  path: 'form-control',
  loadChildren: () => import('./pages/form-control/form-control.module')
}, {
  path: 'close-button-text',
  loadChildren: () => import('./pages/close-button-text/close-button-text.module')
}, {
  path: 'primitive-types',
  loadChildren: () => import('./pages/primitive-types/primitive-types.module')
}, {
  path: 'initial-value',
  loadChildren: () => import('./pages/initial-value/initial-value.module')
}, {
  path: 'is-enabled',
  loadChildren: () => import('./pages/is-enabled/is-enabled.module')
}, {
  path: 'can-clear',
  loadChildren: () => import('./pages/can-clear/can-clear.module')
}, {
  path: 'is-multiple',
  loadChildren: () => import('./pages/is-multiple/is-multiple.module')
}, {
  path: 'on-search',
  loadChildren: () => import('./pages/on-search/on-search.module')
}, {
  path: 'infinite-scroll',
  loadChildren: () => import('./pages/infinite-scroll/infinite-scroll.module')
}, {
  path: 'min-max-selection',
  loadChildren: () => import('./pages/min-max-selection/min-max-selection.module')
}, {
  path: 'scroll-to-top',
  loadChildren: () => import('./pages/scroll-to-top/scroll-to-top.module')
}, {
  path: 'virtual-scroll',
  loadChildren: () => import('./pages/virtual-scroll/virtual-scroll.module')
}, {
  path: 'should-store-item-value',
  loadChildren: () => import('./pages/should-store-item-value/should-store-item-value.module')
}, {
  path: 'placeholder',
  loadChildren: () => import('./pages/placeholder/placeholder.module')
}, {
  path: 'infinite-scroll-is-multiple',
  loadChildren: () => import('./pages/infinite-scroll-is-multiple/infinite-scroll-is-multiple.module')
}, {
  path: 'cascading',
  loadChildren: () => import('./pages/cascading/cascading.module')
}, {
  path: 'values-ellipsis-template',
  loadChildren: () => import('./pages/values-ellipsis-template/values-ellipsis-template.module')
}, {
  path: 'value-template',
  loadChildren: () => import('./pages/value-template/value-template.module')
}, {
  path: 'title-template',
  loadChildren: () => import('./pages/title-template/title-template.module')
}, {
  path: 'search-fail-template',
  loadChildren: () => import('./pages/search-fail-template/search-fail-template.module')
}, {
  path: 'placeholder-template',
  loadChildren: () => import('./pages/placeholder-template/placeholder-template.module')
}, {
  path: 'multiple-values-template',
  loadChildren: () => import('./pages/multiple-values-template/multiple-values-template.module')
}, {
  path: 'message-template',
  loadChildren: () => import('./pages/message-template/message-template.module')
}, {
  path: 'icon-template',
  loadChildren: () => import('./pages/icon-template/icon-template.module')
}, {
  path: 'item-template',
  loadChildren: () => import('./pages/item-template/item-template.module')
}, {
  path: 'item-end-template',
  loadChildren: () => import('./pages/item-end-template/item-end-template.module')
}, {
  path: 'item-icon-template',
  loadChildren: () => import('./pages/item-icon-template/item-icon-template.module')
}, {
  path: 'grouping-virtual-scroll',
  loadChildren: () => import('./pages/grouping-virtual-scroll/grouping-virtual-scroll.module')
}, {
  path: 'grouping',
  loadChildren: () => import('./pages/grouping/grouping.module')
}, {
  path: 'group-template',
  loadChildren: () => import('./pages/group-template/group-template.module')
}, {
  path: 'group-end-template',
  loadChildren: () => import('./pages/group-end-template/group-end-template.module')
}, {
  path: 'footer-template',
  loadChildren: () => import('./pages/footer-template/footer-template.module')
}, {
  path: 'header-template',
  loadChildren: () => import('./pages/header-template/header-template.module')
}, {
  path: 'find-ports',
  loadChildren: () => import('./pages/find-ports/find-ports.module')
}, {
  path: 'editing-async',
  loadChildren: () => import('./pages/editing-async/editing-async.module')
}, {
  path: 'editing',
  loadChildren: () => import('./pages/editing/editing.module')
}, {
  path: 'disabling-items',
  loadChildren: () => import('./pages/disabling-items/disabling-items.module')
}, {
  path: 'close-button-template',
  loadChildren: () => import('./pages/close-button-template/close-button-template.module')
}, {
  path: 'adding-on-search-fail-async',
  loadChildren: () => import('./pages/adding-on-search-fail-async/adding-on-search-fail-async.module')
}, {
  path: 'adding-on-search-fail',
  loadChildren: () => import('./pages/adding-on-search-fail/adding-on-search-fail.module')
}];
