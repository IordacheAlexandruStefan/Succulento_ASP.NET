import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucculentListComponent } from './components/succulent-list/succulent-list.component'; // adjust the path as needed
import { AccountComponent } from './components/account/account.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './admin.guard';

const routes: Routes = [
  { path: 'succulents', component: SucculentListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: SucculentListComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'account', component: AccountComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] }, // Assuming you have an AdminGuard
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
