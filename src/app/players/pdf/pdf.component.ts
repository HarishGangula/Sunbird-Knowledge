import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { delay, first, mergeMap, tap } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private configService: ConfigService
  ) { }
  @ViewChild('preview', { static: false }) previewElement: ElementRef;
  public queryParams: any;
  public contentDetails: any;
  playerConfig: any;
  config: any = JSON.parse(localStorage.getItem('pdfConfig')) || {};
  showShare: any = this.config.sideMenu.showShare || false;
  showDownload: any = this.config.sideMenu.showDownload || false;
  showReplay: any = this.config.sideMenu.showReplay || false;
  showExit: any = this.config.sideMenu.showExit || false;
  showPrint: any = this.config.sideMenu.showPrint || false;
  isLoading = true;
  sidemenuConfig = this.config.sideMenu || false;
  showSideMenu = false;
  ShowsharePopup = false;


  ngOnInit(): void {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.getContentDetails().pipe(first(),
      tap((data: any) => {
          this.loadContent();
      }))
      .subscribe((data) => {
        this.isLoading = false;
      },
        (error) => {
          this.isLoading = false;
          alert('Error to load pdf, Loading default pdf');
          this.loadContent();
          console.log('error --->', error);
        }
      );
  }

  private getContentDetails() {
    if (this.queryParams.identifier) {
      const options: any = { params: { fields: 'mimeType,name,artifactUrl' } };
      return this.helperService.getContent(this.queryParams.identifier, options).
        pipe(mergeMap((data) => {
          if (data){
            this.contentDetails = data.result.content;
          }
          return of(data);
        }));
    } else {
      return of({});
    }
  }

  loadContent() {
    this.playerConfig = {
      context: this.configService.playerConfig.PLAYER_CONTEXT,
      config: this.config,
      metadata: this.contentDetails || this.configService.playerConfig.PDF_PLAYER_METADATA
    };
  }

  close() {
    this.ShowsharePopup = false;
  }

  enableSideMenu(){
    this.showSideMenu = true;
  }

  playerEvents(event) {
    if (event.edata.type === 'SHARE') {
      this.ShowsharePopup = true;
    }
  }
  playerTelemetryEvents(event) {

  }

}
