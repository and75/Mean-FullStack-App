/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../alerts/alert.service';
import { Vocabulary } from 'src/app/_models/vocabulary';
import { VocabularyService } from '../vocabulary.service';
import { VocabularyFormComponent } from '../vocabulary-form/vocabulary-form.component'


@Component({
  selector: 'app-vocabulary-view',
  templateUrl: './vocabulary-view.component.html',
  styleUrls: ['./vocabulary-view.component.scss']
})
export class VocabularyViewComponent implements OnInit, OnDestroy {

  data: Vocabulary;
  contentID: number = null

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private service: VocabularyService,
    private alertService: AlertService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.contentID = this.route.snapshot.params['id'];
      if (this.contentID) {
        this.getContent();
      }
    });
  }

  ngOnDestroy() { }

  getContent() {
    this.service.getOne(this.contentID).subscribe((res): any => {
      if (res.succes == true) {
        this.data = new Vocabulary(res.payload.data);
        console.log(this.data);
        this.titleService.setTitle('Vocabolary Term : ' + this.data.en);
      }
    })
  }

  edit(row) {
    const addDialog = this.dialog.open(VocabularyFormComponent, {
      data  : row,
      width : '400px',
      height: '650px'
    });
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.service.update(result.data._id, result.form).subscribe(res => {
          if (res.succes) {
            this.getContent();
            this.alertService.success(res.mess, { 'keepAfterRouteChange': true, 'autoClose': true, 'spinner': false })
          } else {
            this.alertService.error(res.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
          }
        })
      }
    });
  }

}
