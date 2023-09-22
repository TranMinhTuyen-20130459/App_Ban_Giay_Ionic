import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [HeaderComponent]
})
export class AccountPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
