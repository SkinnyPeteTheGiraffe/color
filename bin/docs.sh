mkdir docs
cd docs || exit 2
touch _config.yml
echo "include:
        - \"_*_.md\"
        - \"_*_.*.md\"" > _config.yml
cd ../ || exit 3
pnpm run docs:build
