import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { delay, first, mergeMap, tap } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { NgSwitch } from '@angular/common';

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
  isLoading = true;
  config: any;

  ngOnInit(): void {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.setConfig();
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

  setConfig(){
    this.config = {
      sideMenu: {
        showShare: this.queryParams.showShare && this.queryParams.showShare === 'false' ? false : true,
        showDownload: this.queryParams.showDownload && this.queryParams.showDownload === 'false' ? false : true,
        showReplay: this.queryParams.showReplay && this.queryParams.showReplay === 'false' ? false : true,
        showExit: this.queryParams.showExit && this.queryParams.showExit === 'false' ? false : true,
        showPrint: this.queryParams.showPrint && this.queryParams.showPrint === 'false' ? false : true,
      }
    };
  }

  loadContent() {
    this.playerConfig = {
      context: this.configService.playerConfig.PLAYER_CONTEXT,
      config: this.config,
      metadata: this.contentDetails || this.configService.playerConfig.PDF_PLAYER_METADATA
    };
  }

  playerEvents(event) {

  }
  playerTelemetryEvents(event) {

  }

}
