import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //objects dùng truy cập tới grid
  private gridApi: any;
  private gridColumnApi: any;

  //objects cài đặt cho properties của grid
  modules: any = AllModules;
  columnDefs: any;
  defaultColDef: any;
  sideBar: any;
  rowGroupPanelShow: any;
  pivotPanelShow: any;
  rowData: any;


  constructor(private http: HttpClient) {
    //cài đặt column definitions
    this.columnDefs = [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
      { field: 'sport' },
      { field: 'year' },
      { field: 'date' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ];

    //cài đặt column definitions mặc định cho các columns
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      width: 100,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
    };

    //cài đặt sideBar
    this.sideBar = { toolPanels: ['columns'] };

    //cài đặt rowGroupPanelShow
    this.rowGroupPanelShow = 'always';

    //cài đặt pivotPanelShow
    this.pivotPanelShow = 'always';
  }

  //xử lý sự kiện "save state"
  saveState() {
    (window as any).colState = this.gridColumnApi.getColumnState();
    console.log('column state saved');
  }

  //xử lý sự kiện "restore state"
  restoreState() {
    if (!(window as any).colState) {
      console.log('no columns state to restore by, you must save state first');
      return;
    }

    this.gridColumnApi.applyColumnState({
      state: (window as any).colState,
      applyOrder: true,
    });
    console.log('column state restored');
  }

  //xử lý sự kiện "reset state"
  resetState() {
    this.gridColumnApi.resetColumnState();
    console.log('column state reset');
  }

  //xử lý sự kiện ngay sau khi grid được khởi tạo
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    //tải dữ liệu hiện thị lên grid
    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
