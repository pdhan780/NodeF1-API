const express = require('express');
const supa = require('@supabase/supabase-js');
const supaUrl = 'https://fmmahgijeyrysnvqjahf.supabase.co'; 
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtbWFoZ2lqZXlyeXNudnFqYWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNzI1NjcsImV4cCI6MjAyMjg0ODU2N30.eg-o0DIgof6uXTUX_nxIuaKu7JIKqeLMzLBup5nGRZk'; 
 
const supabase = supa.createClient(supaUrl, supaAnonKey);




const handleAllSeasons = app => {
    // Define a route handler for GET requests to '/api/seasons'
    app.get('/api/seasons', async (req, res) => {
            // Fetch data from Supabase
            const { data, error } = await supabase.from('seasons').select(); 

            // If there's an error with query
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            }

            else{
            res.json(data);
            }
    
      
    });
};

const handleAllCircuits = app => {
    app.get('/api/circuits', async (req, res) => {
    
            const { data, error } = await supabase.from('circuits').select(); 

            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            }
            else{
            res.json(data);
            }
    });
};

const handleCircuitRef = app =>{
app.get('/api/circuits/:ref', async (req, res) => {
    const {ref} = req.params;
    const { data, error } = await supabase.from('circuits').select().eq('circuitRef',ref)

    if (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    } else {
        if (data.length === 0) {
            res.status(404).send({ message: 'No data found for the provided parameters' });
        } else {
            res.json(data);
        }
    }
 });
};


const handleCircuitYear = app =>{
    app.get('/api/circuits/season/:year', async (req, res) => {
        const {year} = req.params;
        const { data, error } = await supabase
        .from("races")
        .select(`circuits (*)`) //get all 
        .eq('year', year)
        .order("round", { ascending: true });
    
        if (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else {
            if (data.length === 0) {
                res.status(404).send({ message: 'No data found for the provided parameters' });
            } else {
                res.json(data);
            }
        }
     });
    };


const handleAllConstructors= app => {
    app.get('/api/constructors', async (req, res) => {
            // Fetch data from Supabase
            const { data, error } = await supabase.from('constructors').select(); 

            // If there's an error fetching data, handle it
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            }
            
            else{
            // Send the fetched data as the response
            res.json(data);
            }
        
    });
};

const handleConstructorRef = app =>{
    app.get('/api/constructors/:ref', async (req, res) => {
        const {ref} = req.params;
        const { data, error } = await supabase.from('constructors').select().eq('constructorRef',ref)
    
        if (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else {
            if (data.length === 0) {
                res.status(404).send({ message: 'No data found for the provided parameters' });
            } else {
                res.json(data);
            }
        }
     });
    };


const handleAllDrivers= app => {
        app.get('/api/drivers', async (req, res) => {
                // Fetch data from Supabase
                const { data, error } = await supabase.from('drivers').select(); 
    
                // If there's an error fetching data, handle it
                if (error) {
                    res.status(500).send({ error: 'Internal Server Error' });
                }
    
                else{
                // Send the fetched data as the response
                res.json(data);
                }
        
        });
    };





const handleDriverRef = app =>{
        app.get('/api/drivers/:ref', async (req, res) => {
            const {ref} = req.params;
            const { data, error } = await supabase.from('drivers').select().eq('driverRef',ref)
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
         });
 };


const handleDriverSurname = app =>{
        app.get('/api/drivers/search/:substring', async (req, res) => {
            const {substring} = req.params;
            newString = substring.toLowerCase() //clean it
            const { data, error } = await supabase
                .from('drivers')
                .select()
                .ilike('surname', `${newString}%`) // ilike for case-insensitive comparison
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
            });
};



const handleDriverRaceID= app =>{
        app.get('/api/drivers/race/:raceId', async (req, res) => {
                const {raceId} = req.params;
                const { data, error } = await supabase
                .from('results')
                .select(`drivers(*)`) //get all 
                .eq('raceId', raceId);
                console.log(data)
                console.log(error)
            
                if (error) {
                    res.status(500).send({ error: 'Internal Server Error' });
                } else {
                    if (data.length === 0) {
                        res.status(404).send({ message: 'No data found for the provided parameters' });
                    } else {
                        res.json(data);
                }
            }
            });
};

const handleRaceID= app =>{
        app.get('/api/races/:raceId', async (req, res) => {
                const {raceId} = req.params;
                const { data, error } = await supabase
                .from('races')
                .select(`raceId, year, round,circuits(name,location,country)`) //get all 
                .eq('raceId', raceId);
                console.log(data)
                console.log(error)
            
                if (error) {
                    res.status(500).send({ error: 'Internal Server Error' });
                } else {
                    if (data.length === 0) {
                        res.status(404).send({ message: 'No data found for the provided parameters' });
                    } else {
                        res.json(data);
                    }
                }
            });
};



const handleRaceSeason= app =>{
    app.get('/api/races/season/:year', async (req, res) => {
            const {year} = req.params;
            const { data, error } = await supabase
            .from("races")
            .select('raceId, year, round, name, date, time') 
            .eq('year', year)
            .order("round", { ascending: true });
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
    });
};

const handleRaceSeasonAndRound = app =>{
    app.get('/api/races/season/:year/:round', async (req, res) => {
            const {year,round} = req.params;
            const { data, error } = await supabase
            .from("races")
            .select() 
            .eq('year', year)
            .eq('round',round)
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
    });
};


const handleRaceForCircuit = app =>{
    app.get('/api/races/circuits/:ref', async (req, res) => {
            const {ref} = req.params;
            const { data, error } = await supabase
            .from('circuits')
            .select(`circuitRef,name,races (*)`)
            .eq('circuitRef', ref)
            .order('year', { referencedTable: 'races', ascending: true })
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
    });
};

const handleRaceForCircuitAndYear = app =>{
    app.get('/api/races/circuits/:ref/season/:start/:end', async (req, res) => {
            const {ref,start,end} = req.params;
            if(end < start){
                res.status(404).send({ error: 'Start must be less then end' });  
            }
            else{
                const { data, error } = await supabase
                .from('circuits')
                .select(`circuitRef,races (*)`)
                .eq('circuitRef', ref)
                .gte("races.year",start)
                .lte("races.year",end)
            
                if (error) {
                    res.status(500).send({ error: 'Internal Server Error' });
                } else {
                    if (data.length === 0) {
                        res.status(404).send({ message: 'No data found for the provided parameters' });
                    } else {
                        res.json(data);
                    }
                }
        }
    });
};

const handleResultsWithRaceID = app =>{
    app.get('/api/results/:raceId', async (req, res) => {
            const {raceId} = req.params;
            const { data, error } = await supabase
            .from('results')
            .select(`raceId,grid, drivers(driverRef, code, forename, surname), races(name, round, year,date),constructors(name, constructorRef, nationality)`)
            .eq('raceId',raceId)
            .order("grid", { ascending: true });
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
    });
};

const handleResultsWithDriver = app =>{
    app.get('/api/results/driver/:ref', async (req, res) => {
            const {ref} = req.params;
            const { data, error } = await supabase
            .from('drivers')
            .select(`driverRef,results(*)`)
            .eq('driverRef',ref)
            console.log(error)
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
    });
};


const handleResultsForDriverAndYear = app =>{
    app.get('/api/results/driver/:ref/seasons/:start/:end', async (req, res) => {
            const {ref,start,end} = req.params;
            if (end < start){
                res.status(404).send({ message: 'Start must be less then end' }); 
            }
            else{
                const { data, error } = await supabase
                .from('results')
                .select('resultId, number, grid, position, positionText, positionOrder, points, laps, time, fastestLap,drivers!inner (*),races!inner (*)')
                .eq('drivers.driverRef',ref)
                .gte("races.year",start)
                .lte("races.year",end)
            
                console.log(error)
            
                if (error) {
                    res.status(500).send({ error: 'Internal Server Error' });
                } else {
                    if (data.length === 0) {
                        res.status(404).send({ message: 'No data found for the provided parameters' });
                    } else {
                        res.json(data);
                    }
                }
        } 
    });
};

const handleResultsForQualifyingWithRaceID = app =>{
    app.get('/api/qualifying/:raceId', async (req, res) => {
            const {raceId} = req.params;
            const { data, error } = await supabase
            .from('qualifying')
            .select(`qualifyId, drivers(driverRef, code, forename, surname), races(name, round, year,date),constructors(name, constructorRef, nationality)`)
            .eq('raceId',raceId)
            .order("position", { ascending: true });
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
    });
};

const handleStandingsWithRaceID = app =>{
    app.get('/api/standings/:raceId/drivers', async (req, res) => {
            const {raceId} = req.params;
            const { data, error } = await supabase
            .from('driverStandings')
            .select(`position,drivers!inner (*),races!inner (name)`)
            .eq('raceId',raceId)
            .order("position", { ascending: true });
            console.log(error)
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
    });
};

const handleConstructorStandingsWithRaceID = app =>{
    app.get('/api/standings/:raceId/constructors', async (req, res) => {
            const {raceId} = req.params;
            const { data, error } = await supabase
            .from('constructorStandings')
            .select(`raceId,position, constructors!inner (name, constructorRef, nationality)`)
            .eq('raceId',raceId)
            .order("position", { ascending: true });
            console.log(error)
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
    });
};

module.exports ={handleAllSeasons,handleAllCircuits, handleCircuitRef,handleCircuitYear,handleAllConstructors,handleConstructorRef,handleAllDrivers,handleDriverRef,handleDriverSurname,handleDriverRaceID,handleRaceID,handleRaceSeason,handleRaceSeasonAndRound,handleRaceForCircuit,handleRaceForCircuitAndYear,handleResultsWithRaceID,handleResultsWithDriver,handleResultsForDriverAndYear,handleResultsForQualifyingWithRaceID,handleStandingsWithRaceID,handleConstructorStandingsWithRaceID}














