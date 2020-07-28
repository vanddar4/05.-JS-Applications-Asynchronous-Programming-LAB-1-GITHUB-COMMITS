/*
1. Github Commits
Write a JS program that loads all commit messages and their authors from a github repository using a given HTML.
Skeleton will be provided in the Resources folder.
The loadCommits() function should get the username and repository from the HTML textboxes with IDs "username" and "repo" and make a GET request to the Github API: https://api.github.com/repos/<username>/<repository>/commits
• In case of an error, add a single list item (<li>) with text in the following format: "Error: <error.status> (<error.statusText>)"
*/

function loadCommits() {
    let username = document.getElementById("username").value;
    let repoName = document.getElementById("repo").value;
    let url = `https://api.github.com/repos/${username}/${repoName}/commits`;
    
    fetch(url).then(response => new Promise((resolve, reject) => {
        if(response.ok){
            resolve(response.json());
        } else {
            reject(response);
        }
    })).then(jsonObj => {
        console.log(jsonObj);
        document.getElementById("commits").innerHTML = "";
        for(let commitObj of jsonObj){
            let message = commitObj.commit.author.name + ": " + commitObj.commit.message;
            let li = document.createElement("li");
            li.textContent = message;
            document.getElementById("commits").append(li);
        }
    }).catch(error => {
        document.getElementById("commits").innerHTML = "";
        let message = `Error: ${error.status} (${error.statusText})`
        let li = document.createElement("li");
        li.textContent = message;
        document.getElementById("commits").append(li);
    })

}