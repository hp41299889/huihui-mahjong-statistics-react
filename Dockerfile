FROM busybox

COPY build /react-app

CMD ["sh", "-c", "echo 'React app static files are ready.'; sleep 1"]
