import {Component, Input, OnInit} from '@angular/core';
import {BodyService} from "../services/body.service";
import {subscribeOn} from "rxjs/operators";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {


  count: number = 0;
  postVault: any = [];
  posted: any
  req: any;
  itemsperpage: number = 5;
  searchFilter: any = {title: '', postedby: '', postedon: ''};
  p: number = 1;
  Search: any = '';
  page: { pageNo: number; itemsPerPage: number };
  total: number;


  constructor(private bodyservice: BodyService) {
  }

  ngOnInit() {
    this.getALL(this.p);
  }

  /*
     accessing service from BodyService it will subcribe the data from observble publisher
     the  getall() method will access titles for a particular post
   */

  getALL(pg) {

    this.p = pg;

    this.page = {
      pageNo: this.p,
      itemsPerPage: 5
    };

    this.bodyservice.gettitles(this.page).subscribe((response) => {

      this.total = response.count;
      this.postVault = response.rows;
    });
  }


  //unimplemented and unused method [for future purposes]
  increment(id: any) {

    let viewValue;
    this.bodyservice.getViews(id).subscribe((response) => {
        viewValue = response.views;
        if (viewValue === 0) {
          viewValue++;
        } else {
          viewValue++;
        }
      },
      error1 => {
        console.log(error1);
      },
      () => {

        this.bodyservice.postViews(viewValue, id).subscribe((response) => {
        });

      }
    );
  }


  searchValue(branch) {

    if (branch === 'title') {
      let key = 'title';
      this.bodyservice.searchViews(this.searchFilter.title, key).subscribe((response) => {

          // this.searchParsing(response);

          this.postVault = response;
          console.log(response);
        },
        error1 => {
          console.log(error1);
        },
        () => {

        }
      )
    } else if (branch === 'postedby') {
      let key = 'postedby';
      this.bodyservice.searchViews(this.searchFilter.postedby, key).subscribe((response) => {
          this.postVault = response;
          console.log(response);
        },
        error1 => {
          console.log(error1);
        },
        () => {

        }
      )
    } else if (branch === 'postedon') {
      let key = 'postedon';
      console.log(this.searchFilter.postedon);
      this.bodyservice.searchViews(this.searchFilter.postedon, key).subscribe((response) => {
          console.log('posetd on data',response);
          this.postVault = response;
        },
        error1 => {
          console.log(error1);
        },
        () => {

        }
      )
    }
  }
}
