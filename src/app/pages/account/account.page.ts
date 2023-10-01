import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [HeaderComponent]
})
export class AccountPage implements OnInit {

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
  }

}
