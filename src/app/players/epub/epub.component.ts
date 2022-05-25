import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { delay, first, mergeMap, tap } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-epub',
  templateUrl: './epub.component.html',
  styleUrls: ['./epub.component.scss']
})
export class EpubComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private configService: ConfigService
  ) { }
  public queryParams: any;
  public contentDetails: any;
  playerConfig: any;
  isLoading = true;
  context =  this.configService.playerConfig.PLAYER_CONTEXT;
  config: any;

  ngOnInit(): void {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.setConfig();
    this.getContentDetails().pipe(first(),
      tap((data: any) => {
        if (this.contentDetails){
          this.loadContent();
        }else{
          this.loadDefaultData();
        }
      }))
      .subscribe((data) => {
        this.isLoading = false;
      },
        (error) => {
          this.isLoading = false;
          alert('Error to load epub, Loading default epub');
          this.loadDefaultData();
          console.log('error --->', error);
        }
      );
  }

  setConfig(){
    this.config = {
      traceId: '123456',
      sideMenu: {
        showShare: this.queryParams.showShare && this.queryParams.showShare === 'false' ? false : true,
        showDownload: this.queryParams.showDownload && this.queryParams.showDownload === 'false' ? false : true,
        showReplay: this.queryParams.showReplay && this.queryParams.showReplay === 'false' ? false : true,
        showExit: this.queryParams.showExit && this.queryParams.showExit === 'false' ? false : true,
        showPrint: this.queryParams.showPrint && this.queryParams.showPrint === 'false' ? false : true,
      }
    };
  }

  loadDefaultData(){
    this.playerConfig = {
      context: this.context,
      config: this.config,
      metadata: this.configService.playerConfig.EPUB_PLAYER_METADATA
    } ;
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
      context: this.context,
      config: this.config,
      metadata: this.contentDetails
    };
  }

  playerEvents(event) {

  }
  playerTelemetryEvents(event) {

  }
}
