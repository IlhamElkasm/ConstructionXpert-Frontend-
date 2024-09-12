import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';


import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit, AfterViewInit {

  projets: Projet[] = [];
  dataSource = new MatTableDataSource<Projet>([]);
  displayColumns = ["id", "nom", "date_debut", "date_fin", "description", "budget", "action"];
  selection = new SelectionModel<Projet>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private projetService: ProjetService,private authService:AuthService) {}

  ngOnInit() {
    this.loadProjets();
  }

  // Assign paginator after the view has been initialized
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Load projects from the service and bind to the table
  loadProjets() {
    this.projetService.getProjets().subscribe(
      (data: Projet[]) => {
        this.projets = data;
        this.dataSource.data = this.projets;
        console.log(this.projets)
      },
      (error) => {
        console.log('Error fetching projets', error);
      }
    );
  }
}
