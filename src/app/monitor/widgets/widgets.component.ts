import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { JsonService } from '@app/monitor/json.service';
import { NoneComponent } from 'angular7-json-schema-form';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetsComponent implements OnInit, AfterViewInit {
  // gridView = true;

  widgetName: string;
  JsonSchema: any;
  customArray: any = [];
  customJsonSchema = {
    type: 'object',
    properties: {}
  };

  widgets = {
    submit: NoneComponent
  };
  yourAngularSchemaFormLayout: any = [
    // {
    //   "type": "flex",
    //   "flex-flow": "row wrap",
    //   "items": [
    //     "last_name",
    //     "first_name"
    //   ]
    // }
  ];

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
      // this.yourAngularSchemaFormLayout = this.responseData.layout;
    });
  }

  addField(fieldName: any) {
    // this.customJsonSchema.properties[fieldName.key] = fieldName.value;
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
    if (event.previousContainer === event.container) {
      if (event.currentIndex >= this.customArray.length) {
        let k = event.currentIndex - this.customArray.length + 1;
        while (k--) {
          this.customArray.push(undefined);
        }
      }
      this.customArray.splice(event.currentIndex, 0, this.customArray.splice(event.previousIndex, 1)[0]);
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const field = { key: event.item.data['key'], value: event.item.data['value'], label: event.item.data['label'] };
      this.addField(field);
      this.customArray.push(field);
    }

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
      for (const field of this.customArray) {
        console.log(field);
        const label = !!field.label ? field.label : field.key;
        this.customJsonSchema.properties[label] = {
          parameter: field.key,
          type: field.value.type,
          label: field.label
        };
      }
      console.log(this.customJsonSchema);
      // this.customArray
      // return false;
      // this.customJsonSchema = this.customArray;

      const req = { name: this.widgetName, fields: this.customJsonSchema };
      this.jsonService.saveWidget(req).subscribe(response => {
        if (response.success) {
          Swal.fire({
            // position: 'top-end',
            type: 'success',
            title: 'Widget Created',
            showConfirmButton: true,
            // showConfirmButton: false,
            // timer: 1500,
            confirmButtonText: 'Okay'
          }).then(result => {
            console.log(result);
            if (result.value) {
              this.widgetName = '';
              this.customArray = [];
              this.customJsonSchema = {
                type: 'object',
                properties: {}
              };
            }
          });
        }
      });
    } else {
      alert('Enter Widget Name');
    }
  }

  removeParameter(item: any) {
    let index = this.customArray.indexOf(item.value);
    this.customArray.splice(index, 1);
  }

  editParameter(item: any) {
    item.value.label = 'fareed';
    console.log(item.value.label);
  }

  updateLabel(parameter: any, value: string) {
    parameter.value.label = value;
  }
}
