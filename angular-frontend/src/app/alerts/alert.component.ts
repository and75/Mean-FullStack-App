/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({ 
    selector: 'alert', 
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss'] })

export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    alerts: Alert[] = [];
    alertSubscription: Subscription;
    routeSubscription: Subscription;

    constructor(private router: Router, private alertService: AlertService) { }

    ngOnInit() {
        // subscribe to new alert notifications
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                    // remove 'keepAfterRouteChange' flag on the rest
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                // add alert to array
                this.alerts.push(alert);

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 8000);
                }
           });

        // clear alerts on location change
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert(alert: Alert) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            // fade out alert
            this.alerts.find(x => x === alert).fade = true;

            // remove alert after faded out
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
            
        } else {
            // remove alert
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    alertText(alert:Alert){
        if (!alert) return;

        const text = [];

        const alertTypeText = {
            [AlertType.Success]: 'Succes',
            [AlertType.Error]:   'Error',
            [AlertType.Info]:    'Info',
            [AlertType.Warning]: 'Warning'
        }
        text.push(alertTypeText[alert.type]);
        return text;
    }

    cssClass(alert: Alert) {
        if (!alert) return;

        const classes = ['alert', 'bg-alert', 'text-white', 'alert-dismissable', 'shadow-alert mb-3', 'rounded'];
        
        if (alert.fade) {
            classes.push('fade');
        }

        if(alert.spinner){
            classes.push('spinner');
        }

        return classes.join(' ');
    }
    
    cssBadgeClass(alert: Alert) {
        if (!alert) return;

        const classes = ['badge', 'd-inline-block','me-3'];
                
        const alertTypeClass = {
            [AlertType.Success]: 'bg-success',
            [AlertType.Error]:   'bg-danger',
            [AlertType.Info]:    'bg-info',
            [AlertType.Warning]: 'bg-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        return classes.join(' ');
    }
}