import { useState } from "react";
import "./App.css";
import {
  getVariations,
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
  cubes,
} from "./model";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Close, Palette, Refresh, Square } from "@mui/icons-material";
import {
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

const variations = getVariations();

function App() {
  const [topLeftSvg, setTopLeftSvg] = useState<string>();
  const [topRightSvg, setTopRightSvg] = useState<string>();
  const [bottomLeftSvg, setBottomLeftSvg] = useState<string>();
  const [bottomRightSvg, setBottomRightSvg] = useState<string>();
  const [topLeftRotation, setTopLeftRotation] = useState("Rot0");
  const [topRightRotation, setTopRightRotation] = useState("Rot0");
  const [bottomLeftRotation, setBottomLeftRotation] = useState("Rot0");
  const [bottomRightRotation, setBottomRightRotation] = useState("Rot0");
  const [variationNumber, setVariationNumber] = useState<string>();
  const [faceBackgroundColor, setFaceBackgroundColor] = useState("coral");
  const [SettingsDrawerOpen, setSettingsDrawerOpen] = useState(false);

  function shuffleFace() {
    const randomIndex = Math.floor(Math.random() * variations.length);
    setVariationNumber(String(randomIndex + 1).padStart(5, "0"));
    const randomVariation = variations[randomIndex];
    randomVariation.forEach((placement, quarter) => {
      const cubeIndex = placement.cubeIndex;
      const faceIndex = placement.faceIndex;
      const rotation = placement.rotation;

      if (quarter === TopLeft) {
        setTopLeftSvg(cubes[cubeIndex][faceIndex].svg);
        setTopLeftRotation(`Rot${rotation}`);
      } else if (quarter === TopRight) {
        setTopRightSvg(cubes[cubeIndex][faceIndex].svg);
        setTopRightRotation(`Rot${rotation}`);
      } else if (quarter === BottomLeft) {
        setBottomLeftSvg(cubes[cubeIndex][faceIndex].svg);
        setBottomLeftRotation(`Rot${rotation}`);
      } else if (quarter === BottomRight) {
        setBottomRightSvg(cubes[cubeIndex][faceIndex].svg);
        setBottomRightRotation(`Rot${rotation}`);
      }
    });
  }
  // TODO initialise to a blank face (background color only, but correct size).
  // Probably easiest to do this by adding placeholder svgs.
  return (
    <div className="PageContainer">
      <div className="TopBar">
        <Button onClick={() => setSettingsDrawerOpen(!SettingsDrawerOpen)}>
          <Palette />
        </Button>
      </div>
      <Drawer
        className="SettingsDrawer"
        anchor="left"
        open={SettingsDrawerOpen}
        onClose={() => setSettingsDrawerOpen(false)}
        BackdropProps={{ invisible: true }}
      >
        <div className="SettingsDrawerHeader">
          <h3>Settings</h3>
          <Close onClick={() => setSettingsDrawerOpen(false)} />
        </div>
        <List
          className="PalleteList"
          subheader={<ListSubheader>Face Colour</ListSubheader>}
        >
          {["Coral", "CornflowerBlue", "SeaGreen"].map((c) => (
            <ListItemButton
              className="PalleteListItem"
              onClick={() => setFaceBackgroundColor(c)}
            >
              <ListItemIcon>
                <Square style={{ color: c }} />
              </ListItemIcon>
              <ListItemText>{c}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      {topLeftSvg && topRightSvg && bottomLeftSvg && bottomRightSvg && (
        <div className="Face">
          <div className="SvgRow TopRow">
            <img
              src={topLeftSvg}
              className={`FaceQuarter ${topLeftRotation}`}
              alt="Top Left Face Quarter"
              style={{ backgroundColor: faceBackgroundColor }}
            />
            <img
              src={topRightSvg}
              className={`FaceQuarter ${topRightRotation}`}
              alt="Top Right Face Quarter"
              style={{ backgroundColor: faceBackgroundColor }}
            />
          </div>
          <div className="SvgRow TopRow">
            <img
              src={bottomLeftSvg}
              className={`FaceQuarter ${bottomLeftRotation}`}
              alt="Bottom Left Face Quarter"
              style={{ backgroundColor: faceBackgroundColor }}
            />
            <img
              src={bottomRightSvg}
              className={`FaceQuarter ${bottomRightRotation}`}
              alt="Bottom Right Face Quarter"
              style={{ backgroundColor: faceBackgroundColor }}
            />
          </div>
        </div>
      )}
      <p className="FaceNumberText">Face #{variationNumber}</p>
      <Button
        className="ShuffleButton"
        variant="outlined"
        startIcon={<Refresh />}
        onClick={shuffleFace}
      >
        New Face
      </Button>
    </div>
  );
}

export default App;
