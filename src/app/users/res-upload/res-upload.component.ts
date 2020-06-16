import { Subscription, Subject } from 'rxjs';
import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { map, buffer } from 'rxjs/operators';


@Component({
  selector: 'res-upload',
  templateUrl: './res-upload.component.html',
  styleUrls: ['./res-upload.component.css']
})



export class ResUploadComponent implements OnInit, OnDestroy {
  /* isResultUploaded: boolean
  private isResultUploadedListenerSubs: Subscription; */

  /* public destroyed = new Subject<any>();  */
  private studentResultData
  isResultAvailable = false
  private resultListenerSubs: Subscription

  displayedColumns: string[] = ['name', 'semester', 'contact', 'subject', 'markScored', 'fullMark', 'passMark', 'persentage'];
  dataSource

  constructor(private userService:UserService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resultAvailable(flag){
    this.isResultAvailable = true
  }

  ngOnInit(): void {
    this.userService.getResults()
    this.resultListenerSubs = this.userService
      .getResultUpdated()
      .subscribe((resultData) => {
        if(resultData['resultDataArray'].length){
          this.isResultAvailable = true
          this.resultAvailable(true)
        }

        const resultDataArray = resultData['resultDataArray']

        this.studentResultData = resultDataArray
        this.dataSource = new MatTableDataSource(resultDataArray)
      },(error) => {
        this.isResultAvailable = false
      })
  }

  ngOnDestroy(){
    this.resultListenerSubs.unsubscribe()
  }
}
