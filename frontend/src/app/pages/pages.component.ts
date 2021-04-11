import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
    public router: Router
  ) {
    // if (!localStorage.getItem('token')) {
      // router.navigateByUrl('/login');
    //}
  }

  ngOnInit() {

  }

}
