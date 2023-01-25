import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../services/http.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Task} from "../models/task";
import {formatDate} from "@angular/common";
import {Taskgroup} from "../models/taskgroup";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[];
  @ViewChild('form') mytemplateForm: NgForm;
  actualDate: Date;
  actualDateGoTo: Date;
  dateShow: String;
  modelAdd: Partial<Task> = {};
  modelEdit: Partial<Task> = {};
  modelDescription: Partial<Task> = {}
  group: {id: number, taskGroupName: String} = {id: 1, taskGroupName: "random"};
  test: number =0;
  taskGroupsSelect: Taskgroup[] = [];
  helperGroup: String;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.actualDate = new Date();
    this.getTaskwithDate()
    this.http.getTaskGroups().subscribe(groupSelect => this.taskGroupsSelect=groupSelect)
  }

  public getTaskwithDate(): void {
    this.dateShow = formatDate(this.actualDate, 'yyyy-MM-dd', 'en');
    this.http.getTasksWithDate(this.dateShow.toString()).subscribe(
      (response) => {
        console.log(this.dateShow)
        this.tasks = response;
      },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      });}


  nextDay(actualDate: Date)
  {
    this.actualDate.setDate(actualDate.getDate()+1);
    console.log('DATE CHANGED to: '+ this.actualDate)
    this.dateShow = formatDate(this.actualDate, 'yyyy-MM-dd', 'en');
    this.getTaskwithDate();
  }

  previousDay(actualDate: Date)
  {
    this.actualDate.setDate(actualDate.getDate()-1);
    console.log('DATE CHANGED to: '+ this.actualDate)
    this.dateShow = formatDate(this.actualDate, 'yyyy-MM-dd', 'en');
    this.getTaskwithDate();
  }

  goToDate(actualDateGoTo: Date)
  {
    let workDate = new Date(this.actualDateGoTo).getDate();
    this.actualDate.setDate(workDate);
    console.log('DATE CHANGED to: '+ workDate)
    this.dateShow = formatDate(workDate, 'yyyy-MM-dd', 'en');
    this.getTaskwithDate();
  }

  onAddTask()
  {
    this.modelAdd.group = {id: this.group.id, taskGroupName: this.group.taskGroupName};
    // @ts-ignore
    this.test = this.taskGroupsSelect.find(value => value.taskGroupName == this.group.taskGroupName).id;
    this.modelAdd.group = {id: this.test, taskGroupName: this.group.taskGroupName};
    this.http.postTasks(this.modelAdd as Task).subscribe((response: Task) => {this.getTaskwithDate()})
    this.mytemplateForm.reset();
  }

  onDeleteTask(taskId: number)
  {
    this.http.deleteTask(taskId).subscribe((response: void) => {this.getTaskwithDate()})
    console.log('DELETING TASK')
  }

  onEditTask(task: Task)
  {
    this.modelEdit.group = {id: this.group.id, taskGroupName: this.group.taskGroupName};
    // @ts-ignore
    this.test = this.taskGroupsSelect.find(value => value.taskGroupName == this.group.taskGroupName).id;
    this.modelEdit.group = {id: this.test, taskGroupName: this.group.taskGroupName};
    this.http.updateTask(this.modelEdit as Task).subscribe((response: Task) => {this.getTaskwithDate()})
    console.log('EDIT TASK')
    this.mytemplateForm.reset();
  }

  onShowDescription(task: Task)
  {
    this.modelDescription=task;
    console.log('DESCRIPTION')
    console.log(this.modelDescription.id)
  }

  showEditWindowTask(task: Task) {
    this.modelEdit=task;
    this.modelEdit.group = {id: task.group.id, taskGroupName: task.group.taskGroupName};
    console.log(this.modelEdit.group?.taskGroupName)
    this.helperGroup=task.group.taskGroupName;
  }
}
