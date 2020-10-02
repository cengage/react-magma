find ./packages -depth 2 -name node_modules -exec rm -rf {} \;
find ./packages -depth 2 -name dist -exec rm -rf {} \;
find ./packages -depth 2 -name public -exec rm -rf {} \;
find ./packages -depth 2 -name .cache -exec rm -rf {} \;
rm -rf node_modules
