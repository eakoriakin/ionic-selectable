import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'labels',
    loadComponent: () => import('./pages/labels/labels.page').then(m => m.LabelsPage)
  },
  {
    path: 'basic',
    loadComponent: () => import('./pages/basic/basic.page').then(m => m.BasicPage)
  },
  {
    path: 'inside-modal',
    loadComponent: () => import('./pages/inside-modal/inside-modal.page').then(m => m.InsideModalPage)
  },
  {
    path: 'form-control',
    loadComponent: () => import('./pages/form-control/form-control.page').then(m => m.FormControlPage)
  },
  {
    path: 'close-button-text',
    loadComponent: () => import('./pages/close-button-text/close-button-text.page').then(m => m.CloseButtonTextPage)
  },
  {
    path: 'primitive-types',
    loadComponent: () => import('./pages/primitive-types/primitive-types.page').then(m => m.PrimitiveTypesPage)
  },
  {
    path: 'initial-value',
    loadComponent: () => import('./pages/initial-value/initial-value.page').then(m => m.InitialValuePage)
  },
  {
    path: 'is-enabled',
    loadComponent: () => import('./pages/is-enabled/is-enabled.page').then(m => m.IsEnabledPage)
  },
  {
    path: 'can-clear',
    loadComponent: () => import('./pages/can-clear/can-clear.page').then(m => m.CanClearPage)
  },
  {
    path: 'is-multiple',
    loadComponent: () => import('./pages/is-multiple/is-multiple.page').then(m => m.IsMultiplePage)
  },
  {
    path: 'on-search',
    loadComponent: () => import('./pages/on-search/on-search.page').then(m => m.OnSearchPage)
  },
  {
    path: 'infinite-scroll',
    loadComponent: () => import('./pages/infinite-scroll/infinite-scroll.page').then(m => m.InfiniteScrollPage)
  },
  {
    path: 'min-max-selection',
    loadComponent: () => import('./pages/min-max-selection/min-max-selection.page').then(m => m.MinMaxSelectionPage)
  },
  {
    path: 'scroll-to-top',
    loadComponent: () => import('./pages/scroll-to-top/scroll-to-top.page').then(m => m.ScrollToTopPage)
  },
  {
    path: 'virtual-scroll',
    loadComponent: () => import('./pages/virtual-scroll/virtual-scroll.page').then(m => m.VirtualScrollPage)
  },
  {
    path: 'should-store-item-value',
    loadComponent: () => import('./pages/should-store-item-value/should-store-item-value.page').then(m => m.ShouldStoreItemValuePage)
  },
  {
    path: 'placeholder',
    loadComponent: () => import('./pages/placeholder/placeholder.page').then(m => m.PlaceholderPage)
  },
  {
    path: 'infinite-scroll-is-multiple',
    loadComponent: () => import('./pages/infinite-scroll-is-multiple/infinite-scroll-is-multiple.page').then(m => m.InfiniteScrollIsMultiplePage)
  },
  {
    path: 'cascading',
    loadComponent: () => import('./pages/cascading/cascading.page').then(m => m.CascadingPage)
  },
  {
    path: 'values-ellipsis-template',
    loadComponent: () => import('./pages/values-ellipsis-template/values-ellipsis-template.page').then(m => m.ValuesEllipsisTemplatePage)
  },
  {
    path: 'value-template',
    loadComponent: () => import('./pages/value-template/value-template.page').then(m => m.ValueTemplatePage)
  },
  {
    path: 'title-template',
    loadComponent: () => import('./pages/title-template/title-template.page').then(m => m.TitleTemplatePage)
  },
  {
    path: 'search-fail-template',
    loadComponent: () => import('./pages/search-fail-template/search-fail-template.page').then(m => m.SearchFailTemplatePage)
  },
  {
    path: 'placeholder-template',
    loadComponent: () => import('./pages/placeholder-template/placeholder-template.page').then(m => m.PlaceholderTemplatePage)
  },
  {
    path: 'multiple-values-template',
    loadComponent: () => import('./pages/multiple-values-template/multiple-values-template.page').then(m => m.MultipleValuesTemplatePage)
  },
  {
    path: 'message-template',
    loadComponent: () => import('./pages/message-template/message-template.page').then(m => m.MessageTemplatePage)
  },
  {
    path: 'icon-template',
    loadComponent: () => import('./pages/icon-template/icon-template.page').then(m => m.IconTemplatePage)
  },
  {
    path: 'item-template',
    loadComponent: () => import('./pages/item-template/item-template.page').then(m => m.ItemTemplatePage)
  },
  {
    path: 'item-end-template',
    loadComponent: () => import('./pages/item-end-template/item-end-template.page').then(m => m.ItemEndTemplatePage)
  },
  {
    path: 'item-icon-template',
    loadComponent: () => import('./pages/item-icon-template/item-icon-template.page').then(m => m.ItemIconTemplatePage)
  },
  {
    path: 'grouping-virtual-scroll',
    loadComponent: () => import('./pages/grouping-virtual-scroll/grouping-virtual-scroll.page').then(m => m.GroupingVirtualScrollPage)
  },
  {
    path: 'grouping',
    loadComponent: () => import('./pages/grouping/grouping.page').then(m => m.GroupingPage)
  },
  {
    path: 'group-template',
    loadComponent: () => import('./pages/group-template/group-template.page').then(m => m.GroupTemplatePage)
  },
  {
    path: 'group-end-template',
    loadComponent: () => import('./pages/group-end-template/group-end-template.page').then(m => m.GroupEndTemplatePage)
  },
  {
    path: 'footer-template',
    loadComponent: () => import('./pages/footer-template/footer-template.page').then(m => m.FooterTemplatePage)
  },
  {
    path: 'header-template',
    loadComponent: () => import('./pages/header-template/header-template.page').then(m => m.HeaderTemplatePage)
  },
  {
    path: 'find-ports',
    loadComponent: () => import('./pages/find-ports/find-ports.page').then(m => m.FindPortsPage)
  },
  {
    path: 'editing-async',
    loadComponent: () => import('./pages/editing-async/editing-async.page').then(m => m.EditingAsyncPage)
  },
  {
    path: 'editing',
    loadComponent: () => import('./pages/editing/editing.page').then(m => m.EditingPage)
  },
  {
    path: 'disabling-items',
    loadComponent: () => import('./pages/disabling-items/disabling-items.page').then(m => m.DisablingItemsPage)
  },
  {
    path: 'close-button-template',
    loadComponent: () => import('./pages/close-button-template/close-button-template.page').then(m => m.CloseButtonTemplatePage)
  },
  {
    path: 'adding-on-search-fail-async',
    loadComponent: () => import('./pages/adding-on-search-fail-async/adding-on-search-fail-async.page').then(m => m.AddingOnSearchFailAsyncPage)
  },
  {
    path: 'adding-on-search-fail',
    loadComponent: () => import('./pages/adding-on-search-fail/adding-on-search-fail.page').then(m => m.AddingOnSearchFailPage)
  }
];
