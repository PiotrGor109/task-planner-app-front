import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TaskGroupComponent} from "./task-group/task-group.component";
import {TaskComponent} from "./task/task.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [

  {path: '', redirectTo:'/tasks', pathMatch:'full', title: 'Task planner'},
  {path: 'taskgroups', component: TaskGroupComponent, title: 'Task planner'},
  {path: 'tasks', component: TaskComponent, title: 'Task planner'},
  {path: 'tasks/:date', component: TaskComponent, title: 'Task planner'},
  {path: '**', component: PageNotFoundComponent, title: 'Task planner'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
