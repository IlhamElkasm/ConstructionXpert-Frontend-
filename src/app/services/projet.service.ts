import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiUrl = "http://192.168.1.58:8765/api/Projets";

  constructor(private http: HttpClient) { }




  getProjets(sortField: string = 'id', sortDirection: string = 'asc'): Observable<Projet[]> {
    let params = new HttpParams()
      .set('sort', `${sortField},${sortDirection}`);
    return this.http.get<Projet[]>(this.apiUrl, { params });
  }


  // Create new project
  createNewProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, projet);
  }

  // Get all projects
  // getProjets(): Observable<Projet[]> {
  //   return this.http.get<Projet[]>(this.apiUrl);
  // }

  // Get a project by id
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/${id}`);
  }

  // Edit project
  editProjet(id: number, updateData: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/${id}`, updateData);
  }

  //  Delete project by id
  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

// Sorting Ascending
getProjectsWithSortingAsc(field: string): Observable<Projet[]> {
  return this.http.get<Projet[]>(`${this.apiUrl}/Asc/${field}`);
}

// Sorting Descending
getProjectsWithSortingDesc(field: string): Observable<Projet[]> {
  return this.http.get<Projet[]>(`${this.apiUrl}/Desc/${field}`);
}



}
