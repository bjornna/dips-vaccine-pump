import {Vaccine} from './pump';
import {ReminVaccine, Remin, PlacementEnum} from '../model/remin';
export function vaccineToRemin(vaccines: Vaccine[]): Remin[] {
    const remins: Remin[] = [];
    for (const v of vaccines) {
        const r = transformVaccine(v);
        if (r != null) {
            remins.push(r);
        }

    }
    return remins;
}
function transformVaccine(v: Vaccine): Remin | null {
    if (v.pid) {
        const r: Remin = {
            completed_at: v.time,
            given_by: v.vaccinator,
            national_id: v.pid,
            notes: v.notes,
            organization: v.organisation + "",
            placement: placementToEnum(v.placement + ""),
            vaccination_step: v.doseNumber,
            vaccine: {
                name: v.vaccine,
                manufacturer: v.manufacturer ? v.manufacturer : "UKJENT"
            }

        }
        return r;
    } else {
        return null;
    }
}
function placementToEnum(s: string): PlacementEnum {
    switch (s.toLowerCase()) {
        case "høyre arm":
            return PlacementEnum.RightArm;
        case "venstre arm":
            return PlacementEnum.LeftArm;
        case "venstre bein":
            return PlacementEnum.LeftLeg;
        case "høyre bein":
            return PlacementEnum.RightLeg;
        default:
            return PlacementEnum.Other;
    }
}