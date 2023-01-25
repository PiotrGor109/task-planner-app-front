import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Taskgroup} from "../models/taskgroup";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  private urlTask = "http://localhost:8080/tasks";
  private urlTaskGroup = "http://localhost:8080/taskgroups";


  //TASK METHODS
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.urlTask)
  }

  getTasksWithDate(task_date: String): Observable<Task[]> {
    console.log(`${this.urlTask}/${task_date}`)
    return this.httpClient.get<Task[]>(`${this.urlTask}/${task_date}`)
  }

  postTasks(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.urlTask, task)
  }

  public deleteTask(taskId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlTask}/${taskId}`);
  }

  public updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.urlTask, task);
  }


  //TASK GROUP METHODS
  getTaskGroups(): Observable<Taskgroup[]> {
    return this.httpClient.get<Taskgroup[]>(this.urlTaskGroup)
  }

  postTaskGroup(taskgroup: Taskgroup): Observable<Taskgroup> {
    return this.httpClient.post<Taskgroup>(this.urlTaskGroup, taskgroup)
  }

  public deleteTaskGroup(TaskGroupId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlTaskGroup}/${TaskGroupId}`);
  }

  public updateTaskGroup(taskgroup: Taskgroup): Observable<Taskgroup> {
    return this.httpClient.put<Taskgroup>(`${this.urlTaskGroup}`, taskgroup);
  }
}
