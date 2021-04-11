import { Component } from '@angular/core';
import { SlideService } from './services/slide.service';
import { DriveService } from './services/drive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularpresentacionapp';

  constructor(
    public slideSrv: SlideService,
    public driveSrv: DriveService
  ) {

  }
}
