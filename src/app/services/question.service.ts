import { Injectable } from '@angular/core';
import QuestionnaireJson from '../../assets/questionnaire.json';
import { of } from 'rxjs';
import {
    ControlBase, Questionnaire, CheckboxControl, DatepickerControl,
    SelectControl, TextboxControl, QuestionnaireItemType, QuestionnaireItemOption
} from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionService {

    private readonly _questionnaireData = QuestionnaireJson as Questionnaire;

    private readonly _controlsMapping: { [key in QuestionnaireItemType]: any } = {
        boolean: CheckboxControl,
        choice: SelectControl,
        date: DatepickerControl,
        string: TextboxControl
    }

    public getQuestions(): Observable<ControlBase<any>[]> {

        // mapping the questions based on type
        const questions: ControlBase<any>[] = (this._questionnaireData.item || []).map((question, index) => {
            const { type, linkId, text, option } = question;
            return new this._controlsMapping[type]({
                key: linkId,
                text,
                required: true, // Apply validation for all inputs
                ...(option && { options: this._getQuestionOptions(option) }),
                order: index,
            });
        });

        // sorting the questions based on the order number.
        return of(questions.sort((a, b) => a.order - b.order));
    }

    private _getQuestionOptions(option: QuestionnaireItemOption[]): ControlBase<any>['options'] {
        return (option || []).map(({ valueCoding }) => ({ value: valueCoding.code, display: valueCoding.display }));
    }
}
