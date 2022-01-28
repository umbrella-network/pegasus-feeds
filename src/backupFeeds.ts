import {backupFeeds} from './feeds';
/*
 *
 *  Will create backups of feeds.yaml and feeds-55.yaml in prod/bsc/ or dev/bsc with in /backup
 *
 */
(async function () {
    backupFeeds();
})()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
