import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { JsonService } from '../json.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boardName: string;
  widgets: any;
  //widgets = ['Widget 3', 'Widget 4', 'Widget 5', 'Widget 6'];

  selectedWidgets: any[] = [];

  jsonFormOptions = {
    addSubmit: false, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: true, // Load external css and JavaScript for frameworks
    returnEmptyFields: false, // Don't return values for empty input fields
    setSchemaDefaults: true, // Always use schema defaults for empty fields
    defaultWidgetOptions: { feedback: true } // Show inline feedback icons
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
    this.jsonService.getWidgets().subscribe(response => {
      this.widgets = response.widgets;
    });
  }

  showTree(item: any) {
    if (item.expand) {
      item.expand = !item.expand;
    } else {
      item.expand = true;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    this.selectedWidgets.push(event.item.data);
  }

  saveBoard() {
    if (!!this.boardName) {
      const req = { name: this.boardName, widgets: this.selectedWidgets };
      this.jsonService.saveBoard(req).subscribe(response => {
        if (response.success) {
          Swal.fire({
            // position: 'top-end',
            type: 'success',
            title: 'Board Created',
            showConfirmButton: true,
            // showConfirmButton: false,
            // timer: 1500,
            confirmButtonText: 'Okay'
          }).then(result => {
            console.log(result);
            if (result.value) {
              this.boardName = '';
              this.selectedWidgets = [];
            }
          });
        }
      });
    } else {
      alert('Enter Board Name');
    }
  }

  removeItem(item: any) {
    const index = this.selectedWidgets.indexOf(item);
    this.selectedWidgets.splice(index, 1);
  }
}
