import { Component } from '@angular/core';
import { Transaction } from 'src/models/constructor.model';
import { User } from 'src/models/simple.model';
import { CsvService } from 'src/services/csv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _csvService: CsvService) {}

  // all property has a string data type
  public arrayWithSimpleData: Array<User> = [
    { name: 'Eve', email: 'eve22@mail.com', city: 'San Francisco' },
    { name: 'John', email: 'john123@mail.com', city: 'London' },
    { name: 'Nick', email: 'super0nick@mail.com', city: 'Madrid' },
  ];

  // complex class all properties has different data type
  public dataWithConstructor: Array<Transaction> = [
    { id: '1', amount: 100, wallet: 'sarah wallet', fees: 5, errors: false },
    { id: '2', amount: 245, wallet: 'alex wallet', fees: 3, errors: true },
    { id: '3', amount: 78, wallet: 'kate wallet', fees: 4, errors: true },
  ];


  public importedData:Array<any> = [];

  public saveDataInCSV(name: string, data: Array<any>): void {
    let csvContent = this._csvService.saveDataInCSV(data);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }


  public async importDataFromCSV(event: any) {

    const file: File = event.target.files[0];
    let fileContent = await file.text();

    this.importedData = this._csvService.importDataFromCSV(fileContent);
  }

  public async importDataFromCSVByType(event: any) {
    const file: File = event.target.files[0];
    let fileContent = await file.text();

    this.importedData = this._csvService.importDataFromCSVByType(
      fileContent,
      new Transaction()
    );
    debugger;
  }
}
