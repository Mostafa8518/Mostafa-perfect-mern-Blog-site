import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
// import Reviews from "./Reviews";
import { listArticleDetails } from "../../actions/articlesAction";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  des: {
    display: "flex",
  },
}));

const FullArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const articleDetails = useSelector((state) => state.articleDetails);
  const { loading, error, article } = articleDetails;

  useEffect(() => {
    dispatch(listArticleDetails(id));
  }, [dispatch,id]);

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <h3>
            <Alert severity="error">{error}</Alert>
          </h3>
        ) : (
          
          <div>
            <div><img  alt="complex" src={article.imageUrl} /> </div>
            <Typography component="div" align="left" variant="h4">
              {article.title}
            </Typography>
            <Divider variant="middle" />
            <Grid container direction="row">
              <Typography color="textSecondary" variant="body2">
                {article.writer}
              </Typography>
            </Grid>
            <Divider variant="middle" />

            <Typography paragraph>
             {article.desc}
            </Typography>
          
           
           
            {/* <Reviews id={article.id} /> */}
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default FullArticle;
