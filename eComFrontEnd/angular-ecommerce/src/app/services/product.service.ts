import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product'
import { AppConfig } from '../config/app-config'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileUploadService } from './file-upload.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = AppConfig.baseUrl + "product";
    private placeholderImage = "assets/images/product-placeholder.png"; 

     constructor(private httpClient: HttpClient, 
        private fileUploadService: FileUploadService){}

    handleImage(product: Product){
        if(product.image == null){
            return;
            // product.image = this.placeholderImage;
        }else {
            product.image = "data:image/webp;base64," + product.image;
        }    
    }

    handleProductsResponse(response: any){
        const mapResponse = new Map(Object.entries(response));
        let products = mapResponse.get("products") as Product[];
        products.forEach(product => this.handleImage(product));
        products = products.filter(p=>p.image != null);

        return products;
    }

    filterProducts(categoryId: number, response: any){
        let products = this.handleProductsResponse(response);
        let filteredProducts: Product[] = [];
        switch(categoryId){
            //available products
            case 2:
                filteredProducts = products.filter(p => p.available == 1); 
                break;
            //sort by rating
            case 3:
                products.sort((a, b) => a.rating - b.rating);
                filteredProducts = products; 
                break;
            case 4:
                products.sort((a, b) => b.rating - a.rating);
                filteredProducts = products; 
                break;
            //sort by price
            case 5:
                products.sort((a, b) => a.price - b.price);
                filteredProducts = products; 
                break;
            case 6:
                products.sort((a, b) => b.price - a.price);
                filteredProducts = products; 
                break;
            default:
                return products;
        }
        return filteredProducts;
    }
    
    getProductList(categoryId: number): Observable<Product[]>{
        const searchUrl = this.baseUrl + "/getAll";
        return this.httpClient.get<Map<String, any>>(searchUrl).pipe(
            map(response => this.filterProducts(categoryId, response))
        );
    }
    

    getPaginatedProductList(categoryId: number, _page: number): Observable<Product[]>{
        const searchUrl = this.baseUrl + "/getPaginated";
        return this.httpClient.post<Map<String, any>>(searchUrl, {page: _page, quantity: 20}).pipe(
            map(response => this.filterProducts(categoryId, response))
        );
    }

    getProduct(id: number): Observable<Product> {
        const searchUrl = this.baseUrl + `/getById/${id}`;
        return this.httpClient.get<Product>(searchUrl).pipe(
            map(response => {
                const mapResponse = new Map(Object.entries(response));
                const product = mapResponse.get("product");
                this.handleImage(product);
                return product;
            })
        );      
    }

    searchProducts(keyword: String): Observable<Product[]>{
        const searchUrl = this.baseUrl + `/searchByName/${keyword}`;
        return this.httpClient.get<Product[]>(searchUrl).pipe(
            map(response => this.handleProductsResponse(response))
        );
    }

    addProduct(name: String, desc: String, price: number, available: number): Observable<Map<String, any>>{
        const addUrl = this.baseUrl + "/add";
        return this.httpClient.post<Map<String, any>>(
            addUrl, 
            {
                name: name,
                desc: desc,
                price: price,
                available: available,
                image: this.fileUploadService.getUploadImage(),
            }
            ).pipe(
            map(response => {
                console.log(response);
                const mapResponse = new Map(Object.entries(response));
                return mapResponse;
                // return mapResponse.get("product");
                // throw new Error("Check this");
            })
        );
    }

    deleteProduct(id: number): Observable<Map<String, any>> {
        const deleteUrl = this.baseUrl + `/delete?id=${id}`;
        return this.httpClient.delete<Map<String, any>>(deleteUrl).pipe(
            map(response => {
                console.log(response);
                const mapResponse = new Map(Object.entries(response));
                return mapResponse;
            })
        );      
    }

    updateProduct(product:Product): Observable<Map<String, any>>{
        const updateUrl = this.baseUrl + "/update";
        return this.httpClient.put<Map<String, any>>(
            updateUrl, 
            {
                id: product.id,
                name: product.name,
                desc: product.desc,
                price: product.price,
                available: product.available,
                image: this.fileUploadService.getUploadImage().length == 0 ? product.image : this.fileUploadService.getUploadImage(),
            }
            ).pipe(
            map(response => {
                console.log(response);
                let responseMap = new Map(Object.entries(response));
                return responseMap;
                // throw new Error("Check this");
            })
        );
    }
}
