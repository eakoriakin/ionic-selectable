import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    loadChildren:  () => import('./pages/home/home.module').then(m => m.HomePageModule)
  }, {
    path: 'labels',
    loadChildren:  () => import('./pages/labels/labels.module').then(m => m.LabelsPageModule)
  }, {
    path: 'basic',
    loadChildren:  () => import('./pages/basic/basic.module').then(m => m.BasicPageModule)
  }, {
    path: 'inside-modal',
    loadChildren:  () => import('./pages/inside-modal/inside-modal.module').then(m => m.InsideModalPageModule)
  }, {
    path: 'form-control',
    loadChildren:  () => import('./pages/form-control/form-control.module').then(m => m.FormControlPageModule)
  }, {
    path: 'close-button-text',
    loadChildren:  () => import('./pages/close-button-text/close-button-text.module').then(m => m.CloseButtonTextPageModule)
  }, {
    path: 'primitive-types',
    loadChildren:  () => import('./pages/primitive-types/primitive-types.module').then(m => m.PrimitiveTypesPageModule)
  }, {
    path: 'initial-value',
    loadChildren:  () => import('./pages/initial-value/initial-value.module').then(m => m.InitialValuePageModule)
  }, {
    path: 'is-enabled',
    loadChildren:  () => import('./pages/is-enabled/is-enabled.module').then(m => m.IsEnabledPageModule)
  }, {
    path: 'can-clear',
    loadChildren:  () => import('./pages/can-clear/can-clear.module').then(m => m.CanClearPageModule)
  }, {
    path: 'is-multiple',
    loadChildren:  () => import('./pages/is-multiple/is-multiple.module').then(m => m.IsMultiplePageModule)
  }, {
    path: 'on-search',
    loadChildren:  () => import('./pages/on-search/on-search.module').then(m => m.OnSearchPageModule)
  }, {
    path: 'infinite-scroll',
    loadChildren:  () => import('./pages/infinite-scroll/infinite-scroll.module').then(m => m.InfiniteScrollPageModule)
  }, {
    path: 'min-max-selection',
    loadChildren:  () => import('./pages/min-max-selection/min-max-selection.module').then(m => m.MinMaxSelectionPageModule)
  }, {
    path: 'scroll-to-top',
    loadChildren:  () => import('./pages/scroll-to-top/scroll-to-top.module').then(m => m.ScrollToTopPageModule)
  }, {
    path: 'virtual-scroll',
    loadChildren:  () => import('./pages/virtual-scroll/virtual-scroll.module').then(m => m.VirtualScrollPageModule)
  }, {
    path: 'should-store-item-value',
    loadChildren:  () => import('./pages/should-store-item-value/should-store-item-value.module').then(m => m.ShouldStoreItemValuePageModule)
  }, {
    path: 'placeholder',
    loadChildren:  () => import('./pages/placeholder/placeholder.module').then(m => m.PlaceholderPageModule)
  }, {
    path: 'infinite-scroll-is-multiple',
    loadChildren:  () => import('./pages/infinite-scroll-is-multiple/infinite-scroll-is-multiple.module').then(m => m.InfiniteScrollIsMultiplePageModule)
  }, {
    path: 'cascading',
    loadChildren:  () => import('./pages/cascading/cascading.module').then(m => m.CascadingPageModule)
  }, {
    path: 'values-ellipsis-template',
    loadChildren:  () => import('./pages/values-ellipsis-template/values-ellipsis-template.module').then(m => m.ValuesEllipsisTemplatePageModule)
  }, {
    path: 'value-template',
    loadChildren:  () => import('./pages/value-template/value-template.module').then(m => m.ValueTemplatePageModule)
  }, {
    path: 'title-template',
    loadChildren:  () => import('./pages/title-template/title-template.module').then(m => m.TitleTemplatePageModule)
  }, {
    path: 'search-fail-template',
    loadChildren:  () => import('./pages/search-fail-template/search-fail-template.module').then(m => m.SearchFailTemplatePageModule)
  }, {
    path: 'placeholder-template',
    loadChildren:  () => import('./pages/placeholder-template/placeholder-template.module').then(m => m.PlaceholderTemplatePageModule)
  }, {
    path: 'multiple-values-template',
    loadChildren:  () => import('./pages/multiple-values-template/multiple-values-template.module').then(m => m.MultipleValuesTemplatePageModule)
  }, {
    path: 'message-template',
    loadChildren:  () => import('./pages/message-template/message-template.module').then(m => m.MessageTemplatePageModule)
  }, {
    path: 'icon-template',
    loadChildren:  () => import('./pages/icon-template/icon-template.module').then(m => m.IconTemplatePageModule)
  }, {
    path: 'item-template',
    loadChildren:  () => import('./pages/item-template/item-template.module').then(m => m.ItemTemplatePageModule)
  }, {
    path: 'item-end-template',
    loadChildren:  () => import('./pages/item-end-template/item-end-template.module').then(m => m.ItemEndTemplatePageModule)
  }, {
    path: 'item-icon-template',
    loadChildren:  () => import('./pages/item-icon-template/item-icon-template.module').then(m => m.ItemIconTemplatePageModule)
  }, {
    path: 'grouping-virtual-scroll',
    loadChildren:  () => import('./pages/grouping-virtual-scroll/grouping-virtual-scroll.module').then(m => m.GroupingVirtualScrollPageModule)
  }, {
    path: 'grouping',
    loadChildren:  () => import('./pages/grouping/grouping.module').then(m => m.GroupingPageModule)
  }, {
    path: 'group-template',
    loadChildren:  () => import('./pages/group-template/group-template.module').then(m => m.GroupTemplatePageModule)
  }, {
    path: 'group-end-template',
    loadChildren:  () => import('./pages/group-end-template/group-end-template.module').then(m => m.GroupEndTemplatePageModule)
  }, {
    path: 'footer-template',
    loadChildren:  () => import('./pages/footer-template/footer-template.module').then(m => m.FooterTemplatePageModule)
  }, {
    path: 'header-template',
    loadChildren:  () => import('./pages/header-template/header-template.module').then(m => m.HeaderTemplatePageModule)
  }, {
    path: 'find-ports',
    loadChildren:  () => import('./pages/find-ports/find-ports.module').then(m => m.FindPortsPageModule)
  }, {
    path: 'editing-async',
    loadChildren:  () => import('./pages/editing-async/editing-async.module').then(m => m.EditingAsyncPageModule)
  }, {
    path: 'editing',
    loadChildren:  () => import('./pages/editing/editing.module').then(m => m.EditingPageModule)
  }, {
    path: 'disabling-items',
    loadChildren:  () => import('./pages/disabling-items/disabling-items.module').then(m => m.DisablingItemsPageModule)
  }, {
    path: 'close-button-template',
    loadChildren:  () => import('./pages/close-button-template/close-button-template.module').then(m => m.CloseButtonTemplatePageModule)
  }, {
    path: 'adding-on-search-fail-async',
    loadChildren:  () => import('./pages/adding-on-search-fail-async/adding-on-search-fail-async.module').then(m => m.AddingOnSearchFailAsyncPageModule)
  }, {
    path: 'adding-on-search-fail',
    loadChildren:  () => import('./pages/adding-on-search-fail/adding-on-search-fail.module').then(m => m.AddingOnSearchFailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
