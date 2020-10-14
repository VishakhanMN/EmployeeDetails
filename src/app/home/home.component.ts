import { Component, OnInit } from '@angular/core';
import { EmployeeDetailsService } from '../employee-details.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public empDetails: any[];
  public onClickName: boolean;
  public getSelectedEmpDetails = {};
  public selectedEmployee: any;

  constructor(
    private employeeDetailsService: EmployeeDetailsService
  ) { }

  ngOnInit() {
    this.getEmployeeDetails();
    this.onClickName = false;
  }

  private getEmployeeDetails(): void {
    this.employeeDetailsService.getEmployeeDetails().subscribe(result => {
      this.empDetails = result;
    }, error => {
      console.error("error: ", error);
    });
  }

  public showDetails(emp): any {
    this.onClickName = true;
    this.selectedEmployee = emp;
  }

}
