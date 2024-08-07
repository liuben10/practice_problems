from typing import List, Dict, Optional, Any, Tuple
from collections import defaultdict
import requests
import argparse
import logging
import time

# Github access token would go here. Github access token was
# needed so that I could get more buffer to my rate limiting.
token = "" # -- REAL PAT GOES HERE.
# This constant is used to simulate a global distributed cache.
LOGIN_TO_DISPLAY_NAMES_CACHE = {} 
HEADERS = {
    'Accept': 'application/vnd.github.v3+json',
}
if (len(token)):
    HEADERS['Authorization'] = token

# Default per page constant to specify how many results per page when retrieving stargazers
# for a repo.
DEFAULT_PER_PAGE=10000

"""
Sample logging class that mimics a logger implementation.

This is mainly to be able to hide debug statements more easily through
the -v option. Having to deal with logger configs for an interview
seems like overkill.
"""
class Logging:
    
    def __init__(self):
        self.verbose = False

    def info(self, blob: str) -> None:
        if (self.verbose):
            print(f"[INFO] {blob}")

    def setVerbose(self, verbose):
        self.verbose = verbose

logging = Logging()

# This line is only to indicate I know how to use python logging module.
# logging == logging.Logger(__name__)

"""
This method gets the actual page object for a single pageId

@ownerrepo: String of the owner/repo. i.e. cleanlab/cleanlab
@page: A pageId for a paginated Github page.
@per_page: Specifies how many results in a single request for a page.

# Returns - A tuple to a stargazer page response, and a boolean indicating 
# if there is a 'next' page.
"""
def get_stargazers_page(ownerrepo: str, page: int, per_page: int) -> Tuple[Any, bool]:
    logging.info(f"Fetching {ownerrepo} page {page} per_page {per_page}")
    url = f"https://api.github.com/repos/{ownerrepo}/stargazers"
    params = {
        'per_page': per_page,
        'page': page
    }
    response = requests.get(url, params=params, headers=HEADERS)
    
    if response.status_code == 200:
        hasnext = False
        if ('next' in response.links):
            hasnext = True
        return response.json(), hasnext  
    else:
        print(f"Failed to fetch page {page} of stargazers {url}. Status code: {response.status_code}, headers = {response.headers}")
        return [], False

"""
This method gets 'stargazers' for a repository.

The stargazer is a user who starred a repository.

@repositories - The list of all repositories that we want to get starcounts for.

#Returns - The list of all Github username logins for starred users for that repository.

i.e. so ["liuben10/nachos"] -> ["liuben10"]
"""
def get_stars(repositories: List[str]) -> List[str]:
    stargazerlogins = []
    for r in repositories:
            print(f"Getting stargazers for {r}. Rerun with --verbose to get more INFO printouts.")
            pid = 1
            page, hasnext = get_stargazers_page(r, pid, DEFAULT_PER_PAGE)
            stargazerlogins.extend([x['login'] for x in page])
            pid += 1
            while hasnext:
                # TODO we should actually retry here.
                # Retry is needed so that can still fetch even after rate limiting kicks in.
                # The stargazerlogins should EVENTUALLY COMPLETE.
                page, hasnext = get_stargazers_page(r, pid, DEFAULT_PER_PAGE)
                stargazerlogins.extend([x['login'] for x in page])
                # To deal with rate limiter, although now it takes a long time.
                time.sleep(0.1) 
                pid += 1
    return stargazerlogins

"""
Wrapper class containing details we need to get from the user.

#init
@displayName - This is the display name that will sometimes be set for a user.
@starred - This is the star counts for a user. I.e. how many repositories they have starred.
"""
class UserDetails:

    def __init__(self, displayName: Optional[str], starred: int) -> None:
        self.displayName = displayName
        self.starred = starred

"""
Input is the stargazer logins. Fetches just the stargazer display name

Produces the sorted dict of users to the total number of starred repositories
amongst just the input repositories. i.e. so if a user starred just 2 out of 3 of
the repositories, they would have a star count of 2.

Params:
@stargazer_logins - List of login usernames as output from get_stars

#Returns:
sorted dict of stargazer displaynames to the total number of repositories starred amongst input repositories
"""
def get_stars_counts_to_stargazers(stargazer_logins: List[str]) -> Dict[str, int]:
    counts = defaultdict(int)
    logging.info(f"Number of stargazers fetched {len(stargazer_logins)}")
    for login in stargazer_logins:
        display_name = None
        if (login not in LOGIN_TO_DISPLAY_NAMES_CACHE):
            userdetails = get_user_details(login, include_user_starred_count=False)
            display_name = userdetails.displayName
            starcount = 1
            logging.info(f"Fetched {display_name or login} {starcount}")
            LOGIN_TO_DISPLAY_NAMES_CACHE[login] = userdetails
        else:
            display_name = LOGIN_TO_DISPLAY_NAMES_CACHE[login].displayName
            starcount = 1
            logging.info(f"Retrieved from cache {display_name or login} {starcount}")
        if (display_name is None):
            counts[login] += starcount
        else:
            counts[display_name] += starcount
    sorted_counts = {k: v for k, v in sorted(counts.items(), key=lambda x: -x[1])}
    return sorted_counts

"""
Gets the stargazer logins. Fetches user details from the user page.

Produces the sorted dict of users to the total number of starred repositories
for that user.

@stargazer_logins - List of login usernames as output from get_stars.

#Returns - sorted Dict of display_name/login to starred repository count.
"""

def get_stars_to_stargazers(stargazer_logins: List[str]) -> Dict[str, int]:
    counts = {}
    logging.info(f"Number of stargazers fetched {len(stargazer_logins)}")
    for login in stargazer_logins:
        display_name = None
        starcount = 0
        if (login not in LOGIN_TO_DISPLAY_NAMES_CACHE):
            userdetails = get_user_details(login)
            display_name = userdetails.displayName
            starcount = userdetails.starred
            logging.info(f"Fetched {display_name or login} {starcount}")
            LOGIN_TO_DISPLAY_NAMES_CACHE[login] = userdetails
        else:
            display_name = LOGIN_TO_DISPLAY_NAMES_CACHE[login].displayName
            starcount = LOGIN_TO_DISPLAY_NAMES_CACHE[login].starred
            logging.info(f"Retrieved from cache {display_name or login} {starcount}")
        if (display_name is None):
            if login not in counts:
                counts[login] = starcount
        else:
            if display_name not in counts:
                counts[display_name] = starcount
    sorted_counts = {k: v for k, v in sorted(counts.items(), key=lambda x: -x[1])}
    return sorted_counts


"""
Fetches the Github display name for a user. 
"""
def get_user_display_name(username: str) -> Optional[str]:
    url = f"https://api.github.com/users/{username}"
    response = requests.get(url, headers=HEADERS)

    if response.status_code == 200:
        user_info = response.json()
        display_name = user_info.get('name')
        return display_name
    else:
        print(f"Failed to fetch user information for {username}. Status code: {response.status_code}")
        return None

"""
The result of the script is to print to stdout.
"""
def print_users_to_stars_stdout(usersToStars: Dict[str, int]) -> None:
    for k, v in usersToStars.items():
        print(f"{k}\t{v}")
        
"""

Fetches the starred count for a particular user.

@username - The 'login' name as specified by Github.

#returns - the number of starred repositories for that user.
"""
def get_user_starred_count(username: str) -> int:
    url = f"https://api.github.com/users/{username}/starred"
    response = requests.get(url, headers=HEADERS, params={'per_page': 1})
    
    if response.status_code == 200:
        # Get total count of starred repositories from the Link header if it exists
        link_header = response.headers.get('Link')
        if link_header:
            # Extract the last page number from the Link header
            last_page_url = link_header.split(',')[-1].split(';')[0].strip()[1:-1]
            last_page_number = int(last_page_url.split('page=')[-1])
            return last_page_number
        else:
            return len(response.json())
    else:
        print(f"Failed to fetch starred count for user {username}. Status code: {response.status_code}")
        return None

"""
For a given 

@username - github login user. 

#Returns - 
UserDetails - {
    @displayName - The Github 'display name'.
    @starred - The total number of starred repositories for that user.
}
"""    
def get_user_details(username: str, include_user_starred_count: bool = True) -> UserDetails:
    display_name = get_user_display_name(username)
    # This part of the instructions were somewhat unclear.
    # Are the repositories being counted as 'stars' the
    # repositories as specified in the input, or all repositories.
    # Currently, in the code, we are assuming that we are only getting the starred repository count
    # per user
    # If we want to get the starred count among only the repositories passed in, then
    # it is sufficient to just return a starred count of 1 and then aggregate (instead of just
    # get the total starred and set).
    # userStarredCount = 1
    if (include_user_starred_count):
        user_starred_count = get_user_starred_count(username)
    else:
        user_starred_count = 1
    return UserDetails(display_name, user_starred_count)
    
def test_can_fetch_user(inputusername: str, expecteddisplayname: str):
    output_display_name = get_user_display_name(inputusername)
    assert output_display_name == expecteddisplayname, f"ERROR fetched {output_display_name} for {inputusername} but expected {expecteddisplayname}"

def test_fetches_all_stars(repos: List[str], expected_num_stars: int):
    all_stars = get_stars(repos)
    total_stars = 0
    for l in all_stars:
        total_stars += get_user_starred_count(l)
    assert total_stars == expected_num_stars, f"Expected {total_stars} == {expected_num_stars}"

def test_can_match_stars_to_stargazers(repos: List[str], stargazername: str, expectednumstars: int):
    all_logins = get_stars(repos)
    stargazer_star_counts = get_stars_to_stargazers(all_logins)
    assert stargazername in stargazer_star_counts, f"ERROR failed to find stargazer {stargazername} in {stargazer_star_counts}"
    assert stargazer_star_counts[stargazername] == expectednumstars, f"ERROR expected {stargazer_star_counts[stargazername]} == {expectednumstars}"

def test_can_match_stars_to_stargazer_counts_alternate(repos: List[str], stargazername: str, expectednumstars: int):
    all_logins = get_stars(repos)
    stargazer_star_counts = get_stars_counts_to_stargazers(all_logins)
    assert stargazername in stargazer_star_counts, f"ERROR failed to find stargazer {stargazername} in {stargazer_star_counts}"
    assert stargazer_star_counts[stargazername] == expectednumstars, f"ERROR expected {stargazer_star_counts[stargazername]} == {expectednumstars}"

def test_user_starred_count(username, expected_stars):
    starcount = get_user_starred_count(username)
    assert starcount == expected_stars, f"ERROR {starcount} == {expected_stars}"

def run_tests():
    test_can_fetch_user("itsonlym3", "Tim")
    test_user_starred_count("liuben10", 8)
    test_can_match_stars_to_stargazers(["grnq/joid"], "Barry Ferg", 156)
    test_can_match_stars_to_stargazer_counts_alternate(["liuben10/nachos", "liuben10/swagger_demo"], "Benjamin Liu", 2)
    # commented out because fetching cleanlab/cleanlab takes too long due to many stars.
    # test_can_match_stars_to_stargazers(["cleanlab/cleanlab"], "Tom Zhou", 145)
    print("***** TEST END *****")

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('repos', type=str, nargs='+',
        help='A list of github owner/repo pairs. i.e. cleanlab/cleanlab. ')
    parser.add_argument("-v", "--verbose", action='store_true', help="Print out extra debugging logs")
    parser.add_argument("-t", "--tests", action='store_true', help="Run tests")
    parser.add_argument("-a", "--alternate", action="store_true", help="Alternate way of interpreting the instructions. With this approach, we instead just count stars amongst"
                        "the repos that were supplied")
    args = parser.parse_args()
    repos = args.repos
    verbose = args.verbose
    logging.setVerbose(verbose)
    print(f"RECEIVED argparse={args}")
    if (args.tests):
        run_tests()
    stargazer_logins = get_stars(repos)
    if (args.alternate):
        stargazer_star_counts = get_stars_counts_to_stargazers(stargazer_logins)
    else:
        stargazer_star_counts = get_stars_to_stargazers(stargazer_logins)
    print_users_to_stars_stdout(stargazer_star_counts)

if __name__ == '__main__':
    main()



#Sample output:

#PS C:\Users\liube\practice_problems> python3 .\stars.py grnq/joid
#RECEIVED argparse=Namespace(repos=['grnq/joid'], tests=False, verbose=False)
#Getting stargazers for grnq/joid. Rerun with --verbose to get more INFO printouts.
#bferg 156
#liuben10 8
#fingz 2