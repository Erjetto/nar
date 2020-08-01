import { Component, OnInit } from '@angular/core';
import { ClientGeneration } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';

@Component({
  selector: 'rd-manage-generation',
  templateUrl: './manage-generation.component.html',
  styleUrls: ['./manage-generation.component.scss']
})
export class ManageGenerationComponent implements OnInit {

  public generations: ClientGeneration[];

  public editForm: ClientGeneration;

  constructor() { }

  ngOnInit(): void {
    this.generations = MockData.GetGenerations.map(ClientGeneration.fromJson);
  }

  onSelectGeneration(gen){
    this.editForm = gen;
  }

  onCancelEdit(){this.editForm = null;}
}
