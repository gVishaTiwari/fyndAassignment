const Movies = require("../models/movie");
const User = require("../models/user");

module.exports.create = function (req, res, next) {
  console.log("helllo");

  const movies = {
    "99popularity": req.body.popularity,
    director: req.body.director,
    genre: req.body.genre,
    imdb_score: req.body.imdb_score,
    name: req.body.name,
  };

  Movies.create(movies, function (err, movies) {
    if (err) {
      console.log("erro");

      return res.status(500).json({
        message: "error",
      });
    }
    return res.status(200).json({
      Messaging: "Movie Created",
      Moveis: movies,
    });
  });

//  return res.status(200).json({
//     Messaging: "Creating movies",
//     Moveis: movies,
//   });
};
module.exports.adminEdit = async function (req, res) {
  console.log("dasdas", req.body);
  let adminOrnot = await User.findById(req.body.token);
  console.log(adminOrnot);
  if (adminOrnot.profile === "admin") {
    const movie_id = req.body.movie_id;

    Movies.findById(movie_id, function (err, movie) {
      if (err) {
        console.log("No Movie Found");

        return res.status(500).json({
          message: "No Movie Found",
        });
      }
      Movies.findByIdAndUpdate(movie_id, req.body, function (err, movies) {
        if (err) {
          console.log("No Movie Found");

          return res.status(500).json({
            message: "No Movie Found",
          });
        }
        return res.status(200).json({
          Messaging: "Creating movies",
          Moveis: movies,
        });
      });
    });
  } else {
    return res.status(500).json({
      message: "permission not alowed",
    });
  }
};
module.exports.deleteMovie = async function (req, res) {
  console.log(req.cookies.id);
  let adminOrnot = await User.findById(req.body.token);
  console.log(adminOrnot);
  if (adminOrnot.profile === "admin") {
    const movie_id = req.body.movie_id;

    Movies.findById(movie_id, function (err, movie) {
      if (err) {
        console.log("No Movie Found");

        return res.status(500).json({
          message: "No Movie Found",
        });
      }
      Movies.findByIdAndDelete(movie_id, req.body, function (err, movies) {
        if (err) {
          console.log("No Movie Found");

          return res.status(500).json({
            message: "No Movie Found",
          });
        }
        return res.status(200).json({
          Messaging: "Movies has been remove successfully",
          Moveis: movies,
        });
      });
    });
  } else {
    return res.status(500).json({
      message: "permission not alowed",
    });
  }
};
module.exports.find = function (req, res) {
  let id = req.params.id;
  Movies.findById(id, function (err, movie) {
    if (err) {
      return res.status(500).json({
        message: "No Movie Found",
      });
    }
    return res.status(200).json({
      Messaging: "Here is your Movies",
      Movie: movie,
    });
  });
};

module.exports.search = async function (req, res) {
  // let searchMovie = await Movies.find({'content':{ $regex: '.*' + req.params.search + '.*' }})
  // return res.status(200).json({
  //     Messaging:"Movie List",
  //    Movies:searchMovie
  // });
  let searchMovie = await Movies.find({ name: req.params.search });
  return res.status(200).json({
    Messaging: "Movie List",
    Movies: searchMovie,
  });
};
module.exports.allMovies = function (req, res) {
  // Movies.find({}, function (err, movies) {
  //   if (err) {
  //     return res.status(500).json({
  //       message: "No Movie Found",
  //     });
  //   }
  //   return res.status(200).json({
  //     Messaging: "All movies",
  //     Movies: movies,
  //   });
  // });

  const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    let fetchedMovies;
    console.log(pageSize + ' ' + currentPage);
    const MovieQuery = Movies.find();
    if(pageSize && currentPage){
        MovieQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    MovieQuery.find().then(documents =>{
        console.log(documents);
        fetchedMovies = documents;
        return Movies.count();
    }).then(count =>{
        res.status(200).json({
            message: "Successfully fetched",
            movies: fetchedMovies,
            totalCount: count
        });
    }).catch(err=>{
        console.log(err);
        res.status(404).json({
            message: "No data found"
        });
    });
};
