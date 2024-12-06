import requests
import re

def fetch_total_commit_count(owner, repo, token):
    """
    Fetches the total number of commits in the repository using the GitHub API.
    This is determined by retrieving all commits on the default branch.
    """
    url = f"https://api.github.com/repos/{owner}/{repo}/commits"
    headers = {"Authorization": f"Bearer {token}"}
    params = {"per_page": 1, "page": 1}

    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()

    # GitHub's API includes pagination data in the "Link" header.
    if "Link" in response.headers:
        links = response.headers["Link"]
        match = re.search(r'&page=(\d+)>; rel="last"', links)
        if match:
            return int(match.group(1))
    else:
        return len(response.json())

    raise ValueError("Unable to determine total commit count.")

def fetch_commits(owner, repo, token, branch="main", per_page=1):
    """
    Fetches the latest commits from the GitHub repository.
    """
    url = f"https://api.github.com/repos/{owner}/{repo}/commits"
    headers = {"Authorization": f"Bearer {token}"}
    params = {"sha": branch, "per_page": per_page}

    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()

    commits = response.json()
    return [
        {
            "message": commit["commit"]["message"],
            "author": commit["commit"]["author"]["name"],
            "date": commit["commit"]["author"]["date"],
            "url": commit["html_url"]
        }
        for commit in commits
    ]

def clean_commit_message(message):
    """
    Cleans the commit message by keeping only the main message (first line).
    """
    main_message = message.split("\n")[0]
    main_message = re.sub(r'\[.*?\]\s?', '', main_message)
    return main_message.strip()

def format_commit(commit, commit_number):
    """
    Formats a commit into the required release notes syntax with a sequential number.
    """
    clean_message = clean_commit_message(commit['message'])
    return f"- {clean_message} [#{commit_number}]({commit['url']})"

def generate_release_notes(commits, total_commit_count, title, description):
    """
    Generates the full release notes markdown content with each commit formatted properly.
    """
    features = []
    fixes = []

    for index, commit in enumerate(commits):
        commit_number = total_commit_count - index
        formatted_commit = format_commit(commit, commit_number)

        if "fix" in commit['message'].lower():
            fixes.append(formatted_commit)
        elif "feature" in commit['message'].lower():
            features.append(formatted_commit)
        else:
            print (commit['message'])

    content = []
    content.append(f"---\n")
    content.append(f'title: "{title}"\n')
    content.append(f'description: "{description}"\n')
    content.append(f"---\n\n")
    content.append(f"# 🚀 Release Notes\n\n")
    content.append(f"Welcome to the {title} Release Notes.  This section highlights the latest changes, new features, bug fixes, and acknowledgments for the development team.\n\n")

    if features:
        content.append("## 🌟 Features\n\n")
        content.append("\n".join(features))
        content.append("\n")

    if fixes:
        content.append("## 🛠️ Fixes\n\n")
        content.append("\n".join(fixes))
        content.append("\n")

    content.append("## 👤 Contributors\n\n")
    content.append("A big thanks to our contributors for their dedication and hard work:\n\n")
    content.append("- Jose Ramon Palanco [@jpalanco](https://github.com/jpalanco)\n")
    content.append("- Irvine Pramudya [@vinyex](https://github.com/vinyex)\n")
    content.append("- Juan Jose Florez [@JuanJoseFlorez](https://github.com/JuanJoseFlorez)\n")
    content.append("- Tobias Malbos [@tmalbos](https://github.com/tmalbos)\n")
    content.append("- Carlos Cruz [@tecservicesgda](https://github.com/tecservicesgda)\n")
    content.append("- Moises Pineda [@moypc10](https://github.com/moypc10)\n")
    content.append("\n---\n")
    
    return "".join(content)

def save_to_file(content, file_path):
    """
    Saves the generated markdown content to a file.
    """
    with open(file_path, "w") as file:
        file.write(content)

if __name__ == "__main__":
    GITHUB_TOKEN = "place-github-token"  # Replace with Owner/s' GitHub token
    owner = "plexicus"
    repositories = [
        {"name": "platform", "branch": "main", "title": "Backend", "file": "docs/version-v25.1.1/backend.mdx"},
        {"name": "frontend", "branch": "main", "title": "Frontend", "file": "docs/version-v25.1.1/frontend.mdx"}
    ]

    for repo in repositories:
        repo_name = repo["name"]
        total_commit_count = fetch_total_commit_count(owner, repo_name, GITHUB_TOKEN)
        if not total_commit_count:
            raise ValueError(f"Could not retrieve total commit count for {repo_name}.")

        commits = fetch_commits(owner, repo_name, GITHUB_TOKEN, branch=repo["branch"], per_page=20)
        notes = generate_release_notes(
            commits, 
            total_commit_count, 
            title=repo["title"], 
            description=f"Detailed updates for the {repo['title'].lower()} releases of Plexicus."
        )

        save_to_file(notes, repo["file"])
        print(f"Release notes for {repo_name} saved to {repo['file']}")
