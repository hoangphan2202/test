#!/bin/bash
rm .env
cp prod2.env .env
npm run build
pm2 delete --silent globalday-frontend || :
pm2 start npm --name globalday-frontend -- run start2
