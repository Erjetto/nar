import { Component, OnInit } from '@angular/core';
import { Role, Message } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';

@Component({
  selector: 'rd-modify-announcement',
  templateUrl: './modify-announcement.component.html',
  styleUrls: ['./modify-announcement.component.scss']
})
export class ModifyAnnouncementComponent implements OnInit {

  public memberTypes: Role[];

  public announcements: Message[];

  constructor() {
    this.announcements = MockData.GetMessage.map(Message.fromJson);
    console.log(this.announcements)
  }

  ngOnInit(): void {
  }

}
