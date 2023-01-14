import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  private uploadImage: String = "";
  saveUploadImage(image: String){
      let index = image.indexOf(",");
      this.uploadImage = image.substring(index + 1);
  }
  getUploadImage(){
      return this.uploadImage;
  }
}
