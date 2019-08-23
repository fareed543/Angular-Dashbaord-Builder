import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { JsonService } from '@app/json-form/json.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit, AfterViewInit {
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

  showTree(item: any) {
    if (item.expand) {
      item.expand = !item.expand;
    } else {
      item.expand = true;
    }
  }

  onFormSubmit($event: any) {
    alert('Widget Created');
  }

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
