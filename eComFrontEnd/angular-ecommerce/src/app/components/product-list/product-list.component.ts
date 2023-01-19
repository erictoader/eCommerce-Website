import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  isLoading: boolean = false;
  products : Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if (this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const theKeyword = this.route.snapshot.paramMap.get("keyword")!;
    this.isLoading  =true;
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
    this.isLoading  = false;

  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }


    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
