/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

 import { Inject, Injectable } from '@angular/core';
 import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
 @Injectable({
   providedIn: 'root'
 })
 export class LocalStorageService {
   
   prefix = 'appPost-';
   
   constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
 
   public store(key: string, value: any): void {
     key = this.prefix+key;
     //Insert updated value to local storage
     this.storage.set(key, value);
     console.log(this.storage.get(key) || 'LocaL storage is empty');
   }
 
   public load(key: string): any {
     key = this.prefix+key;
     //Load value
     const localStorage = this.storage.get(key) || null;
     //Return value
     return localStorage;
   }
   public remove(key: string) {
     key = this.prefix+key;
     //Get array of tasks from local storage
     return this.storage.remove(key);
   }
   
 }