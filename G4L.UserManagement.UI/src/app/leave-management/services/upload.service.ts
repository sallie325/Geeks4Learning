import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { setTimeout } from 'timers';
import { FileUpload } from '../models/file-upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadProgress: Observable<number> | undefined;

  private basePath = '/uploads';

  app = initializeApp(environment.firebase);

  private storage = getStorage(this.app);

  constructor(private toastr: ToastrService) {
  }

  getStorage() {
    console.log(this.storage);
  }

  uploadToStorage(fileUpload: FileUpload) {
    const filePath = `${this.basePath}/${fileUpload?.file?.name}`;
    const storageRef = ref(this.storage, filePath);

    if (!fileUpload.file) return null;

    return uploadBytes(storageRef, fileUpload.file)
      .then((snapshot: any) => {
        const progress = (snapshot?.bytesTransferred / snapshot?.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        return getDownloadURL(ref(this.storage, filePath))
          .then((url) => {
            fileUpload.url = url;
            return fileUpload;
          })
          .catch((error) => {
            throw error;
          });
      });

  }
}
