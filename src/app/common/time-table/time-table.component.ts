import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  unit: string;
  day: string;
  time: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {unit: 'SIT708', day: 'Wednesday', time: '10.00 AM - 12.00 PM'},
  {unit: 'SIT737', day: 'Monday', time: '2.00 PM - 4.00 PM'},
  {unit: 'SIT764', day: 'Thursday', time: '5.00 PM - 7.00 PM'},
  {unit: 'SIT780', day: 'Friday', time: '11.00 AM - 1.00 PM'}
];

@Component({
  selector: 'time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  displayedColumns: string[] = ['unit', 'day', 'time'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
