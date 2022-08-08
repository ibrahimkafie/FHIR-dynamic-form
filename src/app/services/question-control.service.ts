import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlBase } from '../models';

@Injectable()
export class QuestionControlService {

  /**
   * Create form group controls from questions controls list.
   * @param questions The questions list.
   */
  public toFormGroup(questions: ControlBase<any>[]): FormGroup {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
