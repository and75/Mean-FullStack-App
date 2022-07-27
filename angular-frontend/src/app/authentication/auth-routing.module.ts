/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from "./authentication.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: 'authentication', component: AuthenticationComponent }
		])
	],
	exports: [
		RouterModule
	]
})
export class AuthenticationRoutingModule { }
