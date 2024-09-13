import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent  implements OnInit, AfterViewInit {

  tasks:Task[] =[];
  dataSource = new MatTableDataSource<Task>([]);
  displayColumns = ["id","idProjet", "nom", "date_debut", "date_fin", "description","statu", "action"];
  selection = new SelectionModel<Task>(true, []);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private taskService: TaskService,
    private authService:AuthService
  ){}


  ngOnInit(): void {
    this.loadtasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadtasks() {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
        this.dataSource.data = this.tasks;
        console.log(this.tasks)
      },
      (error) => {
        console.log('Error fetching tasks', error);
      }
    );
  }



}
