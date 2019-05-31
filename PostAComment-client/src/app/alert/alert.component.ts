import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertserviceService} from "../services/alertservice.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit,OnDestroy {

  private subscription: Subscription;
  message: any;

  constructor(private alert: AlertserviceService) { }

  ngOnInit() {
    this.subscription = this.alert.getMessage().subscribe(message =>
      {
        this.message = message;
      }
    );
  }

  ngOnDestroy(){

      this.subscription.unsubscribe()
  }
}
