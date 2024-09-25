import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit{

  projets: Projet[] = [];
  dataSource = new MatTableDataSource<Projet>([]);
  displayColumns = ["id", "nom", "date_debut", "date_fin", "description", "budget", "action"];
  selection = new SelectionModel<Projet>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  errorMessage!: string;

  constructor(
    private projetService: ProjetService,
    private authService: AuthService) {}

  ngOnInit() {
    this.loadProjets();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadProjets(): void {
    this.projetService.getProjets().subscribe(
      (data: Projet[]) => {
        if (Array.isArray(data)) {  // Ensure data is an array
          this.projets = data;
          this.dataSource.data = this.projets;
          console.log(this.projets)
        } else {
          this.projets = [];  // Fallback to an empty array if data is not an array
          console.error('API response is not an array');
        }
      },
      error => this.errorMessage = 'Error loading projets'
    );
  }


    // Sort Ascending by field
sortProjectsAsc(field: string): void {
  this.projetService.getProjectsWithSortingAsc(field).subscribe(
    (data: any) => {
      console.log('API response (ascending):', data); // Log the API response
      if (data && Array.isArray(data.response)) {
        this.projets = data.response; // Access the array from 'response'
        //
        this.dataSource.data = this.projets;

      } else {
        this.projets = [];
        console.error('Sorted API response is not an array');
      }
    },
    error => this.errorMessage = 'Error sorting projets (asc)'
  );
}



// Sort Descending by field
sortProjectsDesc(field: string): void {
  this.projetService.getProjectsWithSortingDesc(field).subscribe(
    (data: any) => {
      console.log('API response (descending):', data); // Log the API response
      if (data && Array.isArray(data.response)) {
        this.projets = data.response; // Access the array from 'response'
        this.dataSource.data = this.projets;
      } else {
        this.projets = [];
        console.error('Sorted API response is not an array');
      }
    },
    error => this.errorMessage = 'Error sorting projets (desc)'
  );
}

}
