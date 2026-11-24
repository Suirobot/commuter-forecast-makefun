// Charm the Commuter: Forecast a City That Isn't — entrypoint.
// Writes one line of weather (at most 140 characters) for a city
// that does not exist, to /output/entry.txt for the house judge.
// Competition: u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e
// (make.fun, account @bangjacky). The forecast is assembled from
// beats below, so the outlook and the local detail stay separate.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "/output/entry.txt";

// The forecast, beat by beat: the invented city and its sky first,
// then the detail that makes it feel like a place.
const PARTS = [
  "Port Saffron: sunny with a chance of parades;",
  "highs of 24, lows of mild applause.",
  "Leave the umbrella; confetti likely by noon.",
];
const LINE = PARTS.join(" ");

// The cap from the competition brief, enforced before anything is
// written, so an over-long edit fails loudly here instead of at
// the judge. The gate counts characters of UTF-8 text, so the byte
// length is checked too: a line of multibyte characters could pass
// on chars and still be the wrong size on the wire.
const CAP = 140;
if (LINE.length < 1 || LINE.length > CAP) {
  throw new Error(`entry is ${LINE.length} chars; cap is ${CAP}`);
}
if (Buffer.byteLength(LINE, "utf8") > CAP) {
  throw new Error(`entry is ${Buffer.byteLength(LINE, "utf8")} bytes; cap is ${CAP}`);
}

function main(): void {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  console.log(`wrote ${LINE.length} chars to ${OUT}`);
}

main();
