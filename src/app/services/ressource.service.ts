import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ressource } from '../models/ressource';


@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  constructor(private http:HttpClient) { }


  private apiUrl = "http://localhost:8765/api/Ressource";



 // Create Ressource
 createRessource(ressource: Ressource, idTache: number): Observable<Ressource> {
  return this.http.post<Ressource>(`${this.apiUrl}/${idTache}`, ressource);
}

// Get Ressource by ID
getRessourceById(id: number): Observable<Ressource> {
  return this.http.get<Ressource>(`${this.apiUrl}/${id}`);
}

// Get all Ressources
getAllRessources(): Observable<Ressource[]> {
  return this.http.get<Ressource[]>(this.apiUrl);
}

// Edit Ressource by ID
editRessource(id: number, updateData: Ressource): Observable<Ressource> {
  return this.http.put<Ressource>(`${this.apiUrl}/${id}`, updateData);
}

// Delete Ressource by ID
deleteRessource(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

// Delete all Ressources by Task ID
deleteRessourcesByTaskId(taskId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/tache/${taskId}`);
}







}
