import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  q = '';

  // page = 1;
  // count = 0;
  // pageSize = 3;
  // pageSizes = [3, 6, 9];

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  // getRequestParams(searchTitle: string, page: number, pageSize: number): any {
  //   // tslint:disable-next-line:prefer-const
  //   let params = {};

  //   if (searchTitle) {
  //     params[`title`] = searchTitle;
  //   }

  //   if (page) {
  //     params[`page`] = page - 1;
  //   }

  //   if (pageSize) {
  //     params[`size`] = pageSize;
  //   }

  //   return params;
  // }

  // retrieveTutorials(): void {
  //   const params = this.getRequestParams(this.q, this.page, this.pageSize);

  //   this.tutorialService.getAll(params)
  //     .subscribe(
  //       response => {
  //         const { tutorials, totalItems } = response;
  //         this.tutorials = tutorials;
  //         this.count = totalItems;
  //         console.log(response);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // handlePageChange(event: number): void {
  //   this.page = event;
  //   this.retrieveTutorials();
  // }

  // handlePageSizeChange(event: { target: { value: number; }; }): void {
  //   this.pageSize = event.target.value;
  //   this.page = 1;
  //   this.retrieveTutorials();
  // }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }


  setActiveTutorial(tutorial: any, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTutorials();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.tutorialService.findByTitle(this.q).pipe(debounceTime(800),
    distinctUntilChanged())
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
