FROM alpine:3.7

RUN apk add --no-cache \
        openssl

ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]
CMD ["generate"]

WORKDIR /
