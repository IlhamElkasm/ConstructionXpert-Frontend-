import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Projet } from 'src/app/models/projet';
import { Task } from 'src/app/models/task';
import { ProjetService } from 'src/app/services/projet.service';
import { TaskService } from 'src/app/services/task.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  taskForm!: FormGroup;
  projets: Projet[] = [];

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      statu: ['', Validators.required],
      idProjet: [null, Validators.required]
    });

    this.projetService.getProjets().subscribe((projects: Projet[]) => {
      this.projets = projects;
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;

      this.taskService.createTask(newTask, newTask.idProjet).subscribe(() => {
        console.log('Task added successfully!');
        this.location.back();
      });
    }
  }
}
