import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public data = [];

  public saveDataInCSV(name:string, data: Array<any>): void {
    if (data.length == 0) return;

    let keys = Object.keys(data[0]);
    let keyLine = keys.join(',') + '\n';

    let csvContent = keyLine;

    let rows:string[] = [];
    
    data.forEach((item) => {
      let values:string[] = [];
    
      keys.forEach((key) => {
        let val:any = item[key];

        if (val) {
          val = val.toString();
        } else {
          val = '';
        }
        values.push(val);
      });
      rows.push(values.join(','));
    });
    csvContent += rows.join('\n');

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }


  public async importDataFromCSV(event:any): Promise<Array<string>> {


    //make a warning if list is not empty

    const file: File = event.target.files[0];
    let fileContent = await file.text();

    const headers = fileContent.slice(0, fileContent.indexOf('\n')).split(',');
    const rows = fileContent.slice(fileContent.indexOf('\n') + 1).split('\n');

    let arr:any[] = [];
    rows.forEach((row) => {
      let values = row.split(',');

      let obj:any = new Object();

      for (let index = 0; index < headers.length; index++) {
        const key:string = headers[index];

        let val:any = values[index];
        if (val === '') {
          val = null;
        }

        obj[key] = val;
      }

      let intKeys:string[] = ['laneNumber', 'exerciseDefinitionId'];
      intKeys.forEach((key) => {
        if (obj[key]) {
          obj[key] = parseInt(obj[key]);
        }
      });

      arr.push(obj);
    });

    return arr;
  }
}
