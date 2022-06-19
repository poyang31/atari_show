const apiServer = "http://localhost:3000";

const generalConfig = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        accept: "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
};

export default (input, init, json = null) => {
    input = apiServer + input;
    init = {...generalConfig, ...init};
    const atari_token = localStorage.getItem("atari_token");
    if (atari_token) {
        init.headers["authorization"] = atari_token;
    }
    if (json) {
        init.headers["content-type"] = "application/json";
        init.body = JSON.stringify(json);
    }
    return new Promise((resolve, reject) =>
        fetch(input, init)
            .then((res) => {
                return Math.floor(res.status / 100) === 2
                    ? res.json()
                    : reject(res)
            })
            .then(resolve)
            .catch(reject)
    );
};
