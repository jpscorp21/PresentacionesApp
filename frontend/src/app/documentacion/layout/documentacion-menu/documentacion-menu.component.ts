import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-documentacion-menu',
  templateUrl: './documentacion-menu.component.html',
  styleUrls: ['./documentacion-menu.component.scss']
})
export class DocumentacionMenuComponent implements OnInit, AfterViewInit {

  modoTabled = false;
  mode = 'over';
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.breakpointObserver.observe('(max-width: 1999px)')
    .subscribe((result) => {
      this.modoTabled = true;
    });

    this.breakpointObserver.observe('(min-width: 1200px)')
    .subscribe((result) => {
      this.modoTabled = false;
    });
  }

  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 1200) {
        // this.sidenav.open();
        return true;
    } else {
        // this.sidenav.close();
        return false;
    }
  }

}
