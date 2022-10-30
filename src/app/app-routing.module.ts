import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Inicio/index/index.module').then( m => m.IndexPageModule)
  },

  {
    path: 'listar-producto',
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
    path: 'carrito/:idCarro',
    loadChildren: () => import('./Carrito/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'comprar-carrito',
    loadChildren: () => import('./Carrito/comprar-carrito/comprar-carrito.module').then( m => m.ComprarCarritoPageModule)
  },
  {
    path: 'sesion-iniciada/:idUser',
    loadChildren: () => import('./Inicio/sesion-iniciada/sesion-iniciada.module').then( m => m.SesionIniciadaPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
