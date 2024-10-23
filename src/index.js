import express from 'express';
import { Octokit } from "@octokit/rest";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
    auth: process.env.API_KEY,
});

const app = express();


app.listen(process.env.PORT, () => {

});

app.use(cors());

app.get('/getTokenData', async (req, res, next) => {
    return res.json({ port: process.env.PORT, token: process.env.API_KEY })
})

app.get("/getRepoData", async (req, res, next) => {

    let response = { }

    console.log('prceess env', process.env.API_KEY);

    const cpuSimulatorData = await octokit.request("GET /repos/enriquegambra/CPU_Simulator");

    response['cpuSimulatorData'] = {
        name: cpuSimulatorData.data.name,
        description: cpuSimulatorData.data.description,
        html_url: cpuSimulatorData.data.html_url
    };

    const amazonAlexaData = await octokit.request("GET /repos/enriquegambra/Amazon-Alexa-Skill");

    response['amazonAlexaData'] = {
        name: amazonAlexaData.data.name,
        description: amazonAlexaData.data.description,
        html_url: amazonAlexaData.data.html_url,
    };

    const nbaPlayerStats = await octokit.request("GET /repos/enriquegambra/Compare-NBA-Players-Stats");

    response['nbaPlayerStats'] = {
        name: nbaPlayerStats.data.name,
        description: nbaPlayerStats.data.description,
        html_url: nbaPlayerStats.data.html_url,
    };

    const alienInvasionData = await octokit.request("GET /repos/enriquegambra/Alien-Invasion");

    response['alienInvasionData'] = {
        name: alienInvasionData.data.name,
        description: alienInvasionData.data.description,
        html_url: alienInvasionData.data.html_url,
    }

    res.json(response);

    console.log('RESPONSE IS: ', response);
    return res;
});