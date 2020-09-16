const DrawMapService = require("./DrawMapService");
const AirportsService = require("./AirportsService");
const AppError = require("../../errors/AppError");

class ResolutionService {
  execute({ lines, columns, airports, clouds }) {
    const drawMapService = new DrawMapService();
    const airportService = new AirportsService();

    if (airports < 3) {
      console.log(airports);
      throw new AppError("Deve ter no mínimo 3 airports!");
    }

    if (clouds < 4) {
      console.log(clouds);
      throw new AppError("Deve ter no mínimo 4 núvens!");
    }

    if (lines < 10 || columns < 10 || lines * columns < 100) {
      console.log(lines, columns);
      throw new AppError("Necessário possuir área de 10 x 10!");
    }

    // Gerar um mapa com as posições das nuvens e aeroportos
    const drawMap = drawMapService.execute({
      lines,
      columns,
      airports,
      clouds,
    });

    const area = [];

    for (let i = 0; i < lines; i += 1) {
      area[i] = [];
      for (let j = 0; j < columns; j += 1) {
        area[i][j] = drawMap[i][j];
      }
    }

    /**
     * Quando a nuvem encontrará todos os airports
     */

    const { min, max } = airportService.execute(
      area,
      drawMap,
      lines,
      columns,
      airports
    );

    return { min, max, drawMap };
  }
}

module.exports = ResolutionService;
