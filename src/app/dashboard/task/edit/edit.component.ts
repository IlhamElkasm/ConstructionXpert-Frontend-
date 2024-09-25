import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private location:Location
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.taskId = +idParam;
      this.initForm();
      this.loadTaskData();
    } else {
      this.showError('Invalid project ID');
      this.location.back();
    }
  }

  initForm() {
    this.taskForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      date_debut: [''],
      date_fin: [''],
      statu: [''],
      idProjet: ['']
    });
  }

  loadTaskData() {
    this.taskService.getTaskById(this.taskId).subscribe(
      (project) => {
        if (project) {
          this.taskForm.patchValue(project);
        } else {
          this.showError('Project not found');
          this.location.back();

        }
      },
      (error) => {
        this.showError('Failed to load project data');
        console.error('Error loading project:', error);
       this.location.back();

      }
    );
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const updatedtask = { ...this.taskForm.value, id: this.taskId };
      this.taskService.updateTask(this.taskId, updatedtask).subscribe(
        () => {
          this.showSuccess('Project updated successfully');
          this.location.back();

        },
        (error) => {
          this.showError('Failed to update project');
          console.error('Error updating project:', error);
        }
      );
    } else {
      this.showError('Please fill out all required fields');
    }
  }

  onCancel() {
    this.location.back();

  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
  }
}
