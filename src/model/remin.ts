// To parse this data:
//
//   import { Convert, Remin } from "./file";
//
//   const remin = Convert.toRemin(json);

export interface Remin {
    allergic_reaction?: boolean;
    cleared_by?: ClearedByEnum;
    completed_at: Date;
    given_by?: string;
    national_id: string;
    notes?: string;
    organization: string;
    parental_consent_given?: boolean;
    parental_consent_given_at?: Date;
    placement?: PlacementEnum;
    self_declaration?: ReminSelfDeclaration[];
    vaccination_step?: number;
    vaccine: ReminVaccine;
    valid_identification?: boolean;
}

/**
 * An enumeration.
 */
export enum ClearedByEnum {
    CommonPractitioner = "COMMON_PRACTITIONER",
    NotCleared = "NOT_CLEARED",
    OtherDoctor = "OTHER_DOCTOR",
    Patient = "PATIENT",
}

/**
 * An enumeration.
 */
export enum PlacementEnum {
    LeftArm = "LEFT_ARM",
    LeftLeg = "LEFT_LEG",
    Other = "OTHER",
    RightArm = "RIGHT_ARM",
    RightLeg = "RIGHT_LEG",
}

export interface ReminSelfDeclaration {
    answer: boolean;
    notes?: string;
    question: string;
}

export interface ReminVaccine {
    manufacturer: string;
    name: string;
    batch_id: string
}

// Converts JSON strings to/from your types
export class Convert {
    public static toRemin(json: string): Remin {
        return JSON.parse(json);
    }

    public static reminToJson(value: Remin): string {
        return JSON.stringify(value);
    }
}
