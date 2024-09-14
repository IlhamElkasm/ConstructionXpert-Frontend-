import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Ressource } from 'src/app/models/ressource';
import { RessourceService } from 'src/app/services/ressource.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit, AfterViewInit {

  ressources: Ressource[] = [];
  dataSource = new MatTableDataSource<Ressource>([]);
  displayColumns = ["id","idTache", "nom", "typee", "quantite", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ressourceService: RessourceService) {}

  ngOnInit(): void {
    this.loadRessources();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadRessources() {
    this.ressourceService.getAllRessources().subscribe(
      (data: Ressource[]) => {
        this.ressources = data;
        this.dataSource.data = this.ressources;
        console.log(this.ressources);
      },
      (error) => {
        console.error('Error fetching resources', error);
      }
    );
  }
}
