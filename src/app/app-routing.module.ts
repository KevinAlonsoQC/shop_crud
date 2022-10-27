import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{
  //  path: '',
  //  loadChildren: () => import('./Inicio/index/index.module').then( m => m.IndexPageModule)
  //},

  {
    path: '',
    loadChildren: () => import('./Productos/listar-producto/listar-producto.module').then( m => m.ListarProductoPageModule)
  },

  {
    path: 'producto',
    loadChildren: () => import('./Productos/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'modificar-producto/:idProducto',
    loadChildren: () => import('./Productos/modificar-producto/modificar-producto.module').then( m => m.ModificarProductoPageModule)
  },
  {
    path: 'crear-producto',
    loadChildren: () => import('./Productos/crear-producto/crear-producto.module').then( m => m.CrearProductoPageModule)
  },
  {
    path: 'listar-cliente',
    loadChildren: () => import('./Clientes/listar-cliente/listar-cliente.module').then( m => m.ListarClientePageModule)
  },
  {
    path: 'crear-cliente',
    loadChildren: () => import('./Clientes/crear-cliente/crear-cliente.module').then( m => m.CrearClientePageModule)
  },
  {
    path: 'modificar-cliente/:idCliente',
    loadChildren: () => import('./Clientes/modificar-cliente/modificar-cliente.module').then( m => m.ModificarClientePageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./Clientes/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'listar-admin',
    loadChildren: () => import('./Administracion/listar-admin/listar-admin.module').then( m => m.ListarAdminPageModule)
  },
  {
    path: 'crear-admin',
    loadChildren: () => import('./Administracion/crear-admin/crear-admin.module').then( m => m.CrearAdminPageModule)
  },
  {
    path: 'modificar-admin/:idAdmin',
    loadChildren: () => import('./Administracion/modificar-admin/modificar-admin.module').then( m => m.ModificarAdminPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./Administracion/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./Carrito/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'comprar-carrito',
    loadChildren: () => import('./Carrito/comprar-carrito/comprar-carrito.module').then( m => m.ComprarCarritoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
