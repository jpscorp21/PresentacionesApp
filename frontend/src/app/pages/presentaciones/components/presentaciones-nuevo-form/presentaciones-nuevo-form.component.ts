import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";
import { PresentacionesNuevoFormService } from "../../services/presentaciones-nuevo-form.service";
import { PresentacionesService } from "../../services/presentaciones.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { Slides } from "../../../../models/slides";
import { CKEditor4, CKEditorComponent } from "ckeditor4-angular";
import { ModalsService } from "../../../../services/util/modals/modals.service";
import { PresentacionesFormatoService } from "../../../../services/presentaciones/presentaciones-formato.service";
import { MatDialog } from "@angular/material";
import { PresentacionesTemasComponent } from "../presentaciones-temas/presentaciones-temas.component";
import { CargandoModalComponent } from "../../../../components/modals/cargando-modal/cargando-modal.component";
import { debounceTime, tap, distinctUntilChanged } from "rxjs/operators";
import { fromEvent, Subscription } from "rxjs";
import { ErrorPresentacion } from "src/app/util/error-presentacion";
import { AppConfigService } from "../../../../services/app-config.service";

@Component({
  selector: "app-presentaciones-nuevo-form",
  templateUrl: "./presentaciones-nuevo-form.component.html",
  styleUrls: ["./presentaciones-nuevo-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PresentacionesNuevoFormService],
})
export class PresentacionesNuevoFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("editor", { static: false }) ckeditor: CKEditorComponent;
  @ViewChild("editor", { static: false, read: ElementRef })
  ckeditorEl: ElementRef;

  id: string = null;
  userid: string = null;
  guardandoParcial = false;

  subcriptionPegado: Subscription;

  public model = {
    editorData: "",
  };

  // {
  //   "slide1": {
  //     "titulo": "Que se puede hacer con angular",
  //     "contenido": ""
  //   },
  //   "slide2": {
  //     "contenido"
  //   }
  // }

  config: CKEditor4.Config = {
    toolbar: [
      {
        name: "basicstyles",
        items: ["Cut", "Copy", "Undo", "Redo", "PasteFromWord"],
      },
      {
        name: "paragraph",
        items: ["BulletedList"],
      },
      {
        name: "insert",
        items: ["Image", "Format"],
      },
    ],
    language: "es",
    image2_maxSize: {
      height: 350,
      width: 250,
    },
    format_tags: "h1;p",
    format_h1: { element: "h1" },
    format_p: { element: "p" },
    uiColor: "#FAFAFA",
    font_names: '"Nanum Gothic", sans-serif',
    extraPlugins: "pastefromword",
    filebrowserBrowseUrl: `https://plasma-winter-253214.firebaseapp.com/imagenes`,
    filebrowserUploadUrl: `${this._config.webservice}/imagenes/add/${
      localStorage.getItem("userid") || ""
    }`,
    uploadUrl: `${this._config.webservice}/imagenes/add`,
    imageUploadUrl: `${this._config.webservice}/imagenes/add/${
      localStorage.getItem("userid") || ""
    }`,
  };

  constructor(
    public presentacionNuevoFrm: PresentacionesNuevoFormService,
    public presentacionSrv: PresentacionesService,
    public snackBar: MatSnackBar,
    public modalsSrv: ModalsService,
    public router: Router,
    public route: ActivatedRoute,
    public presentacionesFormatoSrv: PresentacionesFormatoService,
    public _config: AppConfigService,
    public cdkRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  get form() {
    return this.presentacionNuevoFrm.form;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.userid = localStorage.getItem("userid");

    // if (!this.userid) {
    //     this.router.navigateByUrl('/login');
    //     return;
    // }

    if (!this.id) {
      this.form.patchValue({
        editordata:
          "<h1>Titulo 1</h1><p>Parrafo 1</p><h1>Titulo2</h1><p>Parrafo 2</p>",
      });
      return;
    }

    this.fetchPresentacion();
  }

  ngAfterViewInit() {
    this.subcriptionPegado = fromEvent(this.ckeditorEl.nativeElement, "paste")
      .pipe(debounceTime(100))
      .subscribe((e: any) => {
        // console.log("Al pegar el texto");
        // this.cdkRef.detectChanges();
        // console.log("Actualizado", this.model.editorData);
        // const editordata = this.presentacionesFormatoSrv.formatoEnCambio(
        //   this.form.value.editordata
        // );
        // console.log("que paso broooo", editordata);
        // this.form.patchValue({ editordata });
      });

    this.ckeditor.change
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((v) => {
        // Solo si existe un titulo guarda parcialmente
        // console.log(this.model.editorData);
        if (this.form.value.titulo) {
          this.guardarPartial();
        }
      });
  }

  async openTheme() {
    await this.dialog
      .open(PresentacionesTemasComponent, {
        width: "80%",
        data: {
          control: this.form.get("tema"),
        },
      })
      .afterClosed()
      .toPromise();
  }

  dataChange(event) {
    // console.log(event);
    this.model.editorData = event;
  }

  fetchPresentacion() {
    this.presentacionSrv
      .getById(this.id)
      .toPromise()
      .then((p: Slides) => {
        this.model.editorData = p.editorData;
        this.presentacionNuevoFrm.actualizarFormulario(Object.assign({}, p));
      })
      .catch((e: any) => {
        this.id = null;
        console.log(e);
      });
  }

  async guardar() {
    try {
      if (this.presentacionNuevoFrm.valid) {
        if (this.id) {
          this.actualizar();
          return;
        }

        this.openCargando();

        const json = this.presentacionesFormatoSrv.formatear(
          this.model.editorData,
          this.form.value.tema
        );

        const request = this.createRequest(json);

        (await this.presentacionSrv.add(request))
          .toPromise()
          .then((res: any) => {
            this.presentacionSrv.loadingSubject = false;
            if (res && res._id) {
              this.snackBar.open(
                "La presentacion fue cargada correctamente",
                "Cerrar",
                {
                  duration: 5000,
                }
              );
              this.volver();
            }
          })
          .catch((e: any) => {
            this.presentacionSrv.loadingSubject = false;
            console.log(e);
          });
      }
    } catch (e) {
      console.log(e);
      this.presentacionSrv.loadingSubject = false;
      if (e.message && e instanceof ErrorPresentacion) {
        console.log(e);
        // this.modalsSrv.mensaje(e.message);
      }
    }
  }

  guardarPartial() {
    try {
      if (!this.presentacionNuevoFrm.valid) {
        return;
      }

      const request = {
        editorData: this.model.editorData,
        titulo: this.form.value.titulo,
        tema: this.form.value.tema,
        userid: this.userid,
        id: this.id,
      };

      this.guardandoParcial = true;

      this.presentacionSrv
        .addPartial(request)
        .toPromise()
        .then((res: any) => {
          if (res && res._id) {
            // Establece el id
            this.id = res._id;
          }
        })
        .catch((e: any) => {
          this.snackBar.open("No se pudo guardar la presentación", "Cerrar", {
            duration: 2000,
          });
          console.log(e);
        })
        .finally(() => {
          this.guardandoParcial = false;
          this.cdkRef.detectChanges();
        });
    } catch (e) {
      this.guardandoParcial = false;
      this.cdkRef.detectChanges();
      // console.log(e);
      if (e.message) {
        console.log(e);
        // this.modalsSrv.mensaje(e.message);
      }
    }
  }

  async actualizar() {
    try {
      const json = this.presentacionesFormatoSrv.formatear(
        this.model.editorData,
        this.form.value.tema
      );

      const request = this.createRequest(json);

      if (this.presentacionNuevoFrm.valid) {
        if (!this.id) {
          return;
        }

        this.openCargando();

        (await this.presentacionSrv.update(request, this.id))
          .toPromise()
          .then((res: any) => {
            this.presentacionSrv.loadingSubject = false;
            if (res && res._id) {
              this.snackBar.open(
                "La presentacion fue actualizada correctamente",
                "Cerrar",
                {
                  duration: 5000,
                }
              );
              this.volver();
            }
          })
          .catch((e: any) => {
            this.presentacionSrv.loadingSubject = false;
            console.log(e);
          });
      }
    } catch (e) {
      // console.log(e);
      if (e.message) {
        console.log(e);
        // this.modalsSrv.mensaje(e.message);
      }
    }
  }

  createRequest(json: any): any {
    return {
      formatData: json,
      editorData: this.model.editorData,
      titulo: this.form.value.titulo,
      description: this.form.value.descripcion,
      tema: this.form.value.tema,
      userid: this.userid,
    };
  }

  volver() {
    if (this.id) {
      this.router.navigateByUrl(`/pages/presentaciones/detalle/${this.id}`);
    } else {
      this.router.navigateByUrl("/pages/presentaciones/lista");
    }
  }

  async openCargando() {
    this.presentacionSrv.loadingSubject = true;
    await this.dialog
      .open(CargandoModalComponent, {
        width: "300px",
        height: "300px",
        disableClose: true,
        data: {
          cargando: this.presentacionSrv.loading$,
        },
      })
      .afterClosed()
      .toPromise();
  }

  async reiniciar() {
    if (
      await this.modalsSrv.aceptarCancelar("Estás seguro de reiniciar todo?")
    ) {
      this.presentacionNuevoFrm.reiniciar();
    }
  }

  ngOnDestroy(): void {
    if (this.subcriptionPegado) {
      this.subcriptionPegado.unsubscribe();
    }
  }
}
