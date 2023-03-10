import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import theme from "../theme";
import ArticleGroups from "./ArticleGroups";
import { listArticles } from "../../actions/articlesAction";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    margin: theme.spacing(2),
  },
}));

export default function Article() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { keyword } = useParams();

  const dispatch = useDispatch();

  const articleList = useSelector((state) => state.articleList);
  const { loading, error, articles } = articleList;

  useEffect(() => {
    dispatch(listArticles(keyword));
  }, [dispatch, keyword]);

  function compare(a, b) {
    return a._id > b._id;
  }

  const scienceAndSociety = articles.filter((article) => {
    return article.category === "Science and Society";
  });

  const local = articles.filter((article) => {
    return article.category === "Local";
  });

  const miscellaneous = articles.filter((article) => {
    return article.category === "Miscellaneous";
  });

  scienceAndSociety.sort(compare);
  local.sort(compare);
  miscellaneous.sort(compare);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <ThemeProvider theme={theme}>
          <Typography
            className={classes.title}
            component="div"
            align="left"
            variant="h4"
          >
            Articles
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <h3>
              <Alert severity="error">{error}</Alert>
            </h3>
          ) : (
            <ArticleGroups
              category="Local"
              new={local.slice(0, 3)}
              old={local.slice(3, local.length)}
            />
          )}
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <h3>
              <Alert severity="error">{error}</Alert>
            </h3>
          ) : (
            <ArticleGroups
              category="Science and Society"
              new={scienceAndSociety.slice(0, 3)}
              old={scienceAndSociety.slice(3, scienceAndSociety.length)}
            />
          )}
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <h3>
              <Alert severity="error">{error}</Alert>
            </h3>
          ) : (
            <ArticleGroups
              category="Miscellaneous"
              new={miscellaneous.slice(0, 3)}
              old={miscellaneous.slice(3, miscellaneous.length)}
            />
          )}
        </ThemeProvider>
      </Container>
    </React.Fragment>
  );
}
