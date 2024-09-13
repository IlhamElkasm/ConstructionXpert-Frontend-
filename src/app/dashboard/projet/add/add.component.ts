import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  projetForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private location: Location

  ) {}


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.projetForm = this.fb.group({
      nom: ['', [Validators.required]],
      date_debut: ['', [Validators.required]],
      date_fin: ['', [Validators.required]],
      description: ['', [Validators.required]],
      budget: ['', [Validators.required, Validators.min(0)]]
    });
}



onSubmit() {
  if (this.projetForm.valid) {
    const newProjet = this.projetForm.value;
    this.projetService.createNewProjet(newProjet).subscribe(
      (response) => {
        console.log('Project created successfully', response);
        this.location.back();
      },
      (error) => {
        console.error('Error creating project', error);
      }
    );
  } else {
    Object.values(this.projetForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
}




