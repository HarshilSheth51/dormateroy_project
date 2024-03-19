import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating, Divider, Stack, Skeleton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCheck, faIndianRupee, faTag } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase";

export default function ImgMediaCard({
  name,
  cardname,
  price,
  dec,
  dec2,
  rating,
  img,
  discount,
  sliderImages,
}) {
  const { itemId } = useParams();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  }, []);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (index) => {
    let newValue = index % sliderImages.length;
    if (newValue < 0) {
      newValue += sliderImages.length;
    }
    setValue(newValue);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "1%" }}>
      <div style={{ position: "relative" }}>
        <FontAwesomeIcon
          className="button"
          size="lg"
          style={{ position: "absolute", marginTop:'35%', left: "10px"  }}
          onClick={() => handleImageClick((value - 1) % sliderImages.length)}
          icon={faArrowLeft}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className="button"
          size="lg"
          style={{ position: "absolute", right: "10px", marginTop:'35%'  }}
          onClick={() => handleImageClick((value + 1) % sliderImages.length)}
          icon={faArrowRight}
        ></FontAwesomeIcon>
      </div>
      {loading ? (
        <Skeleton variant="rectangular" height={250} />
      ) : (
        <CardMedia
          component="img"
          alt="images"
          height="250"
          image={
            sliderImages && sliderImages.length > 0
              ? sliderImages[value % sliderImages.length]
              : img
          }
          style={{ cursor: "pointer" }}
        />
      )}
      
      <CardContent className="content">
        {loading ? (
          <Skeleton variant="text" width="50%" />
        ) : (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="stack"
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="heading-text"
            >
              {cardname}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faIndianRupee}
                  style={{ marginRight: "5px" }}
                />
                {price}
              </div>
            </Typography>
          </Stack>
        )}

        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
        )}
        <br />
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <label htmlFor="">Rating {rating}</label>
        )}
        <Divider sx={{ marginBottom: "5px", paddingBottom: "0.50rem" }} />

        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              marginTop: "5px",
              fontFamily: "Josefin Sans",
            }}
          >
            <FontAwesomeIcon
              icon={faCheck}
              style={{ color: "orange", marginRight: "5px" }}
            />
            {dec2}
            <br />
            <Divider />
            <FontAwesomeIcon
              icon={faTag}
              style={{ color: "orange", marginRight: "5px", marginTop: "10px" }}
            />
            {discount}
          </Typography>
        )}
     
     


      </CardContent>
      {user && !loading && (
        <CardActions>
          <Link to={`/${name}`}>
          <Button
         size="median"
            sx={{ fontSize: "18px" }}
            // onClick={() => ()}
          >
            Book now
          </Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
}
















