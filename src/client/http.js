const apiServer = process.env.REACT_APP_ATARI_API_HOST || "http://localhost:3000";

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
    const atariToken = localStorage.getItem("atari_token");
    if (atariToken) {
        init.headers["authorization"] = `ATARI ${atariToken}`;
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
