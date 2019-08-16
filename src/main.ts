import * as core from "@actions/core";
const github = require("@actions/github");
const helpers = require("./helpers");

// This should be a token with access to your repository scoped in as a secret.
// const myToken = core.getInput("myToken");

const eventOwnerAndRepo = process.env.GITHUB_REPOSITORY;
const octokit = new github.GitHub(process.env.GITHUB_TOKEN);
const eventOwner = helpers.getOwner(eventOwnerAndRepo);
const eventRepo = helpers.getRepo(eventOwnerAndRepo);

function addComment(eventOwner, eventRepo, branchIssueNumber, comment) {
  return octokit.issues.createComment({
    owner: eventOwner,
    repo: eventRepo,
    number: branchIssueNumber,
    body: comment
  });
  // .then(({ data, headers, status }) => {
  //   // handle data
  // })
  // .catch(err => {
  //   console.log(err);
  // });
}

async function run() {
  try {
    // const myInput = core.getInput("myInput");
    // core.debug(`Hello ${myInput}`);
    //read contents of action's event.json
    const eventData = await helpers.readFilePromise(
      "../.." + process.env.GITHUB_EVENT_PATH
    );
    const eventJSON = JSON.parse(eventData);

    //check if branch name starts with an issue number
    const branchIssueNumber = helpers.getIssueFromBranch(eventJSON.ref);

    addComment(eventOwner, eventRepo, branchIssueNumber, "Hello");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
