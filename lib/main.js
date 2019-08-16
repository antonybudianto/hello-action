"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const myInput = core.getInput("myInput");
            // core.debug(`Hello ${myInput}`);
            //read contents of action's event.json
            const eventData = yield helpers.readFilePromise("../.." + process.env.GITHUB_EVENT_PATH);
            const eventJSON = JSON.parse(eventData);
            //check if branch name starts with an issue number
            const branchIssueNumber = helpers.getIssueFromBranch(eventJSON.ref);
            addComment(eventOwner, eventRepo, branchIssueNumber, "Hello");
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
