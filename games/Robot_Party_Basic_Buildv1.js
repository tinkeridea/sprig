/*
@title: Robot_Party | Basic Build v1
@author: Gam3rrXD
*/
let button_press = 0;
let min = 0;
var seconds = 0;
var lol = setInterval(function() { seconds++; if (seconds == 60) {min++; seconds = 0;} addText(min + ":" + seconds, { x:14 , y:1 , color: color`0` })} , 1000);

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const half_wall = "h";
const fake_wall = "f";
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
setLegend(
  [ player, bitmap`
................
................
................
....111111......
....111111......
....121121......
....111111......
....121121......
....122221......
....111111......
.....LLLL.......
.....LLLL.......
...11LLLL11.....
.....LLLL.......
.....1..1.......
....11..11......`],
  [ box, bitmap`
................
................
................
................
................
....55555555....
....5CCCCCC5....
....5C3333C5....
....5C3443C5....
....5C3443C5....
....5C3333C5....
....5CCCCCC5....
....55555555....
................
................
................`],
  [ goal, bitmap`
................
................
................
................
................
......66666.....
.....666C666....
.....666C666....
.....666C666....
.....666C666....
.....666C666....
......66666.....
................
................
................
................`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ half_wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
................
................
................
................
................
................
................
................`],
  [ fake_wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);
const onhit = tune`
120,
30: e4~30 + d4~30,
30: f4-30 + g4-30,
30: a4/30 + b4/30,
30: c5^30 + d5^30,
720`
const move = tune`
122.44897959183673,
122.44897959183673: c4-122.44897959183673,
3673.469387755102`
const endd = tune`
202.02020202020202,
101.01010101010101: c4~101.01010101010101,
101.01010101010101: d4-101.01010101010101,
101.01010101010101: e4/101.01010101010101,
101.01010101010101: f4^101.01010101010101,
101.01010101010101: g4~101.01010101010101,
101.01010101010101: a4-101.01010101010101,
101.01010101010101: b4/101.01010101010101,
101.01010101010101: c5^101.01010101010101,
101.01010101010101: d5~101.01010101010101,
101.01010101010101: e5-101.01010101010101,
101.01010101010101: f5/101.01010101010101,
101.01010101010101: g5^101.01010101010101,
101.01010101010101: a5~101.01010101010101,
101.01010101010101: b5-101.01010101010101,
1616.1616161616162`
const secnd = tune`
545.4545454545455,
545.4545454545455: c4-545.4545454545455,
545.4545454545455: d4-545.4545454545455,
545.4545454545455: c4-545.4545454545455,
545.4545454545455: d4-545.4545454545455,
545.4545454545455: e4-545.4545454545455,
545.4545454545455: f4-545.4545454545455,
545.4545454545455: e4-545.4545454545455,
545.4545454545455: d4-545.4545454545455,
545.4545454545455: c4-545.4545454545455,
545.4545454545455: d4-545.4545454545455,
545.4545454545455: c4-545.4545454545455,
10909.09090909091`
const rese = tune`
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
30: c4-30 + d4-30,
570`

let level = 0;
const endlvl = getRandomInt(2);
const levels = [
  map`
p...
..b.
....
...g`,
  map`
p...
.b..
..g.
....`,
  map`
p.wg
.bw.
....
ww..`,
  map`
p...
...b
...b
.bbg`,
  map`
wwwg
wpwb
w...
wwww`,
  map`
p.w.
.b.g
....
.b.g`,
  map`
wg..
w.b.
wpbg
wwww`, 
  map`
p.bg
bw..
..b.
gw.g`,
  map`
g...
wwb.
.w.w
p..w`, 
map`
hhph
h.bh
h.gh
hhhh`, map`
hh..
p..b
hhhg
hhhh`, map`
pf..
ww..
.wb.
gf..`, map`
wwwp
ffff
fbff
wwwg`, map`
pfff
wfff
wfbg
wwww`];
const end = [map`
wwww
wwww
wwww
wwww`, map`
pbgw
wgbp
pbgw
wgbp`]
const currentLevel = levels[level];
const endLevel = end[endlvl];
setMap(currentLevel);
setSolids([ player, box, wall, half_wall ]);

setPushables({
  [player]: [box],
  [box]: [box]
});

// Movement + Sounds
onInput("w", () => {
  button_press++;
  playTune(move, 1)
  getFirst(player).y -= 1;
});

onInput("a", () => {
  button_press++;
  playTune(move, 1)
  getFirst(player).x -= 1;
});

onInput("s", () => {
  button_press++;
  playTune(move, 1)
  getFirst(player).y += 1;
});

onInput("d", () => {
  button_press++;
  playTune(move, 1)
  getFirst(player).x += 1;
});

// Reset Level + Sound

onInput("j", () => {
  button_press++;
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    playTune(rese)
    setMap(currentLevel);
  }
});

afterInput(() => {
  // Total amount of goals
  const targetNumber = tilesWith(goal).length;
  
  // Count tiles and number of goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // Add 1 to the current level
    level = level + 1;
    playTune(onhit, 1)
    const currentLevel = levels[level];

    // If level exists then set map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      clearInterval(lol);
      setMap(endLevel)
      clearText()
      if (endlvl == 1) { addText("You found ", { y: 4, color: color`4` }); addText("the hidden level!", { y: 5, color: color`4` }); addText("Time Taken: " + min + ":" + seconds , { y: 7, color: color`5` }); addText("Pressed: " + button_press , { y: 9, color: color`H` }); playTune(secnd, Infinity); }
      else { addText("Winner!", { y: 3, color: color`3` }); addText("Time Taken: " + min + ":" + seconds , { y: 6, color: color`5` }); addText("Pressed: " + button_press , { y: 9, color: color`H` }); playTune(endd, Infinity); }
    }
  }
});
