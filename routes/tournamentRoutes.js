import express from "express";
import pool from "../db.js"; 
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const tournamentRouter = express.Router();

app.get('/', async (req, res) => {
    res.send("Hello World! and hello philippines");
});

//DISPLAY ALL TOURNAMENTS
tournamentRouter.get("/tournaments", async (req,res) => {
    try{
        const [tournaments] = await pool.query("SELECT * from tournament");
    res.status(200).json(tournaments);
    }
        catch (error){
        console.log(`Failed to get tournaments ${error.message}`);
        res.status(400).json("$(error)");
    }
});

//DISPLAY ALL TOURNAMENT TYPES
tournamentRouter.get("/types", async (req, res) => {
    try {
        const [types] = await pool.query("SELECT * FROM tournament_type");
        res.status(200).json(types);
    } catch (error) {
        console.log(`Failed to get tournament types: ${error.message}`);
        res.status(400).json({ error: `Failed to get tournament types: ${error.message}` });
    }
});

//DISPLAY ALL GAMES
tournamentRouter.get("/games", async (req, res) => {
    try {
        const [games] = await pool.query("SELECT * FROM game_title");
        res.status(200).json(games);
    } catch (error) {
        console.log(`Failed to get games: ${error.message}`);
        res.status(400).json({ error: `Failed to get games: ${error.message}` });
    }
});

//DISPLAY ALL TEAMS
tournamentRouter.get("/teams", async (req, res) => {
    try {
        const [teams] = await pool.query("SELECT * FROM team");
        res.status(200).json(teams);
    } catch (error) {
        console.log(`Failed to get teams: ${error.message}`);
        res.status(400).json({ error: `Failed to get teams: ${error.message}` });
    }
});

//DISPLAY ALL PLAYER
tournamentRouter.get("/players", async (req, res) => {
    try {
        const [players] = await pool.query("SELECT * FROM player");
        res.status(200).json(players);
    } catch (error) {
        console.log(`Failed to get teams: ${error.message}`);
        res.status(400).json({ error: `Failed to get teams: ${error.message}` });
    }
});

//DISPLAY ALL PARTICIPANTS
tournamentRouter.get("/participants", async (req,res) => {
    try{
        const [participants] = await pool.query("SELECT * from participant");
    res.status(200).json(participants);
    }
        catch (error){
        console.log(`Failed to get tournaments ${error.message}`);
        res.status(400).json("$(error)");
    }
});

//ADD TOURNAMENT
tournamentRouter.post("/add-tournament", async (req,res) => {
    const {
        tournament_id, 
        title, 
        game_title, 
        tier_id, 
        region_id, 
        type_id, 
        participant,
    } = req.body;

    try{
        await pool.query(
            "INSERT INTO tournament (tournament_id, title, game_title, tier_id, region_id, type_id, participant) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                tournament_id, 
                title, 
                game_title, 
                tier_id, 
                region_id, 
                type_id, 
                participant,
            ]
          );
        res.status(200).json("Tournament Added");
    }
        catch (error){
        console.log(`Failed to get tournaments ${error.message}`);
        res.status(400).json("$(error)");
    }
});

//ADD TOURNAMENT TYPES
tournamentRouter.post("/add-type", async (req, res) => {
    const {
        type_id, 
        type_name, 
        type_description
    } = req.body;

    try {
        await pool.query(
            "INSERT INTO tournament_type (type_id, type_name, type_description) VALUES (?, ?, ?)",
            [
                type_id, 
                type_name, 
                type_description,
            ]
        );
        res.status(200).json("Tournament Type Added");
    } catch (error) {
        console.log(`Failed to add tournament type: ${error.message}`);
        res.status(400).json({ error: `Failed to add tournament type: ${error.message}` });
    }
});

//ADD GAMES
tournamentRouter.post("/add-games", async (req, res) => {
    const {
        game_id,	
        game_title,	
        description,	
        logo,	
    } = req.body;

    try {
        await pool.query(
            "INSERT INTO game_title (game_id, game_title, description, logo) VALUES (?, ?, ?, ?)",
            [
                game_id,	
                game_title,	
                description,	
                logo,	
            ]
        );
        res.status(200).json("Game Title Added");
    } catch (error) {
        console.log(`Failed to add tournament type: ${error.message}`);
        res.status(400).json({ error: `Failed to add Game Title: ${error.message}` });
    }
});

//ADD TEAMS
tournamentRouter.post("/add-teams", async (req, res) => {
    const {
        team_id,	
        team_name,	
        team_logo,	
        region,	
    } = req.body;

    try {
        await pool.query(
            "INSERT INTO team (team_id, team_name, team_logo, region) VALUES (?, ?, ?, ?)",
            [
                team_id,	
                team_name,	
                team_logo,	
                region,	
            ]
        );
        res.status(200).json("Team Successfully Added");
    } catch (error) {
        console.log(`Failed to add team: ${error.message}`);
        res.status(400).json({ error: `Failed to add team: ${error.message}` });
    }
});

//ADD PARTICIPANT
tournamentRouter.post("/add-participant", async (req, res) => {
    const {
        user_id,	
        username,	
    } = req.body;

    try {
        await pool.query(
            "INSERT INTO participant (user_id, username) VALUES (?, ?)",
            [
                user_id,	
                username,
            ]
        );
        res.status(200).json("Participant Successfully Added");
    } catch (error) {
        console.log(`Failed to add participant: ${error.message}`);
        res.status(400).json({ error: `Failed to add participant: ${error.message}` });
    }
});


//DELETE TOURNAMENTS
tournamentRouter.post("/delete-tournament", async (req,res) => {
    const {
        tournament_id, 
    } = req.body;

    try{
        await pool.query(
            "DELETE FROM tournament WHERE tournament_id = ?",
            [
                tournament_id, 
            ]
          );
        res.status(200).json("Tournament Deleted");
    }
        catch (error){
        console.log(`Failed to get tournaments ${error.message}`);
        res.status(400).json("$(error)");
    }
});

//DELETE TYPE
tournamentRouter.post("/delete-type", async (req, res) => {
    const { type_id } = req.body;

    try {
        await pool.query(
            "DELETE FROM tournament_type WHERE type_id = ?",
            [type_id]
        );
        res.status(200).json("Tournament Type Deleted");
    } catch (error) {
        console.log(`Failed to delete tournament type: ${error.message}`);
        res.status(400).json({ error: `Failed to delete tournament type: ${error.message}` });
    }
});

//DELETE GAME
tournamentRouter.post("/delete-game", async (req, res) => {
    const { game_id} = req.body;

    try {
        await pool.query(
            "DELETE FROM game_title WHERE game_id = ?",
            [game_id]
        );
        res.status(200).json("Game Title Deleted");
    } catch (error) {
        console.log(`Failed to delete Game Title: ${error.message}`);
        res.status(400).json({ error: `Failed to delete  Game Title: ${error.message}` });
    }
});

//DELETE TEAM
tournamentRouter.post("/delete-team", async (req, res) => {
    const {team_id} = req.body;

    try {
        await pool.query(
            "DELETE FROM team WHERE team_id = ?",
            [team_id]
        );
        res.status(200).json("Team Deleted");
    } catch (error) {
        console.log(`Failed to delete Team: ${error.message}`);
        res.status(400).json({ error: `Failed to delete Team: ${error.message}` });
    }
});

//DELETE PARTICIPANT
tournamentRouter.post("/delete-participant", async (req, res) => {
    const {user_id} = req.body;

    try {
        await pool.query(
            "DELETE FROM participant WHERE user_id = ?",
            [user_id]
        );
        res.status(200).json("Participant Deleted");
    } catch (error) {
        console.log(`Failed to delete participant: ${error.message}`);
        res.status(400).json({ error: `Failed to delete Participant: ${error.message}` });
    }
});

//UPDATE TOURNAMENTS
tournamentRouter.post("/update-tournament", async (req, res) => {
    const {
        tournament_id, 
        title, 
        game_title, 
        tier_id, 
        region_id, 
        type_id, 
        participant,
    } = req.body;

    try {
        await pool.query(
            "UPDATE tournament SET title = ?, game_title = ?, tier_id = ?, region_id = ?, type_id = ?, participant = ? WHERE tournament_id = ?",
            [
                title, 
                game_title, 
                tier_id, 
                region_id, 
                type_id, 
                participant,
                tournament_id 
            ]
        );
        res.status(200).json("Tournament Updated");
    } catch (error) {
        console.log(`Failed to update tournament: ${error.message}`);
        res.status(400).json(`Failed to update tournament: ${error.message}`);
    }
});

//UPDATE TOURNAMENT TYPE
tournamentRouter.post("/update-type", async (req, res) => {
    const {
        type_id, 
        type_name, 
        type_description
    } = req.body;

    try {
        await pool.query(
            "UPDATE tournament_type SET type_name = ?, type_description = ? WHERE type_id = ?",
            [
                type_name, 
                type_description, 
                type_id
            ]
        );
        res.status(200).json("Tournament Type Updated");
    } catch (error) {
        console.log(`Failed to update tournament type: ${error.message}`);
        res.status(400).json({ error: `Failed to update tournament type: ${error.message}` });
    }
});

//UPDATE GAME
tournamentRouter.post("/update-games", async (req, res) => {
    const {
        game_id, 
        game_title, 
        description,
        logo,
    } = req.body;

    try {
        await pool.query(
            "UPDATE game_title SET game_id = ?, game_title = ?, description = ?, logo = ? WHERE game_id = ?",
            [
                game_id, 
                game_title, 
                description,
                logo,
            ]
        );
        res.status(200).json("Tournament Type Updated");
    } catch (error) {
        console.log(`Failed to update tournament type: ${error.message}`);
        res.status(400).json({ error: `Failed to update tournament type: ${error.message}` });
    }
});

//UPDATE TEAM
tournamentRouter.post("/update-team", async (req, res) => {
    const {
        team_id,	
        team_name,	
        team_logo,	
        region,	
    } = req.body;

    try {
        await pool.query(
            "UPDATE team SET team_id = ?, team_name = ?, team_logo = ?, region = ? WHERE team_id = ?",
            [
                team_id,	
                team_name,	
                team_logo,	
                region,	
            ]
        );
        res.status(200).json("Team Updated");
    } catch (error) {
        console.log(`Failed to update Team: ${error.message}`);
        res.status(400).json({ error: `Failed to update Team: ${error.message}` });
    }
});

//UPDATE PARTICIPANT
tournamentRouter.post("/update-participant", async (req, res) => {
    const {
        user_id,	
        username,	
    } = req.body;

    try {
        await pool.query(
            "UPDATE participant SET user_id = ?, username = ?",
            [
                user_id,	
                username,	
            ]
        );
        res.status(200).json("Participant Updated");
    } catch (error) {
        console.log(`Failed to update Participant: ${error.message}`);
        res.status(400).json({ error: `Failed to update Participant: ${error.message}` });
    }
});


export default tournamentRouter;

