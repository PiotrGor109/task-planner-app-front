import {Timestamp} from "rxjs";

export interface Task {
  id: number;
  taskName: String;
  description: String;
  done: boolean;
  taskDate: Timestamp<any>;
  group: {
    id: number,
    taskGroupName: String;
  };
}






