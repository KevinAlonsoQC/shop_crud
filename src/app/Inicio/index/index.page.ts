import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  public enSesion: boolean = false;

  constructor(private api: ApiService, private router: Router, private activated: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter(){

  }



}
