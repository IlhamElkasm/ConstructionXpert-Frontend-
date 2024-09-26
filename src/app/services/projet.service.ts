import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  // private apiUrl = "http://192.168.1.58:8765/api/Projets";
  private apiUrl = "http://192.168.1.58:8765/api/Projets";


  constructor(private http: HttpClient) { }




    // Fetch projects with server-side sorting
    getProjets(sortDirection: string = 'Asc', sortField: string = 'id'): Observable<Projet[]> {
      const url = `${this.apiUrl}/${sortDirection}/${sortField}`; // Example: /Asc/id or /Desc/name
      console.log(`Fetching projects from: ${url}`); // Log the URL for debugging
      return this.http.get<Projet[]>(url);
    }


     // Get all projects
  getProjetsIntial(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.apiUrl);
  }


  // Create new project
  createNewProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, projet);
  }



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
