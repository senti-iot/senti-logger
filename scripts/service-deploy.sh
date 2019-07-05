#!/bin/bash

if [[ "$1" == "master" ]]; then 
	echo
	echo Deploying Senti Logger $1 ... 
	rsync -r --quiet $2/ deploy@rey.webhouse.net:/srv/nodejs/senti/services/logger/production
	echo
	echo Restarting Senti Logger service: $1 ... 
	ssh deploy@rey.webhouse.net 'sudo /srv/nodejs/senti/services/logger/production/scripts/service-restart.sh master'
	echo
	echo Deployment to Senti Logger $1 and restart done!
	exit 0
fi 

if [[ "$1" == "dev" ]]; then 
	echo
	echo Deploying Senti Logger $1 ... 
	rsync -r --quiet $2/ deploy@rey.webhouse.net:/srv/nodejs/senti/services/logger/development
	echo
	echo Restarting Senti Logger service: $1 ... 
	ssh deploy@rey.webhouse.net 'sudo /srv/nodejs/senti/services/logger/development/scripts/service-restart.sh dev'
	echo
	echo Deployment to Senti Logger $1 and restart done!
	exit 0
fi