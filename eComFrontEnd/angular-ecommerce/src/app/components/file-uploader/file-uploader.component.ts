import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})




export class FileUploaderComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  preview = '';

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
        //   console.log("BASE64 ? ");
        //   console.log(e.target.result);
          this.preview = e.target.result;
          
        this.fileUploadService.saveUploadImage(this.preview);
        // console.log("CHECK");
        // console.log(this.productService.getUploadImage());
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
}