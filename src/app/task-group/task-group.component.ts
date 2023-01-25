import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../services/http.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Taskgroup} from "../models/taskgroup";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.css']
})
export class TaskGroupComponent implements OnInit {

  taskgroups: Taskgroup[];
  @ViewChild('form') mytemplateForm: NgForm;
  model: Partial<Taskgroup> = {};
  modelEdit: Partial<Taskgroup> = {};
  displayStyleEdit: string = 'none';
  displayStyleAdd: string = 'block';
  public editForm: Taskgroup;

   constructor(private http: HttpService) { }

   ngOnInit() {
     this.getTaskGroups()
   }


  public getTaskGroups(): void {
    this.http.getTaskGroups().subscribe(
      (response) => {
        this.taskgroups = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      });}


  onAddTaskGroup()
  {
    this.http.postTaskGroup(this.model as Taskgroup).subscribe((response: Taskgroup) => {this.getTaskGroups()})
    console.log('ADDING NEW TASK GROUP')
    console.log(this.model.taskGroupName)
    this.mytemplateForm.reset();
  }

  onDeleteTaskGroup(taskGroupId: number)
  {
    this.http.deleteTaskGroup(taskGroupId).subscribe((response: void) => {this.getTaskGroups()})
    console.log('DELETING TASK GROUP')
  }

  onEditTaskGroup(taskgroup: Taskgroup)
  {
    this.http.updateTaskGroup(taskgroup).subscribe((response: Taskgroup) => {this.getTaskGroups()})
    console.log(taskgroup.id + " " +taskgroup.taskGroupName)
    this.mytemplateForm.reset();
  }

  showEditWindow(taskgroup: Taskgroup) {
     this.modelEdit=taskgroup;
  }
}
