import * as cron from "node-cron";
import {pump} from "./controller/pump";
import * as dotenv from "dotenv";
import {AppConfig} from "./AppConfig";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
dotenv.config();

let currentLatestCommitTime = new Date().toISOString();

const ehrStoreUrl = process.env.EHRSTORE_LOCATION_URL;
const reminReceiverUrl = process.env.REMIN_URL;

if (ehrStoreUrl && reminReceiverUrl) {
    const appConf: AppConfig = {
        ehrStoreUrl: ehrStoreUrl,
        reminReceiverUrl: reminReceiverUrl
    }
    cron.schedule('*/5 * * * * *', () => {
        console.log('running a pump task');

        pump(appConf, currentLatestCommitTime).then((res) => {
            console.log("Pumped ok");
            if (res != null) {
                currentLatestCommitTime = res;
            }

        }).catch(err => {
            console.log("Error pumping" + err);
        })

    });

} else {
    console.error("You must set the attributes for EHRSTORE_LOCATION_URL and REMIN_URL to ENV");
}