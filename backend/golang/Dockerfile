# 開発環境用
# FROM golang:1.18-alpine
# RUN apk update && apk add git
# WORKDIR /go/src

# 本番環境用
FROM --platform=linux/amd64 golang:1.20.4-alpine3.18

ARG DB_USER
ARG DB_PASSWORD

ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}

WORKDIR /app

COPY ./ ./
RUN go mod download

# バイナリファイルにビルド
RUN GOOS=linux GOARCH=amd64 go build -mod=readonly -v -o server ./cmd

EXPOSE 8080

# バイナリファイルを実行
CMD DB_USER=${DB_USER} DB_PASSWORD=${DB_PASSWORD} ./server