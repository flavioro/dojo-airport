"use strict";

const ResolutionService = require("./services/ResolutionService");

module.exports = function (router) {
  router.post("/calculate", async function (req, res) {
    const resolutionService = new ResolutionService();

    console.log(req.body);
    const { lines, columns, airports, clouds } = req.body;
    const result = resolutionService.execute({
      lines,
      columns,
      airports,
      clouds,
    });
    return res.json(result);
  });
};
