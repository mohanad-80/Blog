import * as React from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  DialogTitle,
  Dialog,
  Slide,
} from "@mui/material";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const social = [
  "Facebook",
  "Whatsapp",
  "Linkedin",
  "Twitter/X",
  "Reddit",
  "Telegram",
  "Email",
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SimpleDialog(props) {
  const { open } = props;

  return (
    <Dialog open={open} TransitionComponent={Transition}>
      <DialogTitle>Share this post in:</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem key={social[0]}>
          <FacebookShareButton url={window.location.href}>
            <ListItemButton onClick={() => {}}>
              <ListItemAvatar>
                <FacebookIcon size={40} round />
              </ListItemAvatar>
              <ListItemText primary={social[0]} />
            </ListItemButton>
          </FacebookShareButton>
        </ListItem>
        <ListItem key={social[1]}>
          <WhatsappShareButton url={window.location.href}>
            <ListItemButton onClick={() => {}}>
              <ListItemAvatar>
                <WhatsappIcon size={40} round />
              </ListItemAvatar>
              <ListItemText primary={social[1]} />
            </ListItemButton>
          </WhatsappShareButton>
        </ListItem>
        <ListItem key={social[2]}>
          <LinkedinShareButton url={window.location.href}>
            <ListItemButton onClick={() => {}}>
              <ListItemAvatar>
                <LinkedinIcon size={40} round />
              </ListItemAvatar>
              <ListItemText primary={social[2]} />
            </ListItemButton>
          </LinkedinShareButton>
        </ListItem>
        <ListItem key={social[3]}>
          <TwitterShareButton url={window.location.href}>
            <ListItemButton onClick={() => {}}>
              <ListItemAvatar>
                <TwitterIcon size={40} round />
              </ListItemAvatar>
              <ListItemText primary={social[3]} />
            </ListItemButton>
          </TwitterShareButton>
        </ListItem>
        <ListItem key={social[4]}>
          <RedditShareButton url={window.location.href}>
            <ListItemButton onClick={() => {}}>
              <ListItemAvatar>
                <RedditIcon size={40} round />
              </ListItemAvatar>
              <ListItemText primary={social[4]} />
            </ListItemButton>
          </RedditShareButton>
        </ListItem>
        <ListItem key={social[5]}>
          <TelegramShareButton url={window.location.href}>
            <ListItemButton onClick={() => {}}>
              <ListItemAvatar>
                <TelegramIcon size={40} round />
              </ListItemAvatar>
              <ListItemText primary={social[5]} />
            </ListItemButton>
          </TelegramShareButton>
        </ListItem>
        <ListItem key={social[6]}>
          <EmailShareButton url={window.location.href}>
            <ListItemButton onClick={() => {}}>
              <ListItemAvatar>
                <EmailIcon size={40} round />
              </ListItemAvatar>
              <ListItemText primary={social[6]} />
            </ListItemButton>
          </EmailShareButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo(props) {
  return (
    <div>
      <p>Share</p>
      <SimpleDialog open={props.open} />
    </div>
  );
}
