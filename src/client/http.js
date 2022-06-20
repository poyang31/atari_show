const apiServer = process.env.REACT_APP_ATARI_API_HOST || "https://atari.fuseita.com";

const generalConfig = {
    method: "GET",
    cache: "no-cache",
    headers: {
        accept: "application/json"
    },
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
