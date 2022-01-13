import {restoreFeeds} from './feeds';
/*
 *
 *  Will restore feeds.yaml and feeds-55.yaml in prod/bsc/ or dev/bsc with yaml files in /backup
 *
 */
(async function () {
  restoreFeeds();
})()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
