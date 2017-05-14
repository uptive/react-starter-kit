export function formatLinkedInUrl(id){
  if(!id){return;}
  return "https://www.linkedin.com/in/" + id;
}

export function formatFacebookUrl(id){
  if(!id){return;}
  return "https://www.facebook.com/" + id;
}

export function formatGithubUrl(id){
  if(!id){return;}
  return "https://github.com/" + id;
}

export function formatEmailUrl(id){
  return "mailto:" + id;
}
