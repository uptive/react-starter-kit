
export function extractLinkedInId(url){
    var parsedUrl = parse_url(url);
    var parts = parsedUrl.path.split("/");
    if(parsedUrl.authority === "www.linkedin.com" && parts[1] === "in"){
      return parts[2];
    }

    return;
}

export function extractFacebookId(url){
    var parsedUrl = parse_url(url);
    var parts = parsedUrl.path.split("/");
    if(parsedUrl.authority === "www.facebook.com"){
      return parts[1];
    }

    return;
}

export function extractGithubId(url){
    var parsedUrl = parse_url(url);
    var parts = parsedUrl.path.split("/");
    if(parsedUrl.authority === "github.com"){
      return parts[1];
    }
    return;
}

function parse_url(url) {
        var pattern = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        var matches =  url.match(pattern);
        return {
            scheme: matches[2],
            authority: matches[4],
            path: matches[5],
            query: matches[7],
            fragment: matches[9]
        };
    }
