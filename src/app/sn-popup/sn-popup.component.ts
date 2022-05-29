import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { PlayerService } from '../services/player/player.service';

@Component({
  selector: 'app-sn-popup',
  templateUrl: './sn-popup.component.html',
  styleUrls: ['./sn-popup.component.scss']
})
export class SnPopupComponent implements OnInit {
  showShareLinkModel: boolean;

  constructor(private playerService: PlayerService) { }
  shareLink = location.href;
  // @Output() showShareLinkModel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() ShowsharePopup = false;
  @Output() closeSharePopup = new EventEmitter();

  ngOnInit(): void {
  //   this.ShowsharePopup.subscribe(() => {
  //     console.log('index ' + this.ShowsharePopup);
  // });
    // this.showShareLinkModel = this.playerService.showShareLinkModel;
  }

  copyLink(inputElement) {
    inputElement.select();
    document.execCommand('copy');
  }

  closeModel() {
    this.ShowsharePopup = false;
    this.closeSharePopup.emit();
  }

  toggleSharePopup(){
    // this.showShareLinkModel = false;
    // this.showShareLinkModel.emit(false);
    //this.ShowsharePopup = false;
  }
}
