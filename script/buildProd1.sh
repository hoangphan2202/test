#!/bin/bash
rm .env
cp prod1.env .env
npm run build
pm2 delete --silent expo-frontend || :
pm2 start npm --name expo-frontend -- run start1
