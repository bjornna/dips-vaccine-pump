import {Remin} from '../model/remin';
import {AppConfig} from '../index';
import fetch from 'node-fetch';
export async function postReminVaccines(appConfg: AppConfig, remins: Remin[]) {
    for (const r of remins) {
        if (r.national_id != null) {
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
