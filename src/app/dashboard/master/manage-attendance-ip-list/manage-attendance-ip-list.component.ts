import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rd-manage-attendance-ip-list',
  templateUrl: './manage-attendance-ip-list.component.html',
  styleUrls: ['./manage-attendance-ip-list.component.scss']
})
export class ManageAttendanceIpListComponent implements OnInit {

  public ipList: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
