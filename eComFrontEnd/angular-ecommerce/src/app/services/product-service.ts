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
    
    constructor(private httpClient: HttpClient){}

    getProductList(): Observable<Product[]>{
        return this.httpClient.get<GetResponse>(this.baseUrl + "/getAll").pipe(
            map(response => response._embedded.products)
        );
    }
}

interface GetResponse{
    _embedded:{
        products: Product[];
    }
}
