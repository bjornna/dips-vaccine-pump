import fetch from 'node-fetch';

import {QueryBuilder} from '../model/QueryBuilder';
import {ResultSet} from '../model/ResultSet';
import {vaccineToRemin} from './remin';
import {postReminVaccines} from './reminReceiverClient';
import {AppConfig} from "../AppConfig";
export async function pump(appConfig: AppConfig, date: string): Promise<null | string> {
    console.log("Pumping for vaccines after " + date);
    const t = new QueryBuilder(getAql(date));
    const query = t.build();


    const response = await fetch(
        appConfig.ehrStoreUrl + "/api/v1/query",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(query)
        }
    );
    if (response.ok) {
        let latestDate: string | null = null;
        const resultSet = await response.json() as ResultSet;
        if (resultSet.totalResults > 0) {
            console.log("Found new vaccines : n=" + resultSet.totalResults);
            if (resultSet.rows) {
                const vaccines: Vaccine[] = [];
                resultSet.rows.forEach(row => {
                    vaccines.push(rowToVaccine(row));
                })
                if (vaccines.length > 0) {
                    const latestVaccine = vaccines[0];
                    latestDate = latestVaccine.committed;
                    const remins = vaccineToRemin(vaccines);
                    postReminVaccines(appConfig, remins).then(() => {

                    }).catch(err => {
                        console.error("Error posting REMIN vaccines" + err);
                    })

                } else {

                }
            }

        } else {
            console.log("No new vaccines");

        }
        return latestDate;
    } else {
        return null;
    }
}
function rowToVaccine(row: any[]): Vaccine {
    return {
        pid: cellToString(row[0]),
        cid: cellToDistinctString(row[1]),
        vaccine: cellToDistinctString(row[2]),
        manufacturer: cellToString(row[3]),
        batchId: cellToString(row[4]),
        doseNumber: cellToNumber(row[5]),
        placement: cellToString(row[6]),
        organisation: cellToString(row[7]),
        vaccinator: cellToString(row[8]),
        notes: cellToString(row[9]),
        time: cellToDate(row[10]),
        created: cellToDistinctString(row[11]),
        committed: cellToDistinctString(row[12])

    }
}
function cellToNumber(c: any): number {
    if (typeof c == "number") {
        return c;
    }
    else {
        return -1;
    }


}
function cellToDistinctString(c: any) {
    return c + "";
}
function cellToString(c: any): string | undefined {
    if (c == null) {
        return undefined;
    }
    return c + "";
}
function cellToDate(c: any): Date {
    if (typeof c == "string") {
        return new Date(Date.parse(c));
    } else if (typeof c == "object") {
        return new Date();
    } else {
        return new Date();
    }

}
export interface Vaccine {
    pid?: string;
    cid: string;
    vaccine: string;
    manufacturer?: string;
    batchId?: string;
    doseNumber: number;
    placement?: string;
    organisation?: string;
    vaccinator?: string;
    notes?: string;
    time: Date;
    created: string;
    committed: string;
}

function getAql(datestring: string): string {
    return `select
    tag(c,'PatientId') as PID,
   c/uid/value as CID,
   a/description[at0017]/items[at0020]/value/value as Vaccine,
   a/description[at0017]/items[openEHR-EHR-CLUSTER.medication.v1]/items[at0151]/value/value as Manufacturer,
   a/description[at0017]/items[openEHR-EHR-CLUSTER.medication.v1]/items[at0150]/value/value as BatchId,
   a/description[at0017]/items[at0025]/value/magnitude as DoseNumber,
   a/description[at0017]/items[at0140]/items[at0141]/value/value as Placement,
   a/protocol[at0030]/items[openEHR-EHR-CLUSTER.organisation.v0]/items[at0001]/value/value as Organisation,
   a/description[at0017]/items[openEHR-EHR-CLUSTER.person.v0]/items[at0001]/value/value as Vaccinator,
   a/description[at0017]/items[at0024]/value/value as Notes,
   a/time/value as Time,
   vo/time_created/value as TimeCreated,
   
   v/commit_audit/time_committed/value as TimeCommited,
from
   versioned_object vo
   -- [latest_version]
      contains version v 
         contains composition c
          contains ACTION a[openEHR-EHR-ACTION.medication.v1]
where
   a/description[at0017]/items[at0156]/value/defining_code/terminology_id/value = 'SNOMED-CT' and
   a/description[at0017]/items[at0156]/value/defining_code/code_string = '33879002'
   and v/commit_audit/time_committed/value > '${datestring}'
   order by v/commit_audit/time_committed/value desc 
`
}