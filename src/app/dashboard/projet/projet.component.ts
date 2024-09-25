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
export class ProjetComponent implements OnInit, AfterViewInit {

  projets: Projet[] = [];
  dataSource = new MatTableDataSource<Projet>([]);
  displayColumns = ["id", "nom", "date_debut", "date_fin", "description", "budget", "action"];
  selection = new SelectionModel<Projet>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  loadProjets(sortField: string = 'id', sortDirection: string = 'asc') {
    this.projetService.getProjets(sortField, sortDirection).subscribe(
      (data: Projet[]) => {
        this.projets = data;
        this.dataSource.data = this.projets;
        console.log(this.projets);
      },
      (error) => {
        console.log('Error fetching projets', error);
      }
    );
  }

  onSortChange(sort: Sort) {
    if (sort.direction) {
      this.loadProjets(sort.active, sort.direction);
    } else {
      this.loadProjets();
    }
  }
}
