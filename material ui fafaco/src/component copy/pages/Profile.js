import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import Chip from "@mui/material/Chip";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import LandTable from "./LandTable";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import Farmerdetails1 from "./Farmerdetails1";

const Profile = () => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  const [open, setOpen] = React.useState(true);

  const handleClicked = () => {
    setOpen(!open);
  };
  function stringAvatar(name: string) {
    return {
      //   sx: {
      //     bgcolor: stringToColor(name),
      //   },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  function InteractiveList() {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
  }
  return (
    <div>
      <Box
        // bgcolor="green"
        width={1200}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={3.5}
            // border="solid"
          >
            <Box
              // bgcolor="green"
              width={300}
            >
              <Stack spacing={1}>
                <Stack dire ction="row" spacing={5}>
                  <Avatar
                    style={{ margin: "auto" }}
                    {...stringAvatar("Nisha Venkatesan")}
                  />
                </Stack>

                <Chip label="Nisha" onClick={handleClick} />
                <Chip label="Venkatesan" onClick={handleClick} />
                <Chip label="Nisha" onClick={handleClick} />
                <Chip label="Nisha" onClick={handleClick} />
                {/* <Skeleton md={4} variant="rectangular">
                  {" "}
                  {/* <Box> */}
                  Venkatesan
                  {/* </Box> */}
                </Skeleton>
                <Skeleton variant="rounded">DOB</Skeleton>
                <Skeleton variant="rounded">Village</Skeleton> */}
              </Stack>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            // border="solid"
          >
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Farmer Details
            </Typography>
            <Farmerdetails1 />
            {/* <Demo>
              <List>
                {generate(
                  <ListItem>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                    // primary="Single-line item"
                    //   secondary={secondary ? "Secondary text" : null}
                    />
                  </ListItem>
                )}
              </List>
            </Demo> */}
          </Grid>
        </Grid>
      </Box>
      <Box>
        <List
          sx={{ bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              variant="h4"
            >
              Farmer Details
            </ListSubheader>
          }
        >
          {" "}
          <ListItemButton onClick={handleClicked}>
            <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
            <ListItemText primary="Land" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 10 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <LandTable />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </div>
  );
};

export default Profile;
