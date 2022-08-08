import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ControlBase, QuestionType } from './models';
import { QuestionControlService } from './services';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  /**
   * List of questions.
   */
  @Input()
  questions: ControlBase<any>[] | null = [];

  /**
   * The form group.
   */
  form!: UntypedFormGroup;

  /**
   * The result of the form submit.
   */
  result?: { text: string, value: any }[];

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    // create form group controls
    this.form = this.qcs.toFormGroup(this.questions as ControlBase<string>[]);
  }

  onSubmit() {
    if (this.form.valid) {
      // Submit result
      this.result = this._formatFormFieldsResult(this.form, this.questions!);
    } else {
      // validate all form fields
      this._validateAllFormFields(this.form);
    }
  }

  private _formatFormFieldsResult(form: UntypedFormGroup, questions: ControlBase<string>[]) {
    const fieldsData = form.getRawValue();
    return Object.keys(fieldsData).map(key => {
      const { text, controlType } = questions.find(q => q.key === key)!;
      return {
        text,
        value: controlType === QuestionType.Checkbox ? Boolean(fieldsData[key]) ? 'Yes' : 'No' : fieldsData[key]
      }
    });
  }

  private _validateAllFormFields(form: UntypedFormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field)!;
      control.markAsTouched({ onlySelf: true });
    });
  }
}
