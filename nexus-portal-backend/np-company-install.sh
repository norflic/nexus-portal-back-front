#!/bin/sh

CLOSE=$'\e[0m'
BOLD=$'\e[1;37m'
GREEN=$'\e[0;32m'
YELLOW=$'\e[0;33m'
UNDERLINE=$'\e[4;37m'

BACK_LOGFILE_NAME='backend-logs.txt'
FRONT_LOGFILE_NAME='frontend-logs.txt'
MKDIR_ARGS='-p'

if [ "$1" == "--help" ] || [ "$1" == "-h" ] || [[ "$1" =~ ^-.* ]]; then
	echo "$BOLD Nexus Portal Company install script.$CLOSE" &&
	echo "$YELLOW USAGE$CLOSE" &&
	echo "	$GREEN./np-company-install.sh$CLOSE" &&
	echo "	$GREEN./np-company-install.sh$CLOSE <name-you-choose>"
elif [ "$#" -ge 2 ]; then
	echo "Too many arguments";
elif [ "$#" -eq 0 ] || [ "$1" == "" ]; then
	mkdir $MKDIR_ARGS nexus-portal-company &&
	cd nexus-portal-company &&
	mkdir $MKDIR_ARGS "./logs/" && 
	echo "Created nexus-portal-company/, cloning nexus-portal repositories into it..." &&
	
	echo "Cloning the$BOLD backend$CLOSE..." &&
	git clone "https://forge.univ-lyon1.fr/sae-nexus-portal-liegeon-salem-chandon-derrien/nexus-portal-backend.git" > /dev/null &&
	cd "nexus-portal-backend" &&
	echo "Installing$BOLD node$CLOSE dependencies..." &&
	npm add >> ../logs/$BACK_LOGFILE_NAME &&
	if [ "$?" -ne 0 ]; then echo "npm install returned errors, check nexus-portal-company/logs/$NPM_LOGFILE_NAME"; fi &&

	cd ".." &&
	
	echo "Cloning the$BOLD frontend$CLOSE..." &&
	git clone "https://forge.univ-lyon1.fr/sae-nexus-portal-liegeon-salem-chandon-derrien/nexus-portal-frontend.git" > /dev/null &&
	pwd &&
	cd nexus-portal-frontend &&
	echo "Installing$BOLD node$CLOSE dependencies..." &&
	npm add >> ../logs/$FRONT_LOGFILE_NAME &&
	if [ "$?" -ne 0 ]; then echo "npm install returned errors, check nexus-portal-company/logs/$NPM_LOGFILE_NAME"; fi &&
	FOLDER_NAME="nexus-portal-company" &&
	echo "$GREEN✓$CLOSE Successfully installed$BOLD Nexus Portal Company$CLOSE at$UNDERLINE$FOLDER_NAME$CLOSE"
else
	mkdir $MKDIR_ARGS "$1" &&
	echo "Created $1/, cloning nexus-portal repositories into it..." &&
	cd "$1/" &&
	mkdir $MKDIR_ARGS "./logs/" && 

	echo "Cloning the$BOLD backend$CLOSE..." &&
	git clone "https://forge.univ-lyon1.fr/sae-nexus-portal-liegeon-salem-chandon-derrien/nexus-portal-backend.git" > /dev/null &&
	cd nexus-portal-backend && 
	echo "Installing$BOLD node$CLOSE dependencies..." &&
	npm add >> ../logs/$BACK_LOGFILE_NAME &&
	if [ "$?" -ne 0 ]; then echo "npm install returned errors, check nexus-portal-company/logs/$NPM_LOGFILE_NAME"; fi &&
	
	cd ".." &&

	echo "Cloning the$BOLD frontend$CLOSE..." &&
	git clone "https://forge.univ-lyon1.fr/sae-nexus-portal-liegeon-salem-chandon-derrien/nexus-portal-frontend.git" > /dev/null &&
	cd nexus-portal-frontend && 
	echo "Installing$BOLD node$CLOSE dependencies..." &&
	npm add > ../logs/$FRONT_LOGFILE_NAME &&
	if [ "$?" -ne 0 ]; then echo "check $1/logs/$NPM_LOGFILE_NAME"; fi &&

	echo "$GREEN✓$CLOSE Successfully installed$BOLD Nexus Portal Company$CLOSE at $UNDERLINE$1$CLOSE";
fi
