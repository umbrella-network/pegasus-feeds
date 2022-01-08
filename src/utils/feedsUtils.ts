import * as fs from 'fs';
import * as yaml from 'js-yaml';

export function getPathToYaml() {
  if (fs.readdirSync('..').includes('dev')) {
    return '../dev/bsc/';
  }
  return '../prod/bsc/';
}

export function readFeedsYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, 'utf8'));
}

export function writeFromFileTo(fromFilePath, toFilePath) {
  const data = fs.readFileSync(fromFilePath, 'utf8');
  fs.writeFileSync(toFilePath, data);
}

export function appendFeedsYaml(filePath, yamlData) {
  //fs.appendFileSync(filepath, yaml.dump(yamlData));
  fs.appendFileSync(filePath, yamlData);
}

export function getAllFiles(dirPath) {
  return fs.readdirSync(dirPath);
}

export function getAllSymbols(filePath) {
  const symbols = [];
  let duplicates = 0;
  fs.readFileSync(filePath, 'utf8')
    .toString()
    .split('\n')
    .forEach((symbol) => {
      if (symbol && symbol != '\n') {
        if (!symbols.includes(symbol)) {
          symbols.push(symbol);
        } else {
          duplicates++;
        }
      }
    });
  console.log('Found ' + symbols.length + ' unique symbols in file');
  if (duplicates) {
    console.log('Found ' + duplicates + ' duplicate symbols in file');
  }
  return symbols.slice();
}

function getEquityDataFields(symbol, discrepancy, precision, fetcher) {
  return {
    discrepancy: discrepancy,
    precision: precision,
    inputs: [{fetcher: {name: fetcher, params: {sym: symbol}}}],
  };
}

export function getEquityYamlDump(symbol, discrepancy, precision, fetcher) {
  const data = {};
  data['EQ:' + symbol] = getEquityDataFields(symbol, discrepancy, precision, fetcher);
  return yaml.dump(data);
}
