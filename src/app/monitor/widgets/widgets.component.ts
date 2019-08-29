import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { JsonService } from '@app/monitor/json.service';
import { NoneComponent } from 'angular7-json-schema-form';
@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetsComponent implements OnInit, AfterViewInit {
  widgetName: string;
  JsonSchema: any;
  CustomJsonSchema = {
    type: 'object',
    properties: {}
  };

  widgets = {
    submit: NoneComponent
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

  saveWidget() {
    if (!!this.widgetName) {
      const req = { name: this.widgetName, fields: this.CustomJsonSchema };
      this.jsonService.saveWidget(req).subscribe(response => {
        if (response.success) {
          alert('Widget Created');
        }
      });
    } else {
      alert('Enter Widget Name');
    }
  }
}
