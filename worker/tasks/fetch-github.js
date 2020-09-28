var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {

    let resultCount = 1, onPage = 0;
    const allJobs = []; 
 

    //fetch all
    while (resultCount > 0) {
        const res = await fetch(`${baseURL}?page=${onPage}`); 
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('page', onPage, 'jobs: ', jobs.length);
        onPage++;
    }

    //filter

    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        //main loop
        if (jobTitle.includes('senior') ||
        jobTitle.includes('manager') ||
        jobTitle.includes('sr.') ||
        jobTitle.includes('architect')) {
            return false;
        }

        return true;

    })

    console.log('got ', allJobs.length, 'jobs');
    console.log('filtered down to', jrJobs.length);
    const success = await setAsync('github', JSON.stringify(jrJobs));

    console.log({success});
}

// fetchGithub();

module.exports = fetchGithub;