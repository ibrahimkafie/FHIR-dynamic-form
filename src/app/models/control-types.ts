export class ControlBase<T> {
  /**
   * Control value.
   */
  value: T | undefined;

  /**
   * A unique identifier for the control.
   */
  key: string;

  /**
   * Control text (question).
   */
  text: string;

  /**
   * Whether the control value is required.
   */
  required: boolean;

  /**
   * The display order number.
   */
  order: number;

  /**
   * The type of the control.
   * @see @{@link QuestionType}
   */
  controlType: QuestionType;

  /**
   * Used with ${@link TextboxControl} only.
   * Supported values:  @see https://www.w3schools.com/html/html_form_input_types.asp
   */
  type: string;

  /**
   * Used with ${@link SelectControl} only.
   */
  options: { value: string, display: string }[];

  constructor(options: {
    value?: T;
    key?: string;
    text?: string;
    required?: boolean;
    order?: number;
    controlType?: QuestionType;
    type?: string;
    options?: { value: string, display: string }[];
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.text = options.text || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || QuestionType.Textbox;
    this.type = options.type || '';
    this.options = options.options || [];
  }
}

export enum QuestionType {
  Checkbox = 'checkbox',
  Datepicker = 'datepicker',
  Select = 'select',
  Textbox = 'textbox'
};

export class CheckboxControl extends ControlBase<boolean> {
  override controlType = QuestionType.Checkbox;
}

export class DatepickerControl extends ControlBase<Date> {
  override controlType = QuestionType.Datepicker;
}

export class SelectControl extends ControlBase<string> {
  override controlType = QuestionType.Select;
}

export class TextboxControl extends ControlBase<string> {
  override controlType = QuestionType.Textbox;
}
