const data = [
    ['1000807', '15076500565', 'ROLAND', 'GUNDERSEN', 'mann'],
    ['1000809', '21016400952', 'FINN', 'DOTTNO', 'mann'],
    ['1000811', '12057900499', 'GRY', 'TELOKK', 'kvinne'],
    ['1000813', '13116900216', 'LINE', 'DANSER', 'kvinne'],
    ['1000815', '14019800513', 'FOLKE', 'DANSER', 'mann'],
    ['2009787', '70019950032', 'ANDINE', 'AND', 'kvinne'],
    ['2009788', '05073500186', 'SØRVE', 'VÅNÆSS', 'kvinne'],
    ['2013536', '25036000305', 'FRED', 'PÅJORD', 'kvinne'],
    ['2013537', '02039000183', 'LURÉN', 'DRËYER', 'kvinne'],
    ['2013538', '08077000292', 'HARRY', 'HÄNDEL', 'mann'],
    ['2013539', '15040650560', '**SALVE**', '**JOHAUG**', 'kvinne'],
    ['2013540', '21030550231', 'ÅGOT', 'ABANEN', 'kvinne'],
    ['2013541', '12050050295', 'TRINE', 'FAKTOR', 'kvinne'],
    ['2013542', '29019900248', 'ANN GINA', 'HALS', 'kvinne'],
    ['2013543', '19079800468', 'STINA', 'GRYN', 'kvinne'],
    ['2013544', '04129700489', 'SØLVI', 'NORMALBAKKE', 'kvinne'],
    ['2013991', '99056326525', 'OVLLÁŠ', 'RÁSTOŠ', 'kvinne'],
    ['2013547', '80008117075', 'INGÁ MÁRJÁ', 'BONGU', 'kvinne'],
    ['2013993', '80008621423', 'MARI', 'HØNA', 'kvinne'],
    ['2013995', '80009001259', 'JANNE', 'HONDA', 'kvinne'],
    ['2013997', '80005484026', '**GRO**', '**TESK**', 'kvinne'],
    ['2013999', '03117800252', 'PIA', 'NOBAR', 'kvinne'],
    ['2014001', '19095800273', 'PIA', 'NOBAR', 'kvinne'],
    ['2014003', '23077200290', 'ELSE', 'NETT', 'kvine'],
    ['2014005', '12119000465', 'OGIDA', 'MEYEN', 'kvinne'],
    ['2014007', '11064700342', 'STEIN', 'ALIVE', 'mann'],
    ['2014009', '15045400112', 'KJELL **R.**', 'LEMMEN', 'mann'],
    ['2014011', '19128600143', 'VEGAR', 'BEIDER', 'mann'],
    ['2014013', '14077700162', 'VEGAR', 'BEIDER', 'mann'],
    ['2014015', '07070750710', 'BENT', 'ASIL', 'mann'],
    ['2014017', '09090950972', 'KAI JACK', 'KLUBBEN', 'mann'],
    ['2014019', '51111151158', 'HAKKI', 'HELINEN', 'mann'],
    ['2014021', '13031353453', 'ROSA ELI', 'KOPTER', 'kvinne'],
    ['2014023', '15051555535', 'PER', 'SILLE', 'mann'],
    ['2014025', '02417544944', 'DAN SAUL', 'KNIGHT', 'mann'],
    ['2014027', '50069900890', 'LIV', 'OSTIN', 'kvinne'],
    ['bna10', 'bna10', "BJØRN", "NÆSS", "mann"],
    ['bna11', 'bna11', "JENS", "JENSEN", "mann"],
    ['bna12', 'bna12', "OLA", "VAKSINE", "mann"],

];
function getPatients() {
    const arr: Patient[] = [];
    data.forEach(d => {
        const pid = d[0];
        const fid = d[1];
        const firtName = d[2];
        const lastName = d[3];
        const gender = d[4];
        arr.push({id: pid, pid: fid, firstName: firtName, lastName, gender});


    })

    return arr;
}

export interface Patient {
    id: string;
    pid: string;
    firstName: string;
    lastName: string;
    gender: string;
}
export class MasterPatientIndex {
    private patients: Patient[];
    constructor() {
        this.patients = getPatients();

    }
    public findPatient(pid: string): Patient | null {
        const result: Patient | null = null;
        for (const p of this.patients) {
            if (p.id === pid || p.pid == pid) {
                return p;
            }
        }

        return result;

    }
}