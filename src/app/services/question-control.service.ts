import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ControlBase } from '../models';

@Injectable()
export class QuestionControlService {

  /**
   * Create form group controls from questions controls list.
   * @param questions The questions list.
   */
  public toFormGroup(questions: ControlBase<any>[]): UntypedFormGroup {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new UntypedFormControl(question.value || '', Validators.required)
        : new UntypedFormControl(question.value || '');
    });
    return new UntypedFormGroup(group);
  }
}
