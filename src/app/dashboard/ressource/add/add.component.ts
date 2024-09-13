import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Projet } from 'src/app/models/projet';
import { Task } from 'src/app/models/task';
import { Ressource } from 'src/app/models/ressource';
import { ProjetService } from 'src/app/services/projet.service';
import { TaskService } from 'src/app/services/task.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  ressourceForm!: FormGroup;
  tasks: Task[]= [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private ressourceService: RessourceService,
    private location: Location
  ) {}


  ngOnInit():void{
    this.ressourceForm = this.fb.group({

      nom: ['', Validators.required],
      typee: ['', Validators.required],
      quantité: ['', Validators.required],
      idTache: [null, Validators.required]
    });

    this.taskService.getTasks().subscribe((tasks)=>{
      this.tasks = tasks;
    })
  }

  addRessource():void{
    if(this.ressourceForm.valid){
      const newRessource: Ressource = this.ressourceForm.value;


      this.ressourceService.createRessource(newRessource,newRessource.idTache).subscribe(()=>{
        console.log('Ressource added successfully!');
        this.location.back();
      });
    }
  }


}
