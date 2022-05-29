import { Component, Input, OnInit, Output } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private configService: ConfigService) { }
  showMainMenuBar = true;
  @Input() sidemenuConfig;
  @Input() configFor;
  @Input() showSideMenu;

  ngOnInit(): void {
  }

  toggleSideMenu(value: boolean) {
     this.showSideMenu = !this.showSideMenu;
  }

  onEnter(){
    console.log(this.sidemenuConfig);
    const pdfConfigData = {
      sideMenu: this.sidemenuConfig
    };
    localStorage.setItem(this.configFor, JSON.stringify(pdfConfigData));
    location.reload();
  }

}
