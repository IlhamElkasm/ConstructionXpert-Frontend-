import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  constructor(private projetService: ProjetService) {}

  ngOnInit() {
    this.loadProjets();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProjets() {
    this.projetService.getProjetsIntial().subscribe(
      (data: Projet[]) => {
        this.projets = data;
        this.dataSource.data = this.projets;
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }

  // Apply filter to the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
