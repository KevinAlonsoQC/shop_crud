import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './Guard/ingresado.guard';
import { NoIngresadoGuard } from './Guard/no-ingresado.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Inicio/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoIngresadoGuard]
  },

  {
    path: 'index',
    loadChildren: () => import('./Inicio/index/index.module').then( m => m.IndexPageModule),
    canActivate: [IngresadoGuard]
  },

  {
    path: 'listar-producto',
    loadChildren: () => import('./Productos/listar-producto/listar-producto.module').then( m => m.ListarProductoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'modificar-producto/:idProducto',
    loadChildren: () => import('./Productos/modificar-producto/modificar-producto.module').then( m => m.ModificarProductoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'crear-producto',
    loadChildren: () => import('./Productos/crear-producto/crear-producto.module').then( m => m.CrearProductoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'listar-cliente',
    loadChildren: () => import('./Clientes/listar-cliente/listar-cliente.module').then( m => m.ListarClientePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'crear-cliente',
    loadChildren: () => import('./Clientes/crear-cliente/crear-cliente.module').then( m => m.CrearClientePageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'modificar-cliente/:idCliente',
    loadChildren: () => import('./Clientes/modificar-cliente/modificar-cliente.module').then( m => m.ModificarClientePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'cliente',
    loadChildren: () => import('./Clientes/cliente/cliente.module').then( m => m.ClientePageModule),
    canActivate: [IngresadoGuard]
  },

  {
    path: 'carrito/:idCliente',
    loadChildren: () => import('./Carrito/carrito/carrito.module').then( m => m.CarritoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'comprar-carrito',
    loadChildren: () => import('./Carrito/comprar-carrito/comprar-carrito.module').then( m => m.ComprarCarritoPageModule),
    canActivate: [IngresadoGuard]
  },

  {
    path: 'producto/:idProducto',
    loadChildren: () => import('./Productos/producto/producto.module').then( m => m.ProductoPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
