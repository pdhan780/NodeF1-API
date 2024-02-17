const express = require('express')
const app = express()
const routeHandler = require('./api/script.js')


routeHandler.handleAllSeasons(app)
routeHandler.handleAllCircuits(app)
routeHandler.handleCircuitRef(app)
routeHandler.handleCircuitYear(app)
routeHandler.handleAllConstructors(app)
routeHandler.handleConstructorRef(app)
routeHandler.handleAllDrivers(app)
routeHandler.handleDriverRef(app)
routeHandler.handleDriverSurname(app)
routeHandler.handleDriverRaceID(app)
routeHandler.handleRaceID(app)
routeHandler.handleRaceSeason(app)
routeHandler.handleRaceSeasonAndRound(app)

app.use( (req, res) => {
    res.status(404).send('404: Page not found')
});

const port = 8080
app.listen(port, () => {
  
    console.log(`Server listening on port ${port}`)
});