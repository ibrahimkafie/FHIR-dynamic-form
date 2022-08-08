import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlBase } from './models';
import { QuestionService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  questions$: Observable<ControlBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}
