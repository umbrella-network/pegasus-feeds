# pegasus-feeds

![Umbrella network - logo](./assets/umb.network-logo.png)

Repository for Reading and Writing feeds.yaml.


## Adding feeds

Install packages.

```
git clone git@github.com:umbrella-network/pegasus-feeds.git
npm install
```

Place text files with equity symbols to be added to the feeds.yaml/feeds-5.5.yaml in the /add/ directory.

The script expects one symbol per line, and they will be added to the yaml files as keys with a "EQ:"-prefix.

Duplicate keys will be ignored, and a comment including the source file's name will be added above the new entries in the yaml.

Precision of 2, discrepancy of 1 and an initial fetcher of 'PolygonIOPrice', is hard-coded into the main script and can be changed as desired (before compilation).

After running the code locally, changes to the feeds.yaml can be committed.

Use the following run command from within the base directory to compile and run the script: (assumes typescript already installed globally)

```
npm run script:addFeeds
```

Backups of the original yaml files will be created in the backup dir.  Restore to the previous version using the following command:
Note that only the latest version is kept in backup history.

```
npm run script:restoreFeeds
```

To run an example script that will add the symbols from the files in the /add/ directory then restore the yamls, use:

```
npm run script:example
```

This will print the results of the add / restore to the terminal, displaying the changes of the number of keys.