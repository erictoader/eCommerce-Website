import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product'
import { AppConfig } from '../config/app-config'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = AppConfig.baseUrl + "product";
    // private mockBase64Image = "data:image/webp;base64,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";
    private placeholderImage = "assets/images/product-placeholder.png"; 
     constructor(private httpClient: HttpClient){}

    handleImage(product: Product){
        if(product.image == null){
            product.image = this.placeholderImage;
        }else {
            product.image = "data:image/webp;base64," + product.image;
        }    
    }
    
    getProductList(categoryId: number): Observable<Product[]>{
        //bogdan: I think we should recieve always a list, even if we get one item or no item at all...
        const searchUrl = this.baseUrl + (categoryId == 2 ? "/getByName/Sony Turntable - PSLX350H" : "/getAll");
        return this.httpClient.get<Product[]>(searchUrl).pipe(
            map(response => {
                response.forEach(product => this.handleImage(product));
                return response;
            })
        );
    }

    //bogdan: we should use this
    //        getByName -> we should use a regex and return all the items matching that
    searchProducts(keyword: String): Observable<Product[]>{
        const searchUrl = this.baseUrl + `/getByName/${keyword}`;
        return this.httpClient.get<Product[]>(searchUrl).pipe(
            map(response => {
                response.forEach(product => this.handleImage(product));
                return response;
            })
        );
    }

      searchSingleProduct(keyword: String): Observable<Product[]>{
        const searchUrl = this.baseUrl + `/getByName/${keyword}`;
        return this.httpClient.get<Product>(searchUrl).pipe(
            map(response => {
                this.handleImage(response);
                return [response];
            })
        );
    }

    getProduct(id: number): Observable<Product> {
        const searchUrl = this.baseUrl + `/getById/${id}`;
        return this.httpClient.get<Product>(searchUrl).pipe(
            map(response => {
                this.handleImage(response);
                return response;
            })
        );      
    }
}
