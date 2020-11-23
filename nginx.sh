echo "pre-deploy @localhost:9090"

docker run --rm \
    -v ${PWD}/docs/.vuepress/dist:/usr/share/nginx/html \
    --name html -p 9090:80 \
    nginx:1.19.5-alpine
