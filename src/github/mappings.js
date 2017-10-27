function formatDate(date) {
  if (!date) {
    return null;
  }

  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getUTCFullYear()}`;
}

function getAvatar(user) {
  return [{ url: user.avatar_url }];
}

function mapIssue(payload) {
  const {
    issue: {
      title,
      number,
      state,
      html_url,
      labels,
      created_at,
      updated_at,
      closed_at,
      user,
      body
    }
  } = payload;
  const labelNames = labels.map(label => label.name);
  const author = user.login;
  // console.log({title, created_at, updated_at, closed_at, body})
  return {
    Title: title,
    ID: number,
    Open: state == "open",
    URL: html_url,
    Description: body,
    Labels: labelNames,
    Author: author,
    Created: formatDate(created_at),
    Updated: formatDate(updated_at),
    Closed: formatDate(closed_at)
  };
}

function mapCommit(commit) {
  const { author: { login }, sha, commit: { message }, html_url } = commit;
  const committer = commit.committer.login;
  const date = commit.commit.committer ? commit.commit.committer.date : null;
  return {
    Author: login,
    Sha: sha,
    Message: message,
    Url: html_url,
    Committer: committer,
    Date: formatDate(date)
  };
}

function mapUser(user) {
  const { login, html_url, location, avatar_url, name, company, email } = user;
  return {
    Login: login,
    Avatar: getAvatar(user),
    Profile: html_url,
    Email: email,
    Location: location,
    Company: company,
    Name: name
  };
}

function mapPR(pr) {
  const {
    html_url,
    number,
    state,
    title,
    created_at,
    updated_at,
    closed_at,
    merged_at,
    body,
    user,
    head
  } = pr;
  const Author = user.login;
  const Branch = head.label;
  return {
    ID: number,
    Url: html_url,
    Open: state == "open",
    Title: title,
    Created: formatDate(created_at),
    Updated: formatDate(updated_at),
    Closed: formatDate(closed_at),
    Merged: formatDate(merged_at),
    Description: body,
    Author,
    Avatar: getAvatar(user),
    Branch
  };
}

module.exports = { mapIssue, mapCommit, mapUser, mapPR };