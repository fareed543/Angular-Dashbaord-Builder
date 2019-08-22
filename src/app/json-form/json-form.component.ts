import { Component, OnInit, AfterViewInit } from '@angular/core';
import { JsonService } from './json.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss']
})
export class JsonFormComponent implements OnInit, AfterViewInit {
  JsonSchema: any;

  CustomJsonSchema = {
    type: 'object',
    properties: {}
  };
  yourAngularSchemaFormLayout: any = [];
  yourData: any[] = [];
  responseData: any;
  fieldCount: number = 0;

  constructor(private jsonService: JsonService) {}
  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.showJsonForm();
    }, 0);
  }

  showJsonForm() {
    this.jsonService.getJsonData().subscribe(response => {
      this.responseData = response;
      // this.yourData = this.responseData.data;
      this.JsonSchema = this.responseData.schema;
      //this.yourAngularSchemaFormLayout = this.responseData.layout;
    });
  }

  addField(fieldName: any) {
    this.CustomJsonSchema.properties[fieldName.key] = fieldName.value;
    this.yourAngularSchemaFormLayout = {
      key: fieldName.key,
      notitle: true
    };
  }

  // todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];

  drop(event: CdkDragDrop<string[]>) {
    const field = { key: event.item.data['key'], value: event.item.data['value'] };
    this.addField(field);
    console.log(event.container);
    console.log(event.previousContainer);
    /*if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }*/
  }
}
