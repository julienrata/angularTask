import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, delay, filter, map, of } from 'rxjs';
import { Task } from '../models/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly TASKS: Task[] = [
    { 
      id: 1, 
      title: 'Apprendre Angular', 
      completed: false,
      status: 'in-progress',
      description: 'Suivre le cours Angular sur Dyma et réaliser le projet de fin de formation.',
      dueDate: new Date('2025-04-15'),
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Faire les courses', 
      completed: true,
      status: 'completed',
      description: 'Acheter des fruits, légumes, et produits d\'entretien.',
      dueDate: new Date('2025-03-02'),
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'Lire un livre', 
      completed: false,
      status: 'pending',
      description: 'Lire "Clean Code" de Robert C. Martin.',
      dueDate: new Date('2025-03-30'),
      priority: 'low'
    },
  ];
  private tasks: Task[] = [];
  private taskSubject = new BehaviorSubject<Task[]>([]);
  private taskHistorySubject = new ReplaySubject<Task[]>(10);
  public tasks$ = this.taskSubject.asObservable();
  public taskHistory$ = this.taskHistorySubject.asObservable();

  constructor() {
    this.tasks = [...this.TASKS]; // Make a copy to avoid mutating the original
    this.taskSubject.next(this.tasks);
    this.taskHistorySubject.next(this.tasks);
  }

  public getTasks(): Task[] {
    return [...this.taskSubject.value]; // Return a copy to prevent direct mutations
  }

  public getTaskById(id: number): Observable<Task | undefined> {
    // Simulate network delay
    return of(this.taskSubject.value.find(task => task.id === id)).pipe(
      delay(300) // Simulate API delay
    );
  }

  /*  En résumé
    Un Observable permet de gérer des données asynchrones en temps réel.
    .pipe() est utilisé pour transformer ces données avant qu'elles ne soient envoyées aux abonnés.
    L'exemple getFilteredTasks(completed: boolean) écoute la liste des tâches et n'émet que celles qui correspondent au filtre. 
  */
  getFilteredTasks(completed: boolean): Observable<Task[]> {
    return this.tasks$.pipe(
      filter((tasks) => tasks.length > 0), // Filtre pour éviter d'émettre des tableaux vides
      map((tasks) => tasks.filter((task) => task.completed === completed))
    );
  }

  public add(title: string, description?: string, priority?: 'low' | 'medium' | 'high', dueDate?: Date): void {
    const newTask: Task = {
      id: this.getLastTaskId() + 1,
      title: title,
      completed: false,
      status: 'pending',
      description: description,
      priority: priority || 'medium',
      dueDate: dueDate
    };
    const updatedTasks = [...this.taskSubject.value, newTask];
    this.tasks = updatedTasks;
    this.taskSubject.next(updatedTasks);
    this.taskHistorySubject.next(updatedTasks);
  }

  public remove(id: number): void {
    const updatedTasks = this.taskSubject.value.filter(
      (task) => task.id !== id
    );
    this.tasks = updatedTasks;
    this.taskSubject.next(updatedTasks);
    this.taskHistorySubject.next(updatedTasks);
  }

  public complete(id: number): void {
    const updatedTasks = this.updateTaskCompletion(this.taskSubject.value, id);
    this.tasks = updatedTasks;
    this.taskSubject.next(updatedTasks);
    this.taskHistorySubject.next(updatedTasks);
  }

  public update(updatedTask: Task): Observable<Task> {
    const updatedTasks = this.taskSubject.value.map(task => 
      task.id === updatedTask.id ? { ...updatedTask } : task
    );
    this.tasks = updatedTasks;
    this.taskSubject.next(updatedTasks);
    this.taskHistorySubject.next(updatedTasks);
    
    // Return the updated task with a delay to simulate API call
    return of(updatedTask).pipe(delay(300));
  }

  private getLastTaskId(): number {
    const tasks = this.taskSubject.value;
    if (tasks.length === 0) return 0;
    
    // Find the highest ID
    return Math.max(...tasks.map(task => task.id));
  }

  private updateTaskCompletion(tasks: Task[], id: number): Task[] {
    return tasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );
  }
}