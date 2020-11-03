const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const axios = require("axios");

const User = require("../models/users.js");
router.get("/search", async(req, res) => {
            req.session.search = req.query.search ? req.query.search : req.session.search;
            let query = req.query.search ? req.query.search : req.session.search;

            let url = `https://api.edamam.com/search?q=${query}&app_id=313605df&app_key=3a360d7219529db4accf27b5c25d9845&from=0&to=10`;

            let user = await User.findById(req.session.currentUser._id);

            if (user.macrosFat !== "") {
                url += `&nutrients%5B${`FAT`}%5D=${user.macrosFat}`;
  }

  if (user.macrosSugar !== "") {
    url += `&nutrients%5B${`SUGAR`}%5D=${user.macrosSugar}`;
  }

  if (user.macrosCarbs !== "") {
    url += `&nutrients%5B${`CHOCDF`}%5D=${user.macrosCarbs}`;
  }

  if (user.macrosProtein !== "") {
    url += `&nutrients%5B${`PROCNT`}%5D=${user.macrosProtein}`;
  }

  console.log(user.macrosProtein);
  // user.macros.forEach((each) => {
  //     let appendKeys = Object.keys(each)[0];
  //     let appendValues = Object.values(each)[0];
  //     url += `&nutrients%5B${appendKeys}%5D=${appendValues}`;
  // });

  url += `&health=${user.diet_label}`;

  axios
    .get(url)
    .then(function (response) {
      let resp = response.data.hits;
      resp = resp.map((each) => {
        let recipeLabels = each.recipe.label.toLowerCase();
        query = query.toLowerCase();

        if (recipeLabels.includes(query)) {
          return each;
        }
      });

      let transformedResult = [];
      let transformedResult1 = [];

      resp.forEach((result) => {
        transformedResult.push(result);
      });
      transformedResult.forEach((result) => {
        let resultObj = {};
        let nutrients = [];
        let {
          FAT,
          CHOCDF,
          SUGAR,
          PROCNT,
          FIBTG,
        } = result.recipe.totalNutrients;
        let {
          label,
          image,
          source,
          url,
          yield,
          ingredientLines,
          ingredients,
          calories,
        } = result.recipe;
        // let { FAT, CHOCDF, SUGAR, PROCNT, FIBTG } = totalNutrients;
        nutrients.push(FAT);
        nutrients.push(CHOCDF);
        nutrients.push(SUGAR);
        nutrients.push(PROCNT);
        nutrients.push(FIBTG);

        resultObj.nutrients = nutrients;
        resultObj.label = label;
        resultObj.image = image;
        resultObj.source = source;
        resultObj.url = url;
        resultObj.yield = yield;
        resultObj.ingredientLines = ingredientLines;
        resultObj.ingredients = ingredients;
        resultObj.calories = calories;

        transformedResult1.push(resultObj);
      });

      res.render("recipes/index.ejs", {
        recipes: transformedResult1,
        currentUser: req.session.currentUser,
        val: parseInt(user.macrosFat),
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/page2", async (req, res) => {
  console.log(req.session.search);
  let url = `https://api.edamam.com/search?q=${req.session.search}&app_id=313605df&app_key=3a360d7219529db4accf27b5c25d9845&from=11&to=20`;

  let user = await User.findById(req.session.currentUser._id);
  if (user.macrosFat !== "") {
    url += `&nutrients%5B${`FAT`}%5D=${user.macrosFat}`;
  }

  if (user.macrosSugar !== "") {
    url += `&nutrients%5B${`SUGAR`}%5D=${user.macrosSugar}`;
  }

  if (user.macrosCarbs !== "") {
    url += `&nutrients%5B${`CHOCDF`}%5D=${user.macrosCarbs}`;
  }

  if (user.macrosProtein !== "") {
    url += `&nutrients%5B${`PROCNT`}%5D=${user.macrosProtein}`;
  }
  url += `&health=${user.diet_label}`;
  console.log(user);
  axios
    .get(url)
    .then(function (response) {
      let resp = response.data.hits;
      resp = resp.map((each) => {
        let recipeLabels = each.recipe.label.toLowerCase();
        let query = req.session.search.toLowerCase();

        if (recipeLabels.includes(query)) {
          return each;
        }
      });

      let transformedResult = [];
      let transformedResult1 = [];

      resp.forEach((result) => {
        transformedResult.push(result);
      });
      transformedResult.forEach((result) => {
        let resultObj = {};
        let nutrients = [];
        let {
          FAT,
          CHOCDF,
          SUGAR,
          PROCNT,
          FIBTG,
        } = result.recipe.totalNutrients;
        let {
          label,
          image,
          source,
          url,
          yield,
          ingredientLines,
          ingredients,
          calories,
        } = result.recipe;
        // let { FAT, CHOCDF, SUGAR, PROCNT, FIBTG } = totalNutrients;
        nutrients.push(FAT);
        nutrients.push(CHOCDF);
        nutrients.push(SUGAR);
        nutrients.push(PROCNT);
        nutrients.push(FIBTG);

        resultObj.nutrients = nutrients;
        resultObj.label = label;
        resultObj.image = image;
        resultObj.source = source;
        resultObj.url = url;
        resultObj.yield = yield;
        resultObj.ingredientLines = ingredientLines;
        resultObj.ingredients = ingredients;
        resultObj.calories = calories;

        transformedResult1.push(resultObj);
      });

      console.log(transformedResult1[0]);

      res.render("recipes/index2.ejs", {
        recipes: transformedResult1,
        currentUser: req.session.currentUser,
        val: parseInt(user.macrosFat),
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(url);
  //const recipies = await
});

router.get("/page3", async (req, res) => {
  let url = `https://api.edamam.com/search?q=${req.session.search}&app_id=313605df&app_key=3a360d7219529db4accf27b5c25d9845&from=21&to=30`;

  let user = await User.findById(req.session.currentUser._id);
  if (user.macrosFat !== "") {
    url += `&nutrients%5B${`FAT`}%5D=${user.macrosFat}`;
  }

  if (user.macrosSugar !== "") {
    url += `&nutrients%5B${`SUGAR`}%5D=${user.macrosSugar}`;
  }

  if (user.macrosCarbs !== "") {
    url += `&nutrients%5B${`CHOCDF`}%5D=${user.macrosCarbs}`;
  }

  if (user.macrosProtein !== "") {
    url += `&nutrients%5B${`PROCNT`}%5D=${user.macrosProtein}`;
  }
  url += `&health=${user.diet_label}`;

  axios
    .get(url)
    .then(function (response) {
      let resp = response.data.hits;
      resp = resp.map((each) => {
        let recipeLabels = each.recipe.label.toLowerCase();
        let query = req.session.search.toLowerCase();

        if (recipeLabels.includes(query)) {
          return each;
        }
      });
      let transformedResult = [];
      let transformedResult1 = [];

      resp.forEach((result) => {
        transformedResult.push(result);
      });
      transformedResult.forEach((result) => {
        let resultObj = {};
        let nutrients = [];
        let {
          FAT,
          CHOCDF,
          SUGAR,
          PROCNT,
          FIBTG,
        } = result.recipe.totalNutrients;
        let {
          label,
          image,
          source,
          url,
          yield,
          ingredientLines,
          ingredients,
          calories,
        } = result.recipe;
        // let { FAT, CHOCDF, SUGAR, PROCNT, FIBTG } = totalNutrients;
        nutrients.push(FAT);
        nutrients.push(CHOCDF);
        nutrients.push(SUGAR);
        nutrients.push(PROCNT);
        nutrients.push(FIBTG);

        resultObj.nutrients = nutrients;
        resultObj.label = label;
        resultObj.image = image;
        resultObj.source = source;
        resultObj.url = url;
        resultObj.yield = yield;
        resultObj.ingredientLines = ingredientLines;
        resultObj.ingredients = ingredients;
        resultObj.calories = calories;

        transformedResult1.push(resultObj);
      });

      console.log(transformedResult1[0]);

      res.render("recipes/index3.ejs", {
        recipes: transformedResult1,
        currentUser: req.session.currentUser,
        val: parseInt(user.macrosFat),
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(url);
  //const recipies = await
});

router.get("/", async (req, res) => {
  res.render("recipes/index.ejs", {
    recipes: [],
    currentUser: req.session.currentUser,
    val: null,
  });
});

module.exports = router;