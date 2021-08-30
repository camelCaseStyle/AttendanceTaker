export {Util}

// splitHash - given a hash path like "#!/people/2" 
//   return an object with properties `path` ("people") and `id` (2)


const Util = {
    splitHash: function (hash) {

        const regex = "#!/([^/]*)/?(.*)?";
        const match = hash.match(regex);
        if (match) {
            return {
                path: match[1],
                id: match[2]
            }
        } else {
            return { path: "" }
        }
    }
}