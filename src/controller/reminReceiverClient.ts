import {Remin} from '../model/remin';
import {AppConfig} from "../AppConfig";
import fetch from 'node-fetch';
import {MasterPatientIndex} from './mpi';
export async function postReminVaccines(appConfg: AppConfig, remins: Remin[]) {
    const mpi = new MasterPatientIndex();
    for (const r of remins) {
        if (r.national_id != null) {
            const p = mpi.findPatient(r.national_id);
            if (p != null) {
                r.national_id = p.pid;
            }
            const result = await postRemin(appConfg.reminReceiverUrl, r);

        }
    }

}
async function postRemin(url: string, r: Remin) {
    console.log("Posting new vaccine to remin-receiver " + JSON.stringify(r));
    const response = await fetch(
        url + "/vaccine",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(r)
        }
    );
    if (response.ok) {
        return true;
    } else {
        return false;
    }
}
