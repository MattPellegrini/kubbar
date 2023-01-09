import e1 from "./svgs/eye01.svg";
import e2 from "./svgs/eye02.svg";
import e3 from "./svgs/eye03.svg";
import e4 from "./svgs/eye04.svg";
import e5 from "./svgs/eye05.svg";
import e6 from "./svgs/eye06.svg";
import e7 from "./svgs/eye07.svg";
import e9 from "./svgs/eye09.svg";
import e10 from "./svgs/eye10.svg";
import e11 from "./svgs/eye11.svg";
import e12 from "./svgs/eye12.svg";
import e13 from "./svgs/eye13.svg";
import m1 from "./svgs/mouth01.svg";
import m2 from "./svgs/mouth02.svg";
import m3 from "./svgs/mouth03.svg";
import m4 from "./svgs/mouth04.svg";
import m5 from "./svgs/mouth05.svg";
import m6 from "./svgs/mouth06.svg";
import m7 from "./svgs/mouth07.svg";
import m8 from "./svgs/mouth08.svg";
import m9 from "./svgs/mouth09.svg";
import m10 from "./svgs/mouth10.svg";
import m11 from "./svgs/mouth11.svg";
import m12 from "./svgs/mouth12.svg";

/* Typescript enums are horrible, so to avoid them for this short script, we use numbers and define constants here.
 */
const TopLeft = 0;
const TopRight = 1;
const BottomLeft = 2;
const BottomRight = 3;
const Quarters = [TopLeft, TopRight, BottomLeft, BottomRight];
type Quarter = number;
type Rotation = number;

// Useful for asserting eye and mouth halfs go together.
function xor(b1: boolean, b2: boolean) {
  return b1 ? !b2 : b2;
}

class Face {
  svg: string;
  positions: Map<Quarter, Array<Rotation>>;
  constructor(svg: string, positions: Map<Quarter, Array<Rotation>>) {
    this.svg = svg;
    this.positions = positions;
  }
}

class Placement {
  cubeIndex: number;
  faceIndex: number;
  rotation: Rotation;

  constructor(cubeIndex: number, faceIndex: number, rotation: Rotation) {
    this.cubeIndex = cubeIndex;
    this.faceIndex = faceIndex;
    this.rotation = rotation;
  }
}

const eye01 = new Face(
  e1,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [0, 270]],
    [TopRight, [0, 270]],
  ])
);
const eye02 = new Face(
  e2,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [0, 90]],
    [TopRight, [0, 90]],
  ])
);
const eye03 = new Face(
  e3,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [0, 180]],
    [TopRight, [0, 180]],
  ])
);
const eye04 = new Face(
  e4,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [0, 180]],
    [TopRight, [0, 180]],
  ])
);
const eye05 = new Face(
  e5,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [0, 180]],
    [TopRight, [0, 180]],
  ])
);
const eye06 = new Face(
  e6,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [0, 180]],
    [TopRight, [0, 180]],
  ])
);
const eye07 = new Face(e7, new Map<Quarter, Array<Rotation>>([[TopLeft, [0]]]));
const eye09 = new Face(
  e9,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [0]],
    [TopRight, [0]],
  ])
);
const eye10 = new Face(
  e10,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [0]],
    [TopRight, [180]],
  ])
);
const eye11 = new Face(
  e11,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [180]],
    [TopRight, [0]],
  ])
);
const eye12 = new Face(
  e12,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [0]],
    [TopRight, [180]],
  ])
);
const eye13 = new Face(
  e13,
  new Map<Quarter, Array<Rotation>>([
    [TopLeft, [180]],
    [TopRight, [0]],
  ])
);

const mouth01 = new Face(
  m1,
  new Map<Quarter, Array<Rotation>>([
    [BottomLeft, [0]],
    [BottomRight, [180]],
  ])
);
const mouth02 = new Face(
  m2,
  new Map<Quarter, Array<Rotation>>([
    [BottomLeft, [180]],
    [BottomRight, [0]],
  ])
);
const mouth03 = new Face(
  m3,
  new Map<Quarter, Array<Rotation>>([
    [BottomLeft, [0]],
    [BottomRight, [180]],
  ])
);
const mouth04 = new Face(
  m4,
  new Map<Quarter, Array<Rotation>>([
    [BottomLeft, [180]],
    [BottomRight, [0]],
  ])
);
const mouth05 = new Face(
  m5,
  new Map<Quarter, Array<Rotation>>([
    [BottomLeft, [180]],
    [BottomRight, [0]],
  ])
);
const mouth06 = new Face(
  m6,
  new Map<Quarter, Array<Rotation>>([
    [BottomLeft, [0]],
    [BottomRight, [180]],
  ])
);
const mouth07 = new Face(
  m7,
  new Map<Quarter, Array<Rotation>>([
    [BottomLeft, [180]],
    [BottomRight, [0]],
  ])
);
const mouth08 = new Face(
  m8,
  new Map<Quarter, Array<Rotation>>([[BottomRight, [0]]])
);
const mouth09 = new Face(
  m9,
  new Map<Quarter, Array<Rotation>>([[BottomLeft, [0]]])
);
const mouth10 = new Face(
  m10,
  new Map<Quarter, Array<Rotation>>([[BottomRight, [0]]])
);
const mouth11 = new Face(
  m11,
  new Map<Quarter, Array<Rotation>>([
    [BottomLeft, [0]],
    [BottomRight, [180]],
  ])
);
const mouth12 = new Face(
  m12,
  new Map<Quarter, Array<Rotation>>([
    [BottomLeft, [180]],
    [BottomRight, [0]],
  ])
);

const cubes: Array<Array<Face>> = [
  [eye01, eye10, eye05, mouth01, mouth03, mouth11],
  [eye02, eye11, eye06, mouth02, mouth04, mouth12],
  [eye07, eye03, eye12, mouth05, mouth09, mouth06],
  [eye09, eye04, eye13, mouth08, mouth10, mouth07],
];

function getAllVariations(
  placedCubes: Array<number>,
  filledLocations: Array<number>
): Array<Map<Quarter, Placement>> {
  // BASE CASE
  if (Quarters.every((v) => filledLocations.includes(v))) {
    return [new Map<Quarter, Placement>()];
  }
  let variations: Array<Map<Quarter, Placement>> = [];
  Quarters.forEach((quarter) => {
    if (!filledLocations.includes(quarter)) {
      cubes.forEach((cube, cubeIndex) => {
        if (!placedCubes.includes(cubeIndex)) {
          cube.forEach((face, faceIndex) => {
            if (face.positions.has(quarter)) {
              const subvariations = getAllVariations(
                placedCubes.concat([cubeIndex]),
                filledLocations.concat([quarter])
              );
              subvariations.forEach((subvariation) => {
                face.positions.get(quarter)?.forEach((rotation) => {
                  const newVariation = new Map(subvariation);
                  newVariation.set(
                    quarter,
                    new Placement(cubeIndex, faceIndex, rotation)
                  );
                  variations.push(newVariation);
                });
              });
            }
          });
        }
      });
    }
  });
  return variations;
}

function getVariations() {
  const allVariations = getAllVariations([], []);
  console.log(`Initial variations: ${allVariations.length}`);
  // Remove 'ugly' variations
  const approved: Array<Map<Quarter, Placement>> = [];
  let removed = 0;
  allVariations.forEach((v) => {
    let valid = true;
    const tl = v.get(TopLeft);
    const tr = v.get(TopRight);
    const bl = v.get(BottomLeft);
    const br = v.get(BottomRight);

    if (tl && tr && bl && br) {
      // Eye 1 must be with eye 2
      if (
        [
          xor(
            cubes[tl.cubeIndex][tl.faceIndex] === eye01,
            cubes[tr.cubeIndex][tr.faceIndex] === eye02
          ),
          // Eye 2 must be with eye 1
          xor(
            cubes[tl.cubeIndex][tl.faceIndex] === eye02,
            cubes[tr.cubeIndex][tr.faceIndex] === eye01
          ),
          // Mouth 9 must be with mouth 10
          xor(
            cubes[bl.cubeIndex][bl.faceIndex] === mouth09,
            cubes[br.cubeIndex][br.faceIndex] === mouth10
          ),
          // Mouth 11 must be with mouth 12
          xor(
            cubes[bl.cubeIndex][bl.faceIndex] === mouth11,
            cubes[br.cubeIndex][br.faceIndex] === mouth12
          ),
          // Mouth 12 must be with mouth 11
          xor(
            cubes[bl.cubeIndex][bl.faceIndex] === mouth12,
            cubes[br.cubeIndex][br.faceIndex] === mouth11
          ),
          // Mouth 5 cannot be with mouth 8 (both have tongues)
          cubes[bl.cubeIndex][bl.faceIndex] === mouth05 &&
            cubes[br.cubeIndex][br.faceIndex] === mouth08,
        ].some((x) => !!x)
      ) {
        valid = false;
      }
    } else {
      console.error("Variation missing assignment to bottom left or right.");
      console.log(v);
      valid = false;
    }
    if (valid) {
      approved.push(v);
    } else {
      removed += 1;
    }
  });
  console.log(`Removed ${removed} invalid variations`);
  console.log(`Final variations: ${approved.length}`);
  // Debug, remove later
  //   cubes.forEach((cube, cIndex) => {
  //     cube.forEach((face, fIndex) => {
  //       console.log(`cube ${cIndex}, face ${fIndex}: ${face.svg}`);
  //     });
  //   });
  return approved;
}

export { getVariations, TopLeft, TopRight, BottomLeft, BottomRight, cubes };
