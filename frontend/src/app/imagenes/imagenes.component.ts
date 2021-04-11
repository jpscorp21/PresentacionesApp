import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagenesService } from '../services/imagenes/imagenes.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent implements OnInit {

  CKEditor: string;
  CKEditorFuncNum: number;
  langCode: string;
  imagenes$ = null;
  imageURL = '';

  constructor(
    private route: ActivatedRoute,
    private imagenesSrv: ImagenesService
  ) { }

  ngOnInit() {
    this.CKEditor = this.route.snapshot.queryParams.CKEditor;
    this.CKEditorFuncNum = Number(this.route.snapshot.queryParams.CKEditorFuncNum) || 0;
    this.langCode = this.route.snapshot.queryParams.langCode;

    this.findImagenesByUser();
  }

  findImagenesByUser() {
    const userid = localStorage.getItem('userid');
    this.imagenes$ = this.imagenesSrv.findImagenesByUser(userid);
  }

  cargarImagen() {
    if (this.imageURL.length) {
      window.opener.CKEDITOR.tools.callFunction(this.CKEditorFuncNum, this.imageURL);
      window.close();
    } else {
      window.close();
    }
  }

  seleccionarImagen(img: any) {

    this.imageURL = img.imageURL;
  }

}
