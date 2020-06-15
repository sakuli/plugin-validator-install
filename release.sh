#!/usr/bin/env bash
set -e -o pipefail

function help() {
    echo "Usage: sh release.sh <RELEASE_VERSION>"
    echo ""
    echo "Parameters:"
    echo "  RELEASE_VERSION: SemVer Version of the release"
}

semver_pattern="^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$"

RELEASE_VERSION=${1}

[[ -z "${RELEASE_VERSION}" ]] && echo "ERROR: RELEASE_VERSION is empty" && help  && exit 1
[[ ! "${RELEASE_VERSION}" =~ $semver_pattern ]] && echo "ERROR: RELEASE_VERSION does not match the SemVer specification" && help && exit 1

git fetch
printf "\n%s\n" "Create new branch release/${RELEASE_VERSION}"
git checkout -b release/${RELEASE_VERSION} origin/develop

printf "\n%s\n"  "Change Version in package.json"
npm version ${RELEASE_VERSION} --no-git-tag-version
npm i --save-exact @sakuli/plugin-validator-darwin@${RELEASE_VERSION}
npm i --save-exact @sakuli/plugin-validator-linux@${RELEASE_VERSION}
npm i --save-exact @sakuli/plugin-validator-win32@${RELEASE_VERSION}

printf "\n%s\n" "Run npm i"
npm i

printf "\n%s\n"  "Run npm audit fix"
npm audit fix

printf "\n\n%s "  "Please update the changelog before continuing. Would you like to commit and push these changes? (y/n)"
read CHANGE_CONFIRMATION
[[ ! "${CHANGE_CONFIRMATION}" == "y" ]] && exit 1

printf "\n%s\n"  "Committing changes"
git commit -am "Release ${RELEASE_VERSION}"
printf "\n%s\n" "Pushing changes"
git push --set-upstream origin release/${RELEASE_VERSION}

printf "\n\n%s\n" "Verify successful builds on Travis before continuing."
echo "To to release the plugin-validator use following commands:"
printf "%s\n" "git tag -a v${RELEASE_VERSION} -m \"Release ${RELEASE_VERSION}\""
echo "git push --tags"
