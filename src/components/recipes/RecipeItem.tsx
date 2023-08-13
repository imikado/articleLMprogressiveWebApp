import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ItemProps {
  item: Item;
}

interface Item {
  title: string;
  ingredients: string;
  method: string;
}

function RecipeItem(props: ItemProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography
            onClick={handleExpandClick}
            variant="h4"
            color="text.secondary"
          >
            {props.item.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {props.item.ingredients}
          </Typography>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Instructions:</Typography>
            <Typography variant="body2" color="text.secondary">
              {props.item.method}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}

export default RecipeItem;
