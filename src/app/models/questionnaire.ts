/**
 * A structured set of questions intended to guide the collection of answers from end-users.
 * @see http://hl7.org/fhir/R4B/questionnaire.html
 */
export interface Questionnaire {
    resourceType: string; // Questionnaire

    /**
     * The "logical id" of the resource assigned by the server responsible for storing it.
     */
    id: string;

    /**
     * An absolute URI that is used to identify this questionnaire.
     */
    url: string;

    /**
     * The status of this questionnaire.
     * @see http://hl7.org/fhir/R4B/valueset-publication-status.html#expansion
     */
    status: 'draft' | 'active' | 'retired' | 'unknown';

    /**
     * The types of subjects that can be the subject of responses created for the questionnaire.
     */
    subjectType: string[];

    /**
     * The date (and optionally time) when the questionnaire was published.
     */
    date: string;

    /**
     * A particular question, question grouping or display text that is part of the questionnaire.
     */
    item: QuestionnaireItem[];
}

export interface QuestionnaireItem {
    /**
     * An identifier that is unique within the Questionnaire allowing linkage to the equivalent item in a QuestionnaireResponse resource.
     */
    linkId: string;

    /**
     * The name of a section, the text of a question or text content for a display item.
     */
    text: string;

    /**
     * The type of questionnaire item this is - whether text for display, a grouping of other items
     * or a particular type of data to be captured (string, integer, coded choice, etc.).
     * (Note) Supported types: 'boolean' | 'choice' | 'date' | 'string'. There are more types to support.
     * @see http://hl7.org/fhir/R4B/valueset-item-type.html
     */
    type: QuestionnaireItemType;

    /**
     * One of the permitted answers for a "choice" or "open-choice" question.
     */
    option?: QuestionnaireItemOption[];
}

export type QuestionnaireItemType = 'boolean' | 'choice' | 'date' | 'string';

export interface QuestionnaireItemOption {
    valueCoding: ValueCoding;
}

export interface ValueCoding {
    /**
     * The identification of the code system that defines the meaning of the symbol in the code.
     */
    system: string;

    /**
     * A symbol in syntax defined by the system.
     */
    code: string;

    /**
     * A representation of the meaning of the code in the system, following the rules of the system.
     */
    display: string;
}
