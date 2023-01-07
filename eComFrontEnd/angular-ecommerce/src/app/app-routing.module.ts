import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {path: "add-product", component: AddProductComponent},
  {path: "user-profile-edit/:username", component: EditProfileComponent},
  {path: "product-edit/:id", component: EditProductComponent},
  {path: "user-profile/:username", component: UserProfileComponent},
  {path: "all-users", component: AllUsersComponent},
  {path: "orders", component: OrdersComponent},

  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},

  {path: "checkout", component: CheckoutComponent},
  {path: "cart-details", component: CartDetailsComponent},
  {path: "products/:id", component: ProductDetailsComponent},
  {path: "search/:keyword", component: ProductListComponent},
  {path: "category/:id", component: ProductListComponent},
  {path: "category", component: ProductListComponent},
  {path: "products", component: ProductListComponent},
  {path: "", redirectTo: "/products", pathMatch: "full"},
  {path: "**", redirectTo: "/products", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
