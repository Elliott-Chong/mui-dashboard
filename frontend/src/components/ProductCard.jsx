import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { _id, name, description, price, rating, category, supply, stat } =
    product;
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: "14px", color: theme.palette.secondary[700] }}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component={"div"}>
          {name}
        </Typography>
        <Typography
          sx={{ mb: "1.5rem" }}
          component={"div"}
          color={theme.palette.secondary[400]}
        >
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
