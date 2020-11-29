import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';


@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  tutorial = {
    id: '',
    firstname: '',
    lastname: '',
    gender: '',
    emailid: '',
    phoneno: '',
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      id: this.tutorial.id,
      firstname: this.tutorial.firstname,
      lastname: this.tutorial.lastname,
      gender: this.tutorial.gender,
      emailid: this.tutorial.emailid,
      phoneno: this.tutorial.phoneno
    };

    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      id: '',
      firstname: '',
      lastname: '',
      gender: '',
      emailid: '',
      phoneno: '',
    };
  }

}
