import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Close, Refresh, SettingsOutlined, Square } from "@mui/icons-material";
import {
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Slider,
  Switch,
} from "@mui/material";
import { useLayoutEffect, useState } from "react";
import "./App.css";
import {
  BottomLeft,
  BottomRight,
  cubes,
  getVariations,
  TopLeft,
  TopRight,
} from "./model";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useCookies } from "react-cookie";

const variations = getVariations();

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const defaultLightsOn = true;
const defaultFaceColor = "CornflowerBlue";
const defaultCountDownDuration = 3;

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
  const [SettingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
  const [released, setReleased] = useState(true);
  const [shuffling, setShuffling] = useState(false);
  const [countdownValue, setCountdownValue] = useState(
    defaultCountDownDuration
  );
  const [cookies, setCookie] = useCookies(["userPreferences"]);

  function updateLigthtsOn(newState: Boolean) {
    let userPreferences = { ...cookies.userPreferences };
    userPreferences.lightsOn = newState;
    setCookie("userPreferences", userPreferences);
  }

  function updateFaceColor(newColor: string) {
    let userPreferences = { ...cookies.userPreferences };
    userPreferences.faceColor = newColor;
    setCookie("userPreferences", userPreferences);
  }

  function updateCountdownDuration(newDuration: number) {
    let userPreferences = { ...cookies.userPreferences };
    userPreferences.countdownDuration = newDuration > 0 ? newDuration : 0;
    setCookie("userPreferences", userPreferences);
  }

  // Defaults
  const userPreferences = { ...cookies.userPreferences };
  if (userPreferences.lightsOn === undefined) {
    userPreferences.lightsOn = defaultLightsOn;
  }
  if (userPreferences.faceColor === undefined) {
    userPreferences.faceColor = defaultFaceColor;
  }
  if (userPreferences.countdownDuration === undefined) {
    userPreferences.countdownDuration = defaultCountDownDuration;
  }

  useLayoutEffect(() => {
    const anyNav: any = navigator;
    if ("wakeLock" in navigator) {
      if (released) {
        console.log("Requesting screen lock");
        anyNav["wakeLock"]
          .request("screen")
          .then((wakeSentinal: any) => {
            console.log("Screen lock acquired.");
            setReleased(wakeSentinal.released);
          })
          .catch((error: any) =>
            console.log("Screen lock request failed: ", error)
          );
      }
    } else {
      console.log("Screen lock not available.");
    }
  });

  function countdown(countdownValue: number, callback: Function) {
    setCountdownValue(countdownValue);
    if (countdownValue > 0) {
      setTimeout(() => countdown(countdownValue - 1, callback), 1000);
    } else {
      callback();
    }
  }

  function shuffleFace() {
    setShuffling(true);
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
    countdown(userPreferences.countdownDuration, () => setShuffling(false));
  }
  return (
    <ThemeProvider theme={userPreferences.lightsOn ? lightTheme : darkTheme}>
      <CssBaseline />
      <div className="PageContainer">
        <div className="TopBar">
          <Button onClick={() => setSettingsDrawerOpen(!SettingsDrawerOpen)}>
            <SettingsOutlined />
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
            {[
              "Coral",
              "CornflowerBlue",
              "SeaGreen",
              "IndianRed",
              "Crimson",
              "GoldenRod",
              "Turquoise",
              "Thistle",
              "DarkCyan",
            ].map((c) => (
              <ListItemButton
                key={c}
                className="PalleteListItem"
                onClick={() => updateFaceColor(c)}
              >
                <ListItemIcon>
                  <Square style={{ color: c }} />
                </ListItemIcon>
                <ListItemText>{c}</ListItemText>
              </ListItemButton>
            ))}
            <ListSubheader>Countdown duration</ListSubheader>
            <ListItem>{userPreferences.countdownDuration} seconds</ListItem>
            <div className="SliderContainer">
              <Slider
                aria-label="Seconds"
                value={userPreferences.countdownDuration}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={10}
                onChange={(_, value) =>
                  updateCountdownDuration(value as number)
                }
                className="CountdownSlider"
                orientation="vertical"
              />
            </div>
            <ListSubheader>Theme</ListSubheader>
            <ListItem>
              {userPreferences.lightsOn ? "Light Mode" : "DarkMode"}
            </ListItem>
            <Switch
              checked={userPreferences.lightsOn}
              onChange={(_, checked) => {
                updateLigthtsOn(checked);
              }}
              color="warning"
            />
          </List>
        </Drawer>
        {topLeftSvg && topRightSvg && bottomLeftSvg && bottomRightSvg && (
          <div
            className="Face"
            style={{
              backgroundColor: shuffling
                ? "transparent"
                : userPreferences.faceColor,
            }}
            onClick={shuffleFace}
          >
            {shuffling && (
              <div className="Countdown">
                <h1 style={{ color: userPreferences.faceColor }}>
                  {countdownValue}
                </h1>
              </div>
            )}
            <div className="SvgRow">
              <img
                src={topLeftSvg}
                className={`FaceQuarter ${topLeftRotation} ${
                  shuffling && "Hidden"
                }`}
                alt="Top Left Face Quarter"
              />
              <img
                src={topRightSvg}
                className={`FaceQuarter ${topRightRotation} ${
                  shuffling && "Hidden"
                }`}
                alt="Top Right Face Quarter"
              />
            </div>
            <div className="SvgRow">
              <img
                src={bottomLeftSvg}
                className={`FaceQuarter ${bottomLeftRotation} ${
                  shuffling && "Hidden"
                }`}
                alt="Bottom Left Face Quarter"
              />
              <img
                src={bottomRightSvg}
                className={`FaceQuarter ${bottomRightRotation} ${
                  shuffling && "Hidden"
                }`}
                alt="Bottom Right Face Quarter"
              />
            </div>
          </div>
        )}
        <p className="FaceNumberText">Face #{variationNumber}</p>
        <Button
          className="ShuffleButton"
          variant="outlined"
          size="large"
          startIcon={<Refresh />}
          onClick={shuffleFace}
          sx={{ padding: "1em" }}
        >
          New Face
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
