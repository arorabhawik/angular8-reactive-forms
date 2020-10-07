import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { promise } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['sample', 'test'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'gender': new FormControl('male')
    });

    // this is how we set the values with a method
    this.signupForm.setValue({
      'username': 'max',
      'email': '',
      'gender': 'male'
    });
  }

  public onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  // synch validator
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true};
    } else {
      return null;
    }
  }
  // asynch validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const pro = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@Test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return pro;
  }
}
