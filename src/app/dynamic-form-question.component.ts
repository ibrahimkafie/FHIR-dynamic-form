import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ControlBase, QuestionType } from './models';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  public get questionType(): typeof QuestionType {
    return QuestionType;
  }
  @Input() question!: ControlBase<string>;
  @Input() form!: UntypedFormGroup;

  /**
   * Whether the control is in a touched state and not valid.
   */
  get isInvalid() { return this.form.controls[this.question.key].touched && !this.form.controls[this.question.key].valid }
}
