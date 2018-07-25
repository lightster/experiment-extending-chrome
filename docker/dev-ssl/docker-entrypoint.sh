#!/bin/sh

COMMAND="$1"
DOMAIN="${DOMAIN:-b.com}"

case "${COMMAND}" in

    generate)
        if [ -f /etc/ssl/certs/dev.crt ]; then
            exit 0
        fi

        mkdir -p /etc/ssl/certs
        cd /etc/ssl/certs

        openssl genrsa -out "dev.key" 4096

        openssl req -new -key "dev.key" -out "dev.csr" -sha256 \
            -subj "/C=US/ST=CA/L=Irvine/O=Developer/CN=*.${DOMAIN}"

        openssl x509 -req -days 750 -in "dev.csr" -signkey "dev.key" -sha256 \
            -out "dev.crt" -extensions server
        ;;

    sh)
        /bin/sh
        ;;

    *)
        echo "Usage: {generate|sh}"
        exit 1

esac
