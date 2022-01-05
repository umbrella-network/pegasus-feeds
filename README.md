# pegasus-feeds

![Umbrella network - logo](./assets/umb.network-logo.png)

Repository for Reading and Writing feeds.yaml.


## Adding feeds

Install packages.

```
git clone git@github.com:umbrella-network/pegasus-feeds.git
npm install
```

Place text files with equity symbols to be added to the feeds.yaml in the /add/ directory. 

The script expects one symbol per line, and they will be added to the yaml as keys with a "EQ:"-prefix.  

Duplicate keys will be ignored, and a comment including the source file's name will be added above the new entries in the yaml.

Precision of 2, discrepancy of 1 and an initial fetcher of 'PolygonIOPrice', is hard-coded into the main script and can be changed as desired (before compilation).

Use the following run command from within the base directory to compile and run the script:

```
npm start
```